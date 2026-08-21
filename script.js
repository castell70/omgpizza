/* =========================================================
   OMG PIZZA — script.js
   =========================================================
   ⚠️ CONFIGURACIÓN RÁPIDA — WHATSAPP
   Cambia el número aquí cuando lo tengas.
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

/* =========================================================
   ⚠️ ACCESO DE ADMINISTRADOR — IMPORTANTE LEER
   ---------------------------------------------------------
   Este es un sitio 100% estático (sin servidor ni base de
   datos), así que esta "contraseña" es una protección básica
   para evitar que un visitante casual toque el catálogo —
   NO es seguridad real: cualquier persona que abra las
   herramientas de desarrollador del navegador puede ver este
   archivo y el usuario/contraseña. Si necesitas seguridad de
   verdad (por ejemplo, varios empleados con acceso), lo
   correcto es mover esto a un backend con autenticación real.
   ========================================================= */
const ADMIN_USER = "OMG$2026";
const ADMIN_PASS = "L@m3j0rP1zz@.2026";
const ADMIN_SESSION_KEY = "omgAdminSession";
/* =========================================================
   CONFIGURACIÓN DE INGREDIENTES — "Arma tu pizza"
   ---------------------------------------------------------
   Los precios son de ejemplo: ajústalos a los reales del
   negocio. Si agregas un ingrediente nuevo, súmalo aquí con
   su ícono (colócalo en assets/images/toppings/) y su precio.
   ========================================================= */
const TOPPINGS = [
  { id: "pepperoni", name: "Pepperoni", price: 0.75, icon: "assets/images/toppings/pepperoni.svg" },
  { id: "queso", name: "Extra queso", price: 1.00, icon: "assets/images/toppings/queso.svg" },
  { id: "champinon", name: "Champiñones", price: 0.75, icon: "assets/images/toppings/champinon.svg" },
  { id: "pina", name: "Piña", price: 0.75, icon: "assets/images/toppings/pina.svg" },
  { id: "jalapeno", name: "Jalapeño", price: 0.50, icon: "assets/images/toppings/jalapeno.svg" },
  { id: "tocino", name: "Tocino", price: 1.00, icon: "assets/images/toppings/tocino.svg" },
  { id: "cebolla", name: "Cebolla morada", price: 0.50, icon: "assets/images/toppings/cebolla.svg" },
  { id: "aceituna", name: "Aceitunas", price: 0.50, icon: "assets/images/toppings/aceituna.svg" },
  { id: "pimiento", name: "Pimientos", price: 0.50, icon: "assets/images/toppings/pimiento.svg" },
  { id: "salchicha", name: "Salchicha", price: 1.00, icon: "assets/images/toppings/salchicha.svg" },
  { id: "chile", name: "Chile en hojuelas", price: 0.25, icon: "assets/images/toppings/chile-hojuelas.svg" },
  { id: "choclo", name: "Choclo", price: 0.50, icon: "assets/images/toppings/choclo.svg" }
];

const CATALOG_STORAGE_KEY = "omgPizzaCatalog_v1";

/* Metadatos de categorías: orden, etiqueta e ícono por defecto */
const CATEGORY_META = {
  pizzas:   { label: "Pizzas",   icon: "🍕" },
  bebidas:  { label: "Bebidas",  icon: "🥤" },
  botanas:  { label: "Botanas",  icon: "🍟" },
  entradas: { label: "Entradas", icon: "🥗" },
  postres:  { label: "Postres",  icon: "🍰" }
};

/* Catálogo de ejemplo — el administrador puede editarlo, ocultarlo
   o reemplazarlo por completo desde el panel de administración. */
