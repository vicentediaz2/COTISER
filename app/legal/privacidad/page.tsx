export default function PrivacidadPage() {
  return (
    <>
      <h1 className="legal-title">Política de privacidad</h1>
      <p className="legal-updated">
        <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="size-4 text-blue-600">
          <path
            d="M8 5v3l2 1.5M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        Última actualización: 08-2026
      </p>

      <p className="legal-p max-w-2xl">
        Esta Política de Privacidad describe cómo{" "}
        <span className="font-black">COTISER</span> recolecta, usa, almacena y
        protege los datos personales de sus Usuarios y de los terceros cuyos
        datos éstos ingresan en la Plataforma, en cumplimiento de la Ley N°
        19.628 sobre Protección de la Vida Privada y, progresivamente, de la
        Ley N° 21.719 que la moderniza y entra en plena vigencia el 1 de
        diciembre de 2026.
      </p>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">01</span>Responsable del tratamiento
        </h2>
        <p className="legal-p">
          Vicente Daniel Diaz Artigas, contacto:{" "}
          <a href="mailto:contacto@cotiser.is-a.dev" className="legal-link">
            contacto@cotiser.is-a.dev
          </a>
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">02</span>Qué datos recolectamos
        </h2>
        <ul className="legal-list">
          <li>
            Datos de tu cuenta: correo electrónico y contraseña de acceso,
            nombre de la organización y teléfono de contacto.
          </li>
          <li>
            Datos que ingresas sobre tus propios clientes: nombre, dirección,
            identificador fiscal y otros datos de contacto.
          </li>
          <li>
            Contenido de tus cotizaciones: servicios, precios, descuentos,
            impuestos y condiciones comerciales.
          </li>
        </ul>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">03</span>Finalidad del tratamiento
        </h2>
        <p className="legal-p">Utilizamos los datos exclusivamente para:</p>
        <ul className="legal-list">
          <li>Permitir el registro, autenticación y uso de la cuenta.</li>
          <li>Proveer la funcionalidad de gestión de clientes, servicios y cotizaciones.</li>
          <li>Mantener trazabilidad y respaldo de los documentos generados.</li>
          <li>
            Comunicarnos contigo sobre el Servicio (avisos, cambios en estas
            políticas, soporte).
          </li>
        </ul>
        <p className="legal-p">
          No vendemos ni cedemos datos personales a terceros con fines
          comerciales o publicitarios.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">04</span>Base de licitud del tratamiento
        </h2>
        <p className="legal-p">
          Tratamos los datos de la cuenta y los datos necesarios para operar la
          Plataforma porque son necesarios para celebrar y ejecutar el contrato
          de uso del Servicio, atender solicitudes del Usuario y cumplir las
          obligaciones legales aplicables.
        </p>
        <p className="legal-p">
          Cuando una finalidad requiera consentimiento, lo solicitaremos de
          forma previa, específica e informada. El consentimiento podrá
          retirarse en cualquier momento, sin afectar la licitud del tratamiento
          realizado antes de su retiro.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">05</span>Dónde se almacenan los datos
        </h2>
        <p className="legal-p">
          Los datos se almacenan en la infraestructura de Supabase (base de
          datos y autenticación), en la región us-west-2 (West US, Oregon),
          Estados Unidos. La aplicación se despliega en Vercel. Por ello, los
          datos pueden ser almacenados o procesados fuera de Chile.
        </p>
        <p className="legal-p">
          Exigimos contractualmente a nuestros proveedores de infraestructura
          que traten los datos sólo para prestar el Servicio, mantengan su
          confidencialidad y seguridad y apliquen garantías adecuadas para la
          transferencia internacional. Supabase y Vercel actúan como
          subencargados respecto de los datos necesarios para alojar, asegurar
          y operar el Servicio.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">06</span>Seguridad
        </h2>
        <p className="legal-p">
          Aplicamos medidas técnicas y organizativas razonables para proteger
          los datos, incluyendo:
        </p>
        <ul className="legal-list">
          <li>
            Aislamiento de datos por Usuario (arquitectura multi-tenant: cada
            organización solo accede a su propia información).
          </li>
          <li>
            Cifrado en tránsito (HTTPS) y controles de acceso mediante
            autenticación.
          </li>
          <li>
            Políticas de seguridad a nivel de base de datos (Row Level Security
            en Supabase).
          </li>
        </ul>
        <p className="legal-p">
          Ningún sistema es 100% infalible; ante una eventual brecha de seguridad
          que afecte datos personales, notificaremos a los afectados y a la
          autoridad competente conforme lo exija la normativa vigente.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">07</span>Cookies
        </h2>
        <p className="legal-p">
          Utilizamos únicamente una cookie técnica esencial para mantener la
          sesión de autenticación del Usuario. No utilizamos cookies de
          analítica, publicidad ni seguimiento de terceros. Ver detalle en
          nuestra{" "}
          <a href="/legal/cookies" className="legal-link">
            Política de Cookies
          </a>.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">08</span>Derechos del titular de los datos
        </h2>
        <p className="legal-p">
          Todo titular de datos personales (Usuario o cliente registrado por un
          Usuario) puede ejercer sus derechos de:
        </p>
        <ul className="legal-list">
          <li><strong>Acceso:</strong> conocer qué datos suyos tratamos.</li>
          <li><strong>Rectificación:</strong> corregir datos inexactos o desactualizados.</li>
          <li><strong>Supresión:</strong> solicitar la eliminación de sus datos cuando corresponda.</li>
          <li><strong>Oposición:</strong> oponerse a un tratamiento específico.</li>
          <li><strong>Portabilidad:</strong> obtener sus datos en un formato estructurado y de uso común, cuando corresponda.</li>
          <li><strong>Bloqueo:</strong> solicitar la suspensión temporal de un tratamiento en los casos que correspondan.</li>
        </ul>
        <p className="legal-p">
          Para ejercer estos derechos, escribe a{" "}
          <a href="mailto:contacto@cotiser.is-a.dev" className="legal-link">
            contacto@cotiser.is-a.dev
          </a>
          . Si el dato pertenece a un cliente de un Usuario (no a un Usuario
          registrado directamente), la solicitud debe canalizarse a través del
          Usuario responsable de esos datos, o bien la reenviaremos a dicho
          Usuario para su gestión.
        </p>
        <p className="legal-p">
          El ejercicio de estos derechos es gratuito. Podremos solicitar los
          antecedentes estrictamente necesarios para verificar la identidad de
          quien presenta la solicitud. Acusaremos recibo y responderemos dentro
          de 30 días corridos desde su recepción. Si no podemos acogerla,
          informaremos la decisión y sus fundamentos.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">09</span>Conservación de los datos
        </h2>
        <p className="legal-p">
          Conservamos los datos mientras la cuenta del Usuario permanezca activa.
          Si el Usuario solicita la eliminación de su cuenta, eliminaremos o
          anonimizaremos sus datos y los de sus registros asociados de forma
          permanente dentro de un plazo máximo de 30 días corridos desde la
          recepción de la solicitud, salvo obligación legal de conservarlos por
          más tiempo.
        </p>
        <p className="legal-p">
          Los respaldos que puedan contener datos personales se conservarán
          únicamente para fines de recuperación ante incidentes y se eliminarán
          o sobrescribirán dentro del mismo plazo máximo de 30 días. Durante ese
          período, no usaremos los datos respaldados para ninguna finalidad
          distinta de la seguridad y recuperación del Servicio.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">10</span>Menores de edad
        </h2>
        <p className="legal-p">
          El Servicio está dirigido a personas naturales o jurídicas mayores de
          18 años en el ejercicio de una actividad comercial. No recolectamos
          intencionalmente datos de menores de edad.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">11</span>Cambios a esta política
        </h2>
        <p className="legal-p">
          Podremos actualizar esta Política periódicamente, especialmente con
          motivo de la entrada en vigencia de la Ley N° 21.719 en diciembre de
          2026. Notificaremos cambios relevantes por correo o aviso en la
          Plataforma.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">12</span>Contacto
        </h2>
        <p className="legal-p">
          Para consultas o ejercicio de derechos:{" "}
          <a href="mailto:contacto@cotiser.is-a.dev" className="legal-link">
            contacto@cotiser.is-a.dev
          </a>
        </p>
      </section>
    </>
  );
}
