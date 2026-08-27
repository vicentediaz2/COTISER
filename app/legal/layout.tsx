import Link from "next/link";
import { Brand } from "@/app/_components/Brand";
import { headerActions, headerActionBase, headerActionPrimary, headerActionSecondary, headerInner } from "@/app/_components/headerStyles";

const legalNav = [
  { href: "/legal/terminos", label: "Términos" },
  { href: "/legal/privacidad", label: "Privacidad" },
  { href: "/legal/cookies", label: "Cookies" },
];

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col bg-slate-100 text-slate-950">
      <header className="sticky top-0 z-20 py-4 border-b border-blue-100 bg-white/90 backdrop-blur">
        <div className={headerInner}>
          <Brand />
          <nav className="hidden items-center gap-1 sm:flex" aria-label="Documentos legales">
            {legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex ${headerActionBase} text-slate-600 hover:bg-blue-50 hover:text-blue-700`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className={headerActions}>
            <Link href="/iniciar-sesion" className={`hidden sm:inline-flex ${headerActionSecondary}`}>Ingresar</Link>
            <Link href="/registro" className={`inline-flex ${headerActionPrimary}`}>Crear cuenta</Link>
          </div>
        </div>
      </header>
      <main className="flex-1 px-6 py-12 lg:py-16">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
