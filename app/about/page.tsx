import type { Metadata } from "next";
import Image from "next/image";
import { artist } from "@/data/artist";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description: `About Fatima Garcia — founder and artist behind ${artist.gallery}. ${artist.origin}. Now based in ${artist.location}.`,
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-[4vw] py-16 md:py-24">
      {/* Hero */}
      <Reveal>
        <SectionHeading label="About" title="Fatima Garcia" />
      </Reveal>

      {/* Bio */}
      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">
        <Reveal className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/the-mark-of-her-truth.jpg"
              alt="Artwork: The Mark of Her Truth by Fatima Garcia"
              width={593}
              height={720}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <p className="mt-3 text-[11px] text-ink-soft font-sans italic">
            Artwork: The Mark of Her Truth, 2025
          </p>
        </Reveal>

        <Reveal delay={80} className="md:col-span-6 md:col-start-7">
          <div className="space-y-5 text-[15px] leading-relaxed text-ink-soft font-sans">
            {artist.bio.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Statement */}
      <Reveal>
        <div className="mt-20 md:mt-28 bg-olive-deep px-6 md:px-16 py-16 md:py-20 text-center">
          <blockquote className="max-w-[800px] mx-auto">
            <p className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] leading-[1.15] font-medium text-cream italic">
              &ldquo;{artist.statement}&rdquo;
            </p>
            <footer className="mt-6 text-[12px] uppercase tracking-[0.2em] text-cream/70 font-sans">
              — {artist.name}
            </footer>
          </blockquote>
        </div>
      </Reveal>

      {/* Exhibitions */}
      <Reveal>
        <div className="mt-20 md:mt-28">
          <SectionHeading label="Exhibitions" title="Selected Shows" />

          <div className="mt-10 md:mt-12 space-y-0">
            {artist.exhibitions.map((ex, i) => (
              <div
                key={i}
                className={`flex flex-col md:flex-row md:items-center gap-2 md:gap-0 py-5 border-b border-line ${
                  ex.current ? "bg-olive-tint -mx-5 md:-mx-10 px-5 md:px-10" : ""
                }`}
              >
                <div className="md:w-32 shrink-0">
                  <span className="text-[12px] font-medium text-ink-soft font-sans">
                    {ex.month} {ex.year}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-display text-xl font-medium text-ink">
                    {ex.title}
                  </p>
                  <p className="text-[13px] text-ink-soft font-sans mt-0.5">
                    {ex.venue} — {ex.location}
                  </p>
                </div>
                {ex.current && (
                  <span className="text-[10px] uppercase tracking-[0.18em] text-olive font-medium font-sans">
                    Current
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
