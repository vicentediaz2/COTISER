import Link from "next/link";
import { Brand } from "@/app/_components/Brand";
import { FormMessage } from "@/app/_components/FormMessage";
import { headerActions, headerActionSecondary, headerBar, headerInner } from "@/app/_components/headerStyles";
import { signOut } from "@/app/auth/actions";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { updateProfile } from "./actions";
import { LogoUpload } from "./_components/LogoUpload";
import { PasswordChange } from "./_components/PasswordChange";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ error?: string; mensaje?: string }> };

type OrganizationData = {
  nombre?: string | null;
  direccion?: string | null;
  eslogan?: string | null;
  telefono?: string | null;
  correo?: string | null;
  direccion_web?: string | null;
  logo?: string | null;
};

function fieldValue(value: string | null | undefined) {
  return value?.trim() || undefined;
}

function formatDate(value: string | null | undefined) {
  return value ? new Intl.DateTimeFormat("es-CL", { dateStyle: "long", timeStyle: "short" }).format(new Date(value)) : "Sin información";
}

export default async function ProfilePage({ searchParams }: Props) {
  if (!hasSupabaseEnv()) {
    return <main className="grid min-h-screen place-items-center bg-slate-50 px-6"><div className="rounded-xl border border-amber-200 bg-white p-8 text-center shadow-sm"><h1 className="text-2xl font-semibold">Falta conectar Supabase</h1><p className="mt-3 text-slate-600">Configura las variables de entorno para editar tu perfil.</p></div></main>;
  }

  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  const user = authData.user;
  if (!user) redirect("/iniciar-sesion");

  const { data: profile, error: profileError } = await supabase
    .from("usuario")
    .select("organizacion(id_organizacion, nombre, direccion, eslogan, telefono, correo, direccion_web, logo)")
    .eq("id_usuario", user.id)
    .maybeSingle();
  const params = await searchParams;
  const organization = profile?.organizacion as OrganizationData | null;
  const logoPath = organization?.logo?.trim() || undefined;
  const logoUrl = logoPath ? `${getSupabaseEnv().url}/storage/v1/object/public/logos/${logoPath}` : null;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className={headerBar}><div className={headerInner}><Brand /><div className={headerActions}><Link href="/panel" className={`inline-flex ${headerActionSecondary}`}>Volver al panel</Link><form action={signOut}><button className={`inline-flex ${headerActionSecondary}`}>Cerrar sesión</button></form></div></div></header>
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8"><p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Configuración</p><h1 className="mt-2 text-4xl font-semibold">Editar perfil</h1><p className="mt-2 text-slate-600">Administra los datos de acceso y la información de tu organización.</p></div>
        <FormMessage error={params.error ?? (profileError ? "No se pudo cargar la organización." : undefined)} message={params.mensaje} />
        <form action={updateProfile} className="mt-6 space-y-6 rounded-xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
          <section className="space-y-5"><div><h2 className="text-lg font-semibold">Datos de acceso</h2></div><div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-medium text-slate-700">Usuario<input name="username" required defaultValue={user.user_metadata?.username ?? user.user_metadata?.name ?? ""} className="form-control" autoComplete="username" /></label><label className="grid gap-2 text-sm font-medium text-slate-700">Correo electrónico<input name="email" type="email" required defaultValue={user.email ?? ""} className="form-control" autoComplete="email" /></label><PasswordChange /></div></section>
          <section className="space-y-5 border-t border-blue-100 pt-6">
            <div>
              <h2 className="text-lg font-semibold">Organización</h2>
              <p className="mt-1 text-sm text-slate-600">Información pública de tu empresa para cotizaciones y documentos.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
                Nombre de la organización
                <input name="organizacion" defaultValue={fieldValue(organization?.nombre)} className="form-control" placeholder="Nombre de tu empresa" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
                Eslogan
                <input name="eslogan" defaultValue={fieldValue(organization?.eslogan)} className="form-control" placeholder="Tu propuesta de valor" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
                Dirección
                <input name="direccion" defaultValue={fieldValue(organization?.direccion)} className="form-control" placeholder="Calle, número, comuna, ciudad" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Teléfono
                <input name="telefono" type="tel" defaultValue={fieldValue(organization?.telefono)} className="form-control" placeholder="+56 9 1234 5678" autoComplete="tel" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Correo de contacto
                <input name="correo" type="email" defaultValue={fieldValue(organization?.correo)} className="form-control" placeholder="contacto@empresa.cl" autoComplete="email" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
                Sitio web
                <input name="direccion_web" type="url" defaultValue={fieldValue(organization?.direccion_web)} className="form-control" placeholder="https://www.empresa.cl" />
              </label>
            </div>
            <LogoUpload currentUrl={logoUrl} />
          </section>
          <section className="grid gap-4 border-t border-blue-100 pt-6 sm:grid-cols-2"><div className="rounded-lg bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Cuenta creada</p><p className="mt-1 text-sm text-slate-700">{formatDate(user.created_at)}</p></div><div className="rounded-lg bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Último inicio de sesión</p><p className="mt-1 text-sm text-slate-700">{formatDate(user.last_sign_in_at)}</p></div></section>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Link href="/panel" className="rounded-lg border border-blue-100 px-6 py-3 text-center text-base font-semibold text-blue-700 hover:bg-blue-50">Cancelar</Link><button className="primary-button">Guardar cambios</button></div>
        </form>
      </div>
    </main>
  );
}
