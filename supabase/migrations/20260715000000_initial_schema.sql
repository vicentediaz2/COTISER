create extension if not exists pgcrypto;

do $$
begin
  create type public.estado_cotizacion as enum ('pendiente', 'enviada', 'aprobada', 'rechazada');
exception
  when duplicate_object then null;
end $$;

create table public.usuario (
  id_usuario uuid primary key references auth.users(id) on delete cascade,
  organizacion text,
  logo text,
  telefono text
);

create table public.cliente (
  id_cliente uuid primary key default gen_random_uuid(),
  nombre text not null,
  id_usuario uuid not null references public.usuario(id_usuario) on delete cascade,
  direccion text,
  identificador_fiscal text
);

create table public.servicio (
  id_servicio uuid primary key default gen_random_uuid(),
  nombre text not null,
  costo_base integer not null default 0 check (costo_base >= 0),
  formula text,
  descripcion text,
  id_usuario uuid not null references public.usuario(id_usuario) on delete cascade
);

create table public.cotizacion (
  id_cotizacion uuid primary key default gen_random_uuid(),
  fecha timestamptz not null default now(),
  total_cotizado integer not null default 0 check (total_cotizado >= 0),
  observacion text,
  id_cliente uuid not null references public.cliente(id_cliente) on delete restrict,
  estado public.estado_cotizacion not null default 'pendiente'
);

create table public.cotizacionxservicio (
  id_cotizacion_servicio uuid primary key default gen_random_uuid(),
  id_cotizacion uuid not null references public.cotizacion(id_cotizacion) on delete cascade,
  id_servicio uuid not null references public.servicio(id_servicio) on delete restrict,
  cantidad smallint not null default 1 check (cantidad > 0),
  precio_unitario integer not null check (precio_unitario >= 0)
);

create index cliente_usuario_idx on public.cliente(id_usuario);
create index cliente_nombre_idx on public.cliente(nombre);
create index servicio_usuario_idx on public.servicio(id_usuario);
create index servicio_nombre_idx on public.servicio(nombre);
create index cotizacion_cliente_idx on public.cotizacion(id_cliente);
create index cotizacion_fecha_idx on public.cotizacion(fecha desc);
create index cotizacionxservicio_cotizacion_idx on public.cotizacionxservicio(id_cotizacion);
create index cotizacionxservicio_servicio_idx on public.cotizacionxservicio(id_servicio);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.usuario (id_usuario)
  values (new.id)
  on conflict (id_usuario) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.usuario enable row level security;
alter table public.cliente enable row level security;
alter table public.servicio enable row level security;
alter table public.cotizacion enable row level security;
alter table public.cotizacionxservicio enable row level security;

create policy "usuario_select_own"
on public.usuario for select to authenticated
using ((select auth.uid()) = id_usuario);

create policy "usuario_update_own"
on public.usuario for update to authenticated
using ((select auth.uid()) = id_usuario)
with check ((select auth.uid()) = id_usuario);

create policy "cliente_select_own"
on public.cliente for select to authenticated
using ((select auth.uid()) = id_usuario);

create policy "cliente_insert_own"
on public.cliente for insert to authenticated
with check ((select auth.uid()) = id_usuario);

create policy "cliente_update_own"
on public.cliente for update to authenticated
using ((select auth.uid()) = id_usuario)
with check ((select auth.uid()) = id_usuario);

create policy "cliente_delete_own"
on public.cliente for delete to authenticated
using ((select auth.uid()) = id_usuario);

create policy "servicio_select_own"
on public.servicio for select to authenticated
using ((select auth.uid()) = id_usuario);

create policy "servicio_insert_own"
on public.servicio for insert to authenticated
with check ((select auth.uid()) = id_usuario);

create policy "servicio_update_own"
on public.servicio for update to authenticated
using ((select auth.uid()) = id_usuario)
with check ((select auth.uid()) = id_usuario);

create policy "servicio_delete_own"
on public.servicio for delete to authenticated
using ((select auth.uid()) = id_usuario);

create policy "cotizacion_select_own"
on public.cotizacion for select to authenticated
using (
  exists (
    select 1
    from public.cliente
    where cliente.id_cliente = cotizacion.id_cliente
      and cliente.id_usuario = (select auth.uid())
  )
);

