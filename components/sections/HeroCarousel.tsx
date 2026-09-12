"use client";

import { HaloReel, type HaloReelItem } from "@/components/ui/halo-reel";
import { artworks } from "@/data/artworks";
import { artist } from "@/data/artist";
import Link from "next/link";

const REEL_ITEMS: HaloReelItem[] = artworks.map((a) => ({
  src: a.image,
  alt: `${a.title} — ${a.medium}, ${a.year}`,
}));

export default function HeroCarousel() {
  return (
    <section className="relative bg-cream">
      <HaloReel
        items={REEL_ITEMS}
        aria-label="Featured artwork"
        centerLabel={
          <div className="text-center pointer-events-none select-none">
            <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-ink-soft font-sans mb-3">
              {artist.name} · Mixed Media Artist
            </span>
            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1] font-medium text-ink mb-3">
              Timatimone
            </h1>
            <p className="text-[14px] font-sans text-ink-soft max-w-sm mx-auto leading-relaxed mb-6">
              Sculptural mixed media art rooted in Moroccan heritage, shaped by the
              Hudson Valley. Every piece is a therapy moment made tangible.
            </p>
            <Link
              href="/work"
              className="link-underline text-[12px] uppercase tracking-[0.18em] font-medium font-sans text-ink"
            >
              Explore the work →
            </Link>
          </div>
        }
        cardWidth={160}
        cardHeight={220}
        minScale={0.35}
        radiusXRatio={0.42}
        centerXRatio={0}
        radiusYRatio={0.32}
        holdDuration={2500}
        stepDuration={800}
        spread={1.15}
        className="h-[85vh] bg-cream"
      />
    </section>
  );
}
