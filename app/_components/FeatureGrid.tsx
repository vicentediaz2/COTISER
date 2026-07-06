import { SectionIntro } from "./SectionIntro";

type Feature = {
  title: string;
  description: string;
};

type FeatureGridProps = {
  features: Feature[];
};

export function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <section id="beneficios" className="bg-white px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Beneficios"
          title="Una base solida para vender con mas orden."
          description="Nuestra aplicacion propone una nueva forma de tener control sobre tus clientes, destacando en velocidad de respuesta y una experiencia limpia para clientes que comparan propuestas."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-lg border border-blue-100 bg-white p-6 shadow-sm shadow-blue-950/5"
            >
              <div className="mb-5 grid size-11 place-items-center rounded-lg bg-blue-600 text-white">
                <span className="text-lg font-bold">+</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-950">
                {feature.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
