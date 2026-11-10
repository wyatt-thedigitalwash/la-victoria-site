/** Dinner menu, from the client's printed menu (photo received 2026-11-05). */

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
  /** Anchor for the /menus course links, and the key for its icon and photo. */
  id: string;
  title: string;
  /** One price for every item in the section, e.g. sides. */
  price?: string;
  items: MenuItem[];
}

export const DINNER_MENU: MenuSection[] = [
  {
    id: "botanas",
    title: "Botanas",
    items: [
      { name: "Salsa Trío", price: "11", desc: "Roja, verde, macha, corn tortilla chips" },
      { name: "Guacamole", price: "13", addOns: [{ name: "Add chicharrón", price: "4" }] },
      { name: "Queso", price: "10", addOns: [{ name: "Add chorizo", price: "2" }] },
      { name: "Brochetas con Mole", price: "8", desc: "Chef’s daily skewer, poblano, mole negro" },
      { name: "Esquites", price: "12", desc: "Oaxaca fondue, chili, lime caviar" },
      { name: "Carne Carpaccio", price: "24", desc: "Prime filet, salsa macha, escabeche", raw: true },
    ],
  },
  {
    id: "crudo",
    title: "Crudo",
    items: [
      { name: "Oysters on the Half Shell", price: "4 per", desc: "Granita, mignonette, pickles", raw: true },
      { name: "Cóctel de Camarones", price: "21", desc: "Cerveza-poached, reposado sauce", raw: true },
      { name: "Grilled Helú Oysters", price: "18", desc: "Spinach, chorizo, Oaxaca cheese" },
      { name: "Ceviche Clásico", price: "16", desc: "Camarones, avocado, tostadas", raw: true },
      { name: "Aguachile", price: "24", desc: "Cactus, hamachi, bluefin tuna", raw: true },
      { name: "Ceviche de Pulpo", price: "18", desc: "Dragon fruit, blood orange, masa piña", raw: true },
    ],
  },
  {
    id: "tacos",
    title: "Tacos Clásicos",
    items: [
      { name: "Carnitas", price: "15", desc: "Pork shoulder, citrus, cinnamon" },
      { name: "Chicken Tinga", price: "15", desc: "Chipotle, guajillo, ancho chile" },
      { name: "Al Pastor", price: "15", desc: "Pork belly, pineapple, orange" },
    ],
  },
  {
    id: "platos-fuertes",
    title: "Platos Fuertes",
    items: [
      { name: "Oxtail Birria Consomé", price: "36", desc: "Consomé, blue corn tortillas" },
      { name: "Carne Asada & Bone Marrow Tacos", price: "34", desc: "Prime New York Strip, bone marrow" },
      { name: "Chile Relleno", price: "31", desc: "Corn queso, cilantro lime rice, mole verde" },
      { name: "Pollo Asado", price: "29", desc: "Achiote, consomé, Mexican rice" },
      {
        name: "Quesadillas",
        desc: "Queso Oaxaca, salsa roja, guacamole",
        options: [
          { name: "Chicken Tinga", price: "21" },
          { name: "Camarón", price: "23" },
          { name: "Carne Asada", price: "25" },
        ],
      },
      {
        name: "El Burrito",
        desc: "Mexican rice, refried beans, queso",
        options: [
          { name: "Chicken Tinga", price: "23" },
          { name: "Carnitas", price: "25" },
          { name: "Carne Asada", price: "27" },
        ],
      },
      {
        name: "Fajitas",
        desc: "Fajita vegetables, queso fresca",
        options: [
          { name: "Chicken", price: "26" },
          { name: "Camarón", price: "31" },
          { name: "Carne Asada", price: "32" },
        ],
      },
      { name: "Pork Belly", price: "36", desc: "Chicharrón, jus lié, charred pineapple" },
      { name: "Duck Mole", price: "44", desc: "Duck confit, dry-aged duck breast, mole negro" },
      { name: "Filet Mignon", price: "49", desc: "8 oz Prime filet mignon, Mexican rice, refried beans" },
    ],
  },
  {
    id: "complementos",
    title: "Complementos",
    price: "5",
    items: [
      { name: "Refried Beans" },
      { name: "Abuela’s Chili" },
      { name: "Mexican Rice" },
      { name: "Cilantro Lime Rice" },
    ],
  },
  {
    id: "postres",
    title: "Postres",
    items: [
      { name: "Los Churros", price: "10" },
      { name: "Tres Leches", price: "8" },
      { name: "Flan de Coco", price: "7" },
      { name: "Flan de Fruta", price: "7" },
    ],
  },
];

export const RAW_ADVISORY =
  "These items are served raw or undercooked or may contain raw or undercooked ingredients. Consuming raw or undercooked meats, poultry, seafood, shellfish or eggs may increase your risk of foodborne illness, especially if you have certain medical conditions.";

/** Featured on the home page, one from each course. Must match names above. */
export const MENU_HIGHLIGHTS = [
  "Esquites",
  "Aguachile",
  "Al Pastor",
  "Oxtail Birria Consomé",
  "Duck Mole",
];
