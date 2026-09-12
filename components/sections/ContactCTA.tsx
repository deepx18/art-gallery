import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

export default function ContactCTA() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-[4vw] py-16 md:py-24 text-center">
      <Reveal>
        <span className="block text-[11px] uppercase tracking-[0.2em] text-ink-soft font-sans mb-4">
          Have an idea?
        </span>
        <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1] font-medium text-ink mb-6">
          Let&apos;s Talk.
        </h2>
        <p className="max-w-md mx-auto text-[15px] text-ink-soft font-sans leading-relaxed mb-8">
          For commissions, collaborations, exhibitions, or general inquiries.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-olive text-cream text-[12px] uppercase tracking-[0.18em] font-medium font-sans px-8 py-4 hover:bg-olive-deep transition-colors"
        >
          Get in touch
        </Link>
      </Reveal>
    </section>
  );
}
