import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasSupabaseEnv, getSupabaseEnv } from "./env";

export async function updateSession(request: NextRequest) {
  const isPrivateRoute =
    request.nextUrl.pathname.startsWith("/panel") ||
    request.nextUrl.pathname.startsWith("/perfil");

  if (!hasSupabaseEnv()) {
    if (isPrivateRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/iniciar-sesion";
      url.searchParams.set("mensaje", "Inicia sesión para ver tus cotizaciones.");
      return NextResponse.redirect(url);
    }
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });
  const { url, publishableKey } = getSupabaseEnv();
  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const { data } = await supabase.auth.getClaims();

  if (isPrivateRoute && !data?.claims) {
    const url = request.nextUrl.clone();
    url.pathname = "/iniciar-sesion";
    url.searchParams.set("mensaje", "Inicia sesión para ver tus cotizaciones.");
    return NextResponse.redirect(url);
  }

  return response;
}
