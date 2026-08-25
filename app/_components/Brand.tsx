import Image from "next/image";
import Link from "next/link";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Cotiser">
      <span className="grid size-14 place-items-center rounded-lg p-1">
        <Image
          src={light ? "/elementos-graficos/isotipo-celeste.svg" : "/elementos-graficos/isotipo-azul.svg"}
          alt=""
          width={60}
          height={60}
        />
      </span>
      <span className={`text-xl font-black ${light ? "text-white" : "text-red-600"}`}>COTISER</span>
    </Link>
  );
}
