import { absoluteUrl, allowIndexing, siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots() {
  if (!allowIndexing) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/"
      }
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/iniciar-sesion/"]
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl
  };
}
