import Link from "next/link";
import { AuthShell } from "@/app/_components/AuthShell";
import { FormMessage } from "@/app/_components/FormMessage";
import { requestPasswordReset } from "@/app/auth/actions";
import { hasSupabaseEnv } from "@/lib/supabase/env";

type Props = { searchParams: Promise<{ error?: string; mensaje?: string }> };

export default async function ForgotPasswordPage({ searchParams }: Props) {
  const params = await searchParams;
  const configured = hasSupabaseEnv();

  return (
    <AuthShell>
      <form action={requestPasswordReset} className="space-y-5 rounded-xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-950/5 sm:p-8">
        <div><h2 className="text-2xl font-semibold">Recuperar contraseña</h2><p className="mt-2 text-sm text-slate-600">Te enviaremos un enlace para crear una nueva contraseña.</p></div>
        {!configured && <FormMessage error="Supabase aún no está configurado. Completa las variables de entorno para habilitar la recuperación." />}
        <FormMessage error={params.error} message={params.mensaje} />
        <label className="grid gap-2 text-sm font-medium text-slate-700">Correo electrónico<input name="email" type="email" required autoComplete="email" className="form-control" placeholder="tu@empresa.cl" /></label>
        <button disabled={!configured} className="primary-button w-full disabled:cursor-not-allowed disabled:opacity-50">Enviar enlace de recuperación</button>
        <p className="text-center text-sm text-slate-600"><Link className="font-semibold text-blue-700 hover:underline" href="/iniciar-sesion">Volver a iniciar sesión</Link></p>
      </form>
    </AuthShell>
  );
}
