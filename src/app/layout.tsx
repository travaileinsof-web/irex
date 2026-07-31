import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IREX Mining — Ingénierie Minière d'Excellence | Guinea",
  description: "IREX MINING SARL — Solutions d'ingénierie minière innovantes, durables et responsables. Exploration, exploitation, HSE, logistique, maintenance et renforcement des capacités en République de Guinée.",
  keywords: ["IREX Mining", "ingénierie minière", "Guinée", "Conakry", "exploration minière", "HSE", "mines", "industrie minière", "consulting minier", "Afrique de l'Ouest"],
  authors: [{ name: "IREX Mining" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "IREX Mining — Ingénierie Minière d'Excellence",
    description: "Solutions d'ingénierie minière innovantes, durables et responsables en République de Guinée.",
    url: "https://www.irexmining.com",
    siteName: "IREX Mining",
    type: "website",
    locale: "fr_GN",
  },
  twitter: {
    card: "summary_large_image",
    title: "IREX Mining — Ingénierie Minière d'Excellence",
    description: "Solutions d'ingénierie minière innovantes, durables et responsables en République de Guinée.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <SonnerToaster />
      </body>
    </html>
  );
}
