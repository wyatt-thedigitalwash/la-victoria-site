export interface WallPhoto {
  /** File name in public/assets/photos. */
  file: string;
  alt: string;
  /** Top-left grid cell, counted from 0. */
  x: number;
  y: number;
  /** Size in grid cells. */
  w: number;
  h: number;
}

export const WALL_ROWS = 14;
export const WALL_COLUMNS = 65;

/**
 * One continuous mosaic. Photos in a column touch, with no holes or overlaps,
 * but each column starts and ends at a different row so the wall's top and
 * bottom edges step up and down. Keep each tile close to the photo's own shape,
 * and vary where neighboring columns split so no straight line forms across
 * the wall. To add a photo, put it in public/assets/photos, re-tile a column to
 * make room, and raise WALL_COLUMNS if the wall gets longer.
 */
export const WALL_PHOTOS: WallPhoto[] = [
  { file: "space-backlit-sign.jpg", alt: "Backlit La Victoria sign set into a patterned breeze-block wall", x: 0, y: 2, w: 10, h: 7 },
  { file: "crudo-oysters.jpg", alt: "Oysters on the half shell over crushed ice with lemon and salsas", x: 0, y: 9, w: 4, h: 5 },
  { file: "kitchen-sugared-pastry.jpg", alt: "Sugar-dusted churros on a wooden board with three dipping sauces", x: 4, y: 9, w: 6, h: 5 },
  { file: "space-curtained-table.jpg", alt: "Table set for dinner beside terracotta curtains and a glowing tin lantern", x: 10, y: 0, w: 6, h: 8 },
  { file: "kitchen-stew-tortillas.jpg", alt: "Bowl of rich stew with blue corn tortillas, lemon and salsas on a wooden board", x: 10, y: 8, w: 6, h: 5 },
  { file: "cantina-stone-table-2.jpg", alt: "Group of cocktails with citrus garnishes on a stone table", x: 16, y: 1, w: 5, h: 5 },
  { file: "cantina-highball.jpg", alt: "Tall golden cocktail garnished with fresh mint", x: 16, y: 6, w: 5, h: 8 },
  { file: "space-dining-bar-view.jpg", alt: "Dining table and curved chairs with the bar glowing in the background", x: 21, y: 0, w: 8, h: 12 },
  { file: "kitchen-plate-wide.jpg", alt: "Composed plate with crisp fritters and a swipe of golden sauce on a dark table", x: 29, y: 2, w: 9, h: 6 },
  { file: "cantina-stone-table.jpg", alt: "Four colorful cocktails on a stone table in the dining room", x: 29, y: 8, w: 4, h: 6 },
  { file: "space-gallery-booth.jpg", alt: "Dining booth beneath a warm wall of framed photographs", x: 33, y: 8, w: 5, h: 6 },
  { file: "cantina-trio.jpg", alt: "Three cocktails on a dark table with the dining room softly blurred behind", x: 38, y: 0, w: 6, h: 4 },
  { file: "space-banquette.jpg", alt: "Long banquette set for dinner beside a tiled archway", x: 38, y: 4, w: 6, h: 9 },
  { file: "space-mural-sign.jpg", alt: "Framed La Victoria sign on a painted mural, seen through a curved chair back", x: 44, y: 2, w: 8, h: 7 },
  { file: "cantina-five-drinks.jpg", alt: "Five cocktails lined up on a stone table with booths behind them", x: 44, y: 9, w: 4, h: 5 },
  { file: "space-bar-stools.jpg", alt: "Row of bar stools upholstered in a bold patterned fabric", x: 48, y: 9, w: 4, h: 5 },
  { file: "space-storefront.jpg", alt: "La Victoria storefront with its sign and glass doors on the street", x: 52, y: 0, w: 5, h: 8 },
  { file: "kitchen-salsas.jpg", alt: "Trio of salsas on a long dish beside guacamole in a stone molcajete", x: 52, y: 8, w: 5, h: 4 },
  { file: "kitchen-plate.jpg", alt: "Close view of a composed plate with crisp fritters and pickled onion", x: 57, y: 1, w: 8, h: 12 },
];
