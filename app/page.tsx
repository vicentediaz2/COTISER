import { ContactCta } from "./_components/ContactCta";
import { DifferenceSection } from "./_components/DifferenceSection";
import { FeatureGrid } from "./_components/FeatureGrid";
import { FeaturesSection } from "./_components/FeaturesSection";
import { HeroSection } from "./_components/HeroSection";
import { ProcessSection } from "./_components/ProcessSection";
import { WhoForSection } from "./_components/WhoForSection";

const resolvedProblems = [
  {
    title: "Documentos desordenados",
    description:
      "Tus cotizaciones terminan repartidas entre carpetas, archivos y conversaciones.",
  },
  {
    title: "Demasiado tiempo creando documentos",
    description:
      "Repetir clientes, servicios, precios y dato en cada documento que creas.",
  },
  {
    title: "Información difícil de rastrear",
    description:
      "Encontrar que cotizaste, a quien y cuales si fueron aceptadas ",
  },
];

const steps = [
  "Guarda tus servicios, precios y detalles para tenerlos disponibles cada qué crees una nueva cotización.",
  "Registra a tus clientes y utiliza su información directamente al crear una nueva cotización.",
  "Agrega los servicios, cantidades, precios y condiciones de la cotización y exportarlo como PDF o HTML.",
];

const appFeatures = [
  {
    title: "Registro e inicio de sesion",
    description:
      "Acceso seguro con Supabase Auth por correo y contraseña.",
  },
  {
    title: "Gestion de clientes",
    description:
      "Agrega, edita y organiza tus clientes con sus datos de contacto.",
  },
  {
    title: "Catalogo de servicios",
    description:
      "Mantén una lista de servicios y precios lista para reutilizar.",
  },
  {
    title: "Cotizaciones con impuestos y descuentos",
    description:
      "Montos, descuentos e impuestos calculados automaticamente.",
  },
  {
    title: "Historial con filtros",
    description:
      "Busca y filtra tus propuestas por estado, cliente, fecha o monto.",
  },
];

const differences = [
  {
    title: "Simple",
    iconPath: "/svg/Facil.svg",
    description:
      "Enfocada en una tarea concreta: ayudarte a crear y organizar tus cotizaciones.",
  },
  {
    title: "Gratis",
    iconPath: "/svg/Gratis.svg",
    description:
      "Utiliza la aplicación sin pagar una suscripción mensual.",
  },
  {
    title: "Código abierto",
    iconPath: "/svg/Codigo-Libre.svg",
    description:
      "El código de la aplicación está disponible públicamente, ofreciendo mayor transparencia y libertad.",
  },
  {
    title: "Para autónomos",
    iconPath: "/svg/independientes.svg",
    description:
      "Diseñada pensando en freelances y pequeños negocios que necesitan una herramienta sencilla para trabajar con sus clientes.",
  },
];

const whoFor = [
  {
    title: "Diseñadores",
    description:
      "Crea cotizaciones profesionales para tus proyectos y servicios de diseño.",
  },
  {
    title: "Desarrolladores",
    description:
      "Organiza servicios de desarrollo y genera cotizaciones para nuevos proyectos.",
  },
  {
    title: "Consultores",
    description:
      "Presenta tus servicios y precios de forma clara y profesional.",
  },
  {
    title: "Profesionales independientes",
    description:
      "Mantén clientes, servicios y cotizaciones organizados sin depender de hojas de cálculo.",
  },
  {
    title: "Pequeños negocios ",
    description:
      "Centraliza tus cotizaciones y evita perder información entre documentos.",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <HeroSection />
      <FeatureGrid features={resolvedProblems} />
      <ProcessSection steps={steps} />
      <FeaturesSection features={appFeatures} />
      <ContactCta />
      <WhoForSection items={whoFor} />
      <DifferenceSection differences={differences} />
    </main>
  );
}
