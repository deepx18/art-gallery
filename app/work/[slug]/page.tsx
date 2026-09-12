import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artworks, getArtwork, getAdjacentArtworks } from "@/data/artworks";
import ArtworkMeta from "@/components/artwork/ArtworkMeta";
import Reveal from "@/components/motion/Reveal";

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
          className="inline-block text-[12px] uppercase tracking-[0.18em] font-medium font-sans text-ink-soft hover:text-ink transition-colors mb-10 md:mb-14"
        >
          ← Back to work
        </Link>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        {/* Image */}
        <Reveal className="lg:col-span-8">
          <Image
            src={artwork.image}
            alt={artwork.title}
            width={artwork.width}
            height={artwork.height}
            priority
            className="w-full h-auto object-cover"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
        </Reveal>

        {/* Meta */}
        <Reveal delay={80} className="lg:col-span-4 lg:col-start-9">
          <ArtworkMeta artwork={artwork} />
        </Reveal>
      </div>

      {/* Prev / Next */}
      <div className="mt-16 md:mt-24 flex justify-between items-start gap-8 border-t border-line pt-8">
        {prev ? (
          <Link
            href={`/work/${prev.slug}`}
            className="group block"
          >
            <span className="text-[11px] uppercase tracking-[0.18em] text-ink-soft font-sans">
              Previous
            </span>
            <p className="font-display text-xl font-medium text-ink mt-1 group-hover:opacity-60 transition-opacity">
              {prev.title}
            </p>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className="group block text-right"
          >
            <span className="text-[11px] uppercase tracking-[0.18em] text-ink-soft font-sans">
              Next
            </span>
            <p className="font-display text-xl font-medium text-ink mt-1 group-hover:opacity-60 transition-opacity">
              {next.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </section>
  );
}
