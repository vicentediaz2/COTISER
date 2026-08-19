create table public.organizacion (
  id_organizacion uuid primary key default gen_random_uuid(),
  nombre text not null,
  direccion text,
  eslogan text,
  telefono text,
  correo text,
  direccion_web text
);

alter table public.usuario
  add column id_organizacion uuid references public.organizacion(id_organizacion) on delete set null;

do $$
declare
  r record;
  new_org_id uuid;
begin
  for r in
    select id_usuario, organizacion
    from public.usuario
    where organizacion is not null
      and btrim(organizacion) <> ''
  loop
    insert into public.organizacion (nombre)
    values (btrim(r.organizacion))
    returning id_organizacion into new_org_id;

    update public.usuario
    set id_organizacion = new_org_id
    where id_usuario = r.id_usuario;
  end loop;
end $$;

alter table public.usuario
  drop column organizacion;

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
