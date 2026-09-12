"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface TextRevealLineProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function TextRevealLine({
  children,
  className = "",
  as: Tag = "h2",
}: TextRevealLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.4"],
  });

  // Split into words
  const words = children.split(" ");

  return (
    <Tag className={className} ref={ref}>
      {words.map((word, i) => (
        <TextRevealWord
          key={`${word}-${i}`}
          word={word}
          index={i}
          total={words.length}
          scrollProgress={scrollYProgress}
          prefersReducedMotion={prefersReducedMotion}
          isLast={i === words.length - 1}
        />
      ))}
    </Tag>
  );
}

interface TextRevealWordProps {
  word: string;
  index: number;
  total: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  prefersReducedMotion: boolean | null;
  isLast: boolean;
}

function TextRevealWord({
  word,
  index,
  total,
  scrollProgress,
  prefersReducedMotion,
  isLast,
}: TextRevealWordProps) {
  const start = index / total;
  const end = start + 1 / total;

  const opacity = useTransform(
    scrollProgress,
    [start, Math.min(end + 0.1, 1)],
    prefersReducedMotion ? [1, 1] : [0.15, 1],
  );

  const y = useTransform(
    scrollProgress,
    [start, Math.min(end + 0.1, 1)],
    prefersReducedMotion ? [0, 0] : [8, 0],
  );

  return (
    <motion.span
      className="inline-block"
      style={{ opacity, y, marginRight: isLast ? 0 : "0.3em" }}
    >
      {word}
    </motion.span>
  );
}
