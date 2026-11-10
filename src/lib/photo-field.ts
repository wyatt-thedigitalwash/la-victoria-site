import { WALL_PHOTOS } from "@/lib/photo-wall";

/** Left, top, width, height, in layout units. Values past the edges bleed off screen. */
export type Spot = [x: number, y: number, w: number, h: number];

export type Layout = "desktop" | "mobile";

interface FieldPhoto {
  file: string;
  desktop: Spot;
  mobile: Spot;
}

interface FieldGroup {
  title: string;
  /** The slot left open for the heading, and its font size. It centers in the slot. */
  heading: Record<Layout, { slot: Spot; size: number }>;
  photos: FieldPhoto[];
}

/** One unit is 1/48 of the screen on desktop and 1/24 on mobile, so each layout scales as a whole. */
export const FIELD_SIZE: Record<Layout, { columns: number; rows: number }> = {
  desktop: { columns: 48, rows: 70 },
  mobile: { columns: 24, rows: 160 },
};

/**
 * The /photos composition, placed by hand twice on fixed columns: five 10-unit
 * columns with 0.8 gaps on desktop (photos and headings can span two), and
 * 13.6 and 11.4-unit columns with a 0.6 gap on mobile. Inside a column, keep
 * that same gap between everything, so only the top and bottom edges are uneven.
 * Keep near-identical photos apart. To add a photo, add it to WALL_PHOTOS for
 * its alt text, then give it a spot in both layouts.
 */
export const FIELD_GROUPS: FieldGroup[] = [
  {
    title: "Food & Drink",
    heading: {
      desktop: { slot: [8.2, 14.1, 20.8, 5], size: 3.2 },
      mobile: { slot: [0.4, 9.7, 12.4, 4.5], size: 2.1 },
    },
    photos: [
      { file: "kitchen-stew-tortillas.jpg", desktop: [-2.6, 4.5, 10, 6.7], mobile: [-0.8, 0, 13.6, 9.1] },
      { file: "crudo-oysters.jpg", desktop: [8.2, 0, 10, 13.3], mobile: [-0.8, 14.8, 13.6, 18.1] },
      { file: "kitchen-sugared-pastry.jpg", desktop: [19, 5.6, 10, 7.7], mobile: [13.4, 18.7, 11.4, 7.6] },
      { file: "cantina-stone-table.jpg", desktop: [29.8, 1.6, 10, 15], mobile: [13.4, 1, 11.4, 17.1] },
      { file: "kitchen-plate.jpg", desktop: [40.6, 4.2, 10, 15], mobile: [13.4, 44.6, 11.4, 17.1] },
      { file: "cantina-five-drinks.jpg", desktop: [-2.6, 12, 10, 15], mobile: [-0.8, 43.2, 13.6, 20.4] },
      { file: "kitchen-plate-wide.jpg", desktop: [8.2, 19.9, 20.8, 13.9], mobile: [-0.8, 33.5, 13.6, 9.1] },
      { file: "cantina-highball.jpg", desktop: [29.8, 17.4, 10, 16.4], mobile: [13.4, 26.9, 11.4, 17.1] },
      { file: "kitchen-salsas.jpg", desktop: [40.6, 20, 10, 13.3], mobile: [-0.8, 64.2, 13.6, 18.1] },
      { file: "cantina-trio.jpg", desktop: [-2.6, 27.8, 10, 6.7], mobile: [13.4, 62.3, 11.4, 7.6] },
      { file: "cantina-stone-table-2.jpg", desktop: [8.2, 34.6, 10, 15], mobile: [13.4, 70.5, 11.4, 17.1] },
    ],
  },
  {
    title: "The Space",
    heading: {
      desktop: { slot: [19, 34.6, 20.8, 5], size: 3.2 },
      mobile: { slot: [13.4, 88.2, 10.6, 4.5], size: 2.1 },
    },
    photos: [
      { file: "space-bar-stools.jpg", desktop: [40.6, 34.1, 10, 15], mobile: [13.4, 93.3, 11.4, 17.1] },
      { file: "space-backlit-sign.jpg", desktop: [19, 40.4, 20.8, 13], mobile: [13.4, 129.4, 11.4, 7.6] },
      { file: "space-mural-sign.jpg", desktop: [-2.6, 35.3, 10, 9.1], mobile: [-0.8, 82.9, 13.6, 11] },
      { file: "space-curtained-table.jpg", desktop: [-2.6, 45.2, 10, 16.8], mobile: [-0.8, 94.5, 13.6, 20.4] },
      { file: "space-storefront.jpg", desktop: [8.2, 50.4, 10, 15.6], mobile: [13.4, 111, 11.4, 17.8] },
      { file: "space-dining-bar-view.jpg", desktop: [29.8, 54.2, 10, 15], mobile: [-0.8, 139.1, 13.6, 20.4] },
      { file: "space-gallery-booth.jpg", desktop: [19, 54.2, 10, 13.6], mobile: [13.4, 137.6, 11.4, 17.1] },
      { file: "space-banquette.jpg", desktop: [40.6, 49.9, 10, 16.9], mobile: [-0.8, 115.5, 13.6, 23] },
    ],
  },
];

export function fieldAlt(file: string) {
  return WALL_PHOTOS.find((photo) => photo.file === file)?.alt ?? "";
}
