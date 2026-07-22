"use client";

import { useState } from "react";
import { createQuotation } from "../actions";

export type CustomerOption = { id: string; name: string };
export type ServiceOption = { id: string; name: string; price: number };
type Item = { id: number; description: string; quantity: number; unitPrice: number };

export function QuotationForm({ customers, services }: { customers: CustomerOption[]; services: ServiceOption[] }) {
  const [items, setItems] = useState<Item[]>([{ id: 1, description: "", quantity: 1, unitPrice: 0 }]);
  const total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const format = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

  function update(id: number, patch: Partial<Item>) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
  }

  return (
    <form action={createQuotation} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-700">Cliente<select className="form-control" name="client_name" required defaultValue=""><option value="" disabled>Selecciona un cliente</option>{customers.map((customer) => <option key={customer.id} value={customer.name}>{customer.name}</option>)}</select></label>
        <p className="self-end text-sm text-slate-500">La cotización se guardará con la fecha actual y en pesos chilenos.</p>
      </div>
      <div>
        <div className="mb-3 flex items-center justify-between"><h3 className="font-semibold">Servicios</h3><button type="button" onClick={() => setItems((current) => [...current, { id: Date.now(), description: "", quantity: 1, unitPrice: 0 }])} className="text-sm font-semibold text-blue-700 hover:underline">+ Agregar servicio</button></div>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item.id} className="grid gap-3 rounded-lg border border-blue-100 bg-blue-50/40 p-3 sm:grid-cols-[1fr_100px_150px_auto] sm:items-end">
              <label className="grid gap-1 text-xs font-medium text-slate-600">Servicio<select className="form-control" name="item_description" required value={item.description} onChange={(event) => { const service = services.find(({ name }) => name === event.target.value); update(item.id, { description: event.target.value, unitPrice: service?.price ?? 0 }); }}><option value="" disabled>Selecciona un servicio</option>{services.map((service) => <option key={service.id} value={service.name}>{service.name}</option>)}</select></label>
              <label className="grid gap-1 text-xs font-medium text-slate-600">Cantidad<input className="form-control" name="item_quantity" type="number" min="1" step="1" required value={item.quantity} onChange={(event) => update(item.id, { quantity: Number(event.target.value) })} /></label>
              <label className="grid gap-1 text-xs font-medium text-slate-600">Precio unitario<input className="form-control" name="item_unit_price" type="number" min="0" step="1" required value={item.unitPrice} onChange={(event) => update(item.id, { unitPrice: Number(event.target.value) })} /></label>
              <button type="button" aria-label={`Eliminar servicio ${index + 1}`} disabled={items.length === 1} onClick={() => setItems((current) => current.filter(({ id }) => id !== item.id))} className="min-h-12 rounded-lg px-3 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-30">Eliminar</button>
            </div>
          ))}
        </div>
      </div>
      <label className="grid gap-2 text-sm font-medium text-slate-700">Observación<textarea className="form-control min-h-24 py-3" name="notes" placeholder="Condiciones de pago, alcance u observaciones" /></label>
      <div className="flex flex-col gap-4 border-t border-blue-100 pt-5 sm:flex-row sm:items-center sm:justify-between"><div className="text-sm text-slate-600">Total: <strong className="text-blue-700">{format.format(total)}</strong></div><button className="primary-button">Guardar cotización</button></div>
    </form>
  );
}
