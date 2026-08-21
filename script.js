/* =========================================================
   OMG PIZZA — script.js
   =========================================================
   ⚠️ CONFIGURACIÓN RÁPIDA
   Cambia el número de WhatsApp aquí abajo cuando lo tengas.
   Formato: código de país + número, SIN "+", SIN espacios ni guiones.
   Ejemplo El Salvador: "50370001234"
   ========================================================= */
const WHATSAPP_NUMBER = "50300000000"; // TODO: reemplazar con el número real

/* TODO: reemplaza estos enlaces con las cuentas reales cuando estén listas */
const SOCIAL_LINKS = {
  facebook: "https://facebook.com/omgpizza",
  instagram: "https://instagram.com/omgpizza",
  tiktok: "https://tiktok.com/@omgpizza"
};

(function () {
  "use strict";

  /* ---------------------------------------------------------
     Helpers
     --------------------------------------------------------- */
  function waLink(message) {
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  }

  function openWhatsApp(message) {
    window.open(waLink(message), "_blank", "noopener");
  }

  function showToast(text) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add("is-visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("is-visible"), 3200);
  }

  /* ---------------------------------------------------------
     Header: scroll state + mobile nav
     --------------------------------------------------------- */
  const header = document.getElementById("siteHeader");
  const navLinks = document.getElementById("navLinks");
  const navToggle = document.getElementById("navToggle");

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------------------------------------------------
     Basic WhatsApp CTAs (hero, contact, footer, float button)
     --------------------------------------------------------- */
  const ORDER_MSG = "¡Hola OMG Pizza! 🍕 Quiero hacer un pedido.";
  const RESERVE_MSG = "¡Hola OMG Pizza! 📅 Quiero reservar una mesa.";

  document.getElementById("btnHeroOrder").addEventListener("click", () => openWhatsApp(ORDER_MSG));
  document.getElementById("btnHeroReserve").addEventListener("click", () => openWhatsApp(RESERVE_MSG));
  document.getElementById("btnContactOrder").addEventListener("click", () => openWhatsApp(ORDER_MSG));
  document.getElementById("btnContactReserve").addEventListener("click", () => openWhatsApp(RESERVE_MSG));

  const waFloat = document.getElementById("waFloat");
  const socialWhatsapp = document.getElementById("socialWhatsapp");
  const footerWhatsapp = document.getElementById("footerWhatsapp");
  [waFloat, socialWhatsapp, footerWhatsapp].forEach((el) => {
    if (el) el.href = waLink(ORDER_MSG);
  });

  const facebookLinks = document.querySelectorAll('a[href*="facebook.com/omgpizza"]');
  const instagramLinks = document.querySelectorAll('a[href*="instagram.com/omgpizza"]');
  const tiktokLinks = document.querySelectorAll('a[href*="tiktok.com/@omgpizza"]');
  facebookLinks.forEach((a) => (a.href = SOCIAL_LINKS.facebook));
  instagramLinks.forEach((a) => (a.href = SOCIAL_LINKS.instagram));
  tiktokLinks.forEach((a) => (a.href = SOCIAL_LINKS.tiktok));

  /* ---------------------------------------------------------
     Menu cards: order specific pizza
     --------------------------------------------------------- */
  document.querySelectorAll(".menu-card [data-pizza]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pizzaName = btn.getAttribute("data-pizza");
      openWhatsApp(`¡Hola OMG Pizza! 🍕 Quiero pedir una pizza *${pizzaName}*.`);
    });
  });

  /* ---------------------------------------------------------
     Reveal on scroll (timeline items + menu cards)
     --------------------------------------------------------- */
  const revealTargets = document.querySelectorAll(".timeline-item, .menu-card");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------------------------------------------------------
     Pizza Builder ("Arma tu pizza")
     --------------------------------------------------------- */
  const sizeOptions = document.getElementById("sizeOptions");
  const toppingGrid = document.getElementById("toppingGrid");
  const pizzaBase = document.getElementById("pizzaBase");
  const summarySize = document.getElementById("summarySize");
  const summaryCount = document.getElementById("summaryCount");
  const btnBuilderOrder = document.getElementById("btnBuilderOrder");

  let selectedSize = "Personal";
  const selectedToppings = new Map(); // topping -> { color, dots: [el,...] }

  // Deterministic pseudo-random position per topping so it looks natural
  // but doesn't jump around if re-rendered.
  function seededPositions(seedStr, count) {
    let seed = 0;
    for (let i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) % 100000;
    function rand() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    }
    const positions = [];
    for (let i = 0; i < count; i++) {
      const angle = rand() * Math.PI * 2;
      const radius = 12 + rand() * 34; // keep within crust
      positions.push({
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius
      });
    }
    return positions;
  }

  function addToppingVisual(topping, color) {
    const dotsCount = 6;
    const positions = seededPositions(topping, dotsCount);
    const dots = positions.map((pos, i) => {
      const dot = document.createElement("div");
      dot.className = "topping-dot";
      dot.style.left = pos.x + "%";
      dot.style.top = pos.y + "%";
      dot.style.width = dot.style.height = 9 + (i % 3) * 4 + "px";
      dot.style.background = color;
      dot.style.animationDelay = i * 40 + "ms";
      pizzaBase.appendChild(dot);
      return dot;
    });
    return dots;
  }

  function removeToppingVisual(dots) {
    dots.forEach((dot) => dot.remove());
  }

  function updateSummary() {
    summarySize.textContent = selectedSize;
    summaryCount.textContent = String(selectedToppings.size);
  }

  sizeOptions.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      sizeOptions.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      selectedSize = chip.getAttribute("data-size");
      updateSummary();
    });
  });

  toppingGrid.querySelectorAll(".topping-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const topping = chip.getAttribute("data-topping");
      const color = chip.getAttribute("data-color") || "#f5b613";

      if (selectedToppings.has(topping)) {
        const entry = selectedToppings.get(topping);
        removeToppingVisual(entry.dots);
        selectedToppings.delete(topping);
        chip.classList.remove("is-active");
      } else {
        const dots = addToppingVisual(topping, color);
        selectedToppings.set(topping, { color, dots });
        chip.classList.add("is-active");
      }
      updateSummary();
    });
  });

  btnBuilderOrder.addEventListener("click", () => {
    const toppingsList = Array.from(selectedToppings.keys());
    let message = `¡Hola OMG Pizza! 🍕 Quiero armar mi propia pizza:\n\n`;
    message += `*Tamaño:* ${selectedSize}\n`;
    message += toppingsList.length
      ? `*Ingredientes:* ${toppingsList.join(", ")}\n`
      : `*Ingredientes:* Sin ingredientes extra (solo queso y salsa)\n`;
    message += `\n¡Gracias!`;

    if (toppingsList.length === 0) {
      showToast("Elige al menos un ingrediente para tu pizza 🍕");
    }
    openWhatsApp(message);
  });

  updateSummary();

  /* ---------------------------------------------------------
     Hero flame particles (decorative, respects reduced motion)
     --------------------------------------------------------- */
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const heroVisual = document.querySelector(".hero-visual");
  if (heroVisual && !prefersReducedMotion) {
    const colors = ["#f5b613", "#f2670b", "#d8241d"];
    for (let i = 0; i < 10; i++) {
      const p = document.createElement("div");
      p.className = "flame-particle";
      const size = 4 + Math.random() * 7;
      p.style.width = size + "px";
      p.style.height = size + "px";
      p.style.left = 20 + Math.random() * 60 + "%";
      p.style.bottom = "10%";
      p.style.background = colors[i % colors.length];
      p.style.animationDuration = 3 + Math.random() * 3 + "s";
      p.style.animationDelay = Math.random() * 4 + "s";
      heroVisual.appendChild(p);
    }
  }

  /* ---------------------------------------------------------
     Footer year
     --------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
