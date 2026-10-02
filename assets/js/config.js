/* =========================================================
   OMG PIZZA — config.js
   Configuración global del sitio. Edita aquí tus datos.
   ========================================================= */
window.OMG_CONFIG = {
  /* ⚠️ WHATSAPP — código de país + número, SIN "+", SIN espacios */
  whatsappNumber: "50300000000", // TODO: reemplazar con el número real

  /* Redes sociales — reemplaza con las cuentas reales */
  social: {
    facebook:  "https://facebook.com/omgpizza",
    instagram: "https://instagram.com/omgpizza",
    tiktok:    "https://tiktok.com/@omgpizza"
  },

  /* ⚠️ CREDENCIALES DE ADMINISTRADOR
     ---------------------------------------------------------
     Este es un sitio 100% estático, así que esta "contraseña"
     es una protección básica — NO es seguridad real. Cualquiera
     con acceso al código fuente puede verla. Para seguridad de
     verdad, hay que mover esto a un backend con autenticación.
     --------------------------------------------------------- */
  admin: {
    user: "OMG$2026",
    pass: "L@m3j0rP1zz@.2026",
    sessionKey: "omgAdminSession"
  },

  /* Clave de almacenamiento del catálogo en localStorage */
  catalogKey: "omgPizzaCatalog_v2",

  /* Mensajes predefinidos de WhatsApp */
  messages: {
    order:   "¡Hola OMG Pizza! 🍕 Quiero hacer un pedido.",
    reserve: "¡Hola OMG Pizza! 📅 Quiero reservar una mesa."
  }
};