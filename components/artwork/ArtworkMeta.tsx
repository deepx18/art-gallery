import type { Artwork } from "@/data/artworks";

interface ArtworkMetaProps {
  artwork: Artwork;
}

export default function ArtworkMeta({ artwork }: ArtworkMetaProps) {
  const details = [
    { label: "Year", value: String(artwork.year) },
    { label: "Medium", value: artwork.medium },
    { label: "Category", value: artwork.category },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl md:text-4xl lg:text-[2.5rem] font-medium text-ink leading-tight mb-6">
        {artwork.title}
      </h1>

      <dl className="space-y-3 mb-8">
        {details.map((d) => (
          <div key={d.label}>
            <dt className="text-[11px] uppercase tracking-[0.18em] text-ink-soft font-sans mb-0.5">
              {d.label}
            </dt>
            <dd className="text-[15px] text-ink font-sans">{d.value}</dd>
          </div>
        ))}

        {artwork.status === "sold" && (
          <div>
            <dt className="text-[11px] uppercase tracking-[0.18em] text-ink-soft font-sans mb-0.5">
              Status
            </dt>
            <dd className="text-[15px] text-gold font-sans font-medium">
              Sold
            </dd>
          </div>
        )}
      </dl>

      {artwork.description && (
        <p className="text-[15px] leading-relaxed text-ink-soft font-sans">
          {artwork.description}
        </p>
      )}
    </div>
  );
}
