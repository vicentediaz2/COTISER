import Link from "next/link";
import { AuthShell } from "@/app/_components/AuthShell";
import { FormMessage } from "@/app/_components/FormMessage";
import { signIn } from "@/app/auth/actions";
import { hasSupabaseEnv } from "@/lib/supabase/env";

type Props = { searchParams: Promise<{ error?: string; mensaje?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;
  const configured = hasSupabaseEnv();
  return (
    <AuthShell>
      <form action={signIn} className="space-y-5 rounded-xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-950/5 sm:p-8">
        <div>
          <h2 className="text-2xl font-semibold">Iniciar sesión</h2>
          <p className="mt-2 text-sm text-slate-600">Accede a tus cotizaciones guardadas.</p>
        </div>
        {!configured && <FormMessage error="Supabase aún no está configurado. Completa las variables de entorno para habilitar el acceso." />}
        <FormMessage error={params.error} message={params.mensaje} />
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Correo electrónico
          <input name="email" type="email" required autoComplete="email" className="form-control" placeholder="tu@empresa.cl" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Contraseña
          <input name="password" type="password" required autoComplete="current-password" className="form-control" placeholder="Tu contraseña" />
        </label>
        <button disabled={!configured} className="primary-button w-full disabled:cursor-not-allowed disabled:opacity-50">Ingresar</button>
        <p className="text-center text-sm text-slate-600">¿Aún no tienes cuenta? <Link className="font-semibold text-blue-700 hover:underline" href="/registro">Regístrate</Link></p>
      </form>
    </AuthShell>
  );
}

