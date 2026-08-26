import { Brand } from "./Brand";
import { headerBar, headerInner } from "./headerStyles";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-slate-100 text-slate-950">
      <header className={headerBar}>
        <div className={headerInner}><Brand /></div>
      </header>
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-20">
        <div>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-blue-700 sm:text-5xl">Cotizaciones ordenadas desde el primer día.</h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
            Crea propuestas, conserva el historial y mantén los datos de cada cuenta separados y protegidos.
          </p>
        </div>
        {children}
      </section>
    </main>
  );
}

