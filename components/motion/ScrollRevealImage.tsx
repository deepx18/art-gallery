"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Artwork } from "@/data/artworks";

interface ScrollRevealImageProps {
  artwork: Artwork;
  index: number;
  className?: string;
}

export default function ScrollRevealImage({
  artwork,
  index,
  className = "",
}: ScrollRevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Scale from 0.88 → 1 as image enters viewport
  const scale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    prefersReducedMotion ? [1, 1, 1, 1] : [0.88, 1, 1, 1.02],
  );

  // Opacity from 0 → 1
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 1, 1, 0.8],
  );

  // Slight vertical shift
  const y = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    prefersReducedMotion ? [0, 0, 0, 0] : [40, 0, 0, -20],
  );

  return (
    <div ref={ref}>
    <Link
      href={`/work/${artwork.slug}`}
      className={`group block ${className}`}
    >
      <motion.div
        className="relative overflow-hidden mb-4"
        style={{ scale, opacity, y }}
      >
        <Image
          src={artwork.image}
          alt={artwork.title}
          width={artwork.width}
          height={artwork.height}
          className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {artwork.status === "sold" && (
          <span className="absolute top-3 right-3 bg-ink/80 text-cream text-[10px] uppercase tracking-[0.18em] font-medium font-sans px-3 py-1">
            Sold
          </span>
        )}
      </motion.div>
      <div>
        <span className="block text-[11px] text-ink-soft font-sans mb-1">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-display text-xl md:text-[1.4rem] font-medium text-ink leading-tight mb-1 group-hover:underline group-hover:decoration-olive group-hover:underline-offset-4 transition-all duration-300">
          {artwork.title}
        </h3>
        <p className="text-[12px] text-ink-soft font-sans transition-opacity duration-300 group-hover:opacity-100 opacity-70">
          {artwork.medium.split(",")[0]} · {artwork.year}
        </p>
      </div>      </Link>
    </div>
    );
}
