"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { HaloReel, type HaloReelItem } from "@/components/ui/halo-reel";
import { artworks, heroArtwork } from "@/data/artworks";
import { artist } from "@/data/artist";

const REEL_ITEMS: HaloReelItem[] = artworks.map((artwork) => ({
  src: artwork.image,
  alt: `${artwork.title} - ${artwork.medium}, ${artwork.year}`,
}));

const SELECTED_WORK = artworks.filter((artwork) => artwork.slug !== heroArtwork.slug);
const clamp = (value: number) => Math.min(1, Math.max(0, value));
const ease = (value: number) =>
  value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2;

export default function HeroCarousel() {
  const clipId = `timatimone-clip-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<SVGTextElement>(null);
  const titleDisplayRef = useRef<SVGTextElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [geometry, setGeometry] = useState({ width: 1, height: 1, targetX: 0, targetY: 0 });

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const title = titleRef.current;
    const titleDisplay = titleDisplayRef.current;
    if (!stage || !title) return;
    const measure = () => {
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      const fontSize = Math.min(width / 5.9, height * 0.34);
      title.setAttribute("font-size", String(fontSize));
      title.setAttribute("x", String(width / 2));
      title.setAttribute("y", String(height * 0.52));
      if (titleDisplay) {
        titleDisplay.setAttribute("font-size", String(fontSize));
        titleDisplay.setAttribute("x", String(width / 2));
        titleDisplay.setAttribute("y", String(height * 0.52));
      }
      const total = title.getComputedTextLength();
      const focusIndex = "Timatimone".indexOf("a");
      const before = title.getSubStringLength(0, focusIndex);
      const letter = title.getSubStringLength(focusIndex, 1);
      setGeometry({
        width,
        height,
        targetX: width / 2 - total / 2 + before + letter / 2,
        targetY: height * 0.41,
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const paint = () => {
      frame = 0;
      const stageTop = stage.getBoundingClientRect().top;
      const distance = Math.max(1, section.offsetHeight - stage.offsetHeight);
      setProgress(motion.matches ? 1 : clamp((stageTop - section.getBoundingClientRect().top) / distance));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
    };
  }, []);

  const zoom = ease(clamp((progress - 0.08) / 0.67));
  const scale = 1 + zoom * 17;
  const titleTransform = `translate(${geometry.width / 2 - geometry.targetX * scale}px, ${geometry.height * 0.5 - geometry.targetY * scale}px) scale(${scale})`;
  const heroOpacity = 1 - clamp((progress - 0.06) / 0.18);
  const railOpacity = clamp((progress - 0.72) / 0.18);
  const railInteractive = progress > 0.88;

  const moveRail = (direction: number) => {
    railRef.current?.scrollBy({ left: direction * railRef.current.clientWidth * 0.75, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="relative bg-cream" style={{ height: "250svh" }} aria-label="Featured artwork and selected work">
      <div ref={stageRef} className="sticky top-20 h-[85svh] overflow-hidden bg-cream">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-cream" style={{ opacity: 1 - railOpacity }} />
          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `url(#${clipId})` }}>
            <SelectedWorkRail railRef={railRef} interactive={false} />
          </div>
          <div className="absolute inset-0 transition-opacity duration-300" style={{ opacity: railOpacity }}>
            <SelectedWorkRail railRef={railRef} interactive={railInteractive} />
          </div>
        </div>

        <HaloReel
          items={REEL_ITEMS}
          aria-label="Featured artwork"
          centerLabel={
            <div className="text-center pointer-events-none select-none" style={{ opacity: heroOpacity }}>
              <span className="mb-3 block font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-ink-soft">
                {artist.name} · Mixed Media Artist
              </span>
              <p className="mx-auto mb-6 max-w-sm font-sans text-[14px] leading-relaxed text-ink-soft">
                Sculptural mixed media art rooted in Moroccan heritage, shaped by the Hudson Valley. Every piece is a therapy moment made tangible.
              </p>
              <Link href="/work" className="link-underline pointer-events-auto font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-ink">
                Explore the work
              </Link>
            </div>
          }
          cardWidth={160}
          cardHeight={220}
          minScale={0.35}
          radiusXRatio={0.42}
          centerXRatio={0}
          radiusYRatio={0.32}
          holdDuration={2500}
          stepDuration={800}
          spread={1.15}
          className="h-full bg-transparent transition-opacity duration-200"
          style={{ opacity: heroOpacity, pointerEvents: progress > 0.12 ? "none" : "auto" }}
        />

        <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <text ref={titleRef} textAnchor="middle" dominantBaseline="middle" className="font-display font-semibold" style={{ transform: titleTransform, transformOrigin: "0 0" }}>
                Timatimone
              </text>
            </clipPath>
          </defs>
          <text
            ref={titleDisplayRef}
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-display font-medium"
            style={{ opacity: heroOpacity, transform: titleTransform, transformOrigin: "0 0", fill: "#22201A" }}
          >
            Timatimone
          </text>
        </svg>

        <h1 className="sr-only">Timatimone</h1>

        <div className="pointer-events-none absolute inset-x-5 bottom-7 z-20 text-center font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft md:inset-x-[4vw]" style={{ opacity: 1 - clamp(progress / 0.16) }} aria-hidden="true">
          Scroll to enter
        </div>
        <div className="absolute inset-x-5 bottom-6 z-20 flex justify-between md:inset-x-[4vw]" style={{ opacity: railOpacity, pointerEvents: railInteractive ? "auto" : "none" }}>
          <button type="button" onClick={() => moveRail(-1)} aria-label="Previous selected artwork" title="Previous selected artwork" className="grid size-11 place-items-center border border-cream/70 bg-olive-deep/80 text-cream transition-colors hover:bg-olive-deep">&#8592;</button>
          <button type="button" onClick={() => moveRail(1)} aria-label="Next selected artwork" title="Next selected artwork" className="grid size-11 place-items-center border border-cream/70 bg-olive-deep/80 text-cream transition-colors hover:bg-olive-deep">&#8594;</button>
        </div>
      </div>
    </section>
  );
}

function SelectedWorkRail({ railRef, interactive }: { railRef: RefObject<HTMLDivElement | null>; interactive: boolean }) {
  return (
    <div ref={railRef} className="flex h-full snap-x snap-mandatory items-center gap-4 overflow-x-auto bg-olive-deep px-[8vw] py-16 [scrollbar-width:none] md:gap-7 md:px-[15vw]" style={{ pointerEvents: interactive ? "auto" : "none" }}>
      {SELECTED_WORK.map((artwork) => (
        <Link key={artwork.slug} href={`/work/${artwork.slug}`} tabIndex={interactive ? 0 : -1} className="group relative h-[min(62svh,680px)] w-[min(72vw,760px)] shrink-0 snap-center overflow-hidden bg-olive-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream md:w-[min(52vw,760px)]">
          <Image src={artwork.image} alt={artwork.title} fill sizes="(max-width: 768px) 72vw, 52vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-5 pb-5 pt-20 text-cream md:px-7 md:pb-7">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-cream/75">{artwork.medium} · {artwork.year}</p>
            <h2 className="mt-2 font-display text-3xl font-medium md:text-4xl">{artwork.title}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
