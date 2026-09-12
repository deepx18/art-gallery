import Link from "next/link";
import { commissionTypes } from "@/data/commissions";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Commissions() {
  return (
    <section className="bg-cream-deep">
      <div className="mx-auto max-w-[1440px] px-5 md:px-[4vw] py-16 md:py-24">
        <Reveal>
          <SectionHeading
            label="Commissions"
            title="Bring Your Vision to Life"
          />
        </Reveal>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {commissionTypes.map((type, i) => (
            <Reveal key={type.title} delay={i * 80}>
              <div>
                <h3 className="font-display text-2xl font-medium text-ink mb-3">
                  {type.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-ink-soft font-sans">
                  {type.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 md:mt-16">
            <Link
              href="/contact"
              className="link-underline text-[12px] uppercase tracking-[0.18em] font-medium font-sans text-ink"
            >
              Start a conversation
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
