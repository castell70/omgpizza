/* OMG PIZZA — data.js — Catálogo, categorías e ingredientes */
window.OMG_CATEGORY_META = {
  pizzas:   { label: "Especialidades", icon: "🍕" },
  bebidas:  { label: "Bebidas",        icon: "🥤" },
  botanas:  { label: "Side Orders",    icon: "🍟" },
  entradas: { label: "Entradas",       icon: "🥗" },
  postres:  { label: "Postres",        icon: "🍰" }
};

window.OMG_TOPPINGS = [
  { id:"pepperoni", name:"Pepperoni",        price:0.75, icon:"assets/images/toppings/pepperoni.svg" },
  { id:"queso",     name:"Extra queso",      price:1.00, icon:"assets/images/toppings/queso.svg" },
  { id:"champinon", name:"Champiñones",      price:0.75, icon:"assets/images/toppings/champinon.svg" },
  { id:"tomate",    name:"Tomate",           price:0.50, icon:"assets/images/toppings/tomate.svg" },
  { id:"jalapeno",  name:"Jalapeño",         price:0.50, icon:"assets/images/toppings/jalapeno.svg" },
  { id:"tocino",    name:"Tocino",           price:1.00, icon:"assets/images/toppings/tocino.svg" },
  { id:"cebolla",   name:"Cebolla morada",   price:0.50, icon:"assets/images/toppings/cebolla.svg" },
  { id:"aceituna",  name:"Aceitunas",        price:0.50, icon:"assets/images/toppings/aceituna.svg" },
  { id:"pimiento",  name:"Pimientos",        price:0.50, icon:"assets/images/toppings/pimiento.svg" },
  { id:"salchicha", name:"Salchicha",        price:1.00, icon:"assets/images/toppings/salchicha.svg" },
  { id:"chile",     name:"Chile en hojuelas", price:0.25, icon:"assets/images/toppings/chile-hojuelas.svg" },
  { id:"choclo",    name:"Choclo",           price:0.50, icon:"assets/images/toppings/choclo.svg" }
];

window.OMG_DEFAULT_CATALOG = {
  pizzas: [
    { id:"p1",  name:"BBQ Chicken",          description:"Salsa BBQ, cebolla morada, cilantro y trozos de pechuga a la BBQ.", price:"$12.00", badge:"", icon:"🍗", visible:true },
    { id:"p2",  name:"Veggie Blast",         description:"Cebolla morada, hongos, chile verde, aceitunas negras, tomate fresco, ajo y espinaca.", price:"$14.00", badge:"Vegetariana", icon:"🥬", visible:true },
    { id:"p3",  name:"Mamma Mia Marguerita", description:"Albahaca, ajo, aceite de oliva y tomate fresco.", price:"$10.00", badge:"Clásica", icon:"🍅", visible:true },
    { id:"p4",  name:"No Manches",           description:"Chorizo, tomate, jalapeños, cebolla morada y cilantro.", price:"$13.00", badge:"Picante", icon:"🌮", visible:true },
    { id:"p5",  name:"La Queen",             description:"Pepperoni, chorizo gaucho, hongos, cebolla morada, chile verde y aceitunas.", price:"$15.00", badge:"Favorita", icon:"👑", visible:true },
    { id:"p6",  name:"Surf & Smoke",         description:"Salsa Alfredo, camarón y tocino ahumado.", price:"$15.00", badge:"", icon:"🦐", visible:true },
    { id:"p7",  name:"Aloha OMG",            description:"Tocino ahumado, jamón virginia y piña.", price:"$10.00", badge:"", icon:"🍍", visible:true },
    { id:"p8",  name:"Meat Attack",          description:"Pepperoni, jamón virginia, tocino ahumado, chorizo y carne especial.", price:"$15.00", badge:"Más pedida", icon:"🥩", visible:true },
    { id:"p9",  name:"Loroco Mañía",         description:"Salsa Alfredo y loroco.", price:"$11.00", badge:"Nuevo", icon:"🌿", visible:true },
    { id:"p10", name:"Amore Italiano",       description:"Pepperoni, chorizo italiano, hongos y hierbas italianas.", price:"$13.00", badge:"", icon:"🇮🇹", visible:true },
    { id:"p11", name:"American Pie",         description:"Jamón virginia, trozos de pechuga de pollo, tocino ahumado y hongos.", price:"$13.00", badge:"", icon:"🥓", visible:true },
    { id:"p12", name:"Pepperoni Madness",    description:"Pepperoni, pepperoni y más pepperoni.", price:"$13.00", badge:"Picante", icon:"🍕", visible:true },
    { id:"p13", name:"La Gaucha",            description:"Chimichurri y chorizo gaucho, con cebolla morada.", price:"$10.00", badge:"", icon:"🇦🇷", visible:true },
    { id:"p14", name:"Quattro Cheese",       description:"Mozzarella, asiago, parmasano y queso crema.", price:"$11.00", badge:"Clásica", icon:"🧀", visible:true }
  ],
  bebidas: [
    { id:"b1", name:"Agua",            description:"Botella de agua purificada.", price:"$1.00", badge:"", icon:"💧", visible:true },
    { id:"b2", name:"Soda (Lata)",     description:"Refresco en lata, bien frío.", price:"$1.25", badge:"", icon:"🥤", visible:true },
    { id:"b3", name:"Café",            description:"Café caliente recién preparado.", price:"$1.00", badge:"", icon:"☕", visible:true },
    { id:"b4", name:"Frozen",          description:"Bebida frozen, ideal para refrescarte.", price:"$2.25", badge:"", icon:"🧊", visible:true },
    { id:"b5", name:"Soda 1.5 Litros", description:"Refresco de 1.5 litros para compartir.", price:"$2.50", badge:"", icon:"🥤", visible:true }
  ],
  botanas: [
    { id:"s1", name:"Chicken Wings (Alitas de Pollo)", description:"Barbacoa o Buffalo. 5 Alitas $5.00 / 10 Alitas $10.00.", price:"Desde $5.00", badge:"Favorita", icon:"🍗", visible:true },
    { id:"s2", name:"Pan de Ajo Tradicional",          description:"Con ajo o ranch. Pequeño $3.50 / Grande $6.00.", price:"Desde $3.50", badge:"", icon:"🥖", visible:true },
    { id:"s3", name:"Mozzarella Sticks",               description:"5 sticks de mozzarella empanizados.", price:"$4.50", badge:"", icon:"🧀", visible:true },
    { id:"s4", name:"Pan con Ajo",                     description:"Con romero y parmesano. 4 porciones.", price:"$4.00", badge:"", icon:"🥖", visible:true },
    { id:"s5", name:"Potatoes Wedges",                 description:"Gajos de papa sazonados y crujientes.", price:"$2.50", badge:"", icon:"🍟", visible:true }
  ],
  entradas: [],
  postres: []
};