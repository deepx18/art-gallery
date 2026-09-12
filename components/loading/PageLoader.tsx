"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Start fading after content is likely loaded
    const fadeTimer = setTimeout(() => setFading(true), 600);
    // Remove from DOM after fade
    const removeTimer = setTimeout(() => setVisible(false), 900);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="page-loader fixed inset-0 z-[200] flex flex-col items-center justify-center bg-cream transition-opacity"
      style={{
        opacity: fading ? 0 : 1,
        transitionDuration: "300ms",
        transitionTimingFunction: "var(--ease-out-expo)",
      }}
      aria-hidden="true"
    >
      {/* Botanical motif with line-draw animation */}
      <svg
        className="w-20 h-28 text-olive"
        viewBox="0 0 400 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main stem — draws in */}
        <path
          d="M200 580 C200 500, 195 400, 200 300 C205 200, 200 100, 200 20"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.3"
          strokeDasharray="600"
          strokeDashoffset="600"
          style={{
            animation: "loader-draw 800ms var(--ease-out-expo) forwards",
          }}
        />
        {/* Left leaf */}
        <path
          d="M200 480 C160 460, 100 440, 60 420 C80 430, 140 445, 200 460"
          fill="currentColor"
          opacity="0.08"
          style={{
            animation: "loader-fade 600ms var(--ease-out-expo) 300ms forwards",
            opacity: 0,
          }}
        />
        {/* Right leaf */}
        <path
          d="M200 440 C240 420, 300 400, 340 385 C310 395, 250 415, 200 430"
          fill="currentColor"
          opacity="0.06"
          style={{
            animation: "loader-fade 600ms var(--ease-out-expo) 400ms forwards",
            opacity: 0,
          }}
        />
      </svg>

      {/* Gallery name fades in */}
      <p
        className="mt-6 font-display text-sm tracking-[0.2em] text-ink-soft"
        style={{
          animation: "loader-fade 500ms var(--ease-out-expo) 200ms forwards",
          opacity: 0,
        }}
      >
        Timatimone
      </p>
    </div>
  );
}
