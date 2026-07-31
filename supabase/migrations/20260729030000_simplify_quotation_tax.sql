alter table public.cotizacion
  drop column impuesto_total,
  drop column tasa_impuesto,
  add column impuesto smallint null
    check (impuesto between 0 and 100);
