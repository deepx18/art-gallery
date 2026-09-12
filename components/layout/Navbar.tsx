"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { artist } from "@/data/artist";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/commissions", label: "Commissions" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-olive focus:text-cream focus:px-4 focus:py-2 focus:text-[12px] focus:uppercase focus:tracking-[0.18em] focus:font-sans"
      >
        Skip to content
      </a>

      <nav className="sticky top-0 z-50 h-20 bg-cream/90 backdrop-blur-md border-b border-line">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-5 md:px-[4vw]">
          {/* Logo / Name */}
          <Link
            href="/"
            className="font-display text-lg font-medium tracking-wide text-ink hover:opacity-70 transition-opacity"
          >
            {artist.gallery}
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                pathname.startsWith(link.href + "/");
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative text-[12px] uppercase tracking-[0.18em] font-medium font-sans transition-opacity hover:opacity-100 py-1 ${
                      isActive ? "text-ink opacity-100" : "text-ink opacity-70"
                    }`}
                  >
                    {link.label}
                    {/* Active underline indicator */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-ink" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile menu button — 44×44 touch target */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden relative z-50 w-11 h-11 flex items-center justify-center"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span
              className={`block w-5 h-[1.5px] bg-ink transition-all duration-300 ${
                open ? "rotate-45 translate-y-[0.5px]" : "-translate-y-[4px]"
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-ink transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-[1px]" : "translate-y-[3px]"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-cream/98 backdrop-blur-lg flex flex-col items-center justify-center gap-10 transition-all duration-300 md:hidden ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {navLinks.map((link, i) => {
          const isActive =
            pathname === link.href ||
            pathname.startsWith(link.href + "/");
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`font-display text-4xl font-medium transition-opacity ${
                isActive ? "text-ink opacity-100" : "text-ink hover:opacity-60"
              }`}
              style={{
                transitionDelay: open ? `${i * 60}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 400ms var(--ease-out-expo) ${i * 60}ms, transform 400ms var(--ease-out-expo) ${i * 60}ms`,
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </>
  );
}
