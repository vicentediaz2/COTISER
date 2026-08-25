"use client";

export type ViewQuotation = {
  id: string;
  status: string;
  clientName: string;
  date: string;
  subtotal: number;
  total: number;
  taxRate?: number | null;
  discount?: number | null;
  notes?: string | null;
  items: { description: string; quantity: number; unitPrice: number; discount?: number | null }[];
};

const labels: Record<string, string> = { pendiente: "Pendiente", enviada: "Enviada", aprobada: "Aprobada", rechazada: "Rechazada", vencida: "Vencida" };
const badgeColors: Record<string, string> = {
  pendiente: "bg-blue-50 text-blue-700",
  enviada: "bg-amber-50 text-amber-700",
  aprobada: "bg-emerald-50 text-emerald-700",
  rechazada: "bg-red-50 text-red-700",
  vencida: "bg-slate-100 text-slate-700",
};

export function QuotationView({ quotation, onClose }: { quotation: ViewQuotation; onClose: () => void }) {
  const format = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
  const taxRate = quotation.taxRate ?? 0;
  const discountAmount = Math.round(quotation.subtotal * (quotation.discount ?? 0) / 100);
  const tax = Math.round((quotation.subtotal - discountAmount) * taxRate / 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4" role="dialog" aria-modal="true" aria-labelledby="view-quotation-title" onMouseDown={onClose}>
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl sm:p-8" onMouseDown={(event) => event.stopPropagation()}>
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-blue-700">Cotización {quotation.id.slice(0, 8).toUpperCase()}</span>
              <span className={`rounded-full px-2 py-1 text-xs font-medium ${badgeColors[quotation.status] ?? "bg-slate-100 text-slate-700"}`}>{labels[quotation.status] ?? quotation.status}</span>
              {quotation.status === "aprobada" && <span className="text-xs font-medium text-slate-500">Solo lectura</span>}
            </div>
            <h2 id="view-quotation-title" className="mt-2 text-2xl font-semibold">{quotation.clientName}</h2>
            <p className="mt-1 text-sm text-slate-500">{new Date(quotation.date).toLocaleDateString("es-CL")}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar" className="rounded-lg px-3 py-2 text-xl leading-none text-slate-500 hover:bg-slate-100">×</button>
        </div>

        {quotation.items.length ? (
          <div className="overflow-x-auto rounded-lg border border-blue-100">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-blue-100 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3 font-medium">Servicio</th>
                  <th className="px-4 py-3 text-right font-medium">Cantidad</th>
                  <th className="px-4 py-3 text-right font-medium">Precio unitario</th>
                  <th className="px-4 py-3 text-right font-medium">Descuento</th>
                  <th className="px-4 py-3 text-right font-medium">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {quotation.items.map((item, index) => {
                  const lineTotal = Math.round(item.quantity * item.unitPrice * (1 - (item.discount ?? 0) / 100));
                  return (
                    <tr key={index} className="border-b border-blue-50 last:border-0">
                      <td className="px-4 py-3 font-medium text-slate-900">{item.description}</td>
                      <td className="px-4 py-3 text-right text-slate-700">{item.quantity}</td>
                      <td className="px-4 py-3 text-right text-slate-700">{format.format(item.unitPrice)}</td>
                      <td className="px-4 py-3 text-right text-slate-700">{item.discount ? `${item.discount}%` : "—"}</td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-900">{format.format(lineTotal)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : <p className="rounded-lg border border-dashed border-blue-200 p-6 text-center text-sm text-slate-500">Sin servicios registrados.</p>}

        {quotation.notes && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-slate-900">Observaciones</h3>
            <p className="mt-1 whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-sm text-slate-700">{quotation.notes}</p>
          </div>
        )}

        <div className="mt-4 rounded-lg p-4">
          <dl className="grid gap-2 text-sm sm:ml-auto sm:max-w-xs">
            <div className="flex justify-between gap-8"><dt className="text-slate-600">Subtotal</dt><dd className="font-semibold text-slate-900">{format.format(quotation.subtotal)}</dd></div>
            {discountAmount > 0 && <div className="flex justify-between gap-8"><dt className="text-slate-600">Descuento</dt><dd className="font-semibold text-slate-900">-{format.format(discountAmount)}</dd></div>}
            {taxRate > 0 && <div className="flex justify-between gap-8"><dt className="text-slate-600">Impuesto ({taxRate}%)</dt><dd className="font-semibold text-slate-900">{format.format(tax)}</dd></div>}
            <div className="flex justify-between gap-8 border-t border-blue-100 pt-2"><dt className="font-semibold text-slate-900">Total</dt><dd className="font-semibold text-blue-700">{format.format(quotation.total)}</dd></div>
          </dl>
        </div>

        <div className="mt-6 flex justify-end border-t border-blue-100 pt-5"><button type="button" onClick={onClose} className="primary-button">Cerrar</button></div>
      </div>
    </div>
  );
}
