import type { Metadata } from "next";
import Link from "next/link";
import { commissionTypes, processSteps, faqItems } from "@/data/commissions";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Commissions",
  description:
    "Commission a bespoke artwork by Fatima Garcia — Timatimone Art Gallery. Portraits, custom artwork, and collaborations.",
};

export default function CommissionsPage() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-[4vw] py-16 md:py-24">
      {/* Hero */}
      <Reveal>
        <SectionHeading label="Commissions" title="Bring Your Vision to Life" />
        <p className="mt-4 max-w-lg text-[15px] text-ink-soft font-sans leading-relaxed">
          Every commission begins with a conversation. From concept to
          completion, each piece is crafted with intention and care.
        </p>
      </Reveal>

      {/* Commission Types */}
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

      {/* How It Works */}
      <Reveal>
        <div className="mt-20 md:mt-28">
          <SectionHeading label="How It Works" title="The Process" />
        </div>
      </Reveal>

      <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
        {processSteps.map((step, i) => (
          <Reveal key={step.number} delay={i * 80}>
            <div>
              <span className="block text-[11px] text-gold font-sans font-medium mb-3">
                {step.number}
              </span>
              <h3 className="font-display text-xl font-medium text-ink mb-3">
                {step.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-ink-soft font-sans">
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* FAQ */}
      <Reveal>
        <div className="mt-20 md:mt-28">
          <SectionHeading label="(FAQs)" title="Common Questions" />

          <div className="mt-10 md:mt-12 space-y-0">
            {faqItems.map((item, i) => (
              <details
                key={i}
                className="group border-b border-line py-5"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none text-[15px] font-medium text-ink font-sans hover:text-olive transition-colors">
                  {item.question}
                  <span className="ml-4 text-ink-soft group-open:rotate-45 transition-transform text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft font-sans">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal>
        <div className="mt-20 md:mt-28 text-center">
          <p className="text-[15px] text-ink-soft font-sans mb-6">
            Ready to start? Let&apos;s create something meaningful together.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-olive text-cream text-[12px] uppercase tracking-[0.18em] font-medium font-sans px-8 py-4 hover:bg-olive-deep hover:scale-[1.02] transition-all duration-300"
          >
            Get in touch
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
