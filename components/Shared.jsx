import Link from "next/link";
import { Icon } from "./Icons";
import { company } from "@/lib/content";

export function ArrowLink({ href, children, light = false, className = "" }) {
  return (
    <Link className={`arrow-link ${light ? "light" : ""} ${className}`} href={href}>
      <span>{children}</span>
      <Icon name="arrow" size={19} />
    </Link>
  );
}

export function PageHero({ eyebrow, title, text }) {
  return (
    <section className="page-hero">
      <div className="section-shell page-hero-inner">
        <p className="eyebrow light" data-reveal>{eyebrow}</p>
        <h1 data-reveal>{title}</h1>
        {text && <p className="page-hero-text" data-reveal>{text}</p>}
      </div>
    </section>
  );
}

export function AppointmentBand() {
  return (
    <section className="appointment-band">
      <div className="section-shell appointment-content">
        <div data-reveal>
          <p className="eyebrow light">Atención personalizada</p>
          <h2>¿Tienes una consulta o quieres concertar una cita?</h2>
        </div>
        <a
          data-reveal
          className="button button-whatsapp"
          href={company.whatsappHref}
          target="_blank"
          rel="noreferrer"
        >
          <Icon name="whatsapp" size={21} />
          Hablar por WhatsApp
        </a>
      </div>
    </section>
  );
}

export function ServiceIcon({ name }) {
  return (
    <span className="service-icon">
      <Icon name={name} size={28} strokeWidth={1.45} />
    </span>
  );
}
