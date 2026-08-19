import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-blue-50 pt-6 text-sm text-white">
            <p>&copy; {currentYear} <span className="font-black text-white">Cotiser</span>. Código abierto bajo AGPLv3.</p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/legal/terminos"
                className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:text-blue-50"
              >
                Términos y condiciones
              </Link>
              <Link
                href="/legal/cookies"
                className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:text-blue-50"
              >
                Política de cookies
              </Link>
              <Link
                href="/legal/privacidad"
                className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:text-blue-50"
              >
                Política de privacidad
              </Link>
            </div>
          </div>

          <div className="border-t border-blue-50 pt-6 text-sm text-white">
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Desarrollado por:</span>{" "}
                <a
                  href="https://github.com/vicentediaz2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-50 font-bold underline-offset-2 hover:semifont-bold hover:underline"
                >
                  Vicente Diaz
                </a>
              </p>
              <p>
                <span className="font-semibold">Imagen de marca por:</span>{" "}
                <a
                  href="https://www.behance.net/constanzapacheco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-50 font-bold underline-offset-2 hover:semifont-bold hover:underline"
                >
                  Constanza Pacheco
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
