import Link from "next/link";

export function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="CotizaPro">
      <span className={`grid size-10 place-items-center rounded-lg text-sm font-black shadow-sm ${dark ? "bg-blue-700 text-white" : "bg-white text-blue-700"}`}>
        CPRO
      </span>
      <span className={dark ? "text-lg font-semibold text-blue-950" : "text-lg font-semibold text-white"}>
        COTIZAPRO
      </span>
    </Link>
  );
}

