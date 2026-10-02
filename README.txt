CARPETA DE IMÁGENES — OMG PIZZA
================================

assets/
├── images/
│   ├── logo.png              → Logotipo de OMG Pizza (usado en el header,
│   │                            el hero, el footer y como ícono de pestaña).
│   │
│   └── toppings/              → Iconos de los ingredientes que se usan en
│       ├── pepperoni.svg         "Arma tu pizza" (se colocan sobre la pizza
│       ├── queso.svg              a medida que el cliente los selecciona).
│       ├── champinon.svg
│       ├── pina.svg
│       ├── jalapeno.svg
│       ├── tocino.svg
│       ├── cebolla.svg
│       ├── aceituna.svg
│       ├── pimiento.svg
│       ├── salchicha.svg
│       ├── chile-hojuelas.svg
│       └── choclo.svg

CÓMO AGREGAR NUEVAS IMÁGENES
-----------------------------
- Fotos de pizzas, banners u otras figuras del sitio: colócalas dentro de
  assets/images/ y referencia la ruta como "assets/images/nombre-archivo.jpg"
  en index.html.
- Si agregas un nuevo ingrediente en el panel de administración y quieres que
  tenga su propio ícono en el armador de pizza, coloca el archivo SVG o PNG
  en assets/images/toppings/ y actualiza la lista TOPPINGS en script.js con
  la ruta correspondiente (busca el comentario "CONFIGURACIÓN DE INGREDIENTES").
- Mantén los nombres de archivo en minúsculas, sin espacios ni acentos, para
  evitar problemas de compatibilidad entre sistemas operativos.
