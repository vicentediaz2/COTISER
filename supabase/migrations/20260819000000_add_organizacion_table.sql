-- Normaliza los datos de organización en una tabla dedicada.
-- usuario.organizacion, usuario.logo y usuario.telefono pasan a organizacion.

create table public.organizacion (
  id_organizacion uuid primary key default gen_random_uuid(),
  nombre text not null,
  direccion text,
  eslogan text,
  telefono text,
  correo text,
  direccion_web text,
  logo text
);

alter table public.usuario
  add column id_organizacion uuid references public.organizacion(id_organizacion) on delete set null;

-- Migra datos existentes: una organización por usuario con nombre y/o logo previos.
do $$
declare
  r record;
  new_org_id uuid;
begin
  for r in
    select id_usuario, organizacion, logo
    from public.usuario
  loop
    if (r.organizacion is not null and btrim(r.organizacion) <> '')
      or (r.logo is not null and btrim(r.logo) <> '') then
      insert into public.organizacion (nombre, logo)
      values (
        coalesce(nullif(btrim(r.organizacion), ''), 'Mi organización'),
        nullif(btrim(r.logo), '')
      )
      returning id_organizacion into new_org_id;

      update public.usuario
      set id_organizacion = new_org_id
      where id_usuario = r.id_usuario;
    end if;
  end loop;
end $$;

alter table public.usuario
  drop column organizacion,
  drop column logo,
  drop column telefono;

create index usuario_organizacion_idx on public.usuario(id_organizacion);

alter table public.organizacion enable row level security;

create policy "organizacion_select_member"
on public.organizacion for select to authenticated
using (
  exists (
    select 1
    from public.usuario
    where usuario.id_organizacion = organizacion.id_organizacion
      and usuario.id_usuario = (select auth.uid())
  )
);

create policy "organizacion_insert_authenticated"
on public.organizacion for insert to authenticated
with check (true);

create policy "organizacion_update_member"
on public.organizacion for update to authenticated
using (
  exists (
    select 1
    from public.usuario
    where usuario.id_organizacion = organizacion.id_organizacion
      and usuario.id_usuario = (select auth.uid())
  )
)
with check (
  exists (
    select 1
    from public.usuario
    where usuario.id_organizacion = organizacion.id_organizacion
      and usuario.id_usuario = (select auth.uid())
  )
);

grant select, insert, update on public.organizacion to authenticated;

-- Marca como vencidas las cotizaciones enviadas con más de 20 días.
alter type public.estado_cotizacion
  add value if not exists 'vencida';

create or replace function public.actualizar_cotizaciones_vencidas()
returns void
language plpgsql
as $$
begin
  -- Se ejecuta dinámicamente porque el valor enum se agrega en esta misma migración.
  execute $sql$
    update public.cotizacion
    set estado = 'vencida'
    where estado = 'enviada'
      and fecha < (current_date - interval '20 days')
  $sql$;
end;
$$;

create extension if not exists pg_cron;

select cron.schedule(
  'vencer-cotizaciones-diario',
  '0 0 * * *',
  'select public.actualizar_cotizaciones_vencidas();'
);

create index idx_cotizacion_estado_fecha
  on public.cotizacion (estado, fecha);
