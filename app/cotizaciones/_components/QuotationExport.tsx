"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { QuotationHtmlDocument, type HtmlOrganization, type HtmlQuotation } from "./QuotationHtmlDocument";
import { QuotationPdfDocument } from "./QuotationPdfDocument";

export type ExportOrganization = HtmlOrganization;
type ExportQuotation = HtmlQuotation;

export function QuotationExport({ quotation, organization, onClose }: { quotation: ExportQuotation; organization: ExportOrganization | null; onClose: () => void }) {
  const [downloading, setDownloading] = useState(false);

  async function handleDownloadPdf() {
    setDownloading(true);
    try {
      const blob = await pdf(<QuotationPdfDocument quotation={quotation} organization={organization} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `cotizacion-${quotation.id.slice(0, 8)}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  }

  return <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/45 p-4" role="dialog" aria-modal="true" aria-labelledby="export-quotation-title" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}><div className="mx-auto max-w-5xl rounded-xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}><div className="flex items-center justify-between border-b border-slate-200 p-5 print:hidden"><div><h2 id="export-quotation-title" className="text-xl font-semibold">Vista de exportación</h2><p className="text-sm text-slate-500">Elige PDF o abre la versión HTML completa.</p></div><div className="flex flex-wrap justify-end gap-2"><button type="button" onClick={handleDownloadPdf} disabled={downloading} className="primary-button min-h-10 px-4 py-2 text-sm disabled:opacity-60">{downloading ? "Generando PDF…" : "Descargar PDF"}</button><button type="button" onClick={() => window.open(`/panel/${quotation.id}`, "_blank", "noopener,noreferrer")} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Exportar HTML</button><button type="button" onClick={onClose} className="rounded-lg border border-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">Cerrar</button></div></div><QuotationHtmlDocument quotation={quotation} organization={organization} /></div></div>;
}