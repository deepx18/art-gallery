import Image from "next/image";
import Link from "next/link";
import { artist } from "@/data/artist";
import { heroArtwork } from "@/data/artworks";
import BotanicalMotif from "@/components/ui/BotanicalMotif";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Botanical motif — behind hero */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none text-olive">
        <BotanicalMotif className="w-[500px] md:w-[700px] h-auto opacity-60" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-[4vw] pt-16 md:pt-24 pb-10 md:pb-16">
        {/* Label */}
        <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-ink-soft font-sans mb-6">
          {artist.name} · Mixed Media Artist
        </span>

        {/* Italic accent line — hero only */}
        <p className="font-display italic text-olive text-lg md:text-xl mb-3">
          Art as healing
        </p>

        {/* Headline */}
        <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] font-medium text-ink mb-8">
          Timatimone
        </h1>

        <p className="max-w-md text-[15px] text-ink-soft font-sans leading-relaxed mb-8">
          Sculptural mixed media art rooted in Moroccan heritage, shaped by the
          Hudson Valley. Every piece is a therapy moment made tangible.
        </p>

        <Link
          href="/work"
          className="inline-block text-[12px] uppercase tracking-[0.18em] font-medium font-sans text-ink border-b border-ink pb-1 hover:opacity-60 transition-opacity"
        >
          View selected work
        </Link>
      </div>

      {/* Hero artwork */}
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-[4vw] pb-16 md:pb-24">
        <div className="relative w-full max-w-[75vw] md:max-w-[65vw] mx-auto">
          <Image
            src={heroArtwork.image}
            alt={heroArtwork.title}
            width={heroArtwork.width}
            height={heroArtwork.height}
            priority
            className="w-full h-auto object-cover"
            sizes="(max-width: 768px) 90vw, 65vw"
          />
        </div>
      </div>
    </section>
  );
}
