import type { Metadata } from "next";
import { ContactCta } from "./_components/ContactCta";
import { DifferenceSection } from "./_components/DifferenceSection";
import { FaqSection } from "./_components/FaqSection";
import { FeatureGrid } from "./_components/FeatureGrid";
import { FeaturesSection } from "./_components/FeaturesSection";
import { HeroSection } from "./_components/HeroSection";
import { ProcessSection } from "./_components/ProcessSection";
import { WhoForSection } from "./_components/WhoForSection";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Crear cotizaciones profesionales gratis | Cotiser",
  description:
    "Crea cotizaciones y presupuestos profesionales gratis. Agrega tu logo, clientes, servicios, precios e impuestos, y descarga el documento en PDF o HTML.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "/",
    siteName: "Cotiser",
    title: "Cotiser: crea cotizaciones profesionales gratis",
    description:
      "Crea, organiza y descarga cotizaciones profesionales para ofrecer tus servicios.",
    images: [
      {
        url: "/hero-cotizapro.png",
        width: 1680,
        height: 945,
        alt: "Cotiser, herramienta gratuita para crear cotizaciones profesionales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cotiser: crea cotizaciones profesionales gratis",
    description:
      "Prepara presupuestos con tu logo, servicios y precios, y descárgalos en PDF o HTML.",
    images: ["/hero-cotizapro.png"],
  },
};

const resolvedProblems = [
  {
    title: "Documentos desordenados",
    description:
      "Centraliza tus cotizaciones para encontrarlas por cliente, fecha, monto o estado.",
  },
  {
    title: "Demasiado tiempo creando documentos",
    description:
      "Reutiliza clientes, servicios y precios sin copiar la misma información en cada propuesta.",
  },
  {
    title: "Una imagen poco profesional",
    description:
      "Presenta un documento ordenado con el logo, los datos y la identidad de tu negocio.",
  },
];

const steps = [
  "Completa el perfil de tu negocio con el logo y los datos de contacto, y guarda tus servicios y precios.",
  "Selecciona un cliente y agrega servicios, cantidades, descuentos, impuestos y condiciones.",
  "Revisa la cotización, descárgala en PDF o ábrela como HTML y envíala tú mismo por el medio que prefieras.",
];

const appFeatures = [
  {
    title: "Perfil de negocio personalizado",
    description:
      "Incluye tu logo, nombre comercial, dirección, correo, teléfono y sitio web.",
  },
  {
    title: "Gestión de clientes",
    description:
      "Agrega, edita y organiza tus clientes con sus datos de contacto.",
  },
  {
    title: "Catálogo de servicios",
    description:
      "Mantén una lista de servicios y precios lista para reutilizar.",
  },
  {
    title: "Cotizaciones con impuestos y descuentos",
    description:
      "Calcula automáticamente subtotales, descuentos, impuestos y total.",
  },
  {
    title: "Historial organizado",
    description:
      "Busca y filtra cotizaciones por estado, cliente, fecha o monto.",
  },
  {
    title: "Exportación en PDF y HTML",
    description:
      "Descarga el documento y envíalo a tu cliente por correo, WhatsApp u otro canal.",
  },
];

const differences = [
  {
    title: "Simple",
    iconPath: "/svg/Facil.svg",
    description:
      "Está enfocada en una tarea concreta: crear y organizar cotizaciones sin complicaciones.",
  },
  {
    title: "Gratis",
    iconPath: "/svg/Gratis.svg",
    description:
      "Crea y administra tus cotizaciones sin pagar una suscripción mensual.",
  },
  {
    title: "Profesional",
    iconPath: "/svg/independientes.svg",
    description:
      "Personaliza cada documento con la información y el logo de tu emprendimiento.",
  },
  {
    title: "Código abierto",
    iconPath: "/svg/Codigo-Libre.svg",
    description:
      "Su código está disponible públicamente para ofrecer mayor transparencia y libertad.",
  },
];

const whoFor = [
  {
    title: "Emprendedores",
    description:
      "Presenta tus primeros servicios con una imagen más clara y profesional.",
  },
  {
    title: "Profesionales independientes",
    description:
      "Cotiza proyectos de diseño, desarrollo, fotografía y otros servicios especializados.",
  },
  {
    title: "Técnicos y oficios",
    description:
      "Detalla trabajos, materiales, cantidades y precios para cada cliente.",
  },
  {
    title: "Consultores y agencias",
    description:
      "Crea propuestas ordenadas para asesorías, planes y proyectos de clientes.",
  },
  {
    title: "Pequeños negocios",
    description:
      "Centraliza tus cotizaciones y evita perder información entre documentos.",
  },
];

const faqItems = [
  {
    question: "¿Qué es una cotización de servicios?",
    answer:
      "Es un documento que presenta a un cliente los servicios ofrecidos, sus cantidades, precios, impuestos, descuentos y condiciones. En algunos países también se conoce como presupuesto o propuesta de servicios.",
  },
  {
    question: "¿Qué información puedo incluir en una cotización?",
    answer:
      "Puedes incluir el logo y los datos de contacto de tu negocio, la información del cliente, el detalle de los servicios, cantidades, precios, descuentos, impuestos y observaciones.",
  },
  {
    question: "¿Cotiser es gratis?",
    answer:
      "Sí. Cotiser es una herramienta gratuita y no requiere una suscripción mensual para crear y administrar cotizaciones.",
  },
  {
    question: "¿En qué formato puedo descargar una cotización?",
    answer:
      "Puedes descargarla como PDF o abrir una versión HTML. Cotiser no envía el documento automáticamente: tú lo descargas y lo compartes con el cliente por el canal que prefieras.",
  },
  {
    question: "¿Cotiser sirve sólo para empresas de Chile?",
    answer:
      "No. Cotiser está pensado principalmente para emprendedores de Chile, pero puede ser utilizado por profesionales y pequeños negocios de toda Latinoamérica.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${siteUrl}/#aplicacion`,
      name: "Cotiser",
      url: siteUrl,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      inLanguage: "es",
      description:
        "Herramienta gratuita para crear, organizar y descargar cotizaciones profesionales de servicios en PDF o HTML.",
      featureList: [
        "Gestión de clientes",
        "Catálogo de servicios",
        "Cálculo de descuentos e impuestos",
        "Personalización con logo y datos de contacto",
        "Exportación en PDF y HTML",
        "Historial de cotizaciones",
      ],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "CLP",
      },
      audience: {
        "@type": "Audience",
        audienceType:
          "Emprendedores, profesionales independientes y pequeños negocios de Chile y Latinoamérica",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#preguntas-frecuentes`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <HeroSection />
      <FeatureGrid features={resolvedProblems} />
      <ProcessSection steps={steps} />
      <FeaturesSection features={appFeatures} />
      <ContactCta />
      <WhoForSection items={whoFor} />
      <DifferenceSection differences={differences} />
      <FaqSection items={faqItems} />
    </main>
  );
}
