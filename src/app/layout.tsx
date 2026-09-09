import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/data/site";
import "./globals.css";

// Figma sets every text layer in Inter.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Hunter Hex Capital | Physical Gold, Silver & Precious Metals IRAs",
    template: `%s | ${site.name}`,
  },
  description:
    "Hunter Hex Capital specializes in placing physical gold, silver, and platinum directly into your hands or fully certified self-directed tax-advantaged IRAs.",
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: "Hunter Hex Capital | Physical Gold, Silver & Precious Metals IRAs",
    description:
      "Boutique physical metals brokerage and custody coordination. Investment-grade bullion, self-directed IRAs, and institutional-grade secure storage.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hunter Hex Capital",
    description:
      "Physical gold, silver, platinum and palladium for private and institutional clients.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
