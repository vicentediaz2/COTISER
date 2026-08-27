"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type LineItem = { description: string; quantity: number; unitPrice: number; discount: number | null };
type QuotationTotals = { subtotal: number; discount: number | null; taxRate: number | null; tax: number; total: number };

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

    const key = `${description}\u0000${item.unitPrice}\u0000${item.discount ?? ""}`;
    const current = grouped.get(key);
    grouped.set(key, current
      ? { ...current, quantity: current.quantity + item.quantity }
      : { description, quantity: item.quantity, unitPrice: item.unitPrice, discount: item.discount });
  }

  return [...grouped.values()];
}

function percentage(formData: FormData, key: string) {
  const value = field(formData, key);
  if (!value) return null;
  const percentageValue = Number(value);
  if (!Number.isInteger(percentageValue) || percentageValue < 0 || percentageValue > 100) fail("El descuento debe ser un número entero entre 0 y 100.");
  return percentageValue;
}

function calculateTotals(items: LineItem[], discount: number | null, taxRate: number | null): QuotationTotals {
  const subtotal = items.reduce((sum, item) => sum + Math.round(item.quantity * item.unitPrice * (1 - (item.discount ?? 0) / 100)), 0);
  const taxableAmount = Math.round(subtotal * (1 - (discount ?? 0) / 100));
  const tax = Math.round(taxableAmount * (taxRate ?? 0) / 100);
  const total = taxableAmount + tax;
  if (![subtotal, tax, total].every((value) => Number.isSafeInteger(value) && value >= 0 && value <= 2147483647)) fail("El monto es demasiado grande.");
  return { subtotal, discount, taxRate, tax, total };
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

  if (lookupError) fail("No se pudo verificar el cliente. Intenta nuevamente.");
  if (existing) return existing.id_cliente as string;

  const { data: created, error: createError } = await supabase
    .from("cliente")
    .insert({ id_usuario: userId, nombre: name })
    .select("id_cliente")
    .single();

  if (createError || !created) fail("No se pudo guardar el cliente.");
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

  if (lookupError) fail("No se pudo verificar el servicio. Intenta nuevamente.");
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

  if (createError || !created) fail("No se pudo guardar el servicio.");
  return created.id_servicio as string;
}

export async function createQuotation(formData: FormData) {
  const { supabase, user } = await authenticatedClient();
  const clientName = field(formData, "client_name");
  const notes = field(formData, "notes") || null;
  const descriptions = formData.getAll("item_description").map(String);
  const quantities = formData.getAll("item_quantity").map(Number);
  const prices = formData.getAll("item_unit_price").map(Number);
  const discounts = formData.getAll("item_discount").map((value) => String(value).trim() ? Number(value) : null);
  const quotationDiscount = percentage(formData, "quotation_discount");
  const taxRate = percentage(formData, "tax_rate");
  const items = normalizeItems(descriptions
    .map((description, index) => ({ description, quantity: quantities[index], unitPrice: prices[index], discount: discounts[index] }))
    .filter((item) => item.description.trim()));

  if (!clientName) fail("Indica el cliente de la cotización.");
  if (!items.length || items.length > 50) fail("Agrega entre 1 y 50 servicios.");
  if (items.some((item) => !Number.isInteger(item.quantity) || item.quantity <= 0 || item.quantity > 32767 || !Number.isInteger(item.unitPrice) || item.unitPrice < 0 || item.unitPrice > 2147483647 || (item.discount !== null && (!Number.isInteger(item.discount) || item.discount < 0 || item.discount > 100)))) {
    fail("Revisa las cantidades y precios.");
  }

  const totals = calculateTotals(items, quotationDiscount, taxRate);

  const clientId = await getOrCreateClient(supabase, user.id, clientName);
  const { data: quotation, error } = await supabase
    .from("cotizacion")
    .insert({ id_cliente: clientId, total_cotizado: totals.total, subtotal_general: totals.subtotal, descuento: totals.discount, impuesto: totals.taxRate, estado: "pendiente", observacion: notes })
    .select("id_cotizacion")
    .single();

  if (error || !quotation) fail("No se pudo guardar la cotización.");

  const itemsToInsert = [] as Array<{ id_cotizacion: string; id_servicio: string; cantidad: number; precio_unitario: number; descuento: number | null }>;
  for (const item of items) {
    const serviceId = await getOrCreateService(supabase, user.id, item.description, item.unitPrice);
    itemsToInsert.push({ id_cotizacion: quotation.id_cotizacion as string, id_servicio: serviceId, cantidad: item.quantity, precio_unitario: item.unitPrice, descuento: item.discount });
  }

  const { error: itemError } = await supabase.from("cotizacionxservicio").insert(itemsToInsert);
  if (itemError) {
    await supabase.from("cotizacion").delete().eq("id_cotizacion", quotation.id_cotizacion);
    fail("No se pudieron guardar los servicios.");
  }

  revalidatePath("/panel");
  redirect("/panel?mensaje=Cotización%20creada%20correctamente.");
}

