import Image from "next/image";
import Link from "next/link";
import { ArrowLink, AppointmentBand, ServiceIcon } from "@/components/Shared";
import { Icon } from "@/components/Icons";
import { assetPath, audiences, company, services } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <Image
          src={assetPath("/images/hero-sevilla.webp")}
          alt="Vista de Sevilla al atardecer"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-shade" />
        <div className="section-shell hero-content">
          <div className="hero-copy">
            <p className="eyebrow light">Gestoría y asesoría · Desde 1994</p>
            <h1>La tranquilidad de tenerlo todo bien acompañado.</h1>
            <p className="hero-lead">
              Más de treinta años ayudando a autónomos, pymes y empresas con un
              asesoramiento cercano, claro y comprometido.
            </p>
            <div className="hero-buttons">
              <Link href="/contacto" className="button button-warm">
                Solicitar presupuesto
                <Icon name="arrow" size={19} />
              </Link>
              <Link href="/servicios" className="text-link-light">
                Ver nuestros servicios
              </Link>
            </div>
          </div>
          <div className="hero-proof">
            <span className="proof-number">30+</span>
            <span className="proof-label">años contigo</span>
          </div>
        </div>
        <div className="hero-scroll">
          <span />
          Descubre MCR
        </div>
      </section>

      <section className="trust-strip">
        <div className="section-shell trust-grid">
          <div>
            <span>01</span>
            <p>Atención personalizada</p>
          </div>
          <div>
            <span>02</span>
            <p>Visión integral</p>
          </div>
          <div>
            <span>03</span>
            <p>Respuesta cercana</p>
          </div>
          <div>
            <span>04</span>
            <p>Experiencia desde 1994</p>
          </div>
        </div>
      </section>

      <section className="intro-section section-pad">
        <div className="section-shell intro-grid">
          <div data-reveal>
            <p className="eyebrow">Una asesoría que habla tu idioma</p>
            <h2>Rigor profesional.<br />Trato de siempre.</h2>
          </div>
          <div className="intro-copy" data-reveal>
            <p>
              El proyecto actual de MCR Asesores mantiene el mismo compromiso,
              cercanía y confianza que ha acompañado a sus clientes durante décadas.
              Te explicamos lo complejo de forma sencilla y cuidamos cada gestión
              como si fuera propia.
            </p>
            <ArrowLink href="/mcr-asesores">Conoce nuestra historia</ArrowLink>
          </div>
        </div>
      </section>

      <section className="services-preview section-pad">
        <div className="section-shell">
          <div className="section-heading split-heading" data-reveal>
            <div>
              <p className="eyebrow">Servicios</p>
              <h2>Todo lo que necesitas.<br />Un solo equipo.</h2>
            </div>
            <p>
              Primera consulta gratuita y sin compromiso. Analizamos tu caso y te
              proponemos el camino más claro.
            </p>
          </div>

          <div className="service-grid">
            {services.map((service, index) => (
              <Link
                href={`/servicios#${service.slug}`}
                className={`service-card ${index === 0 ? "featured" : ""}`}
                key={service.slug}
                data-reveal
              >
                <div className="service-card-top">
                  <ServiceIcon name={service.icon} />
                  <span className="service-number">{service.number}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.short}</p>
                <span className="card-arrow"><Icon name="arrow" size={20} /></span>
              </Link>
            ))}
          </div>

          <div className="center-action" data-reveal>
            <ArrowLink href="/servicios">Ver todos los servicios en detalle</ArrowLink>
          </div>
        </div>
      </section>

      <AppointmentBand />

      <section className="numbers-section section-pad">
        <div className="section-shell numbers-grid">
          <div className="numbers-photo" data-reveal>
            <Image
              src={assetPath("/images/fachada-mcr.webp")}
              alt="Fachada de MCR Asesores en Pilas"
              fill
              sizes="(max-width: 800px) 100vw, 42vw"
            />
            <div className="photo-caption">
              <Icon name="pin" size={18} />
              Av. Pío XII, 43 · Pilas
            </div>
          </div>
          <div className="numbers-copy" data-reveal>
            <p className="eyebrow">Confianza que se construye</p>
            <p className="big-number">+250</p>
            <h2>empresas confían en nosotros</h2>
            <p>
              Desde hace más de 30 años trabajamos junto a negocios de nuestro
              entorno, aportando experiencia, soluciones útiles y una atención que
              no se pierde detrás de una pantalla.
            </p>
            <ArrowLink href="/mcr-asesores">Quiénes somos</ArrowLink>
          </div>
        </div>
      </section>

      <section className="audience-section section-pad">
        <div className="section-shell">
          <div className="section-heading centered" data-reveal>
            <p className="eyebrow">A tu medida</p>
            <h2>Estamos cerca en cada etapa</h2>
          </div>
          <div className="audience-grid">
            {audiences.map((audience, index) => (
              <div className="audience-card" key={audience.title} data-reveal>
                <span>0{index + 1}</span>
                <h3>{audience.title}</h3>
                <p>{audience.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="location-section section-pad" id="ubicacion">
        <div className="section-shell location-grid">
          <div className="location-copy" data-reveal>
            <p className="eyebrow">Estamos en Pilas</p>
            <h2>Un despacho cercano, también en el mapa.</h2>
            <p>
              Ven a conocernos en la Avenida Pío XII. Si lo prefieres, llámanos o
              escríbenos antes y te orientamos desde el primer momento.
            </p>
            <div className="location-details">
              <a href={company.maps} target="_blank" rel="noreferrer">
                <Icon name="pin" size={21} />
                <span>{company.address}</span>
              </a>
              <a href={company.phoneHref}>
                <Icon name="phone" size={20} />
                <span>{company.phone}</span>
              </a>
            </div>
            <a
              href={company.maps}
              target="_blank"
              rel="noreferrer"
              className="button button-primary"
            >
              Cómo llegar
              <Icon name="arrow" size={19} />
            </a>
          </div>
          <div className="map-frame" data-reveal>
            <iframe
              title="Ubicación de MCR Asesores"
              src={company.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
