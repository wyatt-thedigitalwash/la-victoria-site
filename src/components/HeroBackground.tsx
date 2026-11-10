import { getImageProps } from "next/image";

/** Brand kit dark olive texture: portrait crop on phones, landscape elsewhere. */
export default function HeroBackground({ lazy = false }: { lazy?: boolean }) {
  const common = { alt: "", sizes: "100vw", priority: !lazy };

  const {
    props: { srcSet: portrait },
  } = getImageProps({
    ...common,
    src: "/assets/hero/LaVictoria_Background_Dark-Olive_1080x1920.jpg",
    width: 1080,
    height: 1920,
  });

  const {
    props: { srcSet: landscape, ...rest },
  } = getImageProps({
    ...common,
    src: "/assets/hero/LaVictoria_Background_Dark-Olive_1920x1080.jpg",
    width: 1920,
    height: 1080,
  });

  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={portrait} />
      <source media="(min-width: 768px)" srcSet={landscape} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt="" comes from rest; the texture is decorative */}
      <img
        {...rest}
        className="absolute inset-0 h-full w-full object-cover"
        // Matches the texture, so a slow load shows olive rather than a dark flash
        style={{ ...rest.style, backgroundColor: "#504328" }}
      />
    </picture>
  );
}
