import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/layout/PageWrapper";
import PageLoader from "@/components/loading/PageLoader";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Timatimone Art — Fatima Garcia",
    template: "%s — Timatimone Art",
  },
  description:
    "Timatimone Art Gallery — sculptural mixed media artwork by Fatima Garcia. Moroccan roots, Hudson Valley life. Art as healing.",
  metadataBase: new URL("https://timatimone.art"),
  openGraph: {
    title: "Timatimone Art — Fatima Garcia",
    description:
      "Sculptural mixed media artwork by Fatima Garcia. Moroccan roots, Hudson Valley life.",
    url: "https://timatimone.art",
    siteName: "Timatimone Art",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Timatimone Art — Fatima Garcia",
    description:
      "Sculptural mixed media artwork by Fatima Garcia. Moroccan roots, Hudson Valley life.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <PageLoader />
        <Navbar />
        <main id="main-content" className="flex-1">
          <PageWrapper>{children}</PageWrapper>
        </main>
        <Footer />
      </body>
    </html>
  );
}
