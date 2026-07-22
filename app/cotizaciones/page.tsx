import { Brand } from "@/app/_components/Brand";
import { FormMessage } from "@/app/_components/FormMessage";
import { signOut } from "@/app/auth/actions";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { deleteCustomer, deleteQuotation, deleteService, updateCustomer, updateQuotation, updateService } from "./actions";
import { PanelActions } from "./_components/PanelActions";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ error?: string; mensaje?: string }>;
};

type Cotizacion = {
  id_cotizacion: string;
  estado: string;
  total_cotizado: number;
  fecha: string;
  observacion?: string | null;
  cliente?: {
    nombre: string;
  }[] | null;
};

type Cliente = { id_cliente: string; nombre: string; direccion?: string | null; identificador_fiscal?: string | null };
type Servicio = { id_servicio: string; nombre: string; descripcion?: string | null; costo_base: number | string };

const labels: Record<string, string> = {
  pendiente: "Pendiente",
  enviada: "Enviada",
  aceptada: "Aceptada",
  rechazada: "Rechazada",
};

export default async function QuotationsPage({ searchParams }: Props) {
  if (!hasSupabaseEnv()) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 px-6">
        <div className="max-w-lg rounded-xl border border-amber-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold">Falta conectar Supabase</h1>
          <p className="mt-3 text-slate-600">
            Copia <code>.env.example</code> como <code>.env.local</code>, agrega las
            claves publicas del proyecto y ejecuta la migracion incluida.
          </p>
        </div>
      </main>
    );
  }

  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = String(claimsData?.claims?.sub ?? "");
  if (!userId) redirect("/iniciar-sesion");

  const [quotationsResult, customersResult, servicesResult] = await Promise.all([
    supabase
      .from("cotizacion")
      .select("id_cotizacion, estado, total_cotizado, fecha, observacion, cliente(nombre)")
      .order("fecha", { ascending: false }),
    supabase.from("cliente").select("id_cliente, nombre, direccion, identificador_fiscal").order("nombre"),
    supabase.from("servicio").select("id_servicio, nombre, descripcion, costo_base").order("nombre"),
  ]);

  const queryError = quotationsResult.error ?? customersResult.error ?? servicesResult.error;
  const customersData = queryError ? [] : customersResult.data ?? [];
  const servicesData = queryError ? [] : servicesResult.data ?? [];
  const quotations = (queryError ? [] : quotationsResult.data ?? []) as Cotizacion[];
  const customers = (customersData as Cliente[]).map((customer) => ({ id: customer.id_cliente, name: customer.nombre }));
  const services = (servicesData as Servicio[]).map((service) => ({ id: service.id_servicio, name: service.nombre, price: Number(service.costo_base) }));
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-blue-100 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Brand dark />
          <div className="flex items-center gap-3">
            <Link href="/perfil" className="rounded-lg border border-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">
              Editar perfil
            </Link>
            <form action={signOut}>
              <button className="rounded-lg border border-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">
                Cerrar sesion
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-8 px-6 py-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Panel comercial
          </p>
          <h1 className="mt-2 text-4xl font-semibold">Panel</h1>
          <p className="mt-2 text-slate-600">
            Consulta el historial y administra tus clientes, servicios y propuestas.
          </p>
        </div>

        <FormMessage error={params.error ?? (queryError ? `No se pudieron cargar los datos: ${queryError.message}` : undefined)} message={params.mensaje} />

        <PanelActions customers={customers} services={services} />

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-semibold">Clientes</h2><span className="text-sm text-slate-500">{customersData.length}</span></div>
            <div className="space-y-4">
              {(customersData as Cliente[]).map((customer) => <form key={customer.id_cliente} action={updateCustomer} className="grid gap-2 border-t border-slate-100 pt-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end"><input type="hidden" name="id" value={customer.id_cliente} /><input type="hidden" name="tax_id" value={customer.identificador_fiscal ?? ""} /><label className="grid gap-1 text-xs font-medium text-slate-600">Nombre<input className="form-control" name="name" defaultValue={customer.nombre} required /></label><label className="grid gap-1 text-xs font-medium text-slate-600">Dirección<input className="form-control" name="address" defaultValue={customer.direccion ?? ""} /></label><div className="flex gap-2"><button className="rounded-lg border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-700">Guardar</button><button formAction={deleteCustomer} className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">Eliminar</button></div></form>)}
              {customersData.length === 0 && <p className="text-sm text-slate-500">No hay clientes creados.</p>}
            </div>
          </div>
          <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-semibold">Servicios</h2><span className="text-sm text-slate-500">{servicesData.length}</span></div>
            <div className="space-y-4">
              {(servicesData as Servicio[]).map((service) => <form key={service.id_servicio} action={updateService} className="grid gap-2 border-t border-slate-100 pt-4 sm:grid-cols-[1fr_120px_auto] sm:items-end"><input type="hidden" name="id" value={service.id_servicio} /><input type="hidden" name="description" value={service.descripcion ?? ""} /><label className="grid gap-1 text-xs font-medium text-slate-600">Nombre<input className="form-control" name="name" defaultValue={service.nombre} required /></label><label className="grid gap-1 text-xs font-medium text-slate-600">Precio<input className="form-control" name="base_cost" type="number" min="0" step="1" defaultValue={service.costo_base} required /></label><div className="flex gap-2"><button className="rounded-lg border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-700">Guardar</button><button formAction={deleteService} className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">Eliminar</button></div></form>)}
              {servicesData.length === 0 && <p className="text-sm text-slate-500">No hay servicios creados.</p>}
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between gap-4"><h2 className="text-xl font-semibold">Historial de cotizaciones</h2><span className="text-sm text-slate-500">{quotations.length} {quotations.length === 1 ? "registro" : "registros"}</span></div>
          {quotations.length === 0 ? (
            <div className="rounded-xl border border-dashed border-blue-200 bg-white p-10 text-center text-slate-600">
              Aún no tienes cotizaciones. Crea clientes y servicios, luego agrega tu primera cotización.
            </div>
          ) : (
            <div className="grid gap-4">
              {quotations.map((quotation) => {
                const amount = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(quotation.total_cotizado);

                return (
                  <article
                    key={quotation.id_cotizacion}
                    className="flex flex-col gap-4 rounded-xl border border-blue-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-blue-700">
                          Cotización {quotation.id_cotizacion.slice(0, 8).toUpperCase()}
                        </span>
                        <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                          {labels[quotation.estado] ?? quotation.estado}
                        </span>
                      </div>
                      <h3 className="mt-2 font-semibold">
                        {quotation.cliente?.[0]?.nombre ?? "Cliente sin nombre"}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        {new Date(quotation.fecha).toLocaleDateString("es-CL")}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <strong className="text-lg">{amount}</strong>
                      <form action={updateQuotation} className="flex items-center gap-2">
                        <input type="hidden" name="id" value={quotation.id_cotizacion} />
                        <select name="status" defaultValue={quotation.estado} className="form-control py-2 text-sm"><option value="pendiente">Pendiente</option><option value="enviada">Enviada</option><option value="aceptada">Aceptada</option><option value="rechazada">Rechazada</option></select>
                        <input type="hidden" name="notes" value={quotation.observacion ?? ""} />
                        <button className="rounded-lg border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-700">Guardar</button>
                      </form>
                      <form action={deleteQuotation}><input type="hidden" name="id" value={quotation.id_cotizacion} /><button className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">Eliminar</button></form>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
