import { redirect } from "next/navigation";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { QuotationHtmlDocument, type HtmlOrganization, type HtmlQuotation } from "../../cotizaciones/_components/QuotationHtmlDocument";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id_cotizacion: string }> };
type Related<T> = T | T[] | null;

function one<T>(value: Related<T> | undefined) {
  return Array.isArray(value) ? value[0] ?? null : value ?? null;
}

function logoUrl(path: string | null | undefined) {
  const cleanPath = path?.trim();
  if (!cleanPath) return null;
  if (cleanPath.startsWith("http://") || cleanPath.startsWith("https://")) return cleanPath;
  return `${getSupabaseEnv().url}/storage/v1/object/public/logos/${cleanPath.split("/").map(encodeURIComponent).join("/")}`;
}

export default async function HtmlQuotationPage({ params }: Props) {
  const { id_cotizacion: id } = await params;
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) redirect("/iniciar-sesion");

  const [quotationResult, profileResult] = await Promise.all([
    supabase.from("cotizacion").select("id_cotizacion, estado, total_cotizado, subtotal_general, impuesto, descuento, fecha, observacion, cliente(nombre, direccion, identificador_fiscal), cotizacionxservicio(cantidad, precio_unitario, descuento, servicio(nombre, descripcion))").eq("id_cotizacion", id).maybeSingle(),
    supabase.from("usuario").select("organizacion(id_organizacion, nombre, direccion, eslogan, telefono, correo, direccion_web, logo)").eq("id_usuario", authData.user.id).maybeSingle(),
  ]);

  if (quotationResult.error || !quotationResult.data) return <main className="grid min-h-screen place-items-center bg-slate-50 p-6"><div className="rounded-xl bg-white p-8 text-center shadow-sm"><h1 className="text-xl font-semibold">Cotización no encontrada</h1><p className="mt-2 text-sm text-slate-600">No tienes acceso a esta cotización o ya no existe.</p></div></main>;

  const quotation = quotationResult.data as any;
  const client = one(quotation.cliente);
  const rawOrganization = one(profileResult.data?.organizacion as Related<HtmlOrganization> | undefined);
  const organization = rawOrganization ? { ...rawOrganization, logo: logoUrl(rawOrganization.logo) } : null;
  const htmlQuotation: HtmlQuotation = {
    id: quotation.id_cotizacion,
    status: quotation.estado,
    total: Number(quotation.total_cotizado),
    subtotal: Number(quotation.subtotal_general),
    taxRate: quotation.impuesto,
    discount: quotation.descuento,
    date: quotation.fecha,
    clientName: client?.nombre ?? "",
    clientAddress: client?.direccion,
    clientTaxId: client?.identificador_fiscal,
    notes: quotation.observacion,
    items: (quotation.cotizacionxservicio ?? []).map((item: any) => ({ description: one(item.servicio)?.nombre ?? "", quantity: Number(item.cantidad), unitPrice: Number(item.precio_unitario), discount: item.descuento })).filter((item: HtmlQuotation["items"][number]) => item.description),
  };

  return <QuotationHtmlDocument quotation={htmlQuotation} organization={organization} fullPage />;
}
