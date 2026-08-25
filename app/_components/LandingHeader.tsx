import Link from "next/link";
import { Brand } from "./Brand";
import { headerActions, headerActionGhostLight, headerActionSolidLight, headerInner } from "./headerStyles";

export function LandingHeader() {
  return (
    <header className="px-6 py-4 lg:px-8">
      <div className={headerInner}>
        <Brand light />
        <div className={headerActions}>
          <Link href="/iniciar-sesion" className={`${headerActionGhostLight} hidden sm:inline-flex`}>Ingresar</Link>
          <Link href="/registro" className={`inline-flex ${headerActionSolidLight}`}>Crear cuenta</Link>
        </div>
      </div>
    </header>
  );
}
