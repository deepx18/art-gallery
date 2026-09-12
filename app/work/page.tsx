import type { Metadata } from "next";
import { categories, getArtworksByCategory } from "@/data/artworks";
import ArtworkGrid from "@/components/artwork/ArtworkGrid";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore the sculptural mixed media artwork of Fatima Garcia — Timatimone Art Gallery.",
};

interface WorkPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const params = await searchParams;
  const activeCategory = params.category || "all";
  const filtered = getArtworksByCategory(
    activeCategory as "all" | (typeof categories)[number]
  );

  const allFilters = ["all", ...categories] as const;

  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-[4vw] py-16 md:py-24">
      <Reveal>
        <SectionHeading label="Portfolio" title="The Work" />
        <p className="mt-4 max-w-lg text-[15px] text-ink-soft font-sans leading-relaxed">
          Sculptural mixed media art rooted in Moroccan heritage, shaped by the
          textures and light of the Hudson Valley.
        </p>
      </Reveal>

      {/* Filters */}
      <Reveal>
        <div className="mt-10 md:mt-12 flex flex-wrap gap-3">
          {allFilters.map((cat) => {
            const isActive =
              cat === activeCategory ||
              (cat === "all" && activeCategory === "all");
            const href = cat === "all" ? "/work" : `/work?category=${cat}`;
            return (
              <Link
                key={cat}
                href={href}
                className={`text-[11px] uppercase tracking-[0.18em] font-medium font-sans px-4 py-2 border transition-colors ${
                  isActive
                    ? "bg-ink text-cream border-ink"
                    : "bg-transparent text-ink-soft border-line hover:border-ink"
                }`}
              >
                {cat === "all" ? "All" : cat}
              </Link>
            );
          })}
        </div>
      </Reveal>

      {/* Grid */}
      <div className="mt-10 md:mt-12">
        <ArtworkGrid artworks={filtered} />
      </div>
    </section>
  );
}
