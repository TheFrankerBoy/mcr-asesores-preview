import "./globals.css";
import { Footer, Header, FloatingWhatsApp } from "@/components/SiteChrome";

export const metadata = {
  title: {
    default: "MCR Asesores | Gestoría y asesoría en Pilas",
    template: "%s | MCR Asesores"
  },
  description:
    "Gestoría y asesoría fiscal, contable, laboral, jurídica y administrativa en Pilas, Sevilla. Más de 30 años de experiencia junto a autónomos, pymes y empresas.",
  keywords: [
    "gestoría Pilas",
    "asesoría Pilas",
    "asesoría fiscal Sevilla",
    "asesoría laboral",
    "MCR Asesores"
  ],
  openGraph: {
    title: "MCR Asesores S.L.",
    description: "Cercanía, experiencia y confianza desde 1994.",
    type: "website",
    locale: "es_ES"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
