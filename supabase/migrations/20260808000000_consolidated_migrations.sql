insert into public.usuario (id_usuario)
select id from auth.users
on conflict (id_usuario) do nothing;

alter table public.cotizacionxservicio
  add column descuento smallint null
    check (descuento between 0 and 100);

alter table public.cotizacion
  add column subtotal_general integer not null default 0
    check (subtotal_general >= 0),
  add column impuesto smallint null
    check (impuesto between 0 and 100),
  add column descuento smallint null
    check (descuento between 0 and 100);

update public.cotizacion c
set subtotal_general = coalesce((
  select sum(cxs.cantidad * cxs.precio_unitario)
  from public.cotizacionxservicio cxs
  where cxs.id_cotizacion = c.id_cotizacion
), 0);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'logos',
  'logos',
  true,
  5242880,
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

create policy "logos_select_public"
on storage.objects for select
using (bucket_id = 'logos');

create policy "logos_insert_own"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'logos'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);

create policy "logos_update_own"
on storage.objects for update to authenticated
using (
  bucket_id = 'logos'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);

create policy "logos_delete_own"
on storage.objects for delete to authenticated
using (
  bucket_id = 'logos'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);
