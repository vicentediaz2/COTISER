"use client";

import { useState } from "react";
import Link from "next/link";

type Props = {
  configured: boolean;
};

export function TermsSubmit({ configured }: Props) {
  const [accepted, setAccepted] = useState(false);

  return (
    <>
      <label className="flex items-start gap-3 text-sm text-slate-700">
        <input
          type="checkbox"
          name="accept_terms"
          required
          checked={accepted}
          onChange={(event) => setAccepted(event.target.checked)}
          className="mt-0.5 h-5 w-5 rounded border-slate-300 text-blue-700 focus:ring-blue-600"
        />
        <span>
          Acepto los{" "}
          <Link href="/legal/terminos" className="font-semibold text-blue-700 hover:underline" target="_blank">
            términos y condiciones
          </Link>
        </span>
      </label>
      <button disabled={!configured || !accepted} className="primary-button w-full disabled:cursor-not-allowed disabled:opacity-50">
        Crear cuenta gratis
      </button>
    </>
  );
}
