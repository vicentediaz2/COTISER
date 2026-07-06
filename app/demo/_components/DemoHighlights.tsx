const highlights = [
  "Revision del flujo actual de cotizacion",
  "Configuracion base de productos y servicios",
  "Ejemplo de propuesta lista para enviar",
];

export function DemoHighlights() {
  return (
    <aside className="rounded-lg border border-blue-100 bg-blue-700 p-6 text-white shadow-xl shadow-blue-900/15 lg:p-8">
      <p className="text-sm font-semibold uppercase text-blue-100">
        Que incluye
      </p>
      <h2 className="mt-3 text-3xl font-semibold">
        Una demo enfocada en tu proceso comercial.
      </h2>
      <p className="mt-4 leading-7 text-blue-50">
        El recorrido muestra como pasar de precios dispersos a propuestas
        claras, trazables y faciles de enviar.
      </p>
      <ul className="mt-8 grid gap-4">
        {highlights.map((item) => (
          <li
            key={item}
            className="flex gap-3 rounded-lg border border-white/15 bg-white/10 p-4"
          >
            <span className="mt-1 size-2 shrink-0 rounded-full bg-cyan-200" />
            <span className="text-sm font-medium text-blue-50">{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
