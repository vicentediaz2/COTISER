"use client";

import { useState, type ReactNode } from "react";
import { createCustomer, createService, updateCustomer, updateService } from "../actions";
import { QuotationForm, type CustomerOption, type ServiceOption } from "./QuotationForm";

type CustomerRecord = { id_cliente: string; nombre: string; direccion?: string | null; identificador_fiscal?: string | null };
type ServiceRecord = { id_servicio: string; nombre: string; descripcion?: string | null; costo_base: number | string };
type ModalKind = "customers" | "services" | "quotation" | "new-customer" | "new-service" | null;

function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 id="modal-title" className="text-2xl font-semibold">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Cerrar" className="rounded-lg px-3 py-2 text-xl leading-none text-slate-500 hover:bg-slate-100 min-h-11 min-w-11 flex items-center justify-center">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function CustomerForm({ customer, onCancel }: { customer?: CustomerRecord; onCancel: () => void }) {
  return <form action={customer ? updateCustomer : createCustomer} className="space-y-5"><input type="hidden" name="id" value={customer?.id_cliente ?? ""} /><label className="grid gap-2 text-sm font-medium text-slate-700">Nombre<input className="form-control" name="name" required defaultValue={customer?.nombre ?? ""} placeholder="Empresa o persona" /></label><div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-medium text-slate-700">RUT / identificador fiscal<input className="form-control" name="tax_id" defaultValue={customer?.identificador_fiscal ?? ""} placeholder="12.345.678-9" /></label><label className="grid gap-2 text-sm font-medium text-slate-700">Dirección<input className="form-control" name="address" defaultValue={customer?.direccion ?? ""} placeholder="Dirección comercial" /></label></div><div className="flex justify-end gap-3"><button type="button" onClick={onCancel} className="rounded-lg border border-blue-100 px-5 py-3 font-semibold text-blue-700 hover:bg-blue-50">Cancelar</button><button className="primary-button">{customer ? "Guardar cambios" : "Crear cliente"}</button></div></form>;
}

function ServiceForm({ service, onCancel }: { service?: ServiceRecord; onCancel: () => void }) {
  return <form action={service ? updateService : createService} className="space-y-5"><input type="hidden" name="id" value={service?.id_servicio ?? ""} /><label className="grid gap-2 text-sm font-medium text-slate-700">Nombre del servicio<input className="form-control" name="name" required defaultValue={service?.nombre ?? ""} placeholder="Diseño de sitio web" /></label><label className="grid gap-2 text-sm font-medium text-slate-700">Descripción<textarea className="form-control min-h-24 py-3" name="description" defaultValue={service?.descripcion ?? ""} placeholder="Describe brevemente el servicio" /></label><label className="grid gap-2 text-sm font-medium text-slate-700">Precio base<input className="form-control" name="base_cost" type="number" min="0" step="1" required defaultValue={service?.costo_base ?? "0"} /><span className="text-xs font-normal text-slate-500">Ingresa un monto entero.</span></label><div className="flex justify-end gap-3"><button type="button" onClick={onCancel} className="rounded-lg border border-blue-100 px-5 py-3 font-semibold text-blue-700 hover:bg-blue-50">Cancelar</button><button className="primary-button">{service ? "Guardar cambios" : "Crear servicio"}</button></div></form>;
}

export function PanelActions({ customers, services, customerRecords, serviceRecords }: { customers: CustomerOption[]; services: ServiceOption[]; customerRecords: CustomerRecord[]; serviceRecords: ServiceRecord[] }) {
  const [open, setOpen] = useState<ModalKind>(null);
  const [editingCustomer, setEditingCustomer] = useState<CustomerRecord | null>(null);
  const [editingService, setEditingService] = useState<ServiceRecord | null>(null);
  const close = () => { setOpen(null); setEditingCustomer(null); setEditingService(null); };
  const editCustomer = (customer: CustomerRecord) => { setEditingCustomer(customer); setOpen("new-customer"); };
  const editService = (service: ServiceRecord) => { setEditingService(service); setOpen("new-service"); };

  return <>
    <div className="flex flex-wrap gap-3"><button type="button" onClick={() => setOpen("customers")} className="rounded-lg border border-blue-200 bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-sm hover:bg-blue-50 min-h-11 cursor-pointer">Clientes ({customerRecords.length})</button><button type="button" onClick={() => setOpen("services")} className="rounded-lg border border-blue-200 bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-sm hover:bg-blue-50 min-h-11 cursor-pointer">Servicios ({serviceRecords.length})</button><button type="button" onClick={() => setOpen("quotation")} className="primary-button min-h-11 cursor-pointer">+ Nueva cotización</button></div>

    {open === "customers" && <Modal title="Clientes" onClose={close}><div className="mb-5 flex items-center justify-between"><p className="text-sm text-slate-600">Selecciona un cliente para editar su información.</p><button type="button" onClick={() => { setEditingCustomer(null); setOpen("new-customer"); }} className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">+ Nuevo</button></div>{customerRecords.length ? <ul className="divide-y divide-slate-100 rounded-xl border border-slate-100">{customerRecords.map((customer) => <li key={customer.id_cliente} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold">{customer.nombre}</p><p className="mt-1 text-sm text-slate-500">{customer.identificador_fiscal || "Sin identificador fiscal"}{customer.direccion ? ` · ${customer.direccion}` : ""}</p></div><button type="button" onClick={() => editCustomer(customer)} className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">Editar</button></li>)}</ul> : <div className="rounded-xl border border-dashed border-blue-200 p-8 text-center text-sm text-slate-500">No hay clientes creados.</div>}</Modal>}

    {open === "services" && <Modal title="Servicios" onClose={close}><div className="mb-5 flex items-center justify-between"><p className="text-sm text-slate-600">Selecciona un servicio para editar sus datos.</p><button type="button" onClick={() => { setEditingService(null); setOpen("new-service"); }} className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">+ Nuevo</button></div>{serviceRecords.length ? <ul className="divide-y divide-slate-100 rounded-xl border border-slate-100">{serviceRecords.map((service) => <li key={service.id_servicio} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold">{service.nombre}</p><p className="mt-1 text-sm text-slate-500">{service.descripcion || "Sin descripción"} · ${Number(service.costo_base).toLocaleString("es-CL")}</p></div><button type="button" onClick={() => editService(service)} className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">Editar</button></li>)}</ul> : <div className="rounded-xl border border-dashed border-blue-200 p-8 text-center text-sm text-slate-500">No hay servicios creados.</div>}</Modal>}

    {open === "new-customer" && <Modal title={editingCustomer ? "Editar cliente" : "Nuevo cliente"} onClose={close}><CustomerForm customer={editingCustomer ?? undefined} onCancel={close} /></Modal>}
    {open === "new-service" && <Modal title={editingService ? "Editar servicio" : "Nuevo servicio"} onClose={close}><ServiceForm service={editingService ?? undefined} onCancel={close} /></Modal>}
    {open === "quotation" && <Modal title="Nueva cotización" onClose={close}><QuotationForm customers={customers} services={services} /></Modal>}
  </>;
}
