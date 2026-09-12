import { processSteps } from "@/data/commissions";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Process() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-[4vw] py-16 md:py-24">
      <Reveal>
        <SectionHeading
          label="Process"
          title="From Vision to Creation"
        />
      </Reveal>

      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        {processSteps.map((step, i) => (
          <Reveal key={step.number} delay={i * 80}>
            <div>
              <span className="block text-[11px] text-gold font-sans font-medium mb-3">
                {step.number}
              </span>
              <h3 className="font-display text-2xl font-medium text-ink mb-3">
                {step.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-ink-soft font-sans">
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
