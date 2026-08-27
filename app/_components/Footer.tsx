import Image from "next/image";
import Link from "next/link";
import packageJson from "../../package.json";

const repositoryUrl = "https://github.com/vicentediaz2/COTISER";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 px-6 py-8 lg:px-6">
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
          <div className="flex flex-wrap items-center gap-4 border-t border-blue-50 pt-6 text-sm text-white">
            <Link
                href="/#"
                className="inline-flex items-center justify-center rounded-lg text-sm font-medium text-white transition hover:text-blue-50"
              >
              <Image
                src="/elementos-graficos/isotipo-celeste.svg"
                alt="Logo de Cotiser"
                width={64}
                height={64}
                className="size-24 shrink-0"
              />
            </Link>
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
              <p>
                <span className="font-semibold">Código fuente:</span>{" "}
                <a
                  href={repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-50 font-bold underline-offset-2 hover:semifont-bold hover:underline"
                >
                  GitHub
                </a>
              </p>
              <p>
                <span className="font-semibold">Versión del sistema:</span>{" "}
                {packageJson.version}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
