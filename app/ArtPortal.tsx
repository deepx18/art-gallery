"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { heroArtwork } from "@/data/artworks";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const ease = (value: number) => value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2;

export default function ArtPortal() {
  const id = `timatimone-portal-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const [progress, setProgress] = useState(0);
  const [geometry, setGeometry] = useState({ width: 1, height: 1, targetX: 0, targetY: 0, wordTop: 160 });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;
    const measure = () => {
      const width = section.clientWidth;
      const height = Math.max(1, window.innerHeight);
      const fontSize = Math.min(width / 5.9, height * 0.34);
      text.setAttribute("font-size", String(fontSize));
      text.setAttribute("x", String(width / 2));
      text.setAttribute("y", String(height * 0.54));
      const total = text.getComputedTextLength();
      const aIndex = "timatimone".indexOf("a");
      const before = text.getSubStringLength(0, aIndex);
      const letter = text.getSubStringLength(aIndex, 1);
      setGeometry({
        width,
        height,
        targetX: width / 2 - total / 2 + before + letter / 2,
        targetY: height * 0.43,
        wordTop: height * 0.54 - fontSize * 0.34,
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    window.addEventListener("resize", measure);
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const paint = () => {
      frame = 0;
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      setProgress(reduced.matches ? 1 : clamp(-section.getBoundingClientRect().top / distance));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); reduced.removeEventListener("change", schedule); };
  }, []);

  const zoom = ease(clamp(progress / 0.8));
  const scale = 1 + zoom * 18;
  const translation = `translate(${geometry.width / 2 - geometry.targetX * scale}px, ${geometry.height * 0.5 - geometry.targetY * scale}px) scale(${scale})`;
  const opening = clamp((progress - 0.73) / 0.17);
  const titleOpacity = 1 - clamp(progress / 0.18);

  const artworkField = (
    <div className="absolute inset-0 bg-olive-deep">
      <Image src={heroArtwork.image} alt="" fill sizes="100vw" className="object-cover opacity-80" />
      <div className="absolute inset-0 bg-olive-deep/35" />
    </div>
  );

  return (
    <section ref={sectionRef} className="relative" style={{ height: "235svh" }} aria-label="A passage through timatimone">
      <div className="sticky top-0 h-svh overflow-hidden bg-cream">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 transition-opacity duration-300" style={{ opacity: opening }}>{artworkField}</div>
          <div className="absolute inset-0 bg-cream" style={{ opacity: 1 - opening }} />
          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `url(#${id})` }}>{artworkField}</div>
        </div>
        <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id={id} clipPathUnits="userSpaceOnUse">
              <text ref={textRef} textAnchor="middle" dominantBaseline="middle" className="font-display font-semibold" style={{ transform: translation, transformOrigin: "0 0" }}>timatimone</text>
            </clipPath>
          </defs>
        </svg>
        <div className="relative mx-auto h-full max-w-[1440px] px-5 md:px-[4vw]">
          <div className="absolute left-5 right-5 text-center md:left-[4vw] md:right-[4vw]" style={{ top: `${Math.max(72, geometry.wordTop - 62)}px`, opacity: titleOpacity }}>
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-ink-soft">Timatimone Art Gallery</p>
            <p className="mt-3 font-display text-lg italic text-olive">A passage through texture, gold, and light</p>
          </div>
          <p className="absolute bottom-[11%] left-5 right-5 text-center font-sans text-[11px] uppercase tracking-[0.18em] text-ink-soft md:left-[4vw] md:right-[4vw]" style={{ opacity: titleOpacity }} aria-hidden="true">Scroll to enter</p>
          <div className="absolute inset-x-5 bottom-[11%] text-center text-cream md:inset-x-[4vw]" style={{ opacity: opening }}>
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-cream/75">Featured work</p>
            <h2 className="mt-3 font-display text-4xl font-medium md:text-5xl">{heroArtwork.title}</h2>
            <Link href={`/work/${heroArtwork.slug}`} className="link-underline mt-5 inline-block font-sans text-[12px] font-medium uppercase tracking-[0.18em]">View the artwork</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
