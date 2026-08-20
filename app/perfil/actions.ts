"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const LOGO_BUCKET = "logos";
const MAX_LOGO_BYTES = 5 * 1024 * 1024;
const LOGO_MIME_EXTENSIONS = new Map<string, string>([
  ["image/png", "png"],
  ["image/jpeg", "jpg"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
]);

type OrganizationProfile = {
  id_organizacion: string;
  nombre: string;
  direccion: string | null;
  eslogan: string | null;
  telefono: string | null;
  correo: string | null;
  direccion_web: string | null;
  logo: string | null;
};

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function optionalValue(formData: FormData, key: string) {
  const raw = value(formData, key);
  return raw || null;
}

function profileRedirect(kind: "error" | "mensaje", message: string): never {
  redirect(`/perfil?${kind}=${encodeURIComponent(message)}`);
}

function slugify(value: string) {
  return (
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "imagen"
  );
}

function logoExtension(file: File) {
  const fromMime = LOGO_MIME_EXTENSIONS.get(file.type);
  if (fromMime) return fromMime;
  const name = file.name.toLowerCase().split(".").pop() ?? "";
  return [...LOGO_MIME_EXTENSIONS.values()].includes(name) ? name : null;
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
  const organizationName = value(formData, "organizacion") || null;
  const organizationAddress = optionalValue(formData, "direccion");
  const organizationSlogan = optionalValue(formData, "eslogan");
  const organizationPhone = optionalValue(formData, "telefono");
  const organizationEmail = optionalValue(formData, "correo");
  const organizationWebsite = optionalValue(formData, "direccion_web");

  if (!username || !email) profileRedirect("error", "El usuario y el correo son obligatorios.");
  if (password && password.length < 8) profileRedirect("error", "La contraseña debe tener al menos 8 caracteres.");
  if (password !== passwordConfirmation) profileRedirect("error", "Las contraseñas no coinciden.");

  const { data: existingProfile } = await supabase
    .from("usuario")
    .select("id_organizacion, organizacion(id_organizacion, nombre, direccion, eslogan, telefono, correo, direccion_web, logo)")
    .eq("id_usuario", user.id)
    .maybeSingle();

  const currentOrganization = (existingProfile?.organizacion ?? null) as OrganizationProfile | null;
  const currentLogo = currentOrganization?.logo ?? null;
  const currentOrganizationName = currentOrganization?.nombre ?? null;
  const organizationId = existingProfile?.id_organizacion ?? currentOrganization?.id_organizacion ?? null;

  const { error: authError } = await supabase.auth.updateUser({
    email,
    ...(password ? { password } : {}),
    data: { ...user.user_metadata, username, name: username },
  });
  if (authError) profileRedirect("error", "No se pudieron actualizar los datos de acceso.");

  const logoField = formData.get("logo");
  let logoToSave = currentLogo;

  if (logoField instanceof File && logoField.size > 0) {
    const extension = logoExtension(logoField);
    if (!extension) profileRedirect("error", "El logo debe ser una imagen PNG, JPG, WEBP o GIF.");
    if (logoField.size > MAX_LOGO_BYTES) profileRedirect("error", "El logo no puede superar los 5 MB.");

    const baseName = slugify(organizationName || currentOrganizationName || username);
    const logoPath = `${user.id}/${baseName}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from(LOGO_BUCKET)
      .upload(logoPath, logoField, { upsert: true, contentType: logoField.type || undefined });
    if (uploadError) profileRedirect("error", "No se pudo subir el logo. Inténtalo nuevamente.");

    logoToSave = logoPath;
  }

  const hasOrganizationInput = Boolean(
    organizationName ||
      organizationAddress ||
      organizationSlogan ||
      organizationPhone ||
      organizationEmail ||
      organizationWebsite ||
      logoToSave !== currentLogo,
  );

  if (organizationId) {
    const organizationPayload = {
      nombre: organizationName || currentOrganizationName || "Mi organización",
      direccion: organizationAddress,
      eslogan: organizationSlogan,
      telefono: organizationPhone,
      correo: organizationEmail,
      direccion_web: organizationWebsite,
      ...(logoToSave !== currentLogo ? { logo: logoToSave } : {}),
    };

    const { data: updatedOrganization, error: organizationError } = await supabase
      .from("organizacion")
      .update(organizationPayload)
      .eq("id_organizacion", organizationId)
      .select("id_organizacion")
      .maybeSingle();
    if (organizationError || !updatedOrganization) {
      profileRedirect("error", "Se actualizaron los datos de acceso, pero no la organización.");
    }
  } else if (hasOrganizationInput) {
    const organizationPayload = {
      nombre: organizationName || "Mi organización",
      direccion: organizationAddress,
      eslogan: organizationSlogan,
      telefono: organizationPhone,
      correo: organizationEmail,
      direccion_web: organizationWebsite,
      ...(logoToSave !== currentLogo ? { logo: logoToSave } : {}),
    };

    const { data: newOrganization, error: organizationError } = await supabase
      .from("organizacion")
      .insert(organizationPayload)
      .select("id_organizacion")
      .single();
    if (organizationError || !newOrganization) {
      profileRedirect("error", "Se actualizaron los datos de acceso, pero no la organización.");
    }

    const { error: linkError } = await supabase
      .from("usuario")
      .update({ id_organizacion: newOrganization.id_organizacion })
      .eq("id_usuario", user.id);
    if (linkError) profileRedirect("error", "Se creó la organización, pero no se pudo vincular al usuario.");
  }

  if (logoToSave !== currentLogo && currentLogo) {
    await supabase.storage.from(LOGO_BUCKET).remove([currentLogo]);
  }

  revalidatePath("/perfil");
  revalidatePath("/panel");
  profileRedirect("mensaje", email !== user.email ? "Perfil actualizado. Confirma el nuevo correo para finalizar el cambio." : "Perfil actualizado correctamente.");
}
