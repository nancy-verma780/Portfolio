import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { MotionProvider } from "@/components/MotionProvider";
import { profile } from "@/data/profile";
import "./globals.css";

const bricolage = localFont({
  src: "../fonts/bricolage.woff2",
  variable: "--font-bricolage",
  weight: "200 800",
  display: "swap",
});

const newsreader = localFont({
  src: "../fonts/newsreader.woff2",
  variable: "--font-newsreader",
  weight: "200 800",
  display: "swap",
});

const devanagari = localFont({
  src: "../fonts/devanagari.woff2",
  variable: "--font-devanagari",
  weight: "100 900",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const description =
  "Nancy Verma is a second-year CSE (AI & ML) student in Delhi building full-stack, AI-backed products and contributing to open source.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name}, developer`,
  description,
  authors: [{ name: profile.name, url: profile.links.github }],
  openGraph: {
    type: "profile",
    title: `${profile.name}, developer`,
    description,
    url: "/",
    siteName: profile.name,
  },
  twitter: { card: "summary_large_image", title: profile.name, description, creator: "@nancyverma780" },
};

export const viewport: Viewport = {
  themeColor: "#0d0e14",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${newsreader.variable} ${devanagari.variable}`}>
      <body className="grain bg-ink text-paper antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
