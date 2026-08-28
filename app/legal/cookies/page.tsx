export default function CookiesPage() {
  return (
    <>
      <h1 className="legal-title">Política de cookies</h1>
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
          <span className="legal-num">01</span>¿Qué son las cookies?
        </h2>
        <p className="legal-p">
          Las cookies son pequeños archivos de texto que un sitio web almacena
          en tu navegador para recordar información entre visitas o durante tu
          sesión de uso.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">02</span>Cookies que utilizamos
        </h2>
        <p className="legal-p">
          En <span className="font-black">COTISER</span>, operado por Vicente
          Daniel Diaz Artigas, utilizamos únicamente una cookie técnica
          esencial:
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm text-slate-600 sm:text-base">
            <thead>
              <tr className="border-b border-slate-200 bg-blue-100/60 text-xs tracking-wide text-slate-800 uppercase">
                <th className="px-4 py-3 font-semibold" scope="col">Cookie</th>
                <th className="px-4 py-3 font-semibold" scope="col">Finalidad</th>
                <th className="px-4 py-3 font-semibold" scope="col">Proveedor</th>
                <th className="px-4 py-3 font-semibold" scope="col">Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="px-4 py-4 align-top font-semibold text-slate-800">
                  Cookie de sesión de autenticación
                </td>
                <td className="px-4 py-4 align-top">
                  Mantener tu sesión iniciada y permitir el acceso seguro a tu
                  cuenta y datos
                </td>
                <td className="px-4 py-4 align-top">Supabase Auth</td>
                <td className="px-4 py-4 align-top">
                  Mientras dure la sesión o una expiracion del token en 1 hora.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="legal-p">
          No utilizamos cookies de analítica (como Google Analytics),
          publicidad, redes sociales ni seguimiento de terceros.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">03</span>¿Por qué no pedimos tu consentimiento con un banner?
        </h2>
        <p className="legal-p">
          Las cookies que usamos son estrictamente necesarias para prestar el
          Servicio que solicitaste (mantener tu sesión iniciada de forma
          segura). Este tipo de cookies, tanto bajo la normativa chilena como
          bajo estándares como el GDPR europeo, no requiere consentimiento
          previo mediante banner, ya que sin ellas la Plataforma no podría
          funcionar.
        </p>
        <p className="legal-p">
          Si en el futuro incorporamos cookies de analítica, marketing o de
          terceros, actualizaremos esta política e implementaremos el mecanismo
          de consentimiento correspondiente antes de activarlas.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">04</span>Cómo gestionar las cookies
        </h2>
        <p className="legal-p">
          Puedes eliminar o bloquear la cookie de sesión desde la configuración
          de tu navegador. Ten en cuenta que, si la bloqueas, no podrás mantener
          tu sesión iniciada y deberás autenticarte nuevamente en cada visita.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">05</span>Cambios a esta política
        </h2>
        <p className="legal-p">
          Si modificamos el uso de cookies (por ejemplo, al agregar herramientas
          de analítica), actualizaremos este documento y, de ser necesario,
          implementaremos un mecanismo de consentimiento adicional.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">
          <span className="legal-num">06</span>Contacto
        </h2>
        <p className="legal-p">
          Para consultas sobre esta política:{" "}
          <a href="mailto:contacto.cotiser@gmail.com" className="legal-link">
            contacto.cotiser@gmail.com
          </a>
        </p>
      </section>
    </>
  );
}
