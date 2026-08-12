-- Bucket público para logos de organizaciones.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'logos',
  'logos',
  true,
  5242880,
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

-- Lectura pública: los logos se muestran en la app sin autenticación extra.
create policy "logos_select_public"
on storage.objects for select
using (bucket_id = 'logos');

-- Escritura restringida: cada usuario solo toca su propia carpeta {uid}/.
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
