import Link from "next/link";
import { AuthShell } from "@/app/_components/AuthShell";
import { FormMessage } from "@/app/_components/FormMessage";
import { PasswordField } from "@/app/_components/PasswordField";
import { TermsSubmit } from "@/app/_components/TermsSubmit";
import { signUp } from "@/app/auth/actions";
import { hasSupabaseEnv } from "@/lib/supabase/env";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function RegisterPage({ searchParams }: Props) {
  const { error } = await searchParams;
  const configured = hasSupabaseEnv();
  return (
    <AuthShell>
      <form action={signUp} className="space-y-5 rounded-xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-950/5 sm:p-8">
        <div><h2 className="text-2xl font-semibold text-blue-700">Crear una cuenta</h2><p className="mt-2 text-sm text-slate-600">Comienza a gestionar tus propuestas.</p></div>
        {!configured && <FormMessage error="Supabase aún no está configurado. Completa las variables de entorno para habilitar el registro." />}
        <FormMessage error={error} />
        <label className="grid gap-2 text-sm font-medium text-slate-700">Nombre<input name="name" required autoComplete="name" className="form-control" placeholder="Tu nombre" /></label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">Correo electrónico<input name="email" type="email" required autoComplete="email" className="form-control" placeholder="tu@empresa.cl" /></label>
        <div className="grid grid-flow-col gap-5 sm:grid-cols-2">
          <PasswordField name="password" label="Contraseña" autoComplete="new-password" showRequirements />
          <PasswordField name="password_confirmation" label="Repetir contraseña" autoComplete="new-password" />
        </div>
        <TermsSubmit configured={configured} />
        <p className="text-center text-sm text-slate-600">¿Ya tienes cuenta? <Link className="font-semibold text-blue-700 hover:underline" href="/iniciar-sesion">Inicia sesión</Link></p>
      </form>
    </AuthShell>
  );
}
