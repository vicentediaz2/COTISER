"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type LineItem = { description: string; quantity: number; unitPrice: number };

function field(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function fail(message: string): never {
  redirect(`/panel?error=${encodeURIComponent(message)}`);
}

function normalizeItems(items: LineItem[]) {
  const grouped = new Map<string, LineItem>();

  for (const item of items) {
    const description = item.description.trim();
    if (!description) continue;

    const current = grouped.get(description);
    grouped.set(description, current
      ? { ...current, quantity: current.quantity + item.quantity }
      : { description, quantity: item.quantity, unitPrice: item.unitPrice });
  }

  return [...grouped.values()];
}

async function authenticatedClient() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) redirect("/iniciar-sesion");
  return { supabase, user: data.user };
}

async function getOrCreateClient(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  name: string,
) {
  const { data: existing, error: lookupError } = await supabase
    .from("cliente")
    .select("id_cliente")
    .eq("id_usuario", userId)
    .eq("nombre", name)
    .limit(1)
    .maybeSingle();

  if (lookupError) fail(`No se pudo revisar el cliente: ${lookupError.message}`);
  if (existing) return existing.id_cliente as string;

  const { data: created, error: createError } = await supabase
    .from("cliente")
    .insert({ id_usuario: userId, nombre: name })
    .select("id_cliente")
    .single();

  if (createError || !created) fail(`No se pudo guardar el cliente${createError ? `: ${createError.message}` : "."}`);
  return created.id_cliente as string;
}

async function getOrCreateService(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  name: string,
  unitPrice: number,
) {
  const { data: existing, error: lookupError } = await supabase
    .from("servicio")
    .select("id_servicio, costo_base")
    .eq("id_usuario", userId)
    .eq("nombre", name)
    .limit(1)
    .maybeSingle();

  if (lookupError) fail(`No se pudo revisar el servicio: ${lookupError.message}`);
  if (existing) return existing.id_servicio as string;

  const { data: created, error: createError } = await supabase
    .from("servicio")
    .insert({
      id_usuario: userId,
      nombre: name,
      descripcion: null,
      costo_base: unitPrice,
    })
    .select("id_servicio")
    .single();

  if (createError || !created) fail(`No se pudo guardar el servicio${createError ? `: ${createError.message}` : "."}`);
  return created.id_servicio as string;
}

export async function createQuotation(formData: FormData) {
  const { supabase, user } = await authenticatedClient();
  const clientName = field(formData, "client_name");
  const notes = field(formData, "notes") || null;
  const descriptions = formData.getAll("item_description").map(String);
  const quantities = formData.getAll("item_quantity").map(Number);
  const prices = formData.getAll("item_unit_price").map(Number);
  const items = normalizeItems(descriptions
    .map((description, index) => ({ description, quantity: quantities[index], unitPrice: prices[index] }))
    .filter((item) => item.description.trim()));

  if (!clientName) fail("Indica el cliente de la cotizacion.");
  if (!items.length || items.length > 50) fail("Agrega entre 1 y 50 servicios.");
  if (items.some((item) => !Number.isInteger(item.quantity) || item.quantity <= 0 || item.quantity > 32767 || !Number.isInteger(item.unitPrice) || item.unitPrice < 0 || item.unitPrice > 2147483647)) {
    fail("Las cantidades y precios deben ser numeros enteros validos.");
  }

  const total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  if (!Number.isSafeInteger(total) || total < 0 || total > 2147483647) fail("El total supera el limite de la tabla.");

  const clientId = await getOrCreateClient(supabase, user.id, clientName);
  const { data: quotation, error } = await supabase
    .from("cotizacion")
    .insert({ id_cliente: clientId, total_cotizado: total, estado: "pendiente", observacion: notes })
    .select("id_cotizacion")
    .single();

  if (error || !quotation) fail(`No se pudo guardar la cotizacion${error ? `: ${error.message}` : "."}`);

  const itemsToInsert = [] as Array<{ id_cotizacion: string; id_servicio: string; cantidad: number; precio_unitario: number }>;
  for (const item of items) {
    const serviceId = await getOrCreateService(supabase, user.id, item.description, item.unitPrice);
    itemsToInsert.push({ id_cotizacion: quotation.id_cotizacion as string, id_servicio: serviceId, cantidad: item.quantity, precio_unitario: item.unitPrice });
  }

  const { error: itemError } = await supabase.from("cotizacionxservicio").insert(itemsToInsert);
  if (itemError) {
    await supabase.from("cotizacion").delete().eq("id_cotizacion", quotation.id_cotizacion);
    fail(`No se pudieron guardar los servicios de la cotizacion: ${itemError.message}`);
  }

  revalidatePath("/panel");
  redirect("/panel?mensaje=Cotizacion%20creada%20correctamente.");
}

