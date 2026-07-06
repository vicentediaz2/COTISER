import Link from "next/link";
import { DemoHighlights } from "./_components/DemoHighlights";
import { DemoRequestForm } from "./_components/DemoRequestForm";

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-blue-50 text-slate-950">
      <header className="border-b border-blue-100 bg-white px-6 py-5 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-blue-700 text-sm font-black text-white shadow-sm">
              CPRO
            </span>
            <span className="text-lg font-semibold text-blue-900">
              COTIZAPRO
            </span>
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            Volver al inicio
          </Link>
        </div>
      </header>

      <section className="px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <DemoHighlights />
          <div>
            <p className="text-sm font-semibold uppercase text-blue-700">
              Solicitud de demo
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold text-slate-950 sm:text-5xl">
              Conversemos sobre tus cotizaciones.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Deja tus datos y prepara una conversacion enfocada en ordenar
              precios, propuestas y seguimiento comercial.
            </p>
            <div className="mt-8">
              <DemoRequestForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
