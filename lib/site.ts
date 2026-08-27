export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cotiser.is-a.dev"
).replace(/\/$/, "");
