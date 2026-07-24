import "./globals.css";
import { Footer, Header, FloatingWhatsApp } from "@/components/SiteChrome";
import { company, services } from "@/lib/content";
import { absoluteUrl, allowIndexing, siteUrl } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "MCR Asesores",
  title: {
    default: "Gestoría y asesoría en Pilas, Sevilla | MCR Asesores",
    template: "%s | MCR Asesores"
  },
  description:
    "Gestoría y asesoría fiscal, contable, laboral, jurídica y administrativa en Pilas, Sevilla. Atención a autónomos, pymes y empresas desde 1994.",
  keywords: [
    "gestoría Pilas",
    "asesoría Pilas",
    "asesoría fiscal Pilas",
    "asesoría laboral Pilas",
    "asesoría contable Pilas",
    "gestoría Sevilla",
    "asesoría para autónomos",
    "MCR Asesores"
  ],
  authors: [{ name: "MCR Asesores S.L." }],
  creator: "MCR Asesores S.L.",
  publisher: "MCR Asesores S.L.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  alternates: {
    canonical: absoluteUrl("/")
  },
  openGraph: {
    title: "Gestoría y asesoría en Pilas | MCR Asesores",
    description:
      "Asesoramiento fiscal, contable, laboral, jurídico y administrativo para autónomos, pymes y empresas.",
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName: "MCR Asesores",
    images: [
      {
        url: absoluteUrl("/images/hero-sevilla-real.webp"),
        width: 1672,
        height: 941,
        alt: "MCR Asesores, gestoría y asesoría en Pilas"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "MCR Asesores | Gestoría y asesoría en Pilas",
    description:
      "Asesoramiento integral para autónomos, pymes y empresas desde 1994.",
    images: [absoluteUrl("/images/hero-sevilla-real.webp")]
  },
  robots: allowIndexing
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1
        }
      }
    : {
        index: false,
        follow: false,
        noarchive: true
      }
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#business`,
        name: company.name,
        alternateName: company.shortName,
        url: siteUrl,
        logo: absoluteUrl("/images/logo-mcr-transparent-cropped.png"),
        image: [
          absoluteUrl("/images/hero-sevilla-real.webp"),
          absoluteUrl("/images/despacho-mcr-editorial.webp"),
          absoluteUrl("/images/asesoria-personal-mcr.webp")
        ],
        telephone: "+34955752603",
        foundingDate: company.since,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Avenida Alcalde Jesús Calderón Moreno, 43",
          postalCode: "41840",
          addressLocality: "Pilas",
          addressRegion: "Sevilla",
          addressCountry: "ES"
        },
        areaServed: [
          { "@type": "City", name: "Pilas" },
          { "@type": "AdministrativeArea", name: "Sevilla" }
        ],
        sameAs: [company.instagram],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios de asesoría y gestoría",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.short,
              url: absoluteUrl(`/servicios/#${service.slug}`)
            }
          }))
        }
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "MCR Asesores",
        inLanguage: "es-ES",
        publisher: { "@id": `${siteUrl}/#business` }
      }
    ]
  };

  return (
    <html lang="es">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c")
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
