export function FormMessage({ error, message }: { error?: string; message?: string }) {
  if (!error && !message) return null;
  return (
    <p className={`rounded-lg border px-4 py-3 text-sm ${error ? "border-red-200 bg-red-50 text-red-700" : "border-red-200 bg-red-50 text-red-700"}`}>
      {error || message}
    </p>
  );
}

