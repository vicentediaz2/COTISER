"use client";

import { useState } from "react";

type Props = {
  currentUrl?: string | null;
};

export function LogoUpload({ currentUrl }: Props) {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setPreview(file ? URL.createObjectURL(file) : currentUrl ?? null);
  }

  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-[7rem_1fr] sm:items-center">
      <div className="grid h-28 w-28 place-items-center overflow-hidden rounded-xl border border-blue-100 bg-slate-50">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Logo de la organización" className="h-full w-full object-cover" />
        ) : (
          <span className="px-2 text-center text-xs text-slate-400">Sin logo</span>
        )}
      </div>
      <div className="grid gap-2">
        <p className="text-sm font-medium text-slate-700">Logo de la organización</p>
        <input
          name="logo"
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={handleChange}
          className="block w-full text-sm text-slate-600 file:mr-4 file:min-h-10 file:rounded-lg file:border-0 file:bg-blue-700 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-800"
        />
        <p className="text-xs text-slate-500">PNG, JPG, WEBP o GIF. Máximo 5 MB. Se guarda con el nombre de la organización.</p>
      </div>
    </div>
  );
}
