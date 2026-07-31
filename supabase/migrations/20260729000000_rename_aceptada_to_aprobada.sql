do $$
begin
  if exists (
    select 1
    from pg_enum
    where enumtypid = 'public.estado_cotizacion'::regtype
      and enumlabel = 'aceptada'
  ) then
    alter type public.estado_cotizacion rename value 'aceptada' to 'aprobada';
  end if;
end $$;
