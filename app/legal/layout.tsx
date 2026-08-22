import Link from "next/link";
import { Brand } from "@/app/_components/Brand";

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
    <div className="flex min-h-screen flex-col bg-slate-100 text-slate-950">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <Brand />
          <nav className="hidden items-center gap-1 sm:flex" aria-label="Documentos legales">
            {legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-100 hover:text-blue-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 px-6 py-12 lg:py-16">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
