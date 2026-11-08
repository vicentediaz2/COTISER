import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrandText } from "@/app/_components/BrandText";
import { RichText } from "../_components/RichText";
import { posts } from "../_data/posts";
import { defaultSocialImage, siteLocale, siteName, siteUrl } from "@/lib/site";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return { title: "Artículo no encontrado" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `${siteUrl}/blog/${post.slug}`,
      locale: siteLocale,
      siteName,
      title: `${post.title} | COTISER`,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: defaultSocialImage, alt: post.coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | COTISER`,
      description: post.excerpt,
      images: [defaultSocialImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${siteUrl}/blog/${post.slug}#articulo`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "es-CL",
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: siteName, url: siteUrl },
    image: `${siteUrl}${defaultSocialImage}`,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  return (
    <article className="mx-auto max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-widest text-blue-50">
          <time dateTime={post.date}>{post.date}</time>
          <span aria-hidden="true">•</span>
          <span>{post.readingTime}</span>
          <span aria-hidden="true">•</span>
          <span>Por <BrandText text={post.author} /></span>
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-blue-950 sm:text-4xl">
          <BrandText text={post.title} />
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          <BrandText text={post.excerpt} />
        </p>
      </header>

      <div className="space-y-10">
        {post.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className="text-2xl font-black tracking-tight text-blue-950">
              <BrandText text={section.title} />
            </h2>
            {section.blocks.map((block, index) =>
              block.type === "list" ? (
                block.ordered ? (
                  <ol key={index} className="mt-3 list-decimal space-y-2 pl-5 leading-relaxed text-slate-600">
                    {block.items.map((item) => (
                      <li key={item}>
                        <RichText text={item} />
                      </li>
                    ))}
                  </ol>
                ) : (
                  <ul key={index} className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-slate-600">
                    {block.items.map((item) => (
                      <li key={item}>
                        <RichText text={item} />
                      </li>
                    ))}
                  </ul>
                )
              ) : (
                <p key={index} className="mt-3 leading-relaxed text-slate-600">
                  <RichText text={block.text} />
                </p>
              )
            )}
          </section>
        ))}
      </div>

      {related.length > 0 && (
        <section className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-lg font-bold tracking-tight text-slate-950">
            Sigue leyendo
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/blog/${item.slug}`}
                  className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                >
                  <span className="text-base font-bold text-blue-950">
                    <BrandText text={item.title} />
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-slate-600">
                    <BrandText text={item.excerpt} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-100 px-6 py-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:underline"
        >
          ← Volver al listado
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:underline"
        >
          Ir al inicio →
        </Link>
      </nav>
    </article>
  );
}
