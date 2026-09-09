import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { portfolioData } from "@/data/portfolio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: portfolioData.metadata.title,
    template: `%s | ${portfolioData.hero.name}`,
  },
  description: portfolioData.metadata.description,
  keywords: portfolioData.metadata.keywords,
  authors: [{ name: portfolioData.metadata.author }],
  creator: portfolioData.metadata.author,
  metadataBase: new URL(portfolioData.metadata.siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: portfolioData.metadata.siteUrl,
    title: portfolioData.metadata.title,
    description: portfolioData.metadata.description,
    siteName: `${portfolioData.hero.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: portfolioData.metadata.title,
    description: portfolioData.metadata.description,
    creator: `@${portfolioData.hero.name.toLowerCase()}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth dark`}
    >
      <body className="bg-[#090a0f] text-zinc-100 min-h-screen flex flex-col font-sans antialiased selection:bg-emerald-500/30 selection:text-white">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
