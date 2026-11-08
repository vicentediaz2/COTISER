import Link from "next/link";
import { Brand } from "@/app/_components/Brand";
import {
  headerActions,
  headerActionBase,
  headerActionPrimary,
  headerActionSecondary,
  headerInner,
} from "@/app/_components/headerStyles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos, guías y reportes sobre cotizaciones, plantillas y organización con COTISER.",
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-col bg-white text-slate-950">
      <header className="sticky top-0 z-20 border-b border-blue-100 bg-white/90 py-4 backdrop-blur">
        <div className={headerInner}>
          <Brand />
          <nav className="hidden items-center gap-1 sm:flex" aria-label="Navegación del blog">
            <Link
              href="/"
              className={`inline-flex ${headerActionBase} text-slate-600 hover:bg-blue-50 hover:text-blue-700`}
            >
              Inicio
            </Link>
            <Link
              href="/blog"
              className={`inline-flex ${headerActionBase} text-slate-600 hover:bg-blue-50 hover:text-blue-700`}
            >
              Blog
            </Link>
          </nav>
          <div className={headerActions}>
            <Link href="/iniciar-sesion" className={`hidden sm:inline-flex ${headerActionSecondary}`}>
              Ingresar
            </Link>
            <Link href="/registro" className={`inline-flex ${headerActionPrimary}`}>
              Crear cuenta
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 px-6 py-10 lg:py-14">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
