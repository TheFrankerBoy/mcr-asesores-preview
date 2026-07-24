const fallbackSiteUrl =
  "https://thefrankerboy.github.io/mcr-asesores-preview";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl
).replace(/\/+$/, "");

export const allowIndexing =
  process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}
