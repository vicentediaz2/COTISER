export type Block =
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] };

export type Section = {
  id: string;
  title: string;
  blocks: Block[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  author: string;
  coverAlt: string;
  sections: Section[];
};

export const posts: Post[] = [
  {
    slug: "que-es-una-cotizacion",
    title: "¿Qué es una cotización y qué debe incluir?",
    excerpt:
      "Definición clara de qué es una cotización, en qué se diferencia de un presupuesto y qué elementos no pueden faltar para que sea válida y profesional.",
    date: "2026-10-17",
    readingTime: "5 min de lectura",
    author: "Equipo COTISER",
    coverAlt: "Documento de cotización profesional",
    sections: [
      {
        id: "que-es",
        title: "¿Qué es una cotización?",
        blocks: [
          {
            type: "paragraph",
            text: "Una **cotización** es un documento en el que detallas el precio, las condiciones y el alcance de un producto o servicio antes de que el cliente decida contratarte. Funciona como una oferta formal: tú propones, el cliente evalúa y luego acepta o rechaza.",
          },
          {
            type: "paragraph",
            text: "En términos simples, es la respuesta a la pregunta “¿cuánto me costaría esto y qué incluye?”. Una buena cotización no solo entrega un monto, también comunica confianza y orden.",
          },
        ],
      },
      {
        id: "diferencias",
        title: "Cotización, presupuesto y propuesta",
        blocks: [
          {
            type: "paragraph",
            text: "Los tres términos se usan como sinónimos, pero conviene diferenciarlos:",
          },
          {
            type: "list",
            items: [
              "**Cotización:** detalle de precios y condiciones para un trabajo concreto.",
              "**Presupuesto:** estimación de costos, a veces más amplia o referencial.",
              "**Propuesta:** documento comercial que además del precio explica el enfoque, los plazos y el valor del servicio.",
            ],
          },
          {
            type: "paragraph",
            text: "En la práctica, una cotización profesional toma lo mejor de los tres: precio claro, alcance definido y condiciones explícitas.",
          },
        ],
      },
      {
        id: "elementos",
        title: "¿Qué debe incluir una cotización?",
        blocks: [
          {
            type: "paragraph",
            text: "Estos son los elementos mínimos para que una cotización sea completa y creíble:",
          },
          {
            type: "list",
            items: [
              "**Datos del emisor:** nombre o razón social, logo, contacto y datos de facturación.",
              "**Datos del cliente:** a quién va dirigida la cotización.",
              "**Número y fecha:** para identificarla y ordenarla en el tiempo.",
              "**Detalle de ítems:** descripción, cantidad, precio unitario y subtotal.",
              "**Descuentos e impuestos:** aplicados de forma explícita, no improvisada.",
              "**Total:** el monto final que el cliente pagaría.",
              "**Condiciones:** validez de la oferta, forma de pago y observaciones.",
            ],
          },
        ],
      },
      {
        id: "validez",
        title: "La validez y las condiciones",
        blocks: [
          {
            type: "paragraph",
            text: "Una cotización sin fecha de validez es una oferta abierta para siempre, y eso juega en tu contra. Indicar por cuánto tiempo se mantienen los precios te protege de cambios de costos y apura la decisión del cliente.",
          },
          {
            type: "paragraph",
            text: "Junto con la validez, define la **forma de pago** (transferencia, efectivo, cuotas) y cualquier condición relevante: plazos de entrega, garantías o exclusiones del servicio.",
          },
        ],
      },
      {
        id: "cuando",
        title: "¿Cuándo conviene entregar una cotización?",
        blocks: [
          {
            type: "list",
            items: [
              "Cuando un cliente pide un precio antes de contratar.",
              "Cuando el trabajo requiere evaluar varias opciones o configuraciones.",
              "Cuando necesitas dejar por escrito lo que incluye y lo que no.",
              "Cuando quieres comparar alternativas con el cliente sin comprometerte aún.",
            ],
          },
        ],
      },
      {
        id: "conclusion",
        title: "Conclusión",
        blocks: [
          {
            type: "paragraph",
            text: "Una cotización es mucho más que un número: es la carta de presentación de tu negocio. Si incluye los datos correctos, el detalle necesario y condiciones claras, te ahorra malentendidos y te ayuda a cerrar más trabajos.",
          },
        ],
      },
    ],
  },
  {
    slug: "importancia-cotizacion-profesional",
    title: "Por qué es importante una cotización profesional (y rápida)",
    excerpt:
      "Una cotización clara y oportuna genera confianza, evita malentendidos y te ayuda a ganar el trabajo antes que la competencia. Aquí te explicamos por qué.",
    date: "2026-10-17",
    readingTime: "5 min de lectura",
    author: "Equipo COTISER",
    coverAlt: "Profesional presentando una cotización a un cliente",
    sections: [
      {
        id: "primera-impresion",
        title: "La primera impresión se juega en el documento",
        blocks: [
          {
            type: "paragraph",
            text: "Antes de conocerte en persona, muchos clientes solo ven tu cotización. Ese documento es tu presentación: un formato ordenado, con tu logo y datos claros, transmite que eres serio y confiable.",
          },
          {
            type: "paragraph",
            text: "Una cotización improvisada en una servilleta o un mensaje suelto comunica justo lo contrario: desorden y poca preparación.",
          },
        ],
      },
      {
        id: "claridad",
        title: "Claridad: menos malentendidos, menos problemas",
        blocks: [
          {
            type: "paragraph",
            text: "Cuando el alcance, los precios y las condiciones están por escrito, ambas partes saben a qué atenerse. Esto reduce los reclamos por “esto no estaba incluido” y protege tu trabajo.",
          },
          {
            type: "list",
            items: [
              "Describe qué incluye y qué no incluye el servicio.",
              "Especifica cantidades y precios unitarios.",
              "Deja por escrito plazos, validez y forma de pago.",
            ],
          },
        ],
      },
      {
        id: "confianza",
        title: "Confianza y credibilidad",
        blocks: [
          {
            type: "paragraph",
            text: "Un documento consistente, con el mismo formato en cada propuesta, hace que tu negocio se vea estable y profesional. La coherencia genera confianza, y la confianza facilita el cierre.",
          },
          {
            type: "paragraph",
            text: "Además, cotizar bien demuestra que entiendes el problema del cliente y que planificaste la solución, no que estás improvisando un precio.",
          },
        ],
      },
      {
        id: "rapidez",
        title: "Rapidez: el que cotiza primero, gana",
        blocks: [
          {
            type: "paragraph",
            text: "En muchos rubros, el cliente pide varios presupuestos y decide según lo que recibe primero y más claro. Tardar días en responder te deja fuera de la conversación.",
          },
          {
            type: "paragraph",
            text: "Cotizar rápido no significa cotizar mal. Significa tener a mano tus datos, clientes y precios para armar la propuesta en minutos, sin perder calidad.",
          },
          {
            type: "list",
            items: [
              "**Tiempo:** reutiliza información en lugar de reescribirla cada vez.",
              "**Consistencia:** mantén una estructura fija para todas tus cotizaciones.",
              "**Respuesta:** envía el documento mientras el interés del cliente está fresco.",
            ],
          },
        ],
      },
      {
        id: "trazabilidad",
        title: "Orden y trazabilidad",
        blocks: [
          {
            type: "paragraph",
            text: "Guardar tus cotizaciones te permite saber qué ofreciste, a quién y cuándo. Ese historial es clave para hacer seguimiento, retomar conversaciones y analizar qué propuestas se convierten en ventas.",
          },
        ],
      },
      {
        id: "errores",
        title: "Errores comunes que conviene evitar",
        blocks: [
          {
            type: "list",
            items: [
              "Entregar solo un monto, sin detalle de ítems.",
              "Olvidar la fecha de validez o la forma de pago.",
              "No incluir los datos de contacto ni el logo del negocio.",
              "Aplicar descuentos o impuestos sin explicarlos.",
              "Responder tarde y dejar enfriar el interés del cliente.",
            ],
          },
        ],
      },
      {
        id: "conclusion",
        title: "Conclusión",
        blocks: [
          {
            type: "paragraph",
            text: "Una cotización profesional y rápida no es un lujo: es una herramienta comercial. Te ayuda a verte confiable, a reducir malentendidos y a ganar el trabajo antes que la competencia.",
          },
        ],
      },
    ],
  },
  {
    slug: "como-crear-cotizaciones-en-cotiser",
    title: "Cómo crear cotizaciones en COTISER paso a paso",
    excerpt:
      "Desde crear tu cuenta hasta descargar el PDF: el recorrido completo para generar cotizaciones profesionales en COTISER en pocos minutos.",
    date: "2026-10-17",
    readingTime: "6 min de lectura",
    author: "Equipo COTISER",
    coverAlt: "Panel de COTISER para crear cotizaciones",
    sections: [
      {
        id: "antes",
        title: "Antes de empezar",
        blocks: [
          {
            type: "paragraph",
            text: "COTISER está pensada para que reutilices información: configuras tu negocio una vez y luego cada cotización se arma con muy pocos pasos. Ten a mano tu logo y tus datos de contacto para aprovecharla al máximo.",
          },
        ],
      },
      {
        id: "paso-1",
        title: "Paso 1: Crea tu cuenta e ingresa",
        blocks: [
          {
            type: "paragraph",
            text: "Regístrate desde **Crear cuenta** con tu correo y contraseña. Si ya tienes una, ingresa desde **Ingresar**. Todas tus cotizaciones quedan asociadas a tu usuario y son privadas.",
          },
        ],
      },
      {
        id: "paso-2",
        title: "Paso 2: Completa el perfil de tu negocio",
        blocks: [
          {
            type: "paragraph",
            text: "En **Perfil** agrega el logo, el nombre comercial, la dirección, el correo, el teléfono y el sitio web. Estos datos aparecerán automáticamente en el encabezado de cada cotización, así no los escribes de nuevo.",
          },
        ],
      },
      {
        id: "paso-3",
        title: "Paso 3: Registra tus clientes",
        blocks: [
          {
            type: "paragraph",
            text: "En el panel agrega tus clientes con sus datos de contacto. Tenerlos guardados te permite seleccionarlos con un clic al momento de cotizar, sin volver a teclear la información.",
          },
        ],
      },
      {
        id: "paso-4",
        title: "Paso 4: Arma tu catálogo de servicios",
        blocks: [
          {
            type: "paragraph",
            text: "Registra los servicios que ofreces con un nombre corto, una descripción breve y su precio unitario. Este catálogo es tu base reutilizable: mientras más completo esté, más rápido cotizarás.",
          },
        ],
      },
      {
        id: "paso-5",
        title: "Paso 5: Crea una nueva cotización",
        blocks: [
          {
            type: "paragraph",
            text: "Pulsa **Nueva cotización**, selecciona el cliente y agrega los servicios desde tu catálogo. Marca los ítems que correspondan a ese trabajo en particular.",
          },
        ],
      },
      {
        id: "paso-6",
        title: "Paso 6: Ajusta cantidades, descuentos e impuestos",
        blocks: [
          {
            type: "paragraph",
            text: "Modifica las cantidades de cada línea, aplica descuentos si corresponde y agrega impuestos cuando el caso lo requiera. Los subtotales, los impuestos y el total se recalculan automáticamente.",
          },
        ],
      },
      {
        id: "paso-7",
        title: "Paso 7: Revisa, guarda y exporta",
        blocks: [
          {
            type: "paragraph",
            text: "Antes de enviar, revisa los datos del cliente, los ítems, las condiciones y los totales. Guarda la cotización para conservarla en tu historial y descárgala en **PDF** o ábrela como **HTML** para enviarla por el canal que prefieras.",
          },
          {
            type: "list",
            items: [
              "**PDF:** ideal para adjuntar por correo o WhatsApp.",
              "**HTML:** útil para abrir en el navegador o imprimir.",
            ],
          },
        ],
      },
      {
        id: "historial",
        title: "Gestiona y da seguimiento",
        blocks: [
          {
            type: "paragraph",
            text: "Todas tus cotizaciones quedan en el panel. Puedes buscar y filtrar por cliente, fecha, monto o estado, lo que te ayuda a hacer seguimiento y saber en qué quedó cada propuesta.",
          },
        ],
      },
      {
        id: "consejos",
        title: "Consejos finales",
        blocks: [
          {
            type: "list",
            items: [
              "Mantén tu perfil y tu catálogo actualizados.",
              "Usa descripciones cortas y claras en los servicios.",
              "Define siempre una fecha de validez.",
              "Revisa los totales antes de enviar.",
              "Responde rápido: la oportunidad se enfría con el tiempo.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "reporte-plantillas-cotiser",
    title: "Reporte: Cómo usamos las plantillas en COTISER",
    excerpt:
      "Un repaso práctico de qué son las plantillas, cuándo conviene usarlas y cómo agilizan la creación de cotizaciones sin perder consistencia.",
    date: "2026-10-17",
    readingTime: "5 min de lectura",
    author: "Equipo COTISER",
    coverAlt: "Ilustración de plantillas para cotizaciones",
    sections: [
      {
        id: "que-entendemos",
        title: "¿Qué entendemos por “plantilla”?",
        blocks: [
          {
            type: "paragraph",
            text: "En COTISER, una **plantilla** es una estructura reutilizable para armar cotizaciones con mayor rapidez. El objetivo es mantener un formato homogéneo: mismos bloques, orden claro de datos y presentación profesional sin tener que partir desde cero cada vez.",
          },
        ],
      },
      {
        id: "por-que",
        title: "¿Por qué usamos plantillas?",
        blocks: [
          {
            type: "list",
            items: [
              "**Ahorro de tiempo:** reutilizas clientes, servicios, precios e información del negocio.",
              "**Consistencia:** todas tus propuestas comparten estructura, jerarquía y tono visual.",
              "**Menor error:** evitas olvidar datos clave como condiciones, impuestos o descuentos.",
              "**Escalable:** funciona igual para 1 o 20 cotizaciones por semana.",
            ],
          },
        ],
      },
      {
        id: "practica",
        title: "¿Cómo se aplican en la práctica?",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "**Perfil base:** completa los datos de tu negocio (logo, nombre, contacto, web). Esto se mantiene entre cotizaciones.",
              "**Catálogo:** guarda tus servicios con nombre, descripción breve y precio. Quedan listos para agregar con un clic.",
              "**Clientes:** centraliza tus clientes para autocompletar sus datos en nuevas propuestas.",
              "**Generación:** al crear una cotización eliges cliente y servicios, y ajustas cantidades, descuentos o impuestos. El cálculo es automático.",
              "**Exportación:** descarga en PDF o HTML con el mismo formato base.",
            ],
          },
        ],
      },
      {
        id: "elementos",
        title: "Elementos que componen la plantilla de COTISER",
        blocks: [
          {
            type: "list",
            items: [
              "**Cabecera:** logo, razón social y datos de contacto.",
              "**Destinatario:** datos del cliente.",
              "**Detalle:** ítem, cantidad, precio unitario y subtotal por línea.",
              "**Totales:** subtotal, descuentos, impuestos y total final.",
              "**Pie / condiciones:** fecha, validez, forma de pago y observaciones.",
            ],
          },
        ],
      },
      {
        id: "recomendaciones",
        title: "Recomendaciones para mantener coherencia",
        blocks: [
          {
            type: "list",
            items: [
              "Usa descripciones cortas en tus servicios.",
              "Define una validez clara (por ejemplo, 15 días) desde el inicio.",
              "Mantén tu catálogo actualizado con precios vigentes.",
              "Revisa los totales antes de enviar: descuentos e impuestos aplicados correctamente.",
            ],
          },
        ],
      },
      {
        id: "estructura",
        title: "Estructura de la cotización",
        blocks: [
          {
            type: "list",
            items: [
              "**Cabecera:** identidad del emisor (logo y contacto).",
              "**Destinatario:** datos del cliente que recibe la propuesta.",
              "**Fecha y número:** referencia clara y orden en el historial.",
              "**Detalle:** ítems, cantidades, precio unitario y subtotal.",
              "**Descuentos e impuestos:** aplicados de forma explícita.",
              "**Totales:** subtotal, descuentos, impuestos y total final.",
              "**Condiciones:** validez, forma de pago y observaciones.",
            ],
          },
        ],
      },
      {
        id: "checklist",
        title: "Checklist antes de enviar",
        blocks: [
          {
            type: "list",
            items: [
              "Logo y datos del emisor correctos.",
              "Cliente seleccionado con datos completos.",
              "Todos los servicios con cantidad y precio.",
              "Descuentos e impuestos aplicados intencionalmente.",
              "Subtotales y total coherentes.",
              "Validez y forma de pago definidas.",
              "Vista previa en PDF o HTML revisada.",
            ],
          },
        ],
      },
      {
        id: "conclusion",
        title: "Conclusión",
        blocks: [
          {
            type: "paragraph",
            text: "Las plantillas en COTISER no son archivos estáticos, sino **bloques reutilizables** ligados a tu perfil, clientes y catálogo. El resultado: menos tiempo, misma estructura y mayor profesionalismo en cada propuesta.",
          },
        ],
      },
    ],
  },
  {
    slug: "guia-rapida-crear-cotizacion",
    title: "Guía rápida: Crear tu primera cotización",
    excerpt:
      "Desde completar tu perfil hasta descargar el PDF. Siete pasos para tener lista tu primera propuesta en minutos.",
    date: "2026-10-17",
    readingTime: "3 min de lectura",
    author: "Equipo COTISER",
    coverAlt: "Crear cotización paso a paso",
    sections: [
      {
        id: "perfil",
        title: "Paso 1: Configura tu perfil de negocio",
        blocks: [
          {
            type: "paragraph",
            text: "Ve a **Perfil** y completa logo, nombre comercial, correo, teléfono y dirección. Estos datos aparecen automáticamente en todas tus cotizaciones.",
          },
        ],
      },
      {
        id: "clientes",
        title: "Paso 2: Guarda tus clientes",
        blocks: [
          {
            type: "paragraph",
            text: "Desde el panel puedes agregar clientes con sus datos. Así evitas escribirlos manualmente cada vez.",
          },
        ],
      },
      {
        id: "servicios",
        title: "Paso 3: Crea tu catálogo de servicios",
        blocks: [
          {
            type: "paragraph",
            text: "Añade servicios con nombre, descripción breve y precio unitario. Quedarán disponibles al armar cualquier cotización.",
          },
        ],
      },
      {
        id: "nueva",
        title: "Paso 4: Nueva cotización",
        blocks: [
          {
            type: "paragraph",
            text: "Pulsa **Nueva cotización**, selecciona el cliente y agrega los servicios desde tu catálogo.",
          },
        ],
      },
      {
        id: "ajusta",
        title: "Paso 5: Ajusta cantidades, descuentos e impuestos",
        blocks: [
          {
            type: "paragraph",
            text: "Modifica cantidades, aplica descuentos por línea o global, y agrega impuestos si corresponde. Los totales se recalculan al instante.",
          },
        ],
      },
      {
        id: "revisa",
        title: "Paso 6: Revisa y guarda",
        blocks: [
          {
            type: "paragraph",
            text: "Verifica los datos del cliente, los ítems, las condiciones y los totales. Guarda para mantener el historial.",
          },
        ],
      },
      {
        id: "exporta",
        title: "Paso 7: Descarga en PDF o HTML",
        blocks: [
          {
            type: "paragraph",
            text: "Exporta el documento y envíalo por el canal que prefieras. Mantiene el formato limpio y profesional.",
          },
        ],
      },
      {
        id: "tip",
        title: "Tip rápido",
        blocks: [
          {
            type: "paragraph",
            text: "Cuanto más completo tengas tu perfil, clientes y servicios, más rápido será crear nuevas cotizaciones con la misma estructura base.",
          },
        ],
      },
    ],
  },
];
