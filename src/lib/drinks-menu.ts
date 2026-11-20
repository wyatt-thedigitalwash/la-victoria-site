import type { MenuGroup } from "@/lib/menu";

/** Bar menu, from the client's printed menus (photos received 2026-11-19). */
export const DRINKS_MENU: MenuGroup[] = [
  {
    id: "cocteles",
    title: "Cócteles",
    intro:
      "Our cocktails begin with Mexico. Its spirits, flavors, colors, traditions, and move forward with curiosity. Some are familiar, others unexpected, but each is unmistakably La Victoria. Salud.",
    sections: [
      {
        title: "Margaritas",
        items: [
          { name: "La Margarita", price: "15", desc: "Mi Campo Blanco, orange, lime" },
          { name: "Margarita Laurita", price: "16", desc: "Passionfruit, violette" },
          { name: "Margarita Esmeralda", price: "18", desc: "Tomatillo, bell pepper" },
          { name: "Margarita Brava", price: "17", desc: "Pineapple, jalapeño" },
        ],
      },
      {
        title: "De la Casa",
        items: [
          { name: "Paloma Victoria", price: "14", desc: "400 Conejos Mezcal, grapefruit, lime" },
          { name: "Cantarito Clásico", price: "15", desc: "Olmeca Altos Reposado, citrus" },
          { name: "Rosa Chilanga", price: "17", desc: "Condesa Gin, Campari, grapefruit" },
          { name: "Don Pedro", price: "19", desc: "Olmeca Altos Añejo, chocolate, mole, ancho" },
          { name: "Sobremesa", price: "20", desc: "Casa Noble Reposado, espresso, baking spices" },
          { name: "Café Boulevardier", price: "16", desc: "Old Forester Bourbon, Campari, café" },
          { name: "Martini de Cacao", price: "18", desc: "Planteray Dark Rum, chocolate, ancho" },
        ],
      },
      {
        title: "Sangrías",
        items: [
          { name: "Sangría Blanca", price: "14", desc: "White wine, peach, passionfruit, allspice" },
          { name: "Sangría Roja", price: "14", desc: "Red wine, blackberry, raspberry, currant" },
        ],
      },
      {
        title: "Mócteles",
        items: [
          { name: "Fresa Fresca", price: "8", desc: "Strawberry, cucumber, lime, aloe" },
          { name: "La Sandía Sour", price: "9", desc: "Watermelon, dragon fruit, lemon, basil" },
          { name: "Jalapiña Margarita", price: "10", desc: "Pineapple, jalapeño, lime" },
          { name: "Paloma Roja", price: "8", desc: "Grapefruit, lime, blood orange" },
        ],
      },
    ],
  },
  {
    id: "vino",
    title: "Vino",
    intro:
      "A wine list rooted in Spain and Latin America, complemented by familiar selections from celebrated regions beyond. Each bottle is chosen with our food, and your table, in mind.",
    sections: [
      {
        title: "Espumoso",
        note: "Glass / Bottle",
        items: [
          { name: "Cava", price: "12 / 48", desc: "Segura Viudas, Spain" },
          { name: "Champagne", price: "26 / 104", desc: "Deveaux, France" },
          { name: "Brut Rosé", price: "19 / 76", desc: "Juvé & Camps, Spain" },
        ],
      },
      {
        title: "Blanco",
        note: "Glass / Bottle",
        items: [
          { name: "Sauvignon Blanc", price: "14 / 56", desc: "Haras de Pirque, Chile" },
          { name: "Verdejo", price: "12 / 48", desc: "Marqués de Riscal, Spain" },
          { name: "Albariño", price: "13 / 52", desc: "Abadía de San Campio, Portugal" },
          { name: "Chardonnay", price: "17 / 68", desc: "Our Lady of Guadalupe, Santa Barbara" },
          { name: "Rosé", price: "13 / 52", desc: "Whispering Angel, France" },
        ],
      },
      {
        title: "Tinto",
        note: "Glass / Bottle",
        items: [
          { name: "Rioja", price: "12 / 48", desc: "Orlegi, Spain" },
          { name: "Pinot Noir", price: "11 / 44", desc: "Hahn, Monterey" },
          { name: "Malbec", price: "13 / 52", desc: "Padrillos, Argentina" },
          { name: "Tempranillo", price: "16 / 64", desc: "La Capilla, Ribera del Duero" },
          { name: "Cabernet Sauvignon", price: "14 / 56", desc: "Hussonet, Chile" },
        ],
      },
      {
        title: "Botellas",
        items: [
          { name: "Champagne", price: "158", desc: "Veuve Clicquot Yellow Label, France" },
          { name: "Blanc de Blancs", price: "188", desc: "Ruinart, France" },
          { name: "Sancerre", price: "108", desc: "Pascal Jolivet, Loire Valley" },
          { name: "Chablis", price: "91", desc: "Domaine Vocoret, Burgundy" },
          { name: "Chardonnay", price: "157", desc: "Far Niente, Napa Valley" },
          { name: "Chardonnay", price: "68", desc: "Stags’ Leap Vineyards, Napa Valley" },
          { name: "Pinot Noir", price: "77", desc: "Belle Glos, Santa Barbara" },
          { name: "Pinot Noir", price: "135", desc: "Goldeneye by Duckhorn, Anderson Valley" },
          { name: "Red Blend", price: "95", desc: "The Prisoner, California" },
          { name: "Gran Reserva", price: "135", desc: "Marqués de Murrieta, Rioja" },
          { name: "Cabernet Sauvignon", price: "175", desc: "Caymus, Napa Valley" },
          { name: "Cabernet Sauvignon", price: "150", desc: "Hess, Napa Valley" },
        ],
      },
    ],
  },
  {
    id: "cerveza",
    title: "Cerveza",
    sections: [
      {
        title: "Barril",
        items: [
          { name: "Modelo Especial", price: "6", desc: "Mexican lager" },
          { name: "Pacifico Clara", price: "6", desc: "Mexican lager" },
          { name: "Dos Equis Ambar", price: "7", desc: "Vienna-style Mexican lager" },
          { name: "Modelo Negra", price: "7.5", desc: "Munich Dunkel Mexican dark lager" },
          { name: "Miller Lite", price: "6", desc: "American pilsner" },
          { name: "Stella Artois", price: "7", desc: "Belgian-style pilsner" },
          { name: "Mango Cart", price: "6.5", desc: "Fruited wheat ale" },
          { name: "Jai Alai", price: "8", desc: "American-style India pale ale" },
        ],
      },
      {
        title: "Botella",
        items: [
          { name: "Victoria", price: "6", desc: "Vienna-style Mexican amber lager" },
          { name: "Corona Extra", price: "6", desc: "Mexican lager" },
          { name: "Miller Lite", price: "5", desc: "American pilsner" },
          { name: "Bud Light", price: "5", desc: "American lager" },
          { name: "Peroni", price: "6", desc: "Italian pale lager" },
          { name: "Corona Non-Alcoholic", price: "5", desc: "Mexican lager" },
        ],
      },
      {
        title: "Lata",
        items: [
          { name: "Tecate", price: "5", desc: "Mexican lager" },
          { name: "Surfside", price: "6", desc: "Iced tea, lemonade" },
        ],
      },
    ],
  },
  {
    id: "refrescos",
    title: "Refrescos",
    sections: [
      {
        items: [
          { name: "Jarritos Mandarin", price: "4" },
          { name: "Jarritos Lime", price: "4" },
          { name: "Jarritos Tamarind", price: "4" },
          { name: "Mexican Coke", price: "4" },
          { name: "Rojo Toro", price: "4" },
        ],
      },
    ],
  },
  {
    id: "cafe-bar",
    title: "Café",
    sections: [
      {
        items: [
          { name: "Espresso", price: "4" },
          { name: "Cappuccino", price: "6" },
          { name: "Latte", price: "6" },
          { name: "Americano", price: "5" },
          { name: "Drip Coffee", price: "4" },
        ],
      },
    ],
  },
];
