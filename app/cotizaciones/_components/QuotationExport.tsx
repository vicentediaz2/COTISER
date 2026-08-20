"use client";

import { QuotationHtmlDocument, type HtmlOrganization, type HtmlQuotation } from "./QuotationHtmlDocument";

export type ExportOrganization = HtmlOrganization;
type ExportQuotation = HtmlQuotation;

export function QuotationExport({ quotation, organization, onClose }: { quotation: ExportQuotation; organization: ExportOrganization | null; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/45 p-4" role="dialog" aria-modal="true" aria-labelledby="export-quotation-title" onMouseDown={onClose}><div className="mx-auto max-w-5xl rounded-xl bg-white shadow-2xl" onMouseDown={(event) => event.stopPropagation()}><div className="flex items-center justify-between border-b border-slate-200 p-5 print:hidden"><div><h2 id="export-quotation-title" className="text-xl font-semibold">Vista de exportación</h2><p className="text-sm text-slate-500">Elige PDF o abre la versión HTML completa.</p></div><div className="flex flex-wrap justify-end gap-2"><button type="button" onClick={() => window.print()} className="primary-button min-h-10 px-4 py-2 text-sm">Imprimir / PDF</button><button type="button" onClick={() => window.open(`/panel/${quotation.id}`, "_blank", "noopener,noreferrer")} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Exportar HTML</button><button type="button" onClick={onClose} className="rounded-lg border border-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">Cerrar</button></div></div><QuotationHtmlDocument quotation={quotation} organization={organization} /></div></div>;
}
