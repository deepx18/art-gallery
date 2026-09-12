import { artworks } from "@/data/artworks";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import ScrollRevealImage from "@/components/motion/ScrollRevealImage";

export default function SelectedWork() {
  const featured = artworks.filter((a) => a.slug !== "golden-wings");

  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-[4vw] py-16 md:py-24">
      <Reveal>
        <SectionHeading label="Selected Work" title="The Collection" />
      </Reveal>

      <div className="mt-12 md:mt-16">
        {/* Featured: Lunar Metamorphosis — full width */}
        <div className="mb-12 md:mb-16">
          <ScrollRevealImage artwork={featured[0]} index={1} />
        </div>

        {/* Two-column: Blue Pearl + The Mark of Her Truth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-12 md:mb-16">
          <ScrollRevealImage artwork={featured[1]} index={2} />
          <ScrollRevealImage artwork={featured[2]} index={3} />
        </div>

        {/* Single: Bloom in Serenity */}
        <div className="max-w-lg">
          <ScrollRevealImage artwork={featured[3]} index={4} />
        </div>
      </div>
    </section>
  );
}
