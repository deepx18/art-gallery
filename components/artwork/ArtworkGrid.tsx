import type { Artwork } from "@/data/artworks";
import ArtworkCard from "./ArtworkCard";
import ImageReveal from "@/components/motion/ImageReveal";

interface ArtworkGridProps {
  artworks: Artwork[];
}

export default function ArtworkGrid({ artworks }: ArtworkGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {artworks.map((artwork, i) => (
        <ImageReveal key={artwork.slug} delay={i * 80}>
          <ArtworkCard artwork={artwork} index={i} />
        </ImageReveal>
      ))}
    </div>
  );
}
