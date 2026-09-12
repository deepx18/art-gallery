import Link from "next/link";
import { artist } from "@/data/artist";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/commissions", label: "Commissions" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto max-w-[1440px] px-5 md:px-[4vw] py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-0">
          {/* Brand */}
          <div>
            <p className="font-display text-lg font-medium text-ink mb-2">
              {artist.gallery}
            </p>
            <p className="text-[13px] text-ink-soft font-sans">
              {artist.location}
            </p>
          </div>

          {/* Social links */}
          <div className="flex flex-col gap-1">
            <a
              href={artist.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] uppercase tracking-[0.18em] text-ink-soft hover:text-ink transition-colors font-sans"
            >
              Instagram
            </a>
            <a
              href={`mailto:${artist.email}`}
              className="text-[12px] uppercase tracking-[0.18em] text-ink-soft hover:text-ink transition-colors font-sans"
            >
              Email
            </a>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[12px] uppercase tracking-[0.18em] text-ink-soft hover:text-ink transition-colors font-sans"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-line">
          <p className="text-[11px] text-ink-soft font-sans">
            © {new Date().getFullYear()} {artist.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
