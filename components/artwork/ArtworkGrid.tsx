import type { Artwork } from "@/data/artworks";
import ArtworkCard from "./ArtworkCard";

interface ArtworkGridProps {
  artworks: Artwork[];
}

export default function ArtworkGrid({ artworks }: ArtworkGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {artworks.map((artwork, i) => (
        <ArtworkCard key={artwork.slug} artwork={artwork} index={i} />
      ))}
    </div>
  );
}
