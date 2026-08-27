import Image from "next/image";
import { SectionIntro } from "./SectionIntro";

type Difference = {
  title: string;
  description: string;
  iconPath: string;
};

type DifferenceSectionProps = {
  differences: Difference[];
};

export function DifferenceSection({ differences }: DifferenceSectionProps) {
  return (
    <section id="diferencias" className="bg-white px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          title="Una forma simple y profesional de cotizar"
          description="Crea un documento que represente mejor tu trabajo, sin pagar una suscripción ni depender de plantillas desordenadas."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {differences.map((difference) => (
            <article
              key={difference.title}
              className="rounded-lg border border-blue-100 bg-white p-6 shadow-sm shadow-blue-950/5"
            >
              <div className="mb-5 grid size-11 rounded-lg bg-blue-50 text-white">
                <span className="mb-4 grid size-16 self-start rounded-lg bg-blue-50 text-sm font-bold text-white">
                  <Image
                    src={difference.iconPath}
                    alt=""
                    width={64}
                    height={64}
                  />
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-950">
                {difference.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {difference.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