export async function createCustomer(formData: FormData) {
  const { supabase, user } = await authenticatedClient();
  const name = field(formData, "name");
  const address = field(formData, "address") || null;
  const taxId = field(formData, "tax_id") || null;
  if (!name) fail("Indica el nombre del cliente.");

  const { error } = await supabase.from("cliente").insert({ id_usuario: user.id, nombre: name, direccion: address, identificador_fiscal: taxId });
  if (error) fail("No se pudo guardar el cliente.");
  revalidatePath("/panel");
  redirect("/panel?mensaje=Cliente%20creado%20correctamente.");
}

export async function updateCustomer(formData: FormData) {
  const { supabase, user } = await authenticatedClient();
  const id = field(formData, "id");
  const name = field(formData, "name");
  const address = field(formData, "address") || null;
  const taxId = field(formData, "tax_id") || null;
  if (!id || !name) fail("Indica un cliente válido y su nombre.");

  const { error } = await supabase.from("cliente").update({ nombre: name, direccion: address, identificador_fiscal: taxId }).eq("id_cliente", id).eq("id_usuario", user.id);
  if (error) fail("No se pudo actualizar el cliente.");
  revalidatePath("/panel");
  redirect("/panel?mensaje=Cliente%20actualizado%20correctamente.");
}

export async function createService(formData: FormData) {
  const { supabase, user } = await authenticatedClient();
  const name = field(formData, "name");
  const description = field(formData, "description") || null;
  const baseCost = Number(field(formData, "base_cost"));
  if (!name) fail("Indica el nombre del servicio.");
  if (!Number.isInteger(baseCost) || baseCost < 0 || baseCost > 2147483647) fail("El precio debe ser un número entero.");

  const { error } = await supabase.from("servicio").insert({ id_usuario: user.id, nombre: name, descripcion: description, costo_base: baseCost });
  if (error) fail("No se pudo guardar el servicio.");
  revalidatePath("/panel");
  redirect("/panel?mensaje=Servicio%20creado%20correctamente.");
}

export async function updateService(formData: FormData) {
  const { supabase, user } = await authenticatedClient();
  const id = field(formData, "id");
  const name = field(formData, "name");
  const description = field(formData, "description") || null;
  const baseCost = Number(field(formData, "base_cost"));
  if (!id || !name) fail("Indica un servicio válido y su nombre.");
  if (!Number.isInteger(baseCost) || baseCost < 0 || baseCost > 2147483647) fail("El precio debe ser un número entero.");

  const { error } = await supabase.from("servicio").update({ nombre: name, descripcion: description, costo_base: baseCost }).eq("id_servicio", id).eq("id_usuario", user.id);
  if (error) fail("No se pudo actualizar el servicio.");
  revalidatePath("/panel");
  redirect("/panel?mensaje=Servicio%20actualizado%20correctamente.");
}

export async function updateQuotation(formData: FormData) {
  const { supabase } = await authenticatedClient();
  const id = field(formData, "id");
  const status = field(formData, "status");
  if (!id || !["pendiente", "enviada", "aprobada", "rechazada"].includes(status)) fail("Cotización no válida.");

  const { data: quotation, error: lookupError } = await supabase.from("cotizacion").select("estado").eq("id_cotizacion", id).maybeSingle();
  if (lookupError || !quotation) fail("No se pudo encontrar la cotización.");
  if (quotation.estado === "aprobada") fail("Una cotización aprobada no se puede modificar.");

  const { error } = await supabase.from("cotizacion").update({ estado: status, fecha: new Date().toISOString() }).eq("id_cotizacion", id);
  if (error) fail("No se pudo actualizar la cotización.");
  revalidatePath("/panel");
  redirect("/panel?mensaje=Cotización%20actualizada%20correctamente.");
}

