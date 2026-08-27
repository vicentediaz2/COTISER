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
          title="Presenta tus servicios con un documento claro y profesional"
          description={
            <>
              Una cotización, también llamada presupuesto o propuesta de
              servicios, explica qué trabajo realizarás, cuánto cuesta y bajo
              qué condiciones. <span className="font-black">COTISER</span> te
              permite crearla sin empezar desde cero cada vez.
            </>
          }
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-lg border border-blue-100 bg-white p-6 shadow-sm shadow-blue-950/5"
            >
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
