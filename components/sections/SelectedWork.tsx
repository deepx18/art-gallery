import { artworks } from "@/data/artworks";
import ArtworkCard from "@/components/artwork/ArtworkCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";

export default function SelectedWork() {
  const featured = artworks.filter((a) => a.slug !== "golden-wings");

  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-[4vw] py-16 md:py-24">
      <Reveal>
        <SectionHeading label="Selected Work" title="The Collection" />
      </Reveal>

      <div className="mt-12 md:mt-16">
        {/* Featured: Lunar Metamorphosis — full width */}
        <Reveal>
          <ArtworkCard artwork={featured[0]} index={1} className="mb-12 md:mb-16" />
        </Reveal>

        {/* Two-column: Blue Pearl + The Mark of Her Truth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-12 md:mb-16">
          <Reveal>
            <ArtworkCard artwork={featured[1]} index={2} />
          </Reveal>
          <Reveal delay={80}>
            <ArtworkCard artwork={featured[2]} index={3} />
          </Reveal>
        </div>

        {/* Single: Bloom in Serenity */}
        <Reveal>
          <div className="max-w-lg">
            <ArtworkCard artwork={featured[3]} index={4} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
