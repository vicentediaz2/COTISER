import { DraggableCarousel } from "./DraggableCarousel";
import { SectionIntro } from "./SectionIntro";

type WhoForItem = { title: string; description: string;  };
type WhoForSectionProps = { items: WhoForItem[] };

export function WhoForSection({ items }: WhoForSectionProps) {
  return (
    <section id="para-quien-es" className="bg-blue-50 px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          tone="sky"
          title="¿Para quién es Cotiser?"
          description="Si envías propuestas, precios o presupuestos, Cotiser está pensado para ahorrarte tiempo y errores."
        />
        <div className="mt-12">
          <DraggableCarousel label="Perfiles para los que Cotiser está pensado">
            {items.map((item, index) => (
              <article key={item.title} className="w-72 shrink-0 snap-start rounded-lg border border-blue-100 bg-white p-6 shadow-sm shadow-blue-950/5 sm:w-80">
                <span className="mb-4 grid size-10 place-items-center rounded-lg bg-blue-50 text-sm font-bold text-white">{index + 1}</span>
                <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </article>
            ))}
          </DraggableCarousel>
        </div>
      </div>
    </section>
  );
}
