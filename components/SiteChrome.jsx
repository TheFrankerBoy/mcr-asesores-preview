"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { assetPath, company } from "@/lib/content";
import { Icon } from "./Icons";

const nav = [
  { href: "/", label: "Inicio" },
  { href: "/mcr-asesores", label: "MCR Asesores" },
  { href: "/servicios", label: "Servicios" },
  { href: "/contacto", label: "Contacto" }
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="MCR Asesores, inicio">
          <Image
            src={assetPath("/images/logo-mcr.webp")}
            alt="MCR Asesores S.L."
            width={900}
            height={562}
            priority
          />
        </Link>

        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Principal">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}
          <div className="mobile-nav-actions">
            <a href={company.whatsappHref} target="_blank" rel="noreferrer">
              <Icon name="whatsapp" size={20} />
              WhatsApp
            </a>
            <a href={company.phoneHref}>
              <Icon name="phone" size={19} />
              {company.phone}
            </a>
          </div>
        </nav>

        <div className="header-actions">
          <a
            href={company.instagram}
            target="_blank"
            rel="noreferrer"
            className="icon-link"
            aria-label="Instagram"
          >
            <Icon name="instagram" size={19} />
          </a>
          <a
            href={company.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="icon-link whatsapp-link"
            aria-label="Hablar por WhatsApp"
          >
            <Icon name="whatsapp" size={19} />
          </a>
          <a href={company.phoneHref} className="phone-link">
            {company.phone}
          </a>
        </div>

        <button
          className={`menu-toggle ${open ? "is-open" : ""}`}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main section-shell">
        <div className="footer-about">
          <Link href="/" className="footer-wordmark">
            MCR <span>ASESORES S.L.</span>
          </Link>
          <p>
            Asesoramiento fiscal, contable, laboral, jurídico y administrativo.
            Defendemos el interés de cada cliente con cercanía, rigor y soluciones eficaces.
          </p>
          <div className="footer-socials">
            <a href={company.whatsappHref} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <Icon name="whatsapp" size={20} />
            </a>
            <a href={company.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Icon name="instagram" size={20} />
            </a>
          </div>
        </div>
        <div>
          <p className="footer-heading">Explora</p>
          <div className="footer-links">
            <Link href="/mcr-asesores">Quiénes somos</Link>
            <Link href="/servicios">Servicios</Link>
            <Link href="/contacto">Contacto</Link>
            <a href={company.maps} target="_blank" rel="noreferrer">
              Cómo llegar
            </a>
          </div>
        </div>
        <div>
          <p className="footer-heading">Contacto</p>
          <div className="footer-contact">
            <a href={company.phoneHref}>{company.phone}</a>
            <a href={company.whatsappHref} target="_blank" rel="noreferrer">
              WhatsApp {company.whatsapp}
            </a>
            <a href={company.maps} target="_blank" rel="noreferrer">
              {company.address}
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom section-shell">
        <span>© {new Date().getFullYear()} MCR Asesores S.L.</span>
        <span>Gestoría y asesoría en Pilas, Sevilla</span>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      className="floating-whatsapp"
      href={company.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir conversación en WhatsApp"
    >
      <Icon name="whatsapp" size={25} />
      <span>¿Hablamos?</span>
    </a>
  );
}

export function ScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px" }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
