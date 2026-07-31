alter table public.cotizacionxservicio
  add column descuento smallint null
    check (descuento between 0 and 100);

alter table public.cotizacion
  add column subtotal_general integer not null default 0
    check (subtotal_general >= 0),
  add column impuesto_total integer not null default 0
    check (impuesto_total >= 0),
  add column descuento smallint null
    check (descuento between 0 and 100);

-- Las cotizaciones existentes no tenían impuestos ni descuentos registrados.
-- Se conserva su total histórico y se recupera el subtotal desde sus líneas.
update public.cotizacion c
set subtotal_general = coalesce((
  select sum(cxs.cantidad * cxs.precio_unitario)
  from public.cotizacionxservicio cxs
  where cxs.id_cotizacion = c.id_cotizacion
), 0);
