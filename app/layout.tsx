import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "700"],
});

const mono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Serviotek — Petits gadgets, grande utilité",
    template: "%s | Serviotek",
  },
  description:
    "Serviotek vend des petits gadgets électriques du quotidien, au juste prix.",
  openGraph: {
    title: "Serviotek — Petits gadgets, grande utilité",
    description:
      "Serviotek vend des petits gadgets électriques du quotidien, au juste prix.",
    siteName: "Serviotek",
    locale: "fr_FR",
    type: "website",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  name: "Serviotek",
  url: SITE_URL,
  description:
    "Serviotek vend des petits gadgets électriques du quotidien, au juste prix.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`${display.variable} ${mono.variable} font-display`}>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieConsent />
        </CartProvider>
      </body>
    </html>
  );
}
