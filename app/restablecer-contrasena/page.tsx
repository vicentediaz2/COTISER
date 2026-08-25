import Link from "next/link";
import { AuthShell } from "@/app/_components/AuthShell";
import { FormMessage } from "@/app/_components/FormMessage";
import { PasswordField } from "@/app/_components/PasswordField";
import { resetPassword } from "@/app/auth/actions";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <AuthShell>
      <form action={resetPassword} className="space-y-5 rounded-xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-950/5 sm:p-8">
        <div><h2 className="text-2xl font-semibold">Crea una nueva contraseña</h2><p className="mt-2 text-sm text-slate-600">Elige una contraseña segura para recuperar el acceso.</p></div>
        <FormMessage error={error} />
        <PasswordField name="password" label="Nueva contraseña" autoComplete="new-password" showRequirements />
        <PasswordField name="password_confirmation" label="Repetir nueva contraseña" autoComplete="new-password" />
        <button className="mt-4 primary-button w-full">Actualizar contraseña</button>
        <p className="text-center text-sm text-slate-600">¿No recibiste el correo? 
          <Link className="font-semibold text-blue-700 hover:underline" href="/recuperar-contrasena">Solicita otro enlace</Link>
        </p>
      </form>
    </AuthShell>
  );
}