create policy "cotizacion_insert_own"
on public.cotizacion for insert to authenticated
with check (
  exists (
    select 1
    from public.cliente
    where cliente.id_cliente = cotizacion.id_cliente
      and cliente.id_usuario = (select auth.uid())
  )
);

create policy "cotizacion_update_own"
on public.cotizacion for update to authenticated
using (
  exists (
    select 1
    from public.cliente
    where cliente.id_cliente = cotizacion.id_cliente
      and cliente.id_usuario = (select auth.uid())
  )
)
with check (
  exists (
    select 1
    from public.cliente
    where cliente.id_cliente = cotizacion.id_cliente
      and cliente.id_usuario = (select auth.uid())
  )
);

create policy "cotizacion_delete_own"
on public.cotizacion for delete to authenticated
using (
  exists (
    select 1
    from public.cliente
    where cliente.id_cliente = cotizacion.id_cliente
      and cliente.id_usuario = (select auth.uid())
  )
);

create policy "cotizacionxservicio_select_own"
on public.cotizacionxservicio for select to authenticated
using (
  exists (
    select 1
    from public.cotizacion
    inner join public.cliente on cliente.id_cliente = cotizacion.id_cliente
    where cotizacion.id_cotizacion = cotizacionxservicio.id_cotizacion
      and cliente.id_usuario = (select auth.uid())
  )
  and exists (
    select 1
    from public.servicio
    where servicio.id_servicio = cotizacionxservicio.id_servicio
      and servicio.id_usuario = (select auth.uid())
  )
);

create policy "cotizacionxservicio_insert_own"
on public.cotizacionxservicio for insert to authenticated
with check (
  exists (
    select 1
    from public.cotizacion
    inner join public.cliente on cliente.id_cliente = cotizacion.id_cliente
    where cotizacion.id_cotizacion = cotizacionxservicio.id_cotizacion
      and cliente.id_usuario = (select auth.uid())
  )
  and exists (
    select 1
    from public.servicio
    where servicio.id_servicio = cotizacionxservicio.id_servicio
      and servicio.id_usuario = (select auth.uid())
  )
);

create policy "cotizacionxservicio_update_own"
on public.cotizacionxservicio for update to authenticated
using (
  exists (
    select 1
    from public.cotizacion
    inner join public.cliente on cliente.id_cliente = cotizacion.id_cliente
    where cotizacion.id_cotizacion = cotizacionxservicio.id_cotizacion
      and cliente.id_usuario = (select auth.uid())
  )
  and exists (
    select 1
    from public.servicio
    where servicio.id_servicio = cotizacionxservicio.id_servicio
      and servicio.id_usuario = (select auth.uid())
  )
)
with check (
  exists (
    select 1
    from public.cotizacion
    inner join public.cliente on cliente.id_cliente = cotizacion.id_cliente
    where cotizacion.id_cotizacion = cotizacionxservicio.id_cotizacion
      and cliente.id_usuario = (select auth.uid())
  )
  and exists (
    select 1
    from public.servicio
    where servicio.id_servicio = cotizacionxservicio.id_servicio
      and servicio.id_usuario = (select auth.uid())
  )
);

create policy "cotizacionxservicio_delete_own"
on public.cotizacionxservicio for delete to authenticated
using (
  exists (
    select 1
    from public.cotizacion
    inner join public.cliente on cliente.id_cliente = cotizacion.id_cliente
    where cotizacion.id_cotizacion = cotizacionxservicio.id_cotizacion
      and cliente.id_usuario = (select auth.uid())
  )
  and exists (
    select 1
    from public.servicio
    where servicio.id_servicio = cotizacionxservicio.id_servicio
      and servicio.id_usuario = (select auth.uid())
  )
);

grant usage on schema public to authenticated;
grant usage on type public.estado_cotizacion to authenticated;
grant select, update on public.usuario to authenticated;
grant select, insert, update, delete on public.cliente to authenticated;
grant select, insert, update, delete on public.servicio to authenticated;
grant select, insert, update, delete on public.cotizacion to authenticated;
grant select, insert, update, delete on public.cotizacionxservicio to authenticated;
