"use server";

import { createClient } from "@/lib/supabase/server";
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
  if (password.length < 8) authRedirect("/registro", "error", "La contraseña debe tener al menos 8 caracteres.");
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

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
