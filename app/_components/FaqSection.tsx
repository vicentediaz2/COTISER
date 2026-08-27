import { SectionIntro } from "./SectionIntro";

type FaqItem = {
  question: string;
  answer: string;
};

function brandedText(text: string) {
  return text.split(/(Cotiser)/gi).map((part, index) =>
    part.toLowerCase() === "cotiser" ? (
      <span key={`${part}-${index}`} className="font-black">
        COTISER
      </span>
    ) : (
      part
    ),
  );
}

export function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section
      id="preguntas-frecuentes"
      className="border-t border-blue-100 bg-blue-50 px-6 py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          tone="sky"
          title="Preguntas frecuentes sobre cotizaciones"
          description="Respuestas claras para comenzar a presentar tus servicios de manera profesional."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {items.map((item) => (
            <details
              key={item.question}
              className="group rounded-lg border border-blue-100 bg-white p-6 shadow-sm shadow-blue-950/5"
            >
              <summary className="cursor-pointer list-none pr-8 text-lg font-semibold text-slate-950 marker:hidden">
                {brandedText(item.question)}
              </summary>
              <p className="mt-4 leading-7 text-slate-600">
                {brandedText(item.answer)}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
