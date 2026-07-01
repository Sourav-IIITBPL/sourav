import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sourav Yadav — Protocol Engineer & Smart Contract Security Researcher",
  description:
    "Web3 engineer building secure protocol infrastructure, auditing production DeFi systems, and shipping full-stack Web3 applications. 21+ competitive audits, 11 validated findings.",
  openGraph: {
    title: "Sourav Yadav — Protocol Engineer & Smart Contract Security Researcher",
    description:
      "Web3 engineer building secure protocol infrastructure, auditing production DeFi systems, and shipping full-stack Web3 applications.",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sourav Yadav — Protocol Engineer",
    description:
      "Web3 engineer building secure protocol infrastructure and auditing production DeFi systems.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body
        style={{
          fontFamily: "var(--font-body), system-ui, sans-serif",
        }}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
