export type ArtworkCategory = "Sculptural" | "Mixed Media" | "Portrait";

export type ArtworkStatus =
  | "available"
  | "sold"
  | "private_collection"
  | "unavailable";

export interface Artwork {
  slug: string;
  title: string;
  image: string;
  width: number;
  height: number;
  year: number;
  medium: string;
  category: ArtworkCategory;
  status: ArtworkStatus;
  description: string;
  hero?: boolean;
}

export const artworks: Artwork[] = [
  {
    slug: "golden-wings",
    title: "Golden Wings",
    image: "/images/golden-wings.jpg",
    width: 792,
    height: 1024,
    year: 2025,
    medium:
      "Acrylic, sculpting paste & gold leaf on canvas; hand-sculpted 3D relief",
    category: "Sculptural",
    status: "sold",
    description:
      "A sculptural mixed media piece featuring hand-sculpted golden wings emerging from textured acrylic. Gold leaf catches light across impasto surfaces, creating a sense of transcendence and flight. A signature work of Timatimone Art — strength, beauty, and transformation.",
  },
  {
    slug: "lunar-metamorphosis",
    title: "Lunar Metamorphosis",
    image: "/images/lunar-metamorphosis.jpg",
    width: 1500,
    height: 839,
    year: 2025,
    medium:
      "Acrylic, resin, textured paste, pearls & butterfly on canvas, 24\"×36\"",
    category: "Mixed Media",
    status: "available",
    description:
      "Resin, pearls, and a sculpted butterfly compose a dreamlike landscape of transformation. The wide canvas breathes with lunar light — a meditation on change, growth, and the quiet power of becoming.",
  },
  {
    slug: "blue-pearl",
    title: "Blue Pearl",
    image: "/images/blue-pearl.jpg",
    width: 2000,
    height: 2000,
    year: 2024,
    medium: "Mixed media on canvas",
    category: "Mixed Media",
    status: "available",
    description:
      "A homage to Chefchaouen — the \"Blue Pearl\" of Morocco. Layers of textured blue evoke the medina's famous walls, blending memory with material. This square-format piece captures the essence of a place that lives in Fatima's artistic DNA.",
  },
  {
    slug: "the-mark-of-her-truth",
    title: "The Mark of Her Truth",
    image: "/images/the-mark-of-her-truth.jpg",
    width: 593,
    height: 720,
    year: 2025,
    medium: "Mixed media portrait of a Berber (Amazigh) woman",
    category: "Portrait",
    status: "available",
    description:
      "A mixed media portrait of a Berber woman — her expression carrying centuries of strength and identity. Sculpted textures and layered materials bring the subject to life, honoring the Amazigh heritage that runs through Fatima's work.",
  },
  {
    slug: "bloom-in-serenity",
    title: "Bloom in Serenity",
    image: "/images/bloom-in-serenity.jpg",
    width: 1280,
    height: 1280,
    year: 2024,
    medium:
      "Acrylic & textured paste on canvas, 24\"×36\"",
    category: "Portrait",
    status: "sold",
    description:
      "A woman in a white dress blooms with flowers — a portrait of peace, strength, and growth. Textured paste creates organic forms that seem to grow from the canvas itself, embodying the serenity of inner transformation.",
  },
];

export const heroArtwork = artworks.find((a) => a.slug === "golden-wings")!;

export const categories: ArtworkCategory[] = [
  "Sculptural",
  "Mixed Media",
  "Portrait",
];

export function getArtwork(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}

export function getArtworksByCategory(
  category: ArtworkCategory | "all"
): Artwork[] {
  if (category === "all") return artworks;
  return artworks.filter((a) => a.category === category);
}

export function getAdjacentArtworks(slug: string) {
  const idx = artworks.findIndex((a) => a.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? artworks[idx - 1] : null,
    next: idx < artworks.length - 1 ? artworks[idx + 1] : null,
  };
}
