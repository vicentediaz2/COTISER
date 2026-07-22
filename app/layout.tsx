import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CotizaPro | Cotizaciones profesionales",
  description:
    "Crea, organiza y consulta cotizaciones profesionales para tu negocio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
