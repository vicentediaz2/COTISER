import type { EditableQuotation } from "./QuotationForm";

export type HtmlOrganization = { nombre: string; direccion?: string | null; eslogan?: string | null; telefono?: string | null; correo?: string | null; direccion_web?: string | null; logo?: string | null };
export type HtmlQuotation = EditableQuotation & { status: string; total: number; subtotal: number; taxRate?: number | null; date: string };
const labels: Record<string, string> = { pendiente: "Pendiente", enviada: "Enviada", aprobada: "Aprobada", rechazada: "Rechazada", vencida: "Vencida" };
const money = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
const value = (text?: string | null) => text?.trim() || "";

export function QuotationHtmlDocument({ quotation, organization, fullPage = false }: { quotation: HtmlQuotation; organization: HtmlOrganization | null; fullPage?: boolean }) {
  const discountAmount = Math.round(quotation.subtotal * (quotation.discount ?? 0) / 100);
  const taxAmount = Math.round((quotation.subtotal - discountAmount) * (quotation.taxRate ?? 0) / 100);
  const shellClass = fullPage ? "min-h-screen w-screen bg-white text-slate-950" : "min-h-screen bg-slate-100 p-4 text-slate-950 sm:p-8";
  const articleClass = fullPage ? "min-h-screen w-full max-w-none bg-white p-7 shadow-none sm:p-12" : "mx-auto min-h-[calc(100vh-4rem)] max-w-6xl bg-white p-7 shadow-sm sm:p-12";

  const hasClientTaxId = value(quotation.clientTaxId);
  const hasOrgContact = value(organization?.correo) || value(organization?.telefono) || value(organization?.direccion_web);

  return (
    <main className={shellClass}>
      <article className={articleClass}>
        <header className="flex flex-col justify-between gap-6 border-b-2 border-blue-700 pb-7 sm:flex-row">
          <div className="flex items-start gap-4">
            {organization?.logo && <img src={organization.logo} alt="Logo" className="h-16 w-16 rounded-lg object-contain" />}
            <div>
              <h1 className="text-2xl font-bold text-blue-800">{value(organization?.nombre)}</h1>
              <p className="mt-1 text-sm text-slate-500">{value(organization?.eslogan)}</p>
              <p className="mt-3 text-sm text-slate-600">{value(organization?.direccion)}</p>
              <p className="text-sm text-slate-600">{value(organization?.telefono)} · {value(organization?.correo)}</p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">Cotización</p>
            <p className="mt-2 text-2xl font-bold">#{quotation.id.slice(0, 8).toUpperCase()}</p>
            <p className="mt-2 text-sm font-medium text-slate-600">Creada exclusivamente para {quotation.clientName || "el cliente"} el {new Date(quotation.date).toLocaleDateString("es-CL")}.</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">{labels[quotation.status] ?? quotation.status}</p>
          </div>
        </header>

        <section className="grid gap-5 border-b border-slate-200 py-7 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Cliente</p>
            <h2 className="mt-2 text-lg font-semibold">{value(quotation.clientName)}</h2>
            <p className="mt-1 text-sm text-slate-600">{value(quotation.clientAddress)}</p>
            {hasClientTaxId && <p className="text-sm text-slate-600">RUT / ID: {value(quotation.clientTaxId)}</p>}
          </div>
          <div className="sm:text-right">
            {hasOrgContact && (
              <>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Datos de contacto</p>
                <p className="mt-2 text-sm text-slate-600">{value(organization?.correo)}</p>
                <p className="text-sm text-slate-600">{value(organization?.telefono)}</p>
                <p className="text-sm text-slate-600">{value(organization?.direccion_web)}</p>
              </>
            )}
          </div>
        </section>

        <section className="py-7">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b-2 border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="pb-3 font-semibold">Servicio</th>
                <th className="pb-3 text-right font-semibold">Cantidad</th>
                <th className="pb-3 text-right font-semibold">Valor unitario</th>
                <th className="pb-3 text-right font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {quotation.items.map((item, i) => {
                const qty = Number(item.quantity) || 0;
                const unit = Number(item.unitPrice) || 0;
                return (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="py-3">
                      <p className="font-medium">{item.description}</p>
                    </td>
                    <td className="py-3 text-right">{qty}</td>
                    <td className="py-3 text-right">{money.format(unit)}</td>
                    <td className="py-3 text-right font-semibold">{money.format(qty * unit)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        {quotation.notes && (
          <section className="border-t border-slate-200 py-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Notas</p>
            <p className="mt-2 text-sm text-slate-600 whitespace-pre-wrap">{quotation.notes}</p>
          </section>
        )}

        <section className="flex flex-col items-end gap-4 border-t-2 border-blue-700 pt-6 sm:flex-row sm:justify-between">
          <div className="w-full sm:w-1/2" />
          <div className="w-full space-y-2 sm:w-1/2 sm:text-right">
            <div className="flex justify-between text-sm sm:justify-end sm:gap-8">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-medium">{money.format(quotation.subtotal)}</span>
            </div>
            {(quotation.discount ?? 0) > 0 && (
              <div className="flex justify-between text-sm sm:justify-end sm:gap-8">
                <span className="text-slate-500">Descuento ({quotation.discount}%)</span>
                <span className="font-medium text-red-600">-{money.format(discountAmount)}</span>
              </div>
            )}
            {(quotation.taxRate ?? 0) > 0 && (
              <div className="flex justify-between text-sm sm:justify-end sm:gap-8">
                <span className="text-slate-500">IVA ({quotation.taxRate}%)</span>
                <span className="font-medium">{money.format(taxAmount)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-slate-200 pt-2 text-lg font-bold sm:justify-end sm:gap-8">
              <span>Total</span>
              <span className="text-blue-800">{money.format(quotation.total)}</span>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
