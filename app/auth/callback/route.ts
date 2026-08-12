import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const destination = next === "/restablecer-contrasena" ? next : "/panel";
      return NextResponse.redirect(new URL(destination, url.origin));
    }
  }

  const loginUrl = new URL("/iniciar-sesion", url.origin);
  loginUrl.searchParams.set("error", "No se pudo confirmar tu cuenta. Inténtalo nuevamente.");
  return NextResponse.redirect(loginUrl);
}
