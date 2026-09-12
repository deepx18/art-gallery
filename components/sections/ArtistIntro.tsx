"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ArtistIntro() {
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  // Parallax: image moves up slower than scroll
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [60, -60],
  );

  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-[4vw] py-16 md:py-24">
      <Reveal>
        <SectionHeading label="About the Artist" title="Fatima Garcia" />
      </Reveal>

      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">
        {/* Image — parallax scroll */}
        <Reveal className="md:col-span-5">
          <div ref={imageRef} className="relative aspect-[4/5] overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{ y: imageY }}
            >
              <Image
                src="/images/the-mark-of-her-truth.jpg"
                alt="Artwork: The Mark of Her Truth by Fatima Garcia"
                width={593}
                height={720}
                className="w-full h-[120%] object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </motion.div>
          </div>
          <p className="mt-3 text-[11px] text-ink-soft font-sans italic">
            Artwork: The Mark of Her Truth, 2025
          </p>
        </Reveal>

        {/* Text */}
        <Reveal delay={80} className="md:col-span-6 md:col-start-7">
          <div className="space-y-5 text-[15px] leading-relaxed text-ink-soft font-sans">
            <p>
              Born in Ain Chkef, Fès, and raised in Casablanca, Fatima Garcia
              is the founder and artist behind Timatimone Art Gallery — now
              based in Hyde Park, New York.
            </p>
            <p>
              Her work is sculptural mixed media: acrylic, impasto textured
              paste, resin, gold leaf, pearls, and hand-sculpted 3D relief.
              Each piece is a meditation, a moment of therapy made tangible.
            </p>
            <p>
              Drawing from the rich visual traditions of Morocco and the quiet
              beauty of the Hudson Valley, Fatima&apos;s art bridges two worlds —
              texture, gold, and light working together to tell stories of
              healing and transformation.
            </p>
          </div>

          <Link
            href="/about"
            className="link-underline mt-8 inline-block text-[12px] uppercase tracking-[0.18em] font-medium font-sans text-ink"
          >
            Read more
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
