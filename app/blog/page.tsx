import Link from "next/link";
import type { Metadata } from "next";
import { BrandText } from "@/app/_components/BrandText";
import { posts } from "./_data/posts";
import { defaultSocialImage, siteLocale, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guías, reportes y consejos para crear cotizaciones más rápidas con COTISER.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    locale: siteLocale,
    siteName,
    title: "Blog | COTISER",
    description:
      "Guías, reportes y consejos para crear cotizaciones más rápidas con COTISER.",
  },
  twitter: { card: "summary_large_image", title: "Blog | COTISER", images: [defaultSocialImage] },
};

export default function BlogPage() {
  return (
    <>
      <header className="mb-10">
        <h1 className="mt-4 text-3xl font-black tracking-tight text-blue-950 sm:text-4xl">
          Guías para cotizar más rápido y con mayor profesionalismo
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
          <BrandText text="Artículos cortos, prácticos y enfocados a cómo sacarle el máximo provecho a COTISER para presentar propuestas claras y consistentes." />
        </p>
      </header>

      <section aria-label="Listado de artículos">
        <ul className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug} className="group">
              <Link
                href={`/blog/${post.slug}`}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  <time dateTime={post.date}>{post.date}</time>
                  <span aria-hidden="true">•</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="mt-3 text-xl font-bold tracking-tight text-blue-950">
                  <BrandText text={post.title} />
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  <BrandText text={post.excerpt} />
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700">
                  Leer artículo
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="size-4 color-blue-50 transition-transform group-hover:translate-x-0.5"
                  >
                    <path
                      d="M6 3l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
