import Image from "next/image";
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
            Más que <span className="text-blue-50">cotizar</span>. Haz que te <span className="text-blue-50">elijan</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-blue-50/90">
            Crea cotizaciones profesionales en minutos, mantén tu negocio organizado y presenta tus servicios de la forma que merecen.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/registro"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
            >
              Crear mi cuenta
            </Link>
            <a
              href="#funcionalidades"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Comó Funciona
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