const DEFAULT_CATALOG = {
  pizzas: [
    { id: "p1", name: "OMG Especial", description: "Pepperoni, tocino crujiente, doble queso mozzarella y orilla rellena de queso.", price: "Desde $8.50", badge: "Más pedida", icon: "🍕", visible: true },
    { id: "p2", name: "Pepperoni Supreme", description: "Doble capa de pepperoni, orégano y un toque de chile en hojuelas.", price: "Desde $7.75", badge: "Picante", icon: "🌶️", visible: true },
    { id: "p3", name: "BBQ Chicken", description: "Pollo a la parrilla, salsa BBQ, cebolla morada y un toque de cilantro fresco.", price: "Desde $8.00", badge: "Favorita", icon: "🍗", visible: true },
    { id: "p4", name: "Cuatro Quesos", description: "Mozzarella, parmesano, provolone y queso azul en cada rebanada.", price: "Desde $7.90", badge: "Clásica", icon: "🧀", visible: true },
    { id: "p5", name: "Hawaiana", description: "Jamón, piña dulce y extra queso — el debate favorito de la mesa.", price: "Desde $7.50", badge: "Clásica", icon: "🍍", visible: true },
    { id: "p6", name: "Vegetariana", description: "Champiñones, pimientos, cebolla, aceitunas y tomate fresco.", price: "Desde $7.50", badge: "Vegetariana", icon: "🍄", visible: true }
  ],
  bebidas: [
    { id: "b1", name: "Coca-Cola 600ml", description: "Bien fría, para acompañar cualquier pizza.", price: "$1.50", badge: "", icon: "🥤", visible: true },
    { id: "b2", name: "Limonada fresca", description: "Preparada al momento, con un toque de menta.", price: "$2.00", badge: "", icon: "🍋", visible: true },
    { id: "b3", name: "Agua embotellada", description: "500ml, ideal para acompañar tu pedido.", price: "$1.00", badge: "", icon: "💧", visible: true }
  ],
  botanas: [
    { id: "s1", name: "Pan de ajo", description: "Crujiente por fuera, suave por dentro, con mantequilla de ajo y perejil.", price: "$3.50", badge: "", icon: "🥖", visible: true },
    { id: "s2", name: "Alitas BBQ", description: "8 alitas bañadas en salsa BBQ, acompañadas de aderezo ranch.", price: "$6.00", badge: "Picante", icon: "🍗", visible: true },
    { id: "s3", name: "Dedos de queso", description: "Palitos de mozzarella empanizados, con salsa marinara.", price: "$4.50", badge: "", icon: "🧀", visible: true }
  ],
  entradas: [
    { id: "e1", name: "Ensalada César", description: "Lechuga romana, crotones, parmesano y aderezo césar clásico.", price: "$4.00", badge: "", icon: "🥗", visible: true },
    { id: "e2", name: "Bruschettas", description: "Pan tostado con tomate fresco, albahaca y aceite de oliva.", price: "$3.75", badge: "Nuevo", icon: "🍅", visible: true }
  ],
  postres: [
    { id: "d1", name: "Volcán de chocolate", description: "Bizcocho tibio de chocolate con centro derretido.", price: "$3.50", badge: "", icon: "🍫", visible: true },
    { id: "d2", name: "Cheesecake de fresa", description: "Cremoso, con salsa de fresa natural.", price: "$3.75", badge: "", icon: "🍰", visible: true }
  ]
};

