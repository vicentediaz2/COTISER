import type { Metadata } from "next";
import { ConditionalFooter } from "./_components/ConditionalFooter";
import { siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cotiser | Cotizaciones profesionales gratis",
    template: "%s | Cotiser",
  },
  description:
    "Crea, organiza y descarga cotizaciones profesionales gratis para ofrecer tus servicios.",
  applicationName: "Cotiser",
  authors: [{ name: "Vicente Díaz" }],
  creator: "Vicente Díaz",
  publisher: "Cotiser",
  category: "business",
  keywords: [
    "crear cotización",
    "cotizaciones gratis",
    "presupuesto de servicios",
    "propuesta de servicios",
    "cotizador online",
    "cotizaciones Chile",
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
