"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Subtle scale on hover
  const scale = useTransform(
    x,
    [-50, 0, 50],
    prefersReducedMotion ? [1, 1, 1] : [1 - strength * 0.02, 1, 1 + strength * 0.02],
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || prefersReducedMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative inline-block ${className}`}
      style={{ x, y, scale }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {/* Subtle glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-none pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? "0 0 20px rgba(90, 96, 70, 0.15)"
            : "0 0 0px rgba(90, 96, 70, 0)",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
