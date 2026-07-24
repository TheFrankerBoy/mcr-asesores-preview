import Link from "next/link";
import { PageHero } from "@/components/Shared";
import { Icon } from "@/components/Icons";
import { absoluteUrl } from "@/lib/seo";

export const metadata = {
  title: "Iniciar sesión",
  description: "Acceso privado al control horario de MCR Asesores S.L.",
  alternates: {
    canonical: absoluteUrl("/iniciar-sesion/")
  },
  robots: {
    index: false,
    follow: false
  }
};

export default function LoginAccessPage() {
  return (
    <>
      <PageHero
        eyebrow="Área privada"
        title="Iniciar sesión"
        text="El control horario se habilitará en la puesta en producción de la web de MCR Asesores."
      />
      <section className="employee-preview-section section-pad">
        <div className="section-shell employee-preview-card">
          <span className="employee-preview-icon">
            <Icon name="clock" size={31} />
          </span>
          <div>
            <p className="eyebrow">Acceso restringido</p>
            <h2>Portal preparado para su activación.</h2>
            <p>
              Las trabajadoras accederán con su correo y contraseña para registrar
              la entrada y la salida. El sistema se conectará a la base de datos
              privada de MCR cuando se despliegue en IONOS.
            </p>
            <Link href="/" className="button button-primary">
              Volver a la web
              <Icon name="arrow" size={19} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
