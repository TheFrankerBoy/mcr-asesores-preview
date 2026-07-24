import { PageHero, ServiceIcon, AppointmentBand } from "@/components/Shared";
import { Icon } from "@/components/Icons";
import { services } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export const metadata = {
  title: "Servicios de asesoría y gestoría",
  description:
    "Asesoría fiscal, laboral, contable y jurídica, gestoría administrativa, agricultura, ganadería y extranjería en Pilas, Sevilla.",
  alternates: {
    canonical: absoluteUrl("/servicios/")
  }
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="Un asesoramiento completo, sin respuestas genéricas."
        text="Cada negocio y cada persona tienen una realidad distinta. Por eso estudiamos tu caso, coordinamos las áreas necesarias y te explicamos cada paso con claridad."
      />

      <section className="services-index">
        <div className="section-shell service-index-grid">
          {services.map((service) => (
            <a key={service.slug} href={`#${service.slug}`}>
              {service.title}
            </a>
          ))}
        </div>
      </section>

      <section className="service-detail-list section-pad">
        <div className="section-shell">
          {services.map((service) => (
            <article
              id={service.slug}
              className="service-detail"
              key={service.slug}
              data-reveal
            >
              <div className="service-detail-title">
                <ServiceIcon name={service.icon} />
                <h2>{service.title}</h2>
              </div>
              <div className="service-detail-copy">
                <p className="service-intro">{service.description}</p>
                <ul>
                  {service.details.map((detail) => (
                    <li key={detail}>
                      <Icon name="check" size={19} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <AppointmentBand />
    </>
  );
}
