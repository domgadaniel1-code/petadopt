import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PetAdopt - Adoptez votre compagnon idéal",
  description: "Plateforme d'adoption payante de chiens et chats. Adoptez en toute sécurité avec paiement sécurisé. Refuges, éleveurs et adoptants réunis.",
  keywords: ["adoption", "chien", "chat", "animal", "refuge", "éleveur", "PetAdopt"],
  authors: [{ name: "PetAdopt" }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐾</text></svg>",
  },
  openGraph: {
    title: "PetAdopt - Adoptez votre compagnon idéal",
    description: "Plateforme d'adoption payante de chiens et chats",
    url: "https://petadopt.fr",
    siteName: "PetAdopt",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
