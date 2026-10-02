/* OMG PIZZA — app.js — Lógica principal del sitio */
(function () {
  "use strict";

  const CONFIG          = window.OMG_CONFIG;
  const CATEGORY_META   = window.OMG_CATEGORY_META;
  const TOPPINGS        = window.OMG_TOPPINGS;
  const DEFAULT_CATALOG = window.OMG_DEFAULT_CATALOG;
  const CATALOG_KEY     = CONFIG.catalogKey;

  /* ---------- Catálogo ---------- */
  const clone = (o) => JSON.parse(JSON.stringify(o));
  function sanitize(parsed) {
    Object.keys(CATEGORY_META).forEach((k) => {
      const list = Array.isArray(parsed[k]) ? parsed[k] : [];
      parsed[k] = list.filter((p) => p && typeof p === "object" && typeof p.name === "string");
    });
    return parsed;
  }
  function loadCatalog() {
    try {
      const raw = localStorage.getItem(CATALOG_KEY);
      if (!raw) throw new Error("no catalog");
      return sanitize(JSON.parse(raw));
    } catch {
      const seed = clone(DEFAULT_CATALOG);
      localStorage.setItem(CATALOG_KEY, JSON.stringify(seed));
      return seed;
    }
  }
  const saveCatalog = () => localStorage.setItem(CATALOG_KEY, JSON.stringify(catalog));
  let catalog = loadCatalog();

  /* ---------- Helpers ---------- */
  const waLink = (msg) => `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  const openWhatsApp = (msg) => window.open(waLink(msg), "_blank", "noopener");

  function showToast(text) {
    const t = document.getElementById("toast");
    if (!t) return;
    t.textContent = text;
    t.classList.add("is-visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => t.classList.remove("is-visible"), 3200);
  }
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[c]));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  /* ---------- Header ---------- */
  const header = document.getElementById("siteHeader");
  const navLinks = document.getElementById("navLinks");
  const navToggle = document.getElementById("navToggle");

  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------- WhatsApp CTAs ---------- */
  document.getElementById("btnHeroOrder").addEventListener("click", () => openWhatsApp(CONFIG.messages.order));
  document.getElementById("btnHeroReserve").addEventListener("click", () => openWhatsApp(CONFIG.messages.reserve));
  document.getElementById("btnContactOrder").addEventListener("click", () => openWhatsApp(CONFIG.messages.order));
  document.getElementById("btnContactReserve").addEventListener("click", () => openWhatsApp(CONFIG.messages.reserve));

  ["waFloat", "socialWhatsapp", "footerWhatsapp"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = waLink(CONFIG.messages.order);
  });

  document.querySelectorAll('[data-social="facebook"]').forEach((a) => (a.href = CONFIG.social.facebook));
  document.querySelectorAll('[data-social="instagram"]').forEach((a) => (a.href = CONFIG.social.instagram));
  document.querySelectorAll('[data-social="tiktok"]').forEach((a) => (a.href = CONFIG.social.tiktok));

  /* ---------- Reveal timeline ---------- */
  function observeReveal(selector) {
    const targets = document.querySelectorAll(selector);
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    targets.forEach((el) => obs.observe(el));
  }
  observeReveal(".timeline-item");

  /* ---------- Menú público ---------- */
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
    const keys = Object.keys(CATEGORY_META);
    const active = activeFilter === "all" ? keys : [activeFilter];
    let total = 0;

    active.forEach((catKey) => {
      const items = (catalog[catKey] || []).filter((p) => p.visible);
      if (!items.length) return;

      if (activeFilter === "all") {
        const h = document.createElement("div");
        h.className = "menu-category-heading";
        h.textContent = `${CATEGORY_META[catKey].icon} ${CATEGORY_META[catKey].label}`;
        menuGrid.appendChild(h);
      }

      items.forEach((item) => {
        total++;
        const card = document.createElement("article");
        card.className = "menu-card is-visible";
        card.innerHTML = `
          <div class="menu-card-top">
            <span class="menu-icon">${esc(item.icon || CATEGORY_META[catKey].icon)}</span>
            ${item.badge ? `<span class="badge ${badgeClass(item.badge)}">${esc(item.badge)}</span>` : ""}
          </div>
          <h3>${esc(item.name)}</h3>
          <p>${esc(item.description || "")}</p>
          <div class="menu-card-foot">
            <span class="size-tag">${esc(item.price || "")}</span>
            <button class="btn btn--sm btn--gold" type="button" data-order-name="${esc(item.name)}">Pedir</button>
          </div>`;
        menuGrid.appendChild(card);
      });
    });

    if (!total) {
      const empty = document.createElement("p");
      empty.className = "menu-empty";
      empty.textContent = "Muy pronto agregaremos productos en esta categoría. ¡Vuelve pronto!";
      menuGrid.appendChild(empty);
    }

    menuGrid.querySelectorAll("[data-order-name]").forEach((btn) =>
      btn.addEventListener("click", () => {
        openWhatsApp(`¡Hola OMG Pizza! 🍕 Quiero pedir *${btn.getAttribute("data-order-name")}*.`);
      })
    );
  }

  menuFilter.querySelectorAll(".filter-chip").forEach((chip) =>
    chip.addEventListener("click", () => {
      menuFilter.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      activeFilter = chip.getAttribute("data-filter");
      renderPublicMenu();
    })
  );

  renderPublicMenu();

  /* ---------- Bienvenida multilingüe ---------- */
  try {
    const rotator = document.getElementById("welcomeRotator");
    if (rotator) {
      const lines = Array.from(rotator.querySelectorAll(".welcome-line"));
      const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (lines.length > 1 && !reduce) {
        let i = 0;
        setInterval(() => {
          lines[i].classList.remove("is-active");
          i = (i + 1) % lines.length;
          lines[i].classList.add("is-active");
        }, 3400);
      }
    }
  } catch (err) { console.error(err); }

  /* =========================================================
     BUILDER "Arma tu pizza"
     ========================================================= */
  function initPizzaBuilder() {
    const sizeOptions = document.getElementById("sizeOptions");
    const toppingGrid = document.getElementById("toppingGrid");
    const pizzaBase   = document.getElementById("pizzaBase");
    const rSize       = document.getElementById("receiptSize");
    const rBase       = document.getElementById("receiptBasePrice");
    const rTop        = document.getElementById("receiptToppings");
    const rTot        = document.getElementById("receiptTotal");
    const btnOrder    = document.getElementById("btnBuilderOrder");
    if (!sizeOptions || !toppingGrid || !pizzaBase || !btnOrder) return;

    const selected = new Map();
    const money = (n) => "$" + n.toFixed(2);
    const activeSize = () => sizeOptions.querySelector(".chip.is-active");

    function renderGrid() {
      toppingGrid.innerHTML = "";
      TOPPINGS.forEach((t) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "topping-chip";
        btn.setAttribute("data-id", t.id);
        btn.innerHTML = `
          <img src="${t.icon}" alt="" aria-hidden="true" onerror="this.style.visibility='hidden'">
          <span class="t-name">${t.name}</span>
          <span class="t-price">+${money(t.price)}</span>`;
        btn.addEventListener("click", () => toggle(t, btn));
        toppingGrid.appendChild(btn);
      });
    }

    // Posiciones dentro del círculo del queso (radio 8% – 38% desde el centro)
    function seededPositions(seedStr, count) {
      let seed = 0;
      for (let i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) % 100000;
      const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
      const out = [];
      for (let i = 0; i < count; i++) {
        const a = rand() * Math.PI * 2;
        const r = 8 + rand() * 30;
        out.push({ x: 50 + Math.cos(a) * r, y: 50 + Math.sin(a) * r });
      }
      return out;
    }

    function addVisual(t) {
      const count = 5;
      const base = (t.id === "queso" || t.id === "choclo") ? 22 : 26;
      return seededPositions(t.id, count).map((pos, i) => {
        const dot = document.createElement("div");
        dot.className = "topping-dot";
        const s = base + (i % 3) * 4;
        dot.style.left = pos.x + "%";
        dot.style.top  = pos.y + "%";
        dot.style.width  = s + "px";
        dot.style.height = s + "px";
        dot.style.setProperty("--rot", Math.round(Math.random() * 50 - 25) + "deg");
        dot.style.animationDelay = i * 70 + "ms";
        dot.innerHTML = `<img src="${t.icon}" alt="">`;
        pizzaBase.appendChild(dot);
        return dot;
      });
    }

    const removeVisual = (dots) => dots.forEach((d) => d.remove());

    function toggle(t, btn) {
      if (selected.has(t.id)) {
        removeVisual(selected.get(t.id).dots);
        selected.delete(t.id);
        btn.classList.remove("is-active");
      } else {
        selected.set(t.id, { topping: t, dots: addVisual(t) });
        btn.classList.add("is-active");
      }
      updateReceipt();
    }

    function updateReceipt() {
      const chip = activeSize();
      const sizeName = chip.getAttribute("data-size");
      const basePrice = parseFloat(chip.getAttribute("data-price")) || 0;
      rSize.textContent = sizeName;
      rBase.textContent = money(basePrice);

      rTop.innerHTML = "";
      let topTotal = 0;
      if (selected.size === 0) {
        const li = document.createElement("li");
        li.className = "receipt-empty";
        li.textContent = "Aún no agregas ingredientes extra.";
        rTop.appendChild(li);
      } else {
        selected.forEach(({ topping }) => {
          topTotal += topping.price;
          const li = document.createElement("li");
          li.innerHTML = `<span><img src="${topping.icon}" alt="">${topping.name}</span><span>+${money(topping.price)}</span>`;
          rTop.appendChild(li);
        });
      }
      rTot.textContent = money(basePrice + topTotal);
    }

    sizeOptions.querySelectorAll(".chip").forEach((chip) =>
      chip.addEventListener("click", () => {
        sizeOptions.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
        chip.classList.add("is-active");
        updateReceipt();
      })
    );

    renderGrid();
    updateReceipt();

    btnOrder.addEventListener("click", () => {
      const chip = activeSize();
      const sizeName = chip.getAttribute("data-size");
      const basePrice = parseFloat(chip.getAttribute("data-price")) || 0;
      const list = Array.from(selected.values()).map((e) => e.topping);
      const topTotal = list.reduce((s, t) => s + t.price, 0);
      const total = basePrice + topTotal;

      let msg = `¡Hola OMG Pizza! 🍕 Quiero armar mi propia pizza:\n\n`;
      msg += `*Tamaño:* ${sizeName} (${money(basePrice)})\n`;
      if (list.length) {
        msg += `*Ingredientes:*\n`;
        list.forEach((t) => { msg += `- ${t.name} (+${money(t.price)})\n`; });
      } else {
        msg += `*Ingredientes:* Sin ingredientes extra (solo queso y salsa)\n`;
      }
      msg += `\n*Total estimado:* ${money(total)}\n\n¡Gracias!`;
      openWhatsApp(msg);
    });
  }

  try { initPizzaBuilder(); } catch (err) { console.error(err); }

  /* ---------- Partículas del hero ---------- */
  try {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const heroVisual = document.querySelector(".hero-visual");
    if (heroVisual && !reduce) {
      const colors = ["#f5b613", "#f2670b", "#d8241d"];
      for (let i = 0; i < 10; i++) {
        const p = document.createElement("div");
        p.className = "flame-particle";
        const s = 4 + Math.random() * 7;
        p.style.width = s + "px";
        p.style.height = s + "px";
        p.style.left = 20 + Math.random() * 60 + "%";
        p.style.bottom = "10%";
        p.style.background = colors[i % colors.length];
        p.style.animationDuration = 3 + Math.random() * 3 + "s";
        p.style.animationDelay = Math.random() * 4 + "s";
        heroVisual.appendChild(p);
      }
    }
  } catch (err) { console.error(err); }

  /* ---------- Año footer ---------- */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* =========================================================
     PANEL ADMIN
     ========================================================= */
  function initAdminPanel() {
    const adminTrigger = document.getElementById("adminTrigger");
    const loginOverlay = document.getElementById("loginOverlay");
    const loginForm    = document.getElementById("loginForm");
    const loginUser    = document.getElementById("loginUser");
    const loginPass    = document.getElementById("loginPass");
    const loginError   = document.getElementById("loginError");
    const loginClose   = document.getElementById("loginClose");

    const adminOverlay = document.getElementById("adminOverlay");
    const adminClose   = document.getElementById("adminClose");
    const btnLogout    = document.getElementById("btnLogout");
    const adminTabs    = document.getElementById("adminTabs");
    const adminList    = document.getElementById("adminProductList");
    const btnExport    = document.getElementById("btnExport");
    const btnImportTrg = document.getElementById("btnImportTrigger");
    const fileImport   = document.getElementById("fileImport");
    const btnAddToggle = document.getElementById("btnAddToggle");
    const adminAddForm = document.getElementById("adminAddForm");
    const btnCancelAdd = document.getElementById("btnCancelAdd");
    const ADMIN        = CONFIG.admin;

    if (!adminTrigger || !loginOverlay || !adminOverlay) return;

    let currentCat = "pizzas";
    const isAuthed   = () => sessionStorage.getItem(ADMIN.sessionKey) === "1";
    const openModal  = (el) => (el.hidden = false);
    const closeModal = (el) => (el.hidden = true);

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

    adminTrigger.addEventListener("click", () => (isAuthed() ? openAdmin() : openLogin()));

    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        isAuthed() ? openAdmin() : openLogin();
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
      if (loginUser.value === ADMIN.user && loginPass.value === ADMIN.pass) {
        sessionStorage.setItem(ADMIN.sessionKey, "1");
        openAdmin();
      } else {
        loginError.hidden = false;
      }
    });

    adminClose.addEventListener("click", () => closeModal(adminOverlay));
    adminOverlay.addEventListener("click", (e) => { if (e.target === adminOverlay) closeModal(adminOverlay); });

    btnLogout.addEventListener("click", () => {
      sessionStorage.removeItem(ADMIN.sessionKey);
      closeModal(adminOverlay);
      showToast("Sesión de administrador cerrada.");
    });

    adminTabs.querySelectorAll(".admin-tab").forEach((tab) =>
      tab.addEventListener("click", () => {
        adminTabs.querySelectorAll(".admin-tab").forEach((t) => t.classList.remove("is-active"));
        tab.classList.add("is-active");
        currentCat = tab.getAttribute("data-cat");
        adminAddForm.hidden = true;
        renderAdminList();
      })
    );

    function renderAdminList() {
      const items = catalog[currentCat] || [];
      adminList.innerHTML = "";
      if (!items.length) {
        const empty = document.createElement("p");
        empty.className = "admin-empty";
        empty.textContent = "Todavía no hay productos en esta categoría. Agrega el primero abajo.";
        adminList.appendChild(empty);
        return;
      }
      items.forEach((item) => {
        const row = document.createElement("div");
        row.className = "admin-product-row";
        row.setAttribute("data-id", item.id);
        row.innerHTML = `
          <input type="text" class="admin-icon-input" data-field="icon" value="${esc(item.icon || "")}" maxlength="4" aria-label="Ícono">
          <input type="text" data-field="name" value="${esc(item.name)}" aria-label="Nombre">
          <input type="text" data-field="price" value="${esc(item.price || "")}" placeholder="Precio" aria-label="Precio">
          <textarea data-field="description" rows="1" aria-label="Descripción">${esc(item.description || "")}</textarea>
          <input type="text" data-field="badge" value="${esc(item.badge || "")}" placeholder="Etiqueta" aria-label="Etiqueta">
          <label class="toggle-switch" title="Mostrar / ocultar en el sitio">
            <input type="checkbox" data-field="visible" ${item.visible ? "checked" : ""}>
            <span class="track"></span>
          </label>
          <button type="button" class="admin-row-delete" data-action="delete" aria-label="Eliminar producto">🗑</button>`;
        adminList.appendChild(row);
      });
    }

    adminList.addEventListener("input", (e) => {
      const field = e.target.getAttribute("data-field");
      if (!field) return;
      const id = e.target.closest(".admin-product-row").getAttribute("data-id");
      const item = (catalog[currentCat] || []).find((p) => p.id === id);
      if (!item) return;
      if (field === "visible") item.visible = e.target.checked;
      else item[field] = e.target.value;
      saveCatalog();
      renderPublicMenu();
    });

    adminList.addEventListener("click", (e) => {
      if (!e.target.closest("[data-action='delete']")) return;
      const id = e.target.closest(".admin-product-row").getAttribute("data-id");
      const item = (catalog[currentCat] || []).find((p) => p.id === id);
      if (!window.confirm(`¿Eliminar "${item ? item.name : "este producto"}"? Esta acción no se puede deshacer.`)) return;
      catalog[currentCat] = (catalog[currentCat] || []).filter((p) => p.id !== id);
      saveCatalog();
      renderAdminList();
      renderPublicMenu();
      showToast("Producto eliminado.");
    });

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
        icon: document.getElementById("addIcon").value.trim() || CATEGORY_META[currentCat].icon,
        price: document.getElementById("addPrice").value.trim(),
        badge: document.getElementById("addBadge").value.trim(),
        description: document.getElementById("addDesc").value.trim(),
        visible: document.getElementById("addVisible").checked
      };
      if (!catalog[currentCat]) catalog[currentCat] = [];
      catalog[currentCat].push(newItem);
      saveCatalog();
      adminAddForm.reset();
      document.getElementById("addVisible").checked = true;
      adminAddForm.hidden = true;
      renderAdminList();
      renderPublicMenu();
      showToast(`"${name}" se agregó al catálogo.`);
    });

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

    btnImportTrg.addEventListener("click", () => fileImport.click());
    fileImport.addEventListener("change", () => {
      const file = fileImport.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          catalog = sanitize(JSON.parse(reader.result));
          saveCatalog();
          renderAdminList();
          renderPublicMenu();
          showToast("Catálogo importado correctamente.");
        } catch {
          showToast("El archivo no es un catálogo válido.");
        }
      };
      reader.readAsText(file);
      fileImport.value = "";
    });
  }

  try { initAdminPanel(); } catch (err) { console.error(err); }
})();