import Link from "next/link";
import { Brand } from "./Brand";
import { headerActions, headerActionGhostLight, headerActionSolidLight, headerInner } from "./headerStyles";

const navigation = [
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#preguntas-frecuentes", label: "Preguntas frecuentes" },
  { href: "/blog", label: "Blog" },
];

export function LandingHeader() {
  return (
    <header className="px-6 py-4 lg:px-8">
      <div className={headerInner}>
        <Brand light />
        <nav className="hidden items-center gap-1 sm:flex" aria-label="Navegación principal">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className={`inline-flex ${headerActionGhostLight}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={headerActions}>
          <Link href="/iniciar-sesion" className={`${headerActionGhostLight}`}>Ingresar</Link>
          <Link href="/registro" className={`inline-flex ${headerActionSolidLight}`}>Crear cuenta</Link>
        </div>
      </div>
    </header>
  );
}
