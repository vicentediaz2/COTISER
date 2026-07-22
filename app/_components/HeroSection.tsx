import Image from "next/image";
import Link from "next/link";
import { LandingHeader } from "./LandingHeader";

type Metric = {
  value: string;
  label: string;
};

type HeroSectionProps = {
  metrics: Metric[];
};

export function HeroSection({ metrics }: HeroSectionProps) {
  return (
    <section className="relative isolate overflow-hidden bg-blue-950 text-white">
      <Image
        src="/hero-cotizapro.png"
        alt="Dashboard de cotizaciones en tonos azules sobre un escritorio moderno"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-950/90 via-blue-900/65 to-blue-700/10" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />

      <LandingHeader />

      <div className="mx-auto flex min-h-[72svh] max-w-7xl flex-col justify-center px-6 pb-20 pt-10 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-blue-50 backdrop-blur">
            Software de cotizaciones para equipos comerciales
          </p>
          <h1 className="text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
            Cotiza mas rapido y gana mas proyectos.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-blue-50/90">
            Centraliza precios, clientes y propuestas en una landing lista para
            presentar tu producto con una imagen profesional.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/registro"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
            >
              Crear mi cuenta
            </Link>
            <a
              href="#beneficios"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Ver beneficios
            </a>
          </div>
        </div>

        <dl className="mt-12 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur"
            >
              <dt className="text-sm text-blue-50/80">{metric.label}</dt>
              <dd className="mt-2 text-3xl font-semibold text-white">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
