import Link from "next/link";
import { LandingHeader } from "./LandingHeader";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-blue-950 text-white">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-950/90 via-blue-900/65 to-blue-700/10" />

      <LandingHeader />

      <div className="mx-auto flex min-h-[72svh] max-w-7xl flex-col justify-center px-6 pb-12 pt-10 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
            Crea <span className="text-blue-50 font-black">cotizaciones</span> profesionales para ofrecer tus servicios
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-blue-50/90">
            <span className="font-black">COTISER</span> te ayuda a preparar
            presupuestos claros con tu logo, datos de contacto, servicios,
            precios e impuestos. Descárgalos en PDF o ábrelos como HTML y
            envíalos por el medio que prefieras.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/registro"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
            >
              Crear una cotización gratis
            </Link>
            <a
              href="#funcionalidades"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Ver cómo funciona
            </a>
          </div>
          <p className="mt-5 text-sm font-semibold text-blue-100">
            Gratis y sin suscripción. Tú mantienes el control de tus documentos.
          </p>
        </div>
      </div>
    </section>
  );
}
