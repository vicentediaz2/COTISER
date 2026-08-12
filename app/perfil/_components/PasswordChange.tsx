"use client";

import { useState } from "react";

export function PasswordChange() {
  const [expanded, setExpanded] = useState(false);

  if (!expanded) {
    return (
      <div className="sm:col-span-2">
        <button type="button" onClick={() => setExpanded(true)} className="text-sm font-semibold text-blue-700 hover:underline">
          Cambiar contraseña
        </button>
        <p className="mt-1 text-xs text-slate-500">La contraseña actual se mantiene si no la cambias aquí.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:col-span-2 sm:grid-cols-2">
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Nueva contraseña
        <input name="password" type="password" minLength={8} className="form-control" autoComplete="new-password" />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Confirmar contraseña
        <input name="password_confirmation" type="password" minLength={8} className="form-control" autoComplete="new-password" placeholder="Repite la nueva contraseña" />
      </label>
      <div className="sm:col-span-2">
        <button type="button" onClick={() => setExpanded(false)} className="text-sm font-semibold text-slate-500 hover:text-slate-700">
          Cancelar cambio de contraseña
        </button>
      </div>
    </div>
  );
}
