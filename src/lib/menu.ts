/** Dinner menu, from the client's "Opening Dinner Menu" doc. */

export interface MenuItem {
  name: string;
  price?: string;
  desc?: string;
  /** Raw or undercooked; flagged with an asterisk and the advisory footnote. */
  raw?: boolean;
  /** Priced per protein, e.g. fajitas. */
  options?: { name: string; price: string }[];
  addOns?: { name: string; price: string }[];
}

export interface MenuSection {
  title: string;
  /** One price for every item in the section, e.g. sides. */
  price?: string;
  items: MenuItem[];
}

export const DINNER_MENU: MenuSection[] = [
  {
    title: "Botanas",
    items: [
      { name: "Salsa Trío", price: "14", desc: "Roja, verde, macha, corn tortilla chips" },
      { name: "Guacamole", price: "16", addOns: [{ name: "Add chicharrón", price: "4" }] },
      { name: "Queso", price: "15", addOns: [{ name: "Add chorizo", price: "2" }] },
      { name: "Brochetas con Mole", price: "9", desc: "Chef’s daily skewer, poblano, mole negro" },
      { name: "Esquites", price: "11", desc: "Oaxaca fondue, chili, lime caviar" },
      { name: "Carne Apache Michoacán", price: "32", desc: "Prime Filet, salsa macha, escabeche", raw: true },
    ],
  },
  {
    title: "Crudo",
    items: [
      { name: "Oysters on the Half Shell", price: "4 per", desc: "Granita, mignonette, pickles", raw: true },
      { name: "Cóctel de Camarones", price: "25", desc: "Cerveza-poached, reposado sauce", raw: true },
      { name: "Grilled Helú Oysters", price: "18", desc: "Spinach, chorizo, Oaxaca cheese" },
      { name: "Ceviche Clásico", price: "16", desc: "Camarones, avocado, tostadas", raw: true },
      { name: "Aguachile", price: "28", desc: "Cactus, hamachi, bluefin tuna", raw: true },
      { name: "Ceviche de Pulpo", price: "18", desc: "Dragon fruit, blood orange, masa piña", raw: true },
    ],
  },
  {
    title: "Tacos Clásicos",
    items: [
      { name: "Carnitas", price: "15", desc: "Pork shoulder, citrus, cinnamon" },
      { name: "Chicken Tinga", price: "15", desc: "Chipotle, guajillo, ancho chile" },
      { name: "Chicharrón", price: "17", desc: "Al pastor, pineapple, orange" },
    ],
  },
  {
    title: "Platos Fuertes",
    items: [
      { name: "Oxtail Birria Consomé", price: "36", desc: "Consomé, escabeche, salsa roja" },
      { name: "Carne Asada with Bone Marrow", price: "34", desc: "Prime New York Strip, bone marrow" },
      { name: "Chile Relleno", price: "31", desc: "Corn queso, cilantro lime rice, mole verde" },
      { name: "Pollo Asado", price: "39", desc: "Citrus, achiote, consomé" },
      {
        name: "Fajitas",
        desc: "Cast-iron vegetables, salsa molcajete",
        options: [
          { name: "Pollo", price: "26" },
          { name: "Camarón", price: "31" },
          { name: "Carne Asada", price: "32" },
        ],
      },
      { name: "Pulpo", price: "33", desc: "Court bouillon, tapenade, nopales" },
      { name: "Al Pastor Pork Belly", price: "36", desc: "Chicharrón, jus lié, charred pineapple" },
      { name: "Duck Mole", price: "44", desc: "Duck confit, dry-aged duck breast, mole negro" },
      {
        name: "Chateaubriand para Dos",
        price: "95",
        desc: "Center-butchered Prime Tenderloin, Texas corn ribs, papas",
      },
      { name: "Wagyu Tomahawk", price: "215", desc: "Black Opal Wagyu Ribeye, salsa verde, bone marrow" },
    ],
  },
  {
    title: "Postres",
    items: [
      { name: "Los Churros", price: "14" },
      { name: "Tres Leches", price: "9" },
      { name: "Flan de Coco", price: "9" },
      { name: "Flan de Fruta", price: "9" },
    ],
  },
  {
    title: "Acompañamientos",
    price: "5",
    items: [
      { name: "Refried Beans" },
      { name: "Abuela’s Chili" },
      { name: "Mexican Rice" },
      { name: "Cilantro Lime Rice" },
    ],
  },
];

export const RAW_ADVISORY =
  "Consuming raw or undercooked meats, poultry, seafood, shellfish, or eggs may increase your risk of foodborne illness.";