export async function createCustomer(formData: FormData) {
  const { supabase, user } = await authenticatedClient();
  const name = field(formData, "name");
  const address = field(formData, "address") || null;
  const taxId = field(formData, "tax_id") || null;
  if (!name) fail("Indica el nombre del cliente.");

  const { error } = await supabase.from("cliente").insert({ id_usuario: user.id, nombre: name, direccion: address, identificador_fiscal: taxId });
  if (error) fail(`No se pudo guardar el cliente: ${error.message}`);
  revalidatePath("/panel");
  redirect("/panel?mensaje=Cliente%20creado%20correctamente.");
}

export async function updateCustomer(formData: FormData) {
  const { supabase, user } = await authenticatedClient();
  const id = field(formData, "id");
  const name = field(formData, "name");
  const address = field(formData, "address") || null;
  const taxId = field(formData, "tax_id") || null;
  if (!id || !name) fail("Indica un cliente valido y su nombre.");

  const { error } = await supabase.from("cliente").update({ nombre: name, direccion: address, identificador_fiscal: taxId }).eq("id_cliente", id).eq("id_usuario", user.id);
  if (error) fail(`No se pudo actualizar el cliente: ${error.message}`);
  revalidatePath("/panel");
  redirect("/panel?mensaje=Cliente%20actualizado%20correctamente.");
}

export async function deleteCustomer(formData: FormData) {
  const { supabase, user } = await authenticatedClient();
  const id = field(formData, "id");
  if (!id) fail("Cliente no valido.");
  const { error } = await supabase.from("cliente").delete().eq("id_cliente", id).eq("id_usuario", user.id);
  if (error) fail(`No se pudo eliminar el cliente: ${error.message}`);
  revalidatePath("/panel");
}

export async function createService(formData: FormData) {
  const { supabase, user } = await authenticatedClient();
  const name = field(formData, "name");
  const description = field(formData, "description") || null;
  const baseCost = Number(field(formData, "base_cost"));
  if (!name) fail("Indica el nombre del servicio.");
  if (!Number.isInteger(baseCost) || baseCost < 0 || baseCost > 2147483647) fail("El precio base debe ser un entero valido.");

  const { error } = await supabase.from("servicio").insert({ id_usuario: user.id, nombre: name, descripcion: description, costo_base: baseCost });
  if (error) fail(`No se pudo guardar el servicio: ${error.message}`);
  revalidatePath("/panel");
  redirect("/panel?mensaje=Servicio%20creado%20correctamente.");
}

export async function updateService(formData: FormData) {
  const { supabase, user } = await authenticatedClient();
  const id = field(formData, "id");
  const name = field(formData, "name");
  const description = field(formData, "description") || null;
  const baseCost = Number(field(formData, "base_cost"));
  if (!id || !name) fail("Indica un servicio valido y su nombre.");
  if (!Number.isInteger(baseCost) || baseCost < 0 || baseCost > 2147483647) fail("El precio base debe ser un entero valido.");

  const { error } = await supabase.from("servicio").update({ nombre: name, descripcion: description, costo_base: baseCost }).eq("id_servicio", id).eq("id_usuario", user.id);
  if (error) fail(`No se pudo actualizar el servicio: ${error.message}`);
  revalidatePath("/panel");
  redirect("/panel?mensaje=Servicio%20actualizado%20correctamente.");
}

export async function deleteService(formData: FormData) {
  const { supabase, user } = await authenticatedClient();
  const id = field(formData, "id");
  if (!id) fail("Servicio no valido.");
  const { error } = await supabase.from("servicio").delete().eq("id_servicio", id).eq("id_usuario", user.id);
  if (error) fail(`No se pudo eliminar el servicio: ${error.message}`);
  revalidatePath("/panel");
}

export async function updateQuotation(formData: FormData) {
  const { supabase } = await authenticatedClient();
  const id = field(formData, "id");
  const status = field(formData, "status");
  const notes = field(formData, "notes") || null;
  if (!id || !["pendiente", "enviada", "aceptada", "rechazada"].includes(status)) fail("Cotizacion no valida.");

  const { error } = await supabase.from("cotizacion").update({ estado: status, observacion: notes }).eq("id_cotizacion", id);
  if (error) fail(`No se pudo actualizar la cotizacion: ${error.message}`);
  revalidatePath("/panel");
  redirect("/panel?mensaje=Cotizacion%20actualizada%20correctamente.");
}

export async function deleteQuotation(formData: FormData) {
  const id = field(formData, "id");
  if (!id) fail("Cotizacion no valida.");
  const { supabase } = await authenticatedClient();
  const { error } = await supabase.from("cotizacion").delete().eq("id_cotizacion", id);
  if (error) fail(`No se pudo eliminar la cotizacion: ${error.message}`);
  revalidatePath("/panel");
}
