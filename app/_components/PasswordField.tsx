"use client";

import { useState } from "react";
import { passwordRequirements } from "@/lib/password";

type Props = {
  name: string;
  label: string;
  autoComplete: string;
  placeholder?: string;
  showRequirements?: boolean;
};

export function PasswordField({ name, label, autoComplete, placeholder, showRequirements = false }: Props) {
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <label className="row-end-3 gap-2 text-sm font-medium text-slate-700">
      {label}
      <span className="relative">
        <input
          name={name}
          type={visible ? "text" : "password"}
          required
          minLength={showRequirements ? 10 : undefined}
          autoComplete={autoComplete}
          className="form-control pr-20"
          placeholder={placeholder}
          onChange={showRequirements ? (event) => setPassword(event.target.value) : undefined}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="absolute inset-y-0 right-0 px-3 text-xs font-semibold text-blue-700 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
          aria-label={visible ? `Ocultar ${label.toLowerCase()}` : `Mostrar ${label.toLowerCase()}`}
          aria-pressed={visible}
        >
          {visible ? "Ocultar" : "Mostrar"}
        </button>
      </span>
      {showRequirements && (
        <ul className="space-y-1 text-xs font-normal text-slate-500" aria-live="polite">
          {passwordRequirements.map(({ key, label: requirement, test }) => {
            const met = test(password);
            return <li key={key} className={met ? "text-emerald-700" : undefined}>{met ? "✓" : "○"} {requirement}</li>;
          })}
        </ul>
      )}
    </label>
  );
}
