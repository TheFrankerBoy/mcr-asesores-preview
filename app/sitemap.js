import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: absoluteUrl("/servicios/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: absoluteUrl("/mcr-asesores/"),
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8
    },
    {
      url: absoluteUrl("/contacto/"),
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7
    }
  ];
}
