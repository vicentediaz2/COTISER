"use client";

import { useState } from "react";
import { deleteQuotation, updateQuotation } from "../actions";
import { QuotationForm, type CustomerOption, type EditableQuotation, type ServiceOption } from "./QuotationForm";
import { QuotationExport, type ExportOrganization } from "./QuotationExport";
import { QuotationView } from "./QuotationView";

type Quotation = EditableQuotation & { status: string; total: number; subtotal: number; taxRate?: number | null; date: string };
const labels: Record<string, string> = { pendiente: "Pendiente", enviada: "Enviada", aprobada: "Aprobada", rechazada: "Rechazada", vencida: "Vencida" };
const badgeColors: Record<string, string> = {
  pendiente: "bg-blue-50 text-blue-700",
  enviada: "bg-amber-50 text-amber-700",
  aprobada: "bg-green-50 text-green-700",
  rechazada: "bg-red-50 text-red-700",
  vencida: "bg-red-50 text-red-700",
};

function Modal({ quotation, customers, services, onClose }: { quotation: Quotation; customers: CustomerOption[]; services: ServiceOption[]; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4" role="dialog" aria-modal="true" onMouseDown={onClose}><div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl sm:p-8" onMouseDown={(event) => event.stopPropagation()}><div className="mb-6 flex items-start justify-between"><div><h2 className="text-2xl font-semibold">Editar cotización</h2><p className="mt-1 text-sm text-slate-500">Modifica los detalles para preparar una contraoferta.</p></div><button type="button" onClick={onClose} aria-label="Cerrar" className="rounded-lg px-3 py-2 text-xl text-slate-500 hover:bg-slate-100">×</button></div><QuotationForm customers={customers} services={services} quotation={quotation} /></div></div>;
}

export function QuotationList({ quotations, customers, services, organization }: { quotations: Quotation[]; customers: CustomerOption[]; services: ServiceOption[]; organization: ExportOrganization | null }) {
  const [editing, setEditing] = useState<Quotation | null>(null);
  const [viewing, setViewing] = useState<Quotation | null>(null);
  const [exporting, setExporting] = useState<Quotation | null>(null);
  const [query, setQuery] = useState("");
  const format = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
  const filtered = quotations.filter((quotation) => [quotation.id, quotation.clientName, quotation.status, ...quotation.items.map((item) => item.description)].join(" ").toLocaleLowerCase("es-CL").includes(query.trim().toLocaleLowerCase("es-CL")));

  if (!quotations.length) return <div className="rounded-xl border border-dashed border-blue-200 bg-white p-10 text-center text-slate-600">Aún no tienes cotizaciones.</div>;

  return <><section className="mb-5 rounded-xl border border-blue-100 bg-white p-4 shadow-sm"><label className="sr-only" htmlFor="quotation-search">Buscar cotizaciones</label><input id="quotation-search" className="form-control min-h-11" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por cliente, ID o servicio" /></section><div className="grid gap-4">{filtered.map((quotation) => { const isApproved = quotation.status === "aprobada"; return <article key={quotation.id} className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm"><div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"><div><div className="flex flex-wrap items-center gap-2"><span className="text-xs font-semibold text-blue-700">Cotización {quotation.id.slice(0, 8).toUpperCase()}</span><span className={`rounded-full px-2 py-1 text-xs font-medium ${badgeColors[quotation.status] ?? "bg-slate-100 text-slate-700"}`}>{labels[quotation.status] ?? quotation.status}</span></div><h3 className="mt-2 font-semibold">{quotation.clientName}</h3><p className="mt-1 text-sm text-slate-600">{new Date(quotation.date).toLocaleDateString("es-CL")}</p></div><div className="flex flex-col gap-3 sm:flex-row sm:items-center"><div className="text-sm text-slate-600 sm:text-right"><p>Subtotal: {format.format(quotation.subtotal)}</p>{quotation.taxRate !== null && quotation.taxRate !== undefined && <p>Impuesto: {quotation.taxRate}%</p>}<strong className="text-lg text-slate-950">{format.format(quotation.total)}</strong></div><button type="button" onClick={() => setExporting(quotation)} className="rounded-lg border border-blue-200 px-4 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50">Exportar</button>{isApproved ? <button type="button" onClick={() => setViewing(quotation)} className="rounded-lg border border-blue-200 px-4 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50">Ver</button> : <><form action={updateQuotation} className="flex items-center gap-2"><input type="hidden" name="id" value={quotation.id} /><select name="status" defaultValue={quotation.status} className="form-control min-h-11 py-2 text-sm"><option value="pendiente">Pendiente</option><option value="enviada">Enviada</option><option value="aprobada">Aprobada</option><option value="rechazada">Rechazada</option><option value="vencida">Vencida</option></select><button className="rounded-lg border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">Actualizar</button></form><button type="button" onClick={() => setEditing(quotation)} className="rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800">Editar</button><form action={deleteQuotation}><input type="hidden" name="id" value={quotation.id} /><button className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">Eliminar</button></form></>}</div></div></article>; })}</div>{!filtered.length && <div className="rounded-xl border border-dashed border-blue-200 bg-white p-10 text-center text-slate-600">No encontramos cotizaciones.</div>}{editing && <Modal quotation={editing} customers={customers} services={services} onClose={() => setEditing(null)} />}{viewing && <QuotationView quotation={viewing} onClose={() => setViewing(null)} />}{exporting && <QuotationExport quotation={exporting} organization={organization} onClose={() => setExporting(null)} />}</>;
}
