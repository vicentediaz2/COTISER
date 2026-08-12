alter table public.cotizacion
  add column tasa_impuesto smallint null
    check (tasa_impuesto between 0 and 100);
