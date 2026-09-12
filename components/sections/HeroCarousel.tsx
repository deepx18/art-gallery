"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { artworks, type Artwork } from "@/data/artworks";
import { artist } from "@/data/artist";
import { useReducedMotion } from "framer-motion";

const KEY_MAP: Record<string, number> = {
  ArrowRight: 1,
  ArrowLeft: -1,
};

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const lastWheelTime = useRef(0);
  const itemCount = artworks.length;

  useEffect(() => {
    const raf = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ─── Navigation ─── */
  const goTo = useCallback(
    (next: number) => {
      if (isDragging) return;
      const idx = ((next % itemCount) + itemCount) % itemCount;
      if (idx === activeIndex) return;
      setActiveIndex(idx);
    },
    [activeIndex, itemCount, isDragging],
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [goTo, activeIndex]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [goTo, activeIndex]);

  /* ─── Keyboard ─── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const delta = KEY_MAP[e.key];
        if (delta) {
          e.preventDefault();
          goTo(activeIndex + delta);
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, goTo]);

  /* ─── Wheel (throttled) ─── */
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (!(rect.top < window.innerHeight * 0.3 && rect.bottom > window.innerHeight * 0.3)) return;
      const now = Date.now();
      if (now - lastWheelTime.current < 900 || Math.abs(e.deltaY) < 15) return;
      lastWheelTime.current = now;
      if (e.deltaY > 0) goNext(); else goPrev();
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [goNext, goPrev]);

  /* ─── Drag ─── */
  const onDragEnd = (_: unknown, info: PanInfo) => {
    setIsDragging(false);
    if (info.offset.x < -50) goNext();
    else if (info.offset.x > 50) goPrev();
  };

  const active = artworks[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured artwork"
    >
      {/* ─── Filmstrip ─── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: isMobile ? "75vh" : "min(85vh, 800px)" }}
      >
        <AnimatePresence initial={false}>
          {artworks.map((artwork, i) => {
            const offset = ((i - activeIndex + itemCount) % itemCount);
            const wrappedOffset = offset > itemCount / 2 ? offset - itemCount : offset;
            const isActive = i === activeIndex;

            if (isMobile && !isActive) return null;
            if (!isMobile && Math.abs(wrappedOffset) > 1) return null;

            return (
              <CarouselCard
                key={artwork.slug}
                artwork={artwork}
                offset={wrappedOffset}
                isActive={isActive}
                isMobile={isMobile}
                prefersReducedMotion={!!prefersReducedMotion}
                onClick={() => { if (!isActive) goTo(i); }}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={onDragEnd}
                revealed={revealed}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* ─── Overlay: Artist Name (top-left) ─── */}
      <motion.div
        className="absolute top-0 left-0 w-full z-30 pointer-events-none"
        initial={{ opacity: 0, y: -10 }}
        animate={revealed ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto max-w-[1440px] px-5 md:px-[4vw] pt-6 md:pt-8">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-cream/70 font-sans">
            {artist.name} · Mixed Media Artist
          </span>
        </div>
      </motion.div>

      {/* ─── Overlay: Artwork info (bottom-left) ─── */}
      <div className="absolute bottom-0 left-0 w-full z-30 pointer-events-none">
        <div className="mx-auto max-w-[1440px] px-5 md:px-[4vw] pb-14 md:pb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="block text-[11px] uppercase tracking-[0.2em] font-sans text-cream/60 mb-2">
                {active.category} · {active.year}
              </span>
              <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] leading-[1.05] font-medium text-cream mb-1">
                {active.title}
              </h2>
              <p className="text-[13px] font-sans text-cream/50 max-w-lg hidden md:block">
                {active.medium}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ─── Arrows ─── */}
      <motion.div
        className="absolute top-1/2 left-0 w-full z-30 flex justify-between px-3 md:px-5 -translate-y-1/2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={revealed ? { opacity: 1 } : {}}
        transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : 0.4 }}
      >
        <button
          onClick={goPrev}
          className="pointer-events-auto w-10 h-10 md:w-11 md:h-11 flex items-center justify-center text-cream/60 hover:text-cream transition-colors"
          aria-label="Previous artwork"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={goNext}
          className="pointer-events-auto w-10 h-10 md:w-11 md:h-11 flex items-center justify-center text-cream/60 hover:text-cream transition-colors"
          aria-label="Next artwork"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </motion.div>

      {/* ─── Dots ─── */}
      <motion.div
        className="absolute bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2"
        initial={{ opacity: 0 }}
        animate={revealed ? { opacity: 1 } : {}}
        transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : 0.5 }}
      >
        {artworks.map((artwork, i) => (
          <button
            key={artwork.slug}
            onClick={() => goTo(i)}
            aria-label={`View ${artwork.title}`}
            aria-current={i === activeIndex ? "true" : undefined}
            className={`h-[2px] transition-all duration-400 ${
              i === activeIndex
                ? "w-7 bg-cream"
                : "w-3.5 bg-cream/30 hover:bg-cream/50"
            }`}
          />
        ))}
      </motion.div>

      {/* ─── CTA ─── */}
      <motion.div
        className="absolute bottom-5 md:bottom-8 right-5 md:right-[4vw] z-30"
        initial={{ opacity: 0 }}
        animate={revealed ? { opacity: 1 } : {}}
        transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : 0.6 }}
      >
        <Link
          href="/work"
          className="text-[11px] uppercase tracking-[0.18em] font-medium font-sans text-cream/70 hover:text-cream transition-colors"
        >
          Explore the work →
        </Link>
      </motion.div>

      {/* ─── Live region ─── */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {activeIndex + 1} of {itemCount}: {active.title}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   Carousel Card
   ──────────────────────────────────────────────────────── */

interface CarouselCardProps {
  artwork: Artwork;
  offset: number;
  isActive: boolean;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  onClick: () => void;
  onDragStart: () => void;
  onDragEnd: (_: unknown, info: PanInfo) => void;
  revealed: boolean;
}

function CarouselCard({
  artwork,
  offset,
  isActive,
  isMobile,
  prefersReducedMotion,
  onClick,
  onDragStart,
  onDragEnd,
  revealed,
}: CarouselCardProps) {
  /*
   * Filmstrip positioning:
   *
   * Desktop (side cards visible):
   *   Active  (offset 0):  left 17%,  width 66%  → centered, fills most of viewport
   *   Previous (offset -1): left -31%, width 16% → peeks ~14% from left edge
   *   Next     (offset 1):  left 85%,  width 16% → peeks ~15% from right edge
   *
   * Mobile (active card only):
   *   Active: left 5%, width 90%
   */
  let leftPct: number;
  let widthPct: number;

  if (isMobile) {
    leftPct = 5;
    widthPct = 90;
  } else if (offset === 0) {
    leftPct = 17;
    widthPct = 66;
  } else if (offset === -1) {
    leftPct = -31;
    widthPct = 16;
  } else {
    leftPct = 85;
    widthPct = 16;
  }

  return (
    <motion.div
      layout
      className="absolute top-0 h-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-cream"
      style={{
        zIndex: isActive ? 10 : 5 - Math.abs(offset),
        left: `${leftPct}%`,
        width: `${widthPct}%`,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: revealed ? (isActive ? 1 : 0.45) : 0,
      }}
      exit={{ opacity: 0 }}
      transition={{
        layout: { duration: prefersReducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: prefersReducedMotion ? 0 : 0.4 },
      }}
      drag={isActive ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.12}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      role="group"
      aria-roledescription="slide"
      aria-label={`${artwork.title}, ${artwork.category}, ${artwork.year}`}
      aria-hidden={!isActive}
      tabIndex={isActive ? 0 : -1}
    >
      {/* Image — fills card completely */}
      <Image
        src={artwork.image}
        alt={artwork.title}
        priority={isActive}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 90vw, 66vw"
      />

      {/* Bottom gradient — subtle, for text readability */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 via-black/15 to-transparent pointer-events-none" />

      {/* Sold badge */}
      {artwork.status === "sold" && (
        <span className="absolute top-5 right-5 bg-cream/90 text-ink text-[10px] uppercase tracking-[0.18em] font-medium font-sans px-3 py-1.5 z-10">
          Sold
        </span>
      )}
    </motion.div>
  );
}