export async function editQuotation(formData: FormData) {
  const { supabase, user } = await authenticatedClient();
  const id = field(formData, "id");
  const notes = field(formData, "notes") || null;
  const descriptions = formData.getAll("item_description").map(String);
  const quantities = formData.getAll("item_quantity").map(Number);
  const prices = formData.getAll("item_unit_price").map(Number);
  const discounts = formData.getAll("item_discount").map((value) => String(value).trim() ? Number(value) : null);
  const quotationDiscount = percentage(formData, "quotation_discount");
  const taxRate = percentage(formData, "tax_rate");
  const items = normalizeItems(descriptions.map((description, index) => ({ description, quantity: quantities[index], unitPrice: prices[index], discount: discounts[index] })).filter((item) => item.description.trim()));

  if (!id) fail("Indica una cotización válida.");
  if (!items.length || items.length > 50) fail("Agrega entre 1 y 50 servicios.");
  if (items.some((item) => !Number.isInteger(item.quantity) || item.quantity <= 0 || item.quantity > 32767 || !Number.isInteger(item.unitPrice) || item.unitPrice < 0 || item.unitPrice > 2147483647 || (item.discount !== null && (!Number.isInteger(item.discount) || item.discount < 0 || item.discount > 100)))) fail("Revisa las cantidades, precios y descuentos.");
  const totals = calculateTotals(items, quotationDiscount, taxRate);

  const { data: quotation, error: lookupError } = await supabase.from("cotizacion").select("estado").eq("id_cotizacion", id).maybeSingle();
  if (lookupError || !quotation) fail("No se pudo encontrar la cotización.");
  if (quotation.estado === "aprobada") fail("Una cotización aprobada no se puede modificar.");

  const { error: quotationError } = await supabase.from("cotizacion").update({ total_cotizado: totals.total, subtotal_general: totals.subtotal, descuento: totals.discount, impuesto: totals.taxRate, observacion: notes, fecha: new Date().toISOString() }).eq("id_cotizacion", id);
  if (quotationError) fail("No se pudo actualizar la cotización.");

  const { error: deleteItemsError } = await supabase.from("cotizacionxservicio").delete().eq("id_cotizacion", id);
  if (deleteItemsError) fail("No se pudieron actualizar los servicios.");
  const itemsToInsert = [] as Array<{ id_cotizacion: string; id_servicio: string; cantidad: number; precio_unitario: number; descuento: number | null }>;
  for (const item of items) itemsToInsert.push({ id_cotizacion: id, id_servicio: await getOrCreateService(supabase, user.id, item.description, item.unitPrice), cantidad: item.quantity, precio_unitario: item.unitPrice, descuento: item.discount });
  const { error: itemError } = await supabase.from("cotizacionxservicio").insert(itemsToInsert);
  if (itemError) fail("No se pudieron guardar los servicios.");
  revalidatePath("/panel");
  redirect("/panel?mensaje=Cotización%20actualizada%20correctamente.");
}

export async function deleteQuotation(formData: FormData) {
  const id = field(formData, "id");
  if (!id) fail("Cotización no válida.");
  const { supabase } = await authenticatedClient();
  const { data: quotation, error: lookupError } = await supabase.from("cotizacion").select("estado").eq("id_cotizacion", id).maybeSingle();
  if (lookupError || !quotation) fail("No se pudo encontrar la cotización.");
  if (quotation.estado === "aprobada") fail("Una cotización aprobada no se puede modificar.");
  const { error } = await supabase.from("cotizacion").delete().eq("id_cotizacion", id);
  if (error) fail("No se pudo eliminar la cotización.");
  revalidatePath("/panel");
}

export async function markAsSent(id: string): Promise<string> {
  const { supabase } = await authenticatedClient();
  const { data: quotation } = await supabase.from("cotizacion").select("estado").eq("id_cotizacion", id).maybeSingle();
  const current = quotation?.estado;
  if (current && current !== "pendiente") return current;
  if (current === "pendiente") {
    const { error } = await supabase.from("cotizacion").update({ estado: "enviada", fecha: new Date().toISOString() }).eq("id_cotizacion", id);
    if (error) return current;
  }
  revalidatePath("/panel");
  return "enviada";
}
