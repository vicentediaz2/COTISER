import { DraggableCarousel } from "./DraggableCarousel";
import { SectionIntro } from "./SectionIntro";

type FeatureItem = { title: string; description: string };
type FeaturesSectionProps = { features: FeatureItem[] };

export function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <section id="funcionalidades" className="bg-white px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          title="Todo lo que necesitas para cotizar tus servicios"
          description="Administra clientes, reutiliza tus servicios y crea documentos con precios, descuentos e impuestos desde un solo lugar."
        />
        <div className="mt-12">
          <DraggableCarousel label="Funcionalidades de Cotiser">
            {features.map((feature) => (
              <article key={feature.title} className="w-72 shrink-0 snap-start rounded-lg border border-blue-100 bg-white p-6 shadow-sm shadow-blue-950/5 sm:w-80">
                <h3 className="text-lg font-semibold text-slate-950">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
              </article>
            ))}
          </DraggableCarousel>
        </div>
      </div>
    </section>
  );
}
