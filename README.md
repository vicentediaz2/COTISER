# Cotiser

Cotiser es una aplicacion web para gestionar clientes, servicios y cotizaciones comerciales. Esta pensada como una primera iteracion funcional, libre y desplegable, construida con Next.js y Supabase.

El objetivo del proyecto es servir como base abierta para aprender, adaptar o extender un panel simple de cotizaciones con autenticacion, base de datos relacional y reglas RLS por usuario.

## Caracteristicas

- Registro e inicio de sesion con Supabase Auth.
- CRUD de clientes.
- CRUD de servicios.
- Creacion, lectura, actualizacion de estado y eliminacion de cotizaciones.
- Relacion entre cotizaciones y servicios mediante tabla puente.
- Aislamiento de datos por usuario autenticado con Row Level Security.
- Montos enteros mostrados en CLP.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase Postgres

## Estado del Proyecto

Primera iteracion funcional.

Pendiente o planificado:

- Gestion de logo.
- Mejoras visuales del perfil.
- Exportacion de cotizaciones a PDF.
- Edicion completa de lineas dentro de una cotizacion existente.
- Dashboard o metricas comerciales.

## Requisitos

- Node.js compatible con Next.js 16.
- Una cuenta/proyecto en Supabase.
- Variables publicas de Supabase configuradas en `.env.local`.

## Instalacion Local

```bash
npm install
```

Crea el archivo de entorno:

```bash
cp .env.example .env.local
```

Completa estas variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Levanta el servidor de desarrollo:

```bash
npm run dev
```

La app queda disponible normalmente en `http://localhost:3000`.

## Configuracion de Supabase

1. Crea un proyecto en Supabase.
2. Ejecuta la migration inicial:

```sql
supabase/migrations/20260715000000_initial_schema.sql
```

3. En Authentication > URL Configuration agrega:

```text
http://localhost:3000/auth/callback
```

4. Agrega tambien la URL equivalente de produccion cuando despliegues.
5. Verifica que el provider Email/Password este activo.

## Modelo de Datos

El esquema principal esta compuesto por:

- `usuario`: perfil publico ligado a `auth.users`.
- `cliente`: clientes asociados a un usuario.
- `servicio`: servicios asociados a un usuario.
- `cotizacion`: cotizaciones asociadas a un cliente.
- `cotizacionxservicio`: lineas de servicios incluidas en cada cotizacion.

La columna `usuario.logo` existe en el esquema, pero la gestion de logo queda pendiente para una iteracion futura.

## Seguridad

El frontend no usa `service_role`.

La app trabaja con la sesion del usuario autenticado y las tablas usan RLS para limitar el acceso a datos propios. Las politicas usan el rol `authenticated` y validan `auth.uid()` contra `id_usuario` en clientes y servicios, o contra el cliente propietario en cotizaciones.

## Estructura Relevante

- [`app/auth/actions.ts`](./app/auth/actions.ts): registro, login y cierre de sesion.
- [`app/auth/callback/route.ts`](./app/auth/callback/route.ts): callback de autenticacion.
- [`app/cotizaciones/actions.ts`](./app/cotizaciones/actions.ts): escritura de clientes, servicios y cotizaciones.
- [`app/cotizaciones/page.tsx`](./app/cotizaciones/page.tsx): panel principal.
- [`app/cotizaciones/_components/QuotationForm.tsx`](./app/cotizaciones/_components/QuotationForm.tsx): formulario de cotizacion.
- [`supabase/migrations/20260715000000_initial_schema.sql`](./supabase/migrations/20260715000000_initial_schema.sql): esquema inicial de Supabase.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Licencia

Este proyecto esta licenciado bajo GPL-3.0-only. Puedes usarlo, estudiarlo, modificarlo y distribuirlo bajo los terminos de la GNU General Public License version 3.

Ver [`LICENSE`](./LICENSE) para el texto completo.
