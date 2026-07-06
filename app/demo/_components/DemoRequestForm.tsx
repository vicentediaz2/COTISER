export function DemoRequestForm() {
  return (
    <form
      action="mailto:ventas@cotizapro.cl"
      className="rounded-lg border border-blue-100 bg-white p-6 shadow-sm shadow-blue-950/5 lg:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Nombre
          <input
            name="nombre"
            required
            className="min-h-12 rounded-lg border border-blue-100 px-4 text-base text-slate-950 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            placeholder="Tu nombre"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Email
          <input
            name="email"
            type="email"
            required
            className="min-h-12 rounded-lg border border-blue-100 px-4 text-base text-slate-950 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            placeholder="correo@empresa.cl"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Empresa
          <input
            name="empresa"
            className="min-h-12 rounded-lg border border-blue-100 px-4 text-base text-slate-950 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            placeholder="Nombre de empresa"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Equipo
          <select
            name="equipo"
            className="min-h-12 rounded-lg border border-blue-100 bg-white px-4 text-base text-slate-950 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            defaultValue=""
          >
            <option value="" disabled>
              Selecciona una opcion
            </option>
            <option>Ventas</option>
            <option>Operaciones</option>
            <option>Administracion</option>
            <option>Direccion</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
          Mensaje
          <textarea
            name="mensaje"
            rows={5}
            className="rounded-lg border border-blue-100 px-4 py-3 text-base text-slate-950 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            placeholder="Cuenta que necesitas cotizar o mejorar."
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-blue-700 px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-800 sm:w-auto"
      >
        Enviar solicitud
      </button>
    </form>
  );
}
