import Image from "next/image";
import Link from "next/link";

export function Brand({ dark = false }: { dark?: boolean }) {
  return (
      <Link href="/" className="flex items-center gap-3" aria-label="Cotiser">
        <span className="grid size-14 place-items-center rounded-lg p-1 ">
          <Image
            src="/elementos-graficos/isotipo-azul.svg"
            alt=""
            width={60}
            height={60}
            className=""
          />
        </span>
        <span className="text-xl font-black text-emerald-600">COTISER</span>
      </Link>
  );
}

