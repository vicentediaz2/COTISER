import { AudienceStrip } from "./_components/AudienceStrip";
import { ContactCta } from "./_components/ContactCta";
import { FeatureGrid } from "./_components/FeatureGrid";
import { HeroSection } from "./_components/HeroSection";
import { ProcessSection } from "./_components/ProcessSection";

const metrics = [
  { value: "3x", label: "mas velocidad" },
  { value: "24h", label: "seguimiento comercial" },
  { value: "98%", label: "cotizaciones trazables" },
];

const features = [
  {
    title: "Cotizaciones claras",
    description:
      "Arma propuestas con items, descuentos, impuestos y totales siempre visibles.",
  },
  {
    title: "Aprobaciones mas rapidas",
    description:
      "Se el primero en compartir una version profesional de tu cotizacion.",
  },
  {
    title: "Resultado mas Profecional",
    description:
      "Comparte la solucion mas profecional en el menor tiempo posible.",
  },
];

const steps = [
  "Carga productos y servicios",
  "Genera una propuesta editable",
  "Envia al instante el precio",
];

const audiences = ["Pymes", "Servicios", "Construccion", "Tecnologia"];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <HeroSection metrics={metrics} />
      <AudienceStrip audiences={audiences} />
      <FeatureGrid features={features} />
      <ProcessSection steps={steps} />
      <ContactCta />
    </main>
  );
}
