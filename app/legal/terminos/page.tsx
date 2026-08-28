export default function TerminosPage() {
  return (
    <>
      <h1 className="legal-title">Términos y condiciones</h1>
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

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">01</span>Aceptación de los términos
        </h2>
        <p className="legal-p">
          Al crear una cuenta y utilizar{" "}
          <span className="font-black">COTISER</span> el Servicio, operado por 
          Vicente Daniel Diaz Artigas, con domicilio en Santiago, Chile, 
          aceptas quedar sujeto a estos Términos y Condiciones. Si no estás 
          de acuerdo, no debes utilizar el Servicio.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">02</span>Descripción del servicio
        </h2>
        <p className="legal-p">
          La Plataforma permite a personas naturales o jurídicas
          (&quot;Usuarios&quot;) gestionar cotizaciones, clientes y servicios
          propios de su actividad comercial. Cada Usuario administra su propia
          organización dentro de un entorno aislado (multi-tenant): sus clientes,
          servicios y cotizaciones no son visibles ni accesibles para otros
          Usuarios de la Plataforma.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">03</span>Registro y cuenta
        </h2>
        <ul className="legal-list">
          <li>
            Para usar el Servicio debes crear una cuenta mediante autenticación
            (correo electrónico y contraseña).
          </li>
          <li>
            Eres responsable de mantener la confidencialidad de tus credenciales
            y de toda actividad realizada bajo tu cuenta.
          </li>
          <li>
            Debes proporcionar información veraz al registrarte (organización,
            teléfono de contacto).
          </li>
          <li>
            Nos reservamos el derecho de suspender cuentas que incumplan estos
            Términos, presenten actividad fraudulenta o pongan en riesgo la
            seguridad del Servicio.
          </li>
        </ul>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">04</span>Responsabilidad sobre los datos ingresados
        </h2>
        <p className="legal-p">
          El Usuario es el único responsable de la exactitud, licitud y origen de
          los datos que ingresa en la Plataforma, incluyendo:
        </p>
        <ul className="legal-list">
          <li>
            Datos de sus <strong>clientes</strong> (nombre, dirección,
            identificador fiscal).
          </li>
          <li>
            Datos de sus <strong>servicios y cotizaciones</strong> (precios,
            descripciones, condiciones comerciales).
          </li>
        </ul>
        <p className="legal-p">
          El Usuario declara contar con las autorizaciones necesarias para
          tratar los datos personales de terceros (sus propios clientes) que
          registra en la Plataforma, conforme a la legislación chilena vigente
          sobre protección de datos personales.{" "}
          <span className="font-black">COTISER</span> actúa como{" "}
          <strong>encargado del tratamiento</strong> de dichos datos por cuenta
          del Usuario, quien es el <strong>responsable del tratamiento</strong>{" "}
          frente a sus propios clientes.
        </p>
        <p className="legal-p">
          En calidad de encargado, <span className="font-black">COTISER</span>{" "}
          tratará dichos datos exclusivamente conforme a las instrucciones del
          Usuario contenidas en estos Términos y en las funcionalidades que el
          Usuario utilice en la Plataforma. No venderemos, cederemos, usaremos
          para publicidad, elaboraremos perfiles ni analizaremos estos datos
          para fines propios o comerciales.
        </p>
        <p className="legal-p">
          <span className="font-black">COTISER</span> aplica medidas de
          seguridad y confidencialidad adecuadas y utiliza a Supabase y Vercel
          como proveedores que actúan como subencargados para alojar y operar
          el Servicio. Estos proveedores procesan datos fuera de Chile bajo las
          garantías descritas en la Política de Privacidad.
        </p>
        <p className="legal-p">
          Prestaremos asistencia razonable al Usuario ante solicitudes de
          ejercicio de derechos de sus clientes e incidentes de seguridad que
          afecten dichos datos. Al término del Servicio, los datos serán
          eliminados o anonimizados conforme a la Política de Privacidad, salvo
          que exista una obligación legal de conservarlos.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">05</span>Uso permitido
        </h2>
        <p className="legal-p">Está prohibido:</p>
        <ul className="legal-list">
          <li>
            Usar la Plataforma para fines ilícitos o que infrinjan derechos de
            terceros.
          </li>
          <li>
            Intentar vulnerar la seguridad, realizar ingeniería inversa o acceder
            a datos de otros Usuarios sin autorización.
          </li>
          <li>
            Sobrecargar deliberadamente la infraestructura del Servicio.
          </li>
        </ul>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">06</span>Disponibilidad del servicio
        </h2>
        <p className="legal-p">
          El Servicio se presta &quot;tal cual&quot; y &quot;según
          disponibilidad&quot;. Realizamos esfuerzos razonables para mantener la
          Plataforma operativa, pero no garantizamos disponibilidad ininterrumpida.
          Podrán existir interrupciones por mantenimiento, actualizaciones o
          causas ajenas a nuestro control (incluyendo caídas de proveedores de
          infraestructura como Vercel o Supabase).
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">07</span>Propiedad intelectual
        </h2>
        <p className="legal-p">
          El código fuente de <span className="font-black">COTISER</span> se
          distribuye bajo la licencia GNU Affero General Public License v3.0
          (AGPLv3). Puedes consultar el código fuente completo en{" "}
          <a
            href="https://github.com/vicentediaz2/COTISER"
            target="_blank"
            rel="noopener noreferrer"
            className="legal-link"
          >
            github.com/vicentediaz2/COTISER
          </a>.
        </p>
        <p className="legal-p">
          De acuerdo con los términos de la AGPLv3, si utilizas, modificas y ofreces esta Plataforma 
          (u otra derivada de ella) como un servicio accesible por red a terceros, estás obligado a poner 
          a disposición de dichos usuarios el código fuente correspondiente a la versión que estás ejecutando,
          incluyendo las modificaciones realizadas. El texto completo de la licencia está disponible en{" "}
          <a
            href="https://www.gnu.org/licenses/agpl-3.0.html"
            target="_blank"
            rel="noopener noreferrer"
            className="legal-link"
          >
            gnu.org/licenses/agpl-3.0.html
          </a>.
        </p>
        <p className="legal-p">
          Esta licencia AGPLv3 se aplica exclusivamente al código del software. No incluye ni afecta:
        </p>
        <ul className="legal-list">
          <li>
            Los datos ingresados por los Usuarios en la Plataforma (información de sus clientes, servicios y 
            cotizaciones), que siguen siendo de propiedad exclusiva de cada Usuario, conforme a la sección 4 
            de estos Términos.
          </li>
          <li>
            La marca, nombre comercial y logo de <span className="font-black">COTISER</span>, que se reservan
            como identificadores del servicio prestado en cotiser.vercel.app/, independientemente de que el código sea
            de fuente abierta. Terceros pueden ejecutar su propia instancia del software bajo AGPLv3, pero no
            están autorizados a usar el nombre &quot;<span className="font-black">COTISER</span>&quot; ni su
            identidad visual para presentar dicha instancia como el servicio oficial.
          </li>
        </ul>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">08</span>Limitación de responsabilidad
        </h2>
        <p className="legal-p">
          En la máxima medida permitida por la ley,{" "}
          <span className="font-black">COTISER</span> no será responsable por
          daños indirectos, pérdida de datos, lucro cesante o interrupciones del
          negocio del Usuario derivadas del uso o imposibilidad de uso del
          Servicio.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">09</span>Terminación de cuenta
        </h2>
        <p className="legal-p">
          El Usuario puede solicitar la eliminación de su cuenta y datos
          asociados en cualquier momento, escribiendo a{" "}
          <a href="mailto:contacto.cotiser@gmail.com" className="legal-link">
            contacto.cotiser@gmail.com
          </a>
          . Nos reservamos el derecho de suspender o eliminar cuentas que
          incumplan gravemente estos Términos, previa notificación cuando sea
          razonablemente posible.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">10</span>Modificaciones
        </h2>
        <p className="legal-p">
          Podremos actualizar estos Términos periódicamente. Los cambios
          relevantes serán notificados por correo electrónico o mediante aviso en
          la Plataforma. El uso continuado del Servicio tras la actualización
          implica su aceptación.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">11</span>Legislación aplicable
        </h2>
        <p className="legal-p">
          Estos Términos se rigen por las leyes de la República de Chile.
          Cualquier controversia será sometida a los tribunales ordinarios de
          justicia de Santiago, sin perjuicio de las normas de protección al
          consumidor que resulten aplicables.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">12</span>Contacto
        </h2>
        <p className="legal-p">
          Para consultas sobre estos Términos:{" "}
          <a href="mailto:contacto.cotiser@gmail.com" className="legal-link">
            contacto.cotiser@gmail.com
          </a>
        </p>
      </section>
    </>
  );
}
