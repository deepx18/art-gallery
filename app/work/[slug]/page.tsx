import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artworks, getArtwork, getAdjacentArtworks } from "@/data/artworks";
import ArtworkMeta from "@/components/artwork/ArtworkMeta";
import Reveal from "@/components/motion/Reveal";
import ImageReveal from "@/components/motion/ImageReveal";

interface ArtworkPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return artworks.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: ArtworkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artwork = getArtwork(slug);
  if (!artwork) return { title: "Not Found" };

  return {
    title: `${artwork.title}`,
    description: artwork.description,
    openGraph: {
      title: `Fatima Garcia — ${artwork.title}`,
      description: artwork.description,
      images: [{ url: artwork.image, width: artwork.width, height: artwork.height }],
    },
  };
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { slug } = await params;
  const artwork = getArtwork(slug);
  if (!artwork) notFound();

  const { prev, next } = getAdjacentArtworks(slug);

  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-[4vw] py-12 md:py-20">
      {/* Back link */}
      <Reveal>
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] font-medium font-sans text-ink-soft hover:text-ink transition-colors mb-10 md:mb-14 group"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Back to work
        </Link>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        {/* Image with clip-path reveal */}
        <ImageReveal className="lg:col-span-8">
          <Image
            src={artwork.image}
            alt={artwork.title}
            width={artwork.width}
            height={artwork.height}
            priority
            className="w-full h-auto object-cover"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
        </ImageReveal>

        {/* Meta */}
        <Reveal delay={150} className="lg:col-span-4 lg:col-start-9">
          <ArtworkMeta artwork={artwork} />
        </Reveal>
      </div>

      {/* Prev / Next with thumbnails */}
      <div className="mt-16 md:mt-24 border-t border-line pt-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Previous */}
          <div>
            {prev ? (
              <Link
                href={`/work/${prev.slug}`}
                className="group block"
              >
                <span className="text-[11px] uppercase tracking-[0.18em] text-ink-soft font-sans">
                  ← Previous
                </span>
                <div className="mt-3 flex items-center gap-4">
                  <div className="relative w-16 h-16 overflow-hidden shrink-0">
                    <Image
                      src={prev.image}
                      alt={prev.title}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <p className="font-display text-lg font-medium text-ink group-hover:underline group-hover:decoration-olive group-hover:underline-offset-4 transition-all">
                    {prev.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* Next */}
          <div className="text-right">
            {next ? (
              <Link
                href={`/work/${next.slug}`}
                className="group block"
              >
                <span className="text-[11px] uppercase tracking-[0.18em] text-ink-soft font-sans">
                  Next →
                </span>
                <div className="mt-3 flex items-center justify-end gap-4">
                  <p className="font-display text-lg font-medium text-ink group-hover:underline group-hover:decoration-olive group-hover:underline-offset-4 transition-all">
                    {next.title}
                  </p>
                  <div className="relative w-16 h-16 overflow-hidden shrink-0">
                    <Image
                      src={next.image}
                      alt={next.title}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
