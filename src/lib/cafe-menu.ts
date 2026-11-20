import type { MenuGroup } from "@/lib/menu";

/** La Victoria Café menu, from the client's printed menus (photos received 2026-11-19). */
export const CAFE_MENU: MenuGroup[] = [
  {
    id: "de-la-cocina",
    title: "De la Cocina",
    sections: [
      {
        items: [
          {
            name: "Breakfast Burrito",
            price: "9",
            desc: "Flour tortilla, scrambled eggs, chorizo, diced papas, chipotle lime crema",
          },
          {
            name: "Burrito Bowl",
            price: "9",
            choice: "Your choice of carnitas, chicken tinga, or chorizo",
            desc: "Mexican rice, avocado, refried beans, esquites, queso chihuahua",
          },
          {
            name: "Cubana Mexicana",
            price: "12",
            desc: "Cuban toast, chorizo, carnitas, sliced ham, Swiss, dijonnaise",
          },
          {
            name: "Chilaquiles",
            price: "11",
            choice: "Your choice of carnitas, chicken tinga, or chorizo",
            desc: "Corn tortilla chips, salsa, sunny side up eggs",
          },
          { name: "Breakfast Tacos", price: "8", desc: "Scrambled eggs, chorizo, chipotle lime crema" },
          {
            name: "Tacos Clásicos",
            price: "8",
            choice: "Your choice of carnitas or chicken tinga",
            desc: "Corn tortillas, pico de gallo",
          },
          {
            name: "Quesadillas",
            price: "9",
            choice: "Your choice of carnitas, chicken tinga, or chorizo",
            desc: "Queso chihuahua, sour cream, pickled onions",
          },
          {
            name: "The Don Caesar",
            price: "9",
            desc: "Romaine lettuce, Cuban crouton, Caesar dressing",
            addOns: [{ name: "Add grilled chicken", price: "4" }],
          },
        ],
      },
    ],
  },
  {
    id: "cafe-coffee",
    title: "Café",
    sections: [
      {
        title: "Café Clásico",
        items: [
          { name: "Espresso", price: "4" },
          { name: "Macchiato", price: "5" },
          { name: "Cortado", price: "5" },
          { name: "Flat White", price: "5" },
          { name: "Cappuccino", price: "6" },
          { name: "Latte", price: "6" },
          { name: "Americano", price: "5" },
          { name: "Drip Coffee", price: "4" },
          { name: "Cold Brew", price: "5" },
          { name: "Add House Vanilla Bean Syrup", price: "1.5" },
        ],
      },
      {
        title: "Café de Especialidad",
        items: [
          { name: "Cortado de Olla", price: "6" },
          { name: "Sweet Corn Matcha Latte", price: "7" },
          { name: "Espresso Chilango", price: "6" },
          { name: "Mole Mocha Latte", price: "7" },
        ],
      },
    ],
  },
  {
    id: "tes",
    title: "Tés by TeBella",
    sections: [
      {
        title: "Cafeína",
        items: [
          { name: "Andes Mountain Mist", price: "6" },
          { name: "Maté Brio", price: "6" },
          { name: "Matcha Latte", price: "6" },
          { name: "Chocolate Pu-erh Fog", price: "6" },
        ],
      },
      {
        title: "Sin Cafeína",
        items: [
          { name: "Spearmint", price: "5" },
          { name: "Banana Chamomile", price: "5" },
        ],
      },
    ],
  },
  {
    id: "panaderia",
    title: "Panadería",
    sections: [
      {
        items: [
          { name: "Flan", price: "5" },
          { name: "Lemon Loaf", price: "5" },
        ],
      },
    ],
  },
  {
    id: "refrescos-cafe",
    title: "Refrescos",
    sections: [
      {
        items: [
          { name: "Jarritos", price: "4" },
          { name: "Mexican Coke", price: "4" },
          { name: "Rojo Toro", price: "4" },
          { name: "Agua", price: "4" },
        ],
      },
    ],
  },
];
