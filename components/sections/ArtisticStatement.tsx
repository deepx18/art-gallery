import { artist } from "@/data/artist";
import BotanicalMotif from "@/components/ui/BotanicalMotif";
import Reveal from "@/components/motion/Reveal";

export default function ArtisticStatement() {
  return (
    <section className="relative bg-olive-deep overflow-hidden">
      {/* Botanical motif */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none text-cream/30">
        <BotanicalMotif className="w-[500px] md:w-[700px] h-auto" flip />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-[4vw] py-20 md:py-32">
        <Reveal>
          <blockquote className="max-w-[900px] mx-auto text-center">
            <p className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] font-medium text-cream italic">
              &ldquo;{artist.statement}&rdquo;
            </p>
            <footer className="mt-8 text-[12px] uppercase tracking-[0.2em] text-cream/70 font-sans">
              — {artist.name}
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
