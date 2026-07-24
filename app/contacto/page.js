import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icons";
import { PageHero } from "@/components/Shared";
import { company } from "@/lib/content";

export const metadata = {
  title: "Contacto",
  description:
    "Contacta con MCR Asesores en Av. Alcalde Jesús Calderón Moreno, 43, Pilas. Solicita información o concierta una cita."
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Tu consulta empieza con una conversación."
        text="Cuéntanos qué necesitas y te orientaremos sobre el siguiente paso. Puedes escribirnos, llamarnos o venir a nuestro despacho en Pilas."
      />

      <section className="contact-section section-pad">
        <div className="section-shell contact-grid">
          <div className="contact-info" data-reveal>
            <p className="eyebrow">Hablemos</p>
            <h2>Estamos al otro lado.</h2>
            <p className="contact-intro">
              Envíanos tu consulta y se abrirá WhatsApp con los datos preparados.
              Podrás revisar el mensaje antes de enviarlo.
            </p>
            <div className="contact-methods">
              <a href={company.phoneHref}>
                <span><Icon name="phone" size={22} /></span>
                <div>
                  <small>Teléfono</small>
                  <strong>{company.phone}</strong>
                </div>
              </a>
              <a href={company.whatsappHref} target="_blank" rel="noreferrer">
                <span><Icon name="whatsapp" size={23} /></span>
                <div>
                  <small>WhatsApp</small>
                  <strong>{company.whatsapp}</strong>
                </div>
              </a>
              <a href={company.maps} target="_blank" rel="noreferrer">
                <span><Icon name="pin" size={22} /></span>
                <div>
                  <small>Despacho</small>
                  <strong>{company.address}</strong>
                </div>
              </a>
            </div>
          </div>
          <div data-reveal>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="contact-map">
        <iframe
          title="Mapa de MCR Asesores"
          src={company.mapEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="map-address-card">
          <p className="eyebrow">Visítanos</p>
          <h2>MCR Asesores S.L.</h2>
          <p>{company.address}</p>
          <a href={company.maps} target="_blank" rel="noreferrer">
            Abrir en Google Maps <Icon name="arrow" size={18} />
          </a>
        </div>
      </section>
    </>
  );
}
