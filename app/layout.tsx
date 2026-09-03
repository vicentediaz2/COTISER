import type { Metadata } from "next";
import { ConditionalFooter } from "./_components/ConditionalFooter";
import { siteName, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "COTISER | Cotizaciones profesionales gratis",
    template: "%s | COTISER",
  },
  description:
    "Crea, organiza y descarga cotizaciones profesionales gratis para ofrecer tus servicios.",
  applicationName: siteName,
  authors: [{ name: "Vicente Díaz" }],
  creator: "Vicente Díaz",
  publisher: siteName,
  category: "business",
  keywords: [
    "crear cotización",
    "cotizaciones gratis",
    "presupuesto de servicios",
    "propuesta de servicios",
    "cotizador online",
    "cotizaciones Chile",
  ],
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName,
    title: "COTISER | Cotizaciones profesionales gratis",
    description:
      "Crea, organiza y descarga cotizaciones profesionales gratis para ofrecer tus servicios.",
    images: [
      {
        url: "/elementos-graficos/hero-cotiser.png",
        width: 5000,
        height: 2626,
        alt: "COTISER, herramienta gratuita para crear cotizaciones profesionales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "COTISER | Cotizaciones profesionales gratis",
    description:
      "Crea, organiza y descarga cotizaciones profesionales gratis para ofrecer tus servicios.",
    images: ["/elementos-graficos/hero-cotiser.png"],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "_w1FgE1pUa1LiS-GPygl9A4jQIZ47QSi2At87CTmTtw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <div className="flex flex-1 flex-col">{children}</div>
        <ConditionalFooter />
      </body>
    </html>
  );
}
