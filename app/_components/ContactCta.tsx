import Link from "next/link";
import { SectionIntro } from "./SectionIntro";

export function ContactCta() {
  return (
    <section id="contacto" className="bg-white px-6 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-lg border border-blue-100 bg-blue-700 p-8 text-white shadow-xl shadow-blue-900/15 md:grid-cols-[1fr_auto] md:items-center lg:p-10">
        <SectionIntro
          tone="blue"
          eyebrow="Listo para publicar"
          title="Convierte visitantes en solicitudes de cotizacion."
          description="Una landing clara, responsive y enfocada en presentar valor desde el primer pantallazo."
        />
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
          <Link
            href="/demo"
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
          >
            Solicitar demo
          </Link>
          <a
            href="mailto:ventas@cotizapro.cl"
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
          >
            Contactar ventas
          </a>
        </div>
      </div>
    </section>
  );
}
