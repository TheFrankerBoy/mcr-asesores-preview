"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { assetPath, company, services } from "@/lib/content";
import { Icon } from "./Icons";

const nav = [
  { href: "/", label: "Inicio" },
  {
    href: "/mcr-asesores",
    label: "MCR Asesores",
    children: [
      { href: "/mcr-asesores#quienes-somos", label: "Quiénes somos" },
      { href: "/mcr-asesores#autonomos", label: "Autónomos" },
      { href: "/mcr-asesores#sociedades", label: "Sociedades y pymes" }
    ]
  },
  {
    href: "/servicios",
    label: "Servicios",
    children: services.map((service) => ({
      href: `/servicios#${service.slug}`,
      label: service.title
    }))
  },
  { href: "/contacto", label: "Contacto" }
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenSubmenu(null);
  }, [pathname]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="MCR Asesores, inicio">
          <Image
            src={assetPath("/images/logo-mcr-transparent-cropped.png")}
            alt="MCR Asesores S.L."
            width={1382}
            height={649}
            priority
          />
        </Link>

        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Principal">
          {nav.map((item) => (
            <div
              className={`nav-item ${item.children ? "has-submenu" : ""}`}
              key={item.href}
            >
              <div className="nav-item-trigger">
                <Link
                  href={item.href}
                  className={`nav-primary-link ${pathname === item.href ? "active" : ""}`}
                  onClick={() => {
                    setOpen(false);
                    setOpenSubmenu(null);
                  }}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    type="button"
                    className="submenu-toggle"
                    aria-label={`Mostrar opciones de ${item.label}`}
                    aria-expanded={openSubmenu === item.href}
                    onClick={() =>
                      setOpenSubmenu((current) => current === item.href ? null : item.href)
                    }
                  >
                    <Icon name="chevron" size={15} strokeWidth={2} />
                  </button>
                )}
              </div>
              {item.children && (
                <div
                  className={`nav-dropdown ${openSubmenu === item.href ? "is-open" : ""}`}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => {
                        setOpen(false);
                        setOpenSubmenu(null);
                      }}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mobile-nav-actions">
            <a href={assetPath("/empleados/")} className="employee-mobile-link">
              <Icon name="clock" size={19} />
              Empleados
            </a>
            <a
              href={company.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="whatsapp-mobile-link"
            >
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
          <a href={assetPath("/empleados/")} className="employee-link">
            <Icon name="clock" size={18} />
            Empleados
          </a>
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
          onClick={() =>
            setOpen((value) => {
              if (value) setOpenSubmenu(null);
              return !value;
            })
          }
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
            <a href={assetPath("/empleados/")}>Acceso de empleados</a>
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
