import type { Metadata } from "next";
import "./globals.css";

const SITE_NAME = "Centro Jurídico NOA – Guía de Jubilación";
const DESCRIPTION =
  "Comprá tus aportes y avanzá con tu jubilación sin depender de nadie. Guía paso a paso con formularios ANSES y calculadora incluida. Dr. Fabricio Reyes • +500 jubilaciones exitosas.";
const BASE_URL = "https://cjnoa.com.ar"; // update when deploying

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: SITE_NAME,
  description: DESCRIPTION,
  keywords: [
    "jubilación",
    "aportes",
    "ANSES",
    "Ley 24476",
    "Ley 27705",
    "compra de aportes",
    "guía jubilación",
    "Centro Jurídico NOA",
  ],
  authors: [{ name: "Dr. Fabricio Reyes – Centro Jurídico NOA" }],
  openGraph: {
    title: SITE_NAME,
    description: DESCRIPTION,
    url: BASE_URL,
    siteName: "Centro Jurídico NOA",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Centro Jurídico NOA – Guía de Jubilación",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0B0B0B",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR">
      <body className="bg-white text-carbon antialiased">{children}</body>
    </html>
  );
}
