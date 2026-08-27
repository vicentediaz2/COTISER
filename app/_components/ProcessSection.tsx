import { SectionIntro } from "./SectionIntro";

type ProcessSectionProps = {
  steps: string[];
};

export function ProcessSection({ steps }: ProcessSectionProps) {
  return (
    <section
      id="proceso"
      className="border-y border-blue-100 bg-blue-50 px-6 py-20 lg:px-8"
    >
      <div className="mx-auto  grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionIntro
          tone="sky"
          title="Cómo crear una cotización profesional en 3 pasos"
          description="Reutiliza la información de tu negocio para responder más rápido y presentar una propuesta ordenada a cada cliente."
        />

        <div className="grid gap-4">
          {steps.map((step, index) => (
            <div
              key={step}
              className="flex items-start gap-4 rounded-lg border border-blue-100 bg-white p-5 shadow-sm shadow-blue-950/5"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-blue-700 text-sm font-bold text-white">
                {index + 1}
              </span>
              <p className="text-lg font-semibold text-slate-900">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
