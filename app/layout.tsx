import type { Metadata } from "next";
import { Footer } from "./_components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cotiser | Cotizaciones profesionales",
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
      <body className="min-h-full flex flex-col">
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
