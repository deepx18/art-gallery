"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerMs?: number;
}

export default function StaggerChildren({
  children,
  className = "",
  delay = 0,
  staggerMs = 80,
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Apply stagger delay to each child via inline style
          Array.from(el.children).forEach((child, i) => {
            (child as HTMLElement).style.animationDelay = `${delay + i * staggerMs}ms`;
          });

          setTimeout(() => {
            el.classList.add("revealed");
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, staggerMs]);

  return (
    <div ref={ref} className={`stagger-children ${className}`}>
      {children}
    </div>
  );
}