(function () {
  "use strict";

  /* ---------------------------------------------------------
     Catálogo: carga / guardado en localStorage
     --------------------------------------------------------- */
  function cloneCatalog(source) {
    return JSON.parse(JSON.stringify(source));
  }

  function loadCatalog() {
    try {
      const raw = localStorage.getItem(CATALOG_STORAGE_KEY);
      if (!raw) throw new Error("no catalog yet");
      const parsed = JSON.parse(raw);
      // aseguramos que existan todas las categorías esperadas
      Object.keys(CATEGORY_META).forEach((key) => {
        if (!Array.isArray(parsed[key])) parsed[key] = [];
      });
      return parsed;
    } catch (e) {
      const seed = cloneCatalog(DEFAULT_CATALOG);
      localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(seed));
      return seed;
    }
  }

  function saveCatalog() {
    localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(catalog));
  }

  let catalog = loadCatalog();

  /* ---------------------------------------------------------
     Helpers generales
     --------------------------------------------------------- */
  function waLink(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
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
  function escapeHTML(str) {
    return String(str ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }
  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
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
     WhatsApp CTAs generales (hero, contacto, footer, flotante)
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
  [waFloat, socialWhatsapp, footerWhatsapp].forEach((el) => { if (el) el.href = waLink(ORDER_MSG); });

  document.querySelectorAll('a[href*="facebook.com/omgpizza"]').forEach((a) => (a.href = SOCIAL_LINKS.facebook));
  document.querySelectorAll('a[href*="instagram.com/omgpizza"]').forEach((a) => (a.href = SOCIAL_LINKS.instagram));
  document.querySelectorAll('a[href*="tiktok.com/@omgpizza"]').forEach((a) => (a.href = SOCIAL_LINKS.tiktok));

  /* ---------------------------------------------------------
     Reveal on scroll (timeline)
     --------------------------------------------------------- */
  function observeReveal(selector) {
    const targets = document.querySelectorAll(selector);
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }
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
    targets.forEach((el) => observer.observe(el));
  }
  observeReveal(".timeline-item");

  /* ---------------------------------------------------------
     MENÚ PÚBLICO — render dinámico desde el catálogo
     --------------------------------------------------------- */
  const menuGrid = document.getElementById("menuGrid");
  const menuFilter = document.getElementById("menuFilter");
  let activeFilter = "all";

  function badgeClass(badge) {
    const b = (badge || "").toLowerCase();
    if (b.includes("pica")) return "badge--spicy";
    if (b.includes("nuev") || b.includes("favorit")) return "badge--new";
    if (b.includes("más ped") || b.includes("mas ped")) return "badge--fav";
    return "badge--classic";
  }

  function renderPublicMenu() {
    menuGrid.innerHTML = "";
    const categoryKeys = Object.keys(CATEGORY_META);
    const activeKeys = activeFilter === "all" ? categoryKeys : [activeFilter];
    let totalRendered = 0;

    activeKeys.forEach((catKey) => {
      const items = (catalog[catKey] || []).filter((p) => p.visible);
      if (items.length === 0) return;

      if (activeFilter === "all") {
        const heading = document.createElement("div");
        heading.className = "menu-category-heading";
        heading.textContent = `${CATEGORY_META[catKey].icon} ${CATEGORY_META[catKey].label}`;
        menuGrid.appendChild(heading);
      }

      items.forEach((item) => {
        totalRendered++;
        const card = document.createElement("article");
        card.className = "menu-card is-visible";
        card.innerHTML = `
          <div class="menu-card-top">
            <span class="menu-icon">${escapeHTML(item.icon || CATEGORY_META[catKey].icon)}</span>
            ${item.badge ? `<span class="badge ${badgeClass(item.badge)}">${escapeHTML(item.badge)}</span>` : ""}
          </div>
          <h3>${escapeHTML(item.name)}</h3>
          <p>${escapeHTML(item.description || "")}</p>
          <div class="menu-card-foot">
            <span class="size-tag">${escapeHTML(item.price || "")}</span>
            <button class="btn btn--sm btn--gold" type="button" data-order-name="${escapeHTML(item.name)}">Pedir</button>
          </div>
        `;
        menuGrid.appendChild(card);
      });
    });

    if (totalRendered === 0) {
      const empty = document.createElement("p");
      empty.className = "menu-empty";
      empty.textContent = "Muy pronto agregaremos productos en esta categoría. ¡Vuelve pronto!";
      menuGrid.appendChild(empty);
    }

    menuGrid.querySelectorAll("[data-order-name]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const name = btn.getAttribute("data-order-name");
        openWhatsApp(`¡Hola OMG Pizza! 🍕 Quiero pedir *${name}*.`);
      });
    });
  }

  menuFilter.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      menuFilter.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      activeFilter = chip.getAttribute("data-filter");
      renderPublicMenu();
    });
  });

  renderPublicMenu();

  /* ---------------------------------------------------------
     Pizza Builder ("Arma tu pizza")
     --------------------------------------------------------- */
  const sizeOptions = document.getElementById("sizeOptions");
  const toppingGrid = document.getElementById("toppingGrid");
  const pizzaBase = document.getElementById("pizzaBase");
  const receiptSizeEl = document.getElementById("receiptSize");
  const receiptBasePriceEl = document.getElementById("receiptBasePrice");
  const receiptToppingsEl = document.getElementById("receiptToppings");
  const receiptTotalEl = document.getElementById("receiptTotal");
  const btnBuilderOrder = document.getElementById("btnBuilderOrder");

  const selectedToppings = new Map(); // id -> { topping, dots[] }

  function formatMoney(n) {
    return "$" + n.toFixed(2);
  }

  function activeSizeChip() {
    return sizeOptions.querySelector(".chip.is-active");
  }

  // Genera el grid de ingredientes a partir de TOPPINGS (icono + nombre + precio)
  function renderToppingGrid() {
    toppingGrid.innerHTML = "";
    TOPPINGS.forEach((topping) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "topping-chip";
      btn.setAttribute("data-id", topping.id);
      btn.innerHTML = `
        <img src="${topping.icon}" alt="" aria-hidden="true">
        <span class="t-name">${topping.name}</span>
        <span class="t-price">+${formatMoney(topping.price)}</span>
      `;
      btn.addEventListener("click", () => toggleTopping(topping, btn));
      toppingGrid.appendChild(btn);
    });
  }

  function seededPositions(seedStr, count) {
    let seed = 0;
    for (let i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) % 100000;
    function rand() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    const positions = [];
    for (let i = 0; i < count; i++) {
      const angle = rand() * Math.PI * 2;
      const radius = 10 + rand() * 32;
      positions.push({ x: 50 + Math.cos(angle) * radius, y: 50 + Math.sin(angle) * radius });
    }
    return positions;
  }

  // Coloca íconos reales del ingrediente sobre la imagen de la pizza
  function addToppingVisual(topping) {
    const positions = seededPositions(topping.id, 5);
    return positions.map((pos, i) => {
      const dot = document.createElement("div");
      dot.className = "topping-dot";
      const size = 20 + (i % 3) * 4;
      dot.style.left = pos.x + "%";
      dot.style.top = pos.y + "%";
      dot.style.width = size + "px";
      dot.style.height = size + "px";
      dot.style.animationDelay = i * 45 + "ms";
      dot.innerHTML = `<img src="${topping.icon}" alt="">`;
      pizzaBase.appendChild(dot);
      return dot;
    });
  }
  function removeToppingVisual(dots) { dots.forEach((dot) => dot.remove()); }

  function toggleTopping(topping, btn) {
    if (selectedToppings.has(topping.id)) {
      removeToppingVisual(selectedToppings.get(topping.id).dots);
      selectedToppings.delete(topping.id);
      btn.classList.remove("is-active");
    } else {
      const dots = addToppingVisual(topping);
      selectedToppings.set(topping.id, { topping, dots });
      btn.classList.add("is-active");
    }
    updateReceipt();
  }

  // Recalcula y dibuja el recibo: tamaño + ingredientes + total, en tiempo real
  function updateReceipt() {
    const sizeChip = activeSizeChip();
    const sizeName = sizeChip.getAttribute("data-size");
    const basePrice = parseFloat(sizeChip.getAttribute("data-price")) || 0;

    receiptSizeEl.textContent = sizeName;
    receiptBasePriceEl.textContent = formatMoney(basePrice);

    receiptToppingsEl.innerHTML = "";
    let toppingsTotal = 0;

    if (selectedToppings.size === 0) {
      const li = document.createElement("li");
      li.className = "receipt-empty";
      li.textContent = "Aún no agregas ingredientes extra.";
      receiptToppingsEl.appendChild(li);
    } else {
      selectedToppings.forEach(({ topping }) => {
        toppingsTotal += topping.price;
        const li = document.createElement("li");
        li.innerHTML = `<span><img src="${topping.icon}" alt="">${topping.name}</span><span>+${formatMoney(topping.price)}</span>`;
        receiptToppingsEl.appendChild(li);
      });
    }

    receiptTotalEl.textContent = formatMoney(basePrice + toppingsTotal);
  }

  sizeOptions.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      sizeOptions.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      updateReceipt();
    });
  });

  renderToppingGrid();
  updateReceipt();

  btnBuilderOrder.addEventListener("click", () => {
    const sizeChip = activeSizeChip();
    const sizeName = sizeChip.getAttribute("data-size");
    const basePrice = parseFloat(sizeChip.getAttribute("data-price")) || 0;
    const toppingsList = Array.from(selectedToppings.values()).map((entry) => entry.topping);
    const toppingsTotal = toppingsList.reduce((sum, t) => sum + t.price, 0);
    const total = basePrice + toppingsTotal;

    let message = `¡Hola OMG Pizza! 🍕 Quiero armar mi propia pizza:\n\n`;
    message += `*Tamaño:* ${sizeName} (${formatMoney(basePrice)})\n`;
    if (toppingsList.length) {
      message += `*Ingredientes:*\n`;
      toppingsList.forEach((t) => { message += `- ${t.name} (+${formatMoney(t.price)})\n`; });
    } else {
      message += `*Ingredientes:* Sin ingredientes extra (solo queso y salsa)\n`;
    }
    message += `\n*Total estimado:* ${formatMoney(total)}\n\n¡Gracias!`;

    openWhatsApp(message);
  });

  /* ---------------------------------------------------------
     Hero flame particles
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

  /* =========================================================
     PANEL DE ADMINISTRACIÓN
     ========================================================= */
  const adminTrigger = document.getElementById("adminTrigger");
  const loginOverlay = document.getElementById("loginOverlay");
  const loginForm = document.getElementById("loginForm");
  const loginUser = document.getElementById("loginUser");
  const loginPass = document.getElementById("loginPass");
  const loginError = document.getElementById("loginError");
  const loginClose = document.getElementById("loginClose");

  const adminOverlay = document.getElementById("adminOverlay");
  const adminClose = document.getElementById("adminClose");
  const btnLogout = document.getElementById("btnLogout");
  const adminTabs = document.getElementById("adminTabs");
  const adminProductList = document.getElementById("adminProductList");
  const btnExport = document.getElementById("btnExport");
  const btnImportTrigger = document.getElementById("btnImportTrigger");
  const fileImport = document.getElementById("fileImport");
  const btnAddToggle = document.getElementById("btnAddToggle");
  const adminAddForm = document.getElementById("adminAddForm");
  const btnCancelAdd = document.getElementById("btnCancelAdd");

  let currentAdminCat = "pizzas";

  function isAdminAuthed() {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === "1";
  }

  function openModal(overlay) { overlay.hidden = false; }
  function closeModal(overlay) { overlay.hidden = true; }

  function openLogin() {
    loginError.hidden = true;
    loginForm.reset();
    openModal(loginOverlay);
    loginUser.focus();
  }
  function openAdmin() {
    closeModal(loginOverlay);
    openModal(adminOverlay);
    renderAdminList();
  }

  adminTrigger.addEventListener("click", () => {
    if (isAdminAuthed()) openAdmin();
    else openLogin();
  });

  // Atajo de teclado alterno: Ctrl/Cmd + Shift + A
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
      e.preventDefault();
      if (isAdminAuthed()) openAdmin(); else openLogin();
    }
    if (e.key === "Escape") {
      if (!adminOverlay.hidden) closeModal(adminOverlay);
      if (!loginOverlay.hidden) closeModal(loginOverlay);
    }
  });

  loginClose.addEventListener("click", () => closeModal(loginOverlay));
  loginOverlay.addEventListener("click", (e) => { if (e.target === loginOverlay) closeModal(loginOverlay); });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (loginUser.value === ADMIN_USER && loginPass.value === ADMIN_PASS) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
      openAdmin();
    } else {
      loginError.hidden = false;
    }
  });

  adminClose.addEventListener("click", () => closeModal(adminOverlay));
  adminOverlay.addEventListener("click", (e) => { if (e.target === adminOverlay) closeModal(adminOverlay); });

  btnLogout.addEventListener("click", () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    closeModal(adminOverlay);
    showToast("Sesión de administrador cerrada.");
  });

  adminTabs.querySelectorAll(".admin-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      adminTabs.querySelectorAll(".admin-tab").forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      currentAdminCat = tab.getAttribute("data-cat");
      adminAddForm.hidden = true;
      renderAdminList();
    });
  });

  function renderAdminList() {
    const items = catalog[currentAdminCat] || [];
    adminProductList.innerHTML = "";

    if (items.length === 0) {
      const empty = document.createElement("p");
      empty.className = "admin-empty";
      empty.textContent = "Todavía no hay productos en esta categoría. Agrega el primero abajo.";
      adminProductList.appendChild(empty);
      return;
    }

    items.forEach((item) => {
      const row = document.createElement("div");
      row.className = "admin-product-row";
      row.setAttribute("data-id", item.id);
      row.innerHTML = `
        <input type="text" class="admin-icon-input" data-field="icon" value="${escapeHTML(item.icon || "")}" maxlength="4" aria-label="Ícono">
        <input type="text" data-field="name" value="${escapeHTML(item.name)}" aria-label="Nombre">
        <input type="text" data-field="price" value="${escapeHTML(item.price || "")}" placeholder="Precio" aria-label="Precio">
        <textarea data-field="description" rows="1" aria-label="Descripción">${escapeHTML(item.description || "")}</textarea>
        <input type="text" data-field="badge" value="${escapeHTML(item.badge || "")}" placeholder="Etiqueta" aria-label="Etiqueta">
        <label class="toggle-switch" title="Mostrar / ocultar en el sitio">
          <input type="checkbox" data-field="visible" ${item.visible ? "checked" : ""}>
          <span class="track"></span>
        </label>
        <button type="button" class="admin-row-delete" data-action="delete" aria-label="Eliminar producto">🗑</button>
      `;
      adminProductList.appendChild(row);
    });
  }

  // Delegación de eventos: edición en vivo + guardado automático
  adminProductList.addEventListener("input", (e) => {
    const field = e.target.getAttribute("data-field");
    if (!field) return;
    const row = e.target.closest(".admin-product-row");
    const id = row.getAttribute("data-id");
    const item = (catalog[currentAdminCat] || []).find((p) => p.id === id);
    if (!item) return;
    if (field === "visible") item.visible = e.target.checked;
    else item[field] = e.target.value;
    saveCatalog();
    renderPublicMenu();
  });

  adminProductList.addEventListener("click", (e) => {
    if (e.target.closest("[data-action='delete']")) {
      const row = e.target.closest(".admin-product-row");
      const id = row.getAttribute("data-id");
      const item = (catalog[currentAdminCat] || []).find((p) => p.id === id);
      const confirmed = window.confirm(`¿Eliminar "${item ? item.name : "este producto"}"? Esta acción no se puede deshacer.`);
      if (!confirmed) return;
      catalog[currentAdminCat] = (catalog[currentAdminCat] || []).filter((p) => p.id !== id);
      saveCatalog();
      renderAdminList();
      renderPublicMenu();
      showToast("Producto eliminado.");
    }
  });

  // Agregar producto
  btnAddToggle.addEventListener("click", () => {
    adminAddForm.hidden = !adminAddForm.hidden;
    if (!adminAddForm.hidden) document.getElementById("addName").focus();
  });
  btnCancelAdd.addEventListener("click", () => {
    adminAddForm.reset();
    adminAddForm.hidden = true;
  });

  adminAddForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("addName").value.trim();
    if (!name) return;
    const newItem = {
      id: uid(),
      name,
      icon: document.getElementById("addIcon").value.trim() || CATEGORY_META[currentAdminCat].icon,
      price: document.getElementById("addPrice").value.trim(),
      badge: document.getElementById("addBadge").value.trim(),
      description: document.getElementById("addDesc").value.trim(),
      visible: document.getElementById("addVisible").checked
    };
    if (!catalog[currentAdminCat]) catalog[currentAdminCat] = [];
    catalog[currentAdminCat].push(newItem);
    saveCatalog();
    adminAddForm.reset();
    document.getElementById("addVisible").checked = true;
    adminAddForm.hidden = true;
    renderAdminList();
    renderPublicMenu();
    showToast(`"${name}" se agregó al catálogo.`);
  });

  // Exportar / importar catálogo (respaldo entre dispositivos)
  btnExport.addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(catalog, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "omg-pizza-catalogo.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  btnImportTrigger.addEventListener("click", () => fileImport.click());
  fileImport.addEventListener("change", () => {
    const file = fileImport.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        Object.keys(CATEGORY_META).forEach((key) => {
          if (!Array.isArray(parsed[key])) parsed[key] = [];
        });
        catalog = parsed;
        saveCatalog();
        renderAdminList();
        renderPublicMenu();
        showToast("Catálogo importado correctamente.");
      } catch (err) {
        showToast("El archivo no es un catálogo válido.");
      }
    };
    reader.readAsText(file);
    fileImport.value = "";
  });
})();
