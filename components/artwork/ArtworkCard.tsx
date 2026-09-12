import Image from "next/image";
import Link from "next/link";
import type { Artwork } from "@/data/artworks";

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
  className?: string;
}

export default function ArtworkCard({
  artwork,
  index,
  className = "",
}: ArtworkCardProps) {
  return (
    <Link
      href={`/work/${artwork.slug}`}
      className={`group block ${className}`}
    >
      <div className="relative overflow-hidden mb-4">
        <Image
          src={artwork.image}
          alt={artwork.title}
          width={artwork.width}
          height={artwork.height}
          className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {artwork.status === "sold" && (
          <span className="absolute top-3 right-3 bg-ink/80 text-cream text-[10px] uppercase tracking-[0.18em] font-medium font-sans px-3 py-1">
            Sold
          </span>
        )}
      </div>
      <div>
        <span className="block text-[11px] text-ink-soft font-sans mb-1">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-display text-xl md:text-[1.4rem] font-medium text-ink leading-tight mb-1">
          {artwork.title}
        </h3>
        <p className="text-[12px] text-ink-soft font-sans">
          {artwork.medium.split(",")[0]} · {artwork.year}
        </p>
      </div>
    </Link>
  );
}
