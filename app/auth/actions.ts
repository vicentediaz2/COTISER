"use server";

import { createClient } from "@/lib/supabase/server";
import { isValidPassword } from "@/lib/password";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function authRedirect(path: string, kind: "error" | "mensaje", text: string): never {
  redirect(`${path}?${kind}=${encodeURIComponent(text)}`);
}

export async function signIn(formData: FormData) {
  const email = value(formData, "email");
  const password = value(formData, "password");
  if (!email || !password) authRedirect("/iniciar-sesion", "error", "Completa todos los campos.");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) authRedirect("/iniciar-sesion", "error", "Correo o contraseña incorrectos.");
  redirect("/panel");
}

export async function signUp(formData: FormData) {
  const name = value(formData, "name");
  const email = value(formData, "email");
  const password = value(formData, "password");
  const confirmation = value(formData, "password_confirmation");

  if (!name || !email || !password) authRedirect("/registro", "error", "Completa todos los campos.");
  if (!isValidPassword(password)) {
    authRedirect("/registro", "error", "La contraseña debe tener mínimo 10 caracteres, una mayúscula, un número y un símbolo.");
  }
  if (password !== confirmation) authRedirect("/registro", "error", "Las contraseñas no coinciden.");

  const origin = (await headers()).get("origin");
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username: name, name },
      emailRedirectTo: origin ? `${origin}/auth/callback` : undefined,
    },
  });

  if (error) authRedirect("/registro", "error", "No pudimos crear la cuenta. Revisa los datos o intenta más tarde.");
  if (data.session) redirect("/panel");
  authRedirect("/iniciar-sesion", "mensaje", "Cuenta creada. Revisa tu correo para confirmarla.");
}

export async function requestPasswordReset(formData: FormData) {
  const email = value(formData, "email");
  if (!email) authRedirect("/recuperar-contrasena", "error", "Ingresa tu correo electrónico.");

  const origin = (await headers()).get("origin");
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: origin ? `${origin}/auth/callback?next=/restablecer-contrasena` : undefined,
  });

  if (error) authRedirect("/recuperar-contrasena", "error", "No pudimos enviar el correo. Inténtalo nuevamente.");
  authRedirect("/recuperar-contrasena", "mensaje", "Si existe una cuenta con ese correo, te enviamos un enlace para restablecer tu contraseña.");
}

export async function resetPassword(formData: FormData) {
  const password = value(formData, "password");
  const confirmation = value(formData, "password_confirmation");

  if (!password || !confirmation) authRedirect("/restablecer-contrasena", "error", "Completa todos los campos.");
  if (!isValidPassword(password)) {
    authRedirect("/restablecer-contrasena", "error", "La contraseña debe tener mínimo 10 caracteres, una mayúscula, un número y un símbolo.");
  }
  if (password !== confirmation) authRedirect("/restablecer-contrasena", "error", "Las contraseñas no coinciden.");

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) authRedirect("/recuperar-contrasena", "error", "El enlace de recuperación expiró o no es válido. Solicita uno nuevo.");

  const { error } = await supabase.auth.updateUser({ password });
  if (error) authRedirect("/restablecer-contrasena", "error", "No pudimos actualizar tu contraseña. Solicita un nuevo enlace.");

  await supabase.auth.signOut();
  authRedirect("/iniciar-sesion", "mensaje", "Contraseña actualizada. Ya puedes iniciar sesión.");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
