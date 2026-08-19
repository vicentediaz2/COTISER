import { Footer } from "@/app/_components/Footer";
import { Brand } from "@/app/_components/Brand";

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-950">
      <header className="border-b border-blue-100 bg-white px-6 py-5">
        <div className="mx-auto max-w-7xl">
          <Brand />
        </div>
      </header>
      <main className="flex-1 px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
