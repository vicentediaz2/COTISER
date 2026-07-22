"use client";

import { useState, type ReactNode } from "react";
import { createCustomer, createService } from "../actions";
import { QuotationForm, type CustomerOption, type ServiceOption } from "./QuotationForm";

function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl sm:p-8"><div className="mb-6 flex items-start justify-between gap-4"><h2 id="modal-title" className="text-2xl font-semibold">{title}</h2><button type="button" onClick={onClose} aria-label="Cerrar" className="rounded-lg px-3 py-2 text-xl leading-none text-slate-500 hover:bg-slate-100">×</button></div>{children}</div></div>;
}

export function PanelActions({ customers, services }: { customers: CustomerOption[]; services: ServiceOption[] }) {
  const [open, setOpen] = useState<"customer" | "service" | "quotation" | null>(null);

  return <>
    <div className="flex flex-wrap gap-3"><button onClick={() => setOpen("customer")} className="rounded-lg border border-blue-200 bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-sm hover:bg-blue-50">+ Nuevo cliente</button><button onClick={() => setOpen("service")} className="rounded-lg border border-blue-200 bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-sm hover:bg-blue-50">+ Nuevo servicio</button><button onClick={() => setOpen("quotation")} className="primary-button">+ Nueva cotización</button></div>
    {open === "customer" && <Modal title="Nuevo cliente" onClose={() => setOpen(null)}><form action={createCustomer} className="space-y-5"><label className="grid gap-2 text-sm font-medium text-slate-700">Nombre<input className="form-control" name="name" required placeholder="Empresa o persona" /></label><div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-medium text-slate-700">RUT / identificador fiscal<input className="form-control" name="tax_id" placeholder="12.345.678-9" /></label><label className="grid gap-2 text-sm font-medium text-slate-700">Dirección<input className="form-control" name="address" placeholder="Dirección comercial" /></label></div><div className="flex justify-end gap-3"><button type="button" onClick={() => setOpen(null)} className="rounded-lg border border-blue-100 px-5 py-3 font-semibold text-blue-700 hover:bg-blue-50">Cancelar</button><button className="primary-button">Crear cliente</button></div></form></Modal>}
    {open === "service" && <Modal title="Nuevo servicio" onClose={() => setOpen(null)}><form action={createService} className="space-y-5"><label className="grid gap-2 text-sm font-medium text-slate-700">Nombre del servicio<input className="form-control" name="name" required placeholder="Diseño de sitio web" /></label><label className="grid gap-2 text-sm font-medium text-slate-700">Descripción<textarea className="form-control min-h-24 py-3" name="description" placeholder="Describe brevemente el servicio" /></label><label className="grid gap-2 text-sm font-medium text-slate-700"></label><label className="grid gap-2 text-sm font-medium text-slate-700">Precio base<input className="form-control" name="base_cost" type="number" min="0" step="1" required defaultValue="0" /><span className="text-xs font-normal text-slate-500">Ingresa un monto entero.</span></label><div className="flex justify-end gap-3"><button type="button" onClick={() => setOpen(null)} className="rounded-lg border border-blue-100 px-5 py-3 font-semibold text-blue-700 hover:bg-blue-50">Cancelar</button><button className="primary-button">Crear servicio</button></div></form></Modal>}
    {open === "quotation" && <Modal title="Nueva cotización" onClose={() => setOpen(null)}><QuotationForm customers={customers} services={services} /></Modal>}
  </>;
}
