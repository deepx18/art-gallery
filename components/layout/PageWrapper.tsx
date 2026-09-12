"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const pathname = usePathname();
  const [transitioning, setTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const isFirstRender = useRef(true);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      setTransitioning(true);

      // Batch: fade out, swap content, fade in
      const fadeTimer = setTimeout(() => {
        setDisplayChildren(children);
      }, 150);

      const revealTimer = setTimeout(() => {
        setTransitioning(false);
      }, 200);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(revealTimer);
      };
    }
  }, [pathname, children]);

  return (
    <div
      className="transition-opacity transition-transform"
      style={{
        opacity: transitioning ? 0 : 1,
        transform: transitioning ? "translateY(8px)" : "translateY(0)",
        transitionDuration: "300ms",
        transitionTimingFunction: "var(--ease-out-expo)",
      }}
    >
      {displayChildren}
    </div>
  );
}
