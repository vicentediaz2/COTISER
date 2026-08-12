import Link from "next/link";

export function LandingHeader() {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
      <Link href="/" className="flex items-center gap-3" aria-label="CotizaPro">
        <span className="grid size-10 place-items-center rounded-lg bg-white text-sm font-black text-blue-700 shadow-sm">
          CPRO
        </span>
        <span className="text-lg font-semibold">COTIZAPRO</span>
      </Link>
      <nav className="hidden items-center gap-8 text-sm font-medium text-blue-50/85 md:flex">
        <Link className="transition hover:text-white" href="/#beneficios">
          Beneficios
        </Link>
        <Link className="transition hover:text-white" href="/#proceso">
          Proceso
        </Link>
        <Link className="transition hover:text-white" href="/#contacto">
          Contacto
        </Link>
      </nav>
      <div className="flex items-center gap-2">
        <Link href="/iniciar-sesion" className="hidden px-3 py-2 text-sm font-semibold text-white transition hover:text-blue-100 sm:inline-flex">Ingresar</Link>
        <Link href="/registro" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50">Crear cuenta</Link>
      </div>
    </header>
  );
}
