"use client";

import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { HtmlOrganization, HtmlQuotation } from "./QuotationHtmlDocument";

const labels: Record<string, string> = { pendiente: "Pendiente", enviada: "Enviada", aprobada: "Aprobada", rechazada: "Rechazada", vencida: "Vencida" };
const money = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
const value = (text?: string | null) => text?.trim() || "";

const styles = StyleSheet.create({
  page: { padding: 36, fontSize: 10, color: "#0f172a", fontFamily: "Helvetica" },
  header: { flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 2, borderBottomColor: "#1d4ed8", paddingBottom: 18 },
  headerLeft: { flexDirection: "row", gap: 10 },
  logo: { width: 48, height: 48, objectFit: "contain" },
  orgName: { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#1e40af" },
  slogan: { fontSize: 9, color: "#64748b", marginTop: 2 },
  orgLine: { fontSize: 9, color: "#475569", marginTop: 4 },
  headerRight: { alignItems: "flex-end" },
  docLabel: { fontSize: 8, fontFamily: "Helvetica-Bold", color: "#1d4ed8", textTransform: "uppercase" },
  docId: { fontSize: 20, fontFamily: "Helvetica-Bold", marginTop: 6 },
  docAudience: { fontSize: 8, color: "#475569", marginTop: 6 },
  docStatus: { fontSize: 9, fontFamily: "Helvetica-Bold", color: "#334155", marginTop: 6 },
  section: { flexDirection: "row", justifyContent: "space-between", marginTop: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: "#e2e8f0" },
  caption: { fontSize: 8, fontFamily: "Helvetica-Bold", color: "#64748b", textTransform: "uppercase" },
  clientName: { fontSize: 14, fontFamily: "Helvetica-Bold", marginTop: 6 },
  clientLine: { fontSize: 9, color: "#475569", marginTop: 3 },
  contactBlock: { alignItems: "flex-end" },
  tableHead: { flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#e2e8f0", paddingBottom: 6 },
  serviceHead: { width: "44%", fontFamily: "Helvetica-Bold", fontSize: 8, color: "#64748b", textTransform: "uppercase" },
  qtyHead: { width: "16%", textAlign: "right", fontFamily: "Helvetica-Bold", fontSize: 8, color: "#64748b", textTransform: "uppercase" },
  priceHead: { width: "22%", textAlign: "right", fontFamily: "Helvetica-Bold", fontSize: 8, color: "#64748b", textTransform: "uppercase" },
  totalHead: { width: "18%", textAlign: "right", fontFamily: "Helvetica-Bold", fontSize: 8, color: "#64748b", textTransform: "uppercase" },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#f1f5f9", paddingVertical: 8 },
  serviceCell: { width: "44%" },
  qtyCell: { width: "16%", textAlign: "right" },
  priceCell: { width: "22%", textAlign: "right" },
  totalCell: { width: "18%", textAlign: "right", fontFamily: "Helvetica-Bold" },
  notesSection: { borderTopWidth: 1, borderTopColor: "#e2e8f0", marginTop: 16, paddingTop: 12 },
  notesText: { fontSize: 9, color: "#334155", marginTop: 4 },
  totals: { width: "48%", marginTop: 14, alignSelf: "flex-end", borderTopWidth: 2, borderTopColor: "#1d4ed8", paddingTop: 8 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 2, fontSize: 9 },
  totalStrong: { fontFamily: "Helvetica-Bold" },
  grandRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: "#e2e8f0" },
  grandStrong: { fontFamily: "Helvetica-Bold", fontSize: 13, color: "#1d4ed8" },
  footer: { marginTop: 28, borderTopWidth: 1, borderTopColor: "#e2e8f0", paddingTop: 10, alignItems: "center" },
  footerText: { fontSize: 7.5, color: "#64748b", textAlign: "center" },
  footerLead: { fontSize: 7.5, color: "#64748b", textAlign: "center", marginTop: 6, lineHeight: 1.5 },
});

export function QuotationPdfDocument({ quotation, organization }: { quotation: HtmlQuotation; organization: HtmlOrganization | null }) {
  const discountAmount = Math.round(quotation.subtotal * (quotation.discount ?? 0) / 100);
  const taxAmount = Math.round((quotation.subtotal - discountAmount) * (quotation.taxRate ?? 0) / 100);

  const hasClientTaxId = value(quotation.clientTaxId);
  const hasOrgContact = value(organization?.correo) || value(organization?.telefono) || value(organization?.direccion_web);

  return (
    <Document title={`Cotización ${quotation.id}`} author={organization?.nombre ?? "CotizaPro"}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {organization?.logo && <Image src={organization.logo} style={styles.logo} />}
            <View>
              <Text style={styles.orgName}>{value(organization?.nombre)}</Text>
              <Text style={styles.slogan}>{value(organization?.eslogan)}</Text>
              <Text style={styles.orgLine}>{value(organization?.direccion)}</Text>
              <Text style={styles.orgLine}>{value(organization?.telefono)} · {value(organization?.correo)}</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.docLabel}>Cotización</Text>
            <Text style={styles.docId}>#{quotation.id.slice(0, 8).toUpperCase()}</Text>
            <Text style={styles.docAudience}>Creada exclusivamente para {quotation.clientName || "el cliente"} el {new Date(quotation.date).toLocaleDateString("es-CL")}.</Text>
            <Text style={styles.docStatus}>{labels[quotation.status] ?? quotation.status}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View>
            <Text style={styles.caption}>Cliente</Text>
            <Text style={styles.clientName}>{value(quotation.clientName)}</Text>
            <Text style={styles.clientLine}>{value(quotation.clientAddress)}</Text>
            {hasClientTaxId && <Text style={styles.clientLine}>RUT / ID: {value(quotation.clientTaxId)}</Text>}
          </View>
          {hasOrgContact && (
            <View style={styles.contactBlock}>
              <Text style={styles.caption}>Datos de contacto</Text>
              <Text style={styles.clientLine}>{value(organization?.correo)}</Text>
              <Text style={styles.clientLine}>{value(organization?.telefono)}</Text>
              <Text style={styles.clientLine}>{value(organization?.direccion_web)}</Text>
            </View>
          )}
        </View>

        <View style={{ marginTop: 8 }}>
          <View style={styles.tableHead}>
            <Text style={styles.serviceHead}>Servicio</Text>
            <Text style={styles.qtyHead}>Cantidad</Text>
            <Text style={styles.priceHead}>Valor unitario</Text>
            <Text style={styles.totalHead}>Total</Text>
          </View>
          {quotation.items.map((item, index) => {
            const qty = Number(item.quantity) || 0;
            const unit = Number(item.unitPrice) || 0;
            return (
              <View key={index} style={styles.tableRow}>
                <View style={styles.serviceCell}>
                  <Text>{item.description}</Text>
                </View>
                <Text style={styles.qtyCell}>{qty}</Text>
                <Text style={styles.priceCell}>{money.format(unit)}</Text>
                <Text style={styles.totalCell}>{money.format(qty * unit)}</Text>
              </View>
            );
          })}
        </View>

        {quotation.notes && (
          <View style={styles.notesSection}>
            <Text style={styles.caption}>Notas</Text>
            <Text style={styles.notesText}>{quotation.notes}</Text>
          </View>
        )}

        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text>Subtotal</Text>
            <Text style={styles.totalStrong}>{money.format(quotation.subtotal)}</Text>
          </View>
          {(quotation.discount ?? 0) > 0 && (
            <View style={styles.totalRow}>
              <Text>Descuento ({quotation.discount}%)</Text>
              <Text style={[styles.totalStrong, { color: "#dc2626" }]}>-{money.format(discountAmount)}</Text>
            </View>
          )}
          {(quotation.taxRate ?? 0) > 0 && (
            <View style={styles.totalRow}>
              <Text>IVA ({quotation.taxRate}%)</Text>
              <Text style={styles.totalStrong}>{money.format(taxAmount)}</Text>
            </View>
          )}
          <View style={styles.grandRow}>
            <Text style={styles.grandStrong}>Total</Text>
            <Text style={styles.grandStrong}>{money.format(quotation.total)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
