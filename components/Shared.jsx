import Link from "next/link";
import Image from "next/image";
import { Icon } from "./Icons";
import { assetPath, company } from "@/lib/content";

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
      <div className="page-hero-pattern" />
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
      <Image
        src={assetPath("/images/consulta.webp")}
        alt=""
        fill
        sizes="100vw"
        className="appointment-photo"
        aria-hidden="true"
      />
      <div className="appointment-overlay" />
      <div className="section-shell appointment-content">
        <div data-reveal>
          <p className="eyebrow light">Primera consulta sin compromiso</p>
          <h2>Cuéntanos qué necesitas.<br />Empezamos escuchándote.</h2>
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
