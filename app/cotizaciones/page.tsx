import { Brand } from "@/app/_components/Brand";
import { FormMessage } from "@/app/_components/FormMessage";
import { signOut } from "@/app/auth/actions";
import { getSupabaseEnv, hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PanelActions } from "./_components/PanelActions";
import { QuotationList } from "./_components/QuotationList";

export const dynamic = "force-dynamic";
type Props = { searchParams: Promise<{ error?: string; mensaje?: string }> };
type Cliente = { id_cliente: string; nombre: string; direccion?: string | null; identificador_fiscal?: string | null };
type Servicio = { id_servicio: string; nombre: string; descripcion?: string | null; costo_base: number | string };
type RelatedOne<T> = T | T[] | null;
type Cotizacion = {
  id_cotizacion: string;
  estado: string;
  total_cotizado: number;
  subtotal_general: number;
  impuesto?: number | null;
  descuento?: number | null;
  fecha: string;
  observacion?: string | null;
  // La forma de relaciones sin tipos generados puede variar entre objeto y
  // arreglo según la configuración de PostgREST; ambas se normalizan abajo.
  cliente?: RelatedOne<{ nombre: string; direccion?: string | null; identificador_fiscal?: string | null }>;
  cotizacionxservicio?: {
    cantidad: number;
    precio_unitario: number;
    descuento?: number | null;
    servicio?: RelatedOne<{ nombre: string; descripcion?: string | null }>;
  }[] | null;
};
type Organizacion = {
  id_organizacion: string;
  nombre: string;
  direccion?: string | null;
  eslogan?: string | null;
  telefono?: string | null;
  correo?: string | null;
  direccion_web?: string | null;
  logo?: string | null;
};

function relatedOne<T>(value: RelatedOne<T> | undefined) {
  return Array.isArray(value) ? value[0] ?? null : value ?? null;
}

function publicLogoUrl(path: string | null | undefined) {
  const cleanPath = path?.trim();
  if (!cleanPath) return null;
  if (cleanPath.startsWith("http://") || cleanPath.startsWith("https://")) return cleanPath;
  const encodedPath = cleanPath.split("/").map(encodeURIComponent).join("/");
  return `${getSupabaseEnv().url}/storage/v1/object/public/logos/${encodedPath}`;
}

export default async function QuotationsPage({ searchParams }: Props) {
  if (!hasSupabaseEnv()) return <main className="grid min-h-screen place-items-center bg-slate-50 px-6"><div className="max-w-lg rounded-xl border border-amber-200 bg-white p-8 text-center shadow-sm"><h1 className="text-2xl font-semibold">Falta conectar Supabase</h1><p className="mt-3 text-slate-600">Copia <code>.env.example</code> como <code>.env.local</code>, agrega las claves públicas del proyecto y ejecuta la migración incluida.</p></div></main>;

  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  if (!claimsData?.claims?.sub) redirect("/iniciar-sesion");
  const [quotationsResult, customersResult, servicesResult, profileResult] = await Promise.all([
    supabase.from("cotizacion").select("id_cotizacion, estado, total_cotizado, subtotal_general, impuesto, descuento, fecha, observacion, cliente(nombre, direccion, identificador_fiscal), cotizacionxservicio(cantidad, precio_unitario, descuento, servicio(nombre, descripcion))").order("fecha", { ascending: false }),
    supabase.from("cliente").select("id_cliente, nombre, direccion, identificador_fiscal").order("nombre"),
    supabase.from("servicio").select("id_servicio, nombre, descripcion, costo_base").order("nombre"),
    supabase.from("usuario").select("organizacion(id_organizacion, nombre, direccion, eslogan, telefono, correo, direccion_web, logo)").eq("id_usuario", claimsData.claims.sub).maybeSingle(),
  ]);
  const queryError = quotationsResult.error ?? customersResult.error ?? servicesResult.error ?? profileResult.error;
  const customerRecords = (queryError ? [] : customersResult.data ?? []) as Cliente[];
  const serviceRecords = (queryError ? [] : servicesResult.data ?? []) as Servicio[];
  const quotations = (queryError ? [] : quotationsResult.data ?? []) as unknown as Cotizacion[];
  const organization = (queryError ? null : relatedOne(profileResult.data?.organizacion as RelatedOne<Organizacion> | undefined)) as Organizacion | null;
  const exportOrganization = organization ? { ...organization, logo: publicLogoUrl(organization.logo) } : null;
  const customers = customerRecords.map(({ id_cliente, nombre }) => ({ id: id_cliente, name: nombre }));
  const services = serviceRecords.map(({ id_servicio, nombre, costo_base }) => ({ id: id_servicio, name: nombre, price: Number(costo_base) }));
  const editableQuotations = quotations.map((quotation) => ({
    id: quotation.id_cotizacion,
    status: quotation.estado,
    total: quotation.total_cotizado,
    subtotal: quotation.subtotal_general,
    taxRate: quotation.impuesto,
    discount: quotation.descuento,
    date: quotation.fecha,
    clientName: relatedOne(quotation.cliente)?.nombre ?? "",
    clientAddress: relatedOne(quotation.cliente)?.direccion,
    clientTaxId: relatedOne(quotation.cliente)?.identificador_fiscal,
    notes: quotation.observacion,
    items: (quotation.cotizacionxservicio ?? [])
      .map((item) => ({
        description: relatedOne(item.servicio)?.nombre ?? "",
        quantity: item.cantidad,
        unitPrice: item.precio_unitario,
        discount: item.descuento,
      }))
      .filter((item) => item.description),
  }));
  const params = await searchParams;

  return <main className="min-h-screen bg-slate-50 text-slate-950">
    <header className="border-b border-blue-100 bg-white px-6 py-4"><div className="mx-auto flex max-w-7xl items-center justify-between"><Brand dark /><div className="flex items-center gap-3"><Link href="/perfil" className="rounded-lg border border-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">Editar perfil</Link><form action={signOut}><button className="rounded-lg border border-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">Cerrar sesión</button></form></div></div></header>
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-10"><div><p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Panel comercial</p><h1 className="mt-2 text-4xl font-semibold">Panel</h1><p className="mt-2 text-slate-600">Consulta el historial y administra tus clientes, servicios y propuestas.</p></div><FormMessage error={params.error ?? (queryError ? `No se pudieron cargar los datos: ${queryError.message}` : undefined)} message={params.mensaje} /><PanelActions customers={customers} services={services} customerRecords={customerRecords} serviceRecords={serviceRecords} /><section><div className="mb-4 flex items-center justify-between gap-4"><h2 className="text-xl font-semibold">Historial de cotizaciones</h2><span className="text-sm text-slate-500">{quotations.length} {quotations.length === 1 ? "registro" : "registros"}</span></div><QuotationList quotations={editableQuotations} customers={customers} services={services} organization={exportOrganization} /></section></div>
  </main>;
}
