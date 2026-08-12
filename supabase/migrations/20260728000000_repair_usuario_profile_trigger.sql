-- Guarantees that every Supabase Auth account has its public profile row.
-- This is safe to apply on existing projects: it recreates the trigger and
-- backfills profiles for accounts created before the trigger was available.

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

insert into public.usuario (id_usuario)
select id
from auth.users
on conflict (id_usuario) do nothing;
