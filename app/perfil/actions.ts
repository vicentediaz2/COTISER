"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function profileRedirect(kind: "error" | "mensaje", message: string): never {
  redirect(`/perfil?${kind}=${encodeURIComponent(message)}`);
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const user = userData.user;
  if (userError || !user) redirect("/iniciar-sesion");

  const username = value(formData, "username");
  const email = value(formData, "email");
  const password = value(formData, "password");
  const passwordConfirmation = value(formData, "password_confirmation");
  const organization = value(formData, "organizacion") || null;

  if (!username || !email) profileRedirect("error", "El usuario y el correo son obligatorios.");
  if (password && password.length < 8) profileRedirect("error", "La contraseña debe tener al menos 8 caracteres.");
  if (password !== passwordConfirmation) profileRedirect("error", "Las contraseñas no coinciden.");

  const { error: authError } = await supabase.auth.updateUser({
    email,
    ...(password ? { password } : {}),
    data: { ...user.user_metadata, username, name: username },
  });
  if (authError) profileRedirect("error", "No se pudieron actualizar los datos de acceso.");

  const { data: updatedProfile, error: profileError } = await supabase
    .from("usuario")
    .update({ organizacion: organization })
    .eq("id_usuario", user.id)
    .select("id_usuario")
    .maybeSingle();
  if (profileError || !updatedProfile) profileRedirect("error", "Se actualizaron los datos de acceso, pero no la organización.");

  revalidatePath("/perfil");
  revalidatePath("/panel");
  profileRedirect("mensaje", email !== user.email ? "Perfil actualizado. Confirma el nuevo correo para finalizar el cambio." : "Perfil actualizado correctamente.");
}
