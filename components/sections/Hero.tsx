"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { artist } from "@/data/artist";
import { heroArtwork } from "@/data/artworks";
import BotanicalMotif from "@/components/ui/BotanicalMotif";

export default function Hero() {
  const [revealed, setRevealed] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Staggered entrance on mount
  useEffect(() => {
    const raf = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Scroll response — subtle parallax on hero artwork
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        // Only track scroll while hero is in view
        if (rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollProgress = Math.min(scrollY / 600, 1);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Botanical motif — behind hero, fades in */}
      <div
        className="absolute inset-0 flex justify-center items-center pointer-events-none text-olive transition-opacity"
        style={{
          opacity: revealed ? 0.6 : 0,
          transitionDuration: "1200ms",
          transitionTimingFunction: "var(--ease-out-expo)",
          transitionDelay: "200ms",
        }}
      >
        <BotanicalMotif className="w-[500px] md:w-[700px] h-auto" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-[4vw] pt-16 md:pt-24 pb-10 md:pb-16">
        {/* Label */}
        <span
          className="block text-[11px] font-medium uppercase tracking-[0.2em] text-ink-soft font-sans mb-6 transition-all"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(12px)",
            transitionDuration: "600ms",
            transitionTimingFunction: "var(--ease-out-expo)",
            transitionDelay: "100ms",
          }}
        >
          {artist.name} · Mixed Media Artist
        </span>

        {/* Italic accent line */}
        <p
          className="font-display italic text-olive text-lg md:text-xl mb-3 transition-all"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(12px)",
            transitionDuration: "600ms",
            transitionTimingFunction: "var(--ease-out-expo)",
            transitionDelay: "200ms",
          }}
        >
          Art as healing
        </p>

        {/* Headline */}
        <h1
          className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] font-medium text-ink mb-8 transition-all"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(16px)",
            transitionDuration: "700ms",
            transitionTimingFunction: "var(--ease-out-expo)",
            transitionDelay: "300ms",
          }}
        >
          Timatimone
        </h1>

        <p
          className="max-w-md text-[15px] text-ink-soft font-sans leading-relaxed mb-8 transition-all"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(12px)",
            transitionDuration: "600ms",
            transitionTimingFunction: "var(--ease-out-expo)",
            transitionDelay: "450ms",
          }}
        >
          Sculptural mixed media art rooted in Moroccan heritage, shaped by the
          Hudson Valley. Every piece is a therapy moment made tangible.
        </p>

        <Link
          href="/work"
          className="link-underline text-[12px] uppercase tracking-[0.18em] font-medium font-sans text-ink transition-all"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(12px)",
            transitionDuration: "600ms",
            transitionTimingFunction: "var(--ease-out-expo)",
            transitionDelay: "550ms",
          }}
        >
          View selected work
        </Link>
      </div>

      {/* Hero artwork — clip-path reveal + scroll parallax */}
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-[4vw] pb-16 md:pb-24">
        <div
          className="relative w-full max-w-[75vw] md:max-w-[65vw] mx-auto overflow-hidden"
          style={{
            clipPath: revealed
              ? "inset(0 0 0% 0)"
              : "inset(0 0 100% 0)",
            transition: "clip-path 900ms var(--ease-out-expo) 400ms",
          }}
        >
          <Image
            src={heroArtwork.image}
            alt={heroArtwork.title}
            width={heroArtwork.width}
            height={heroArtwork.height}
            priority
            className="w-full h-auto object-cover"
            sizes="(max-width: 768px) 90vw, 65vw"
            style={{
              transform: `scale(${1 + scrollProgress * 0.04})`,
              transition: "transform 0.1s linear",
            }}
          />
        </div>
      </div>
    </section>
  );
}
