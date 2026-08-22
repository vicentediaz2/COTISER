import Link from "next/link";

const legalDocs = [
  {
    href: "/legal/terminos",
    title: "Términos y condiciones",
    description:
      "Las reglas que rigen el uso de COTISER: cuenta, responsabilidades, propiedad intelectual y limitación de responsabilidad.",
  },
  {
    href: "/legal/privacidad",
    title: "Política de privacidad",
    description:
      "Cómo recolectamos, usamos, almacenamos y protegemos los datos personales en cumplimiento de la normativa chilena vigente.",
  },
  {
    href: "/legal/cookies",
    title: "Política de cookies",
    description:
      "Qué cookies utilizamos, para qué sirven y por qué no requerimos un banner de consentimiento para usarlas.",
  },
];

export default function LegalIndexPage() {
  return (
    <>
      <h1 className="legal-title">Información legal</h1>
      <p className="legal-p max-w-2xl">
        Encuentra aquí los documentos que regulan el uso de{" "}
        <span className="font-black">COTISER</span>, la protección de tus
        datos y el tratamiento de cookies dentro de la Plataforma.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {legalDocs.map((doc) => (
          <Link
            key={doc.href}
            href={doc.href}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <span className="text-lg font-bold text-slate-950">{doc.title}</span>
            <span className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
              {doc.description}
            </span>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700">
              Ver documento
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                fill="none"
                className="size-4 transition-transform group-hover:translate-x-0.5"
              >
                <path
                  d="M6 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-10 rounded-2xl border border-blue-200 bg-blue-100 px-6 py-5 text-sm leading-relaxed text-slate-700">
        ¿Tienes preguntas sobre estos documentos? Escríbenos a{" "}
        <a href="mailto:vicentedaniel.diaz2+cotiser@gmail.com" className="legal-link">
          vicentedaniel.diaz2+cotiser@gmail.com
        </a>
        .
      </p>
    </>
  );
}
