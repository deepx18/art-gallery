import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import { artist } from "@/data/artist";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with Fatima Garcia at ${artist.gallery}. Commissions, collaborations, exhibitions, and general inquiries.`,
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-[4vw] py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        {/* Left — statement */}
        <Reveal className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <span className="block text-[11px] uppercase tracking-[0.2em] text-ink-soft font-sans mb-4">
              Contact
            </span>
            <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] font-medium text-ink mb-6">
              Let&apos;s create
              <br />
              something
              <br />
              together.
            </h1>
            <div className="space-y-3 text-[15px] text-ink-soft font-sans">
              <p>
                {artist.name}
                <br />
                {artist.gallery}
              </p>
              <p>{artist.address}</p>
              <p>
                <a
                  href={`mailto:${artist.email}`}
                  className="hover:text-ink transition-colors underline underline-offset-2"
                >
                  {artist.email}
                </a>
              </p>
            </div>
          </div>
        </Reveal>

        {/* Right — form */}
        <Reveal delay={80} className="md:col-span-6 md:col-start-7">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
