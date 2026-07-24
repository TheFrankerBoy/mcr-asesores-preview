import Image from "next/image";
import Link from "next/link";
import { PageHero, AppointmentBand } from "@/components/Shared";
import { Icon } from "@/components/Icons";
import { assetPath, audiences } from "@/lib/content";

export const metadata = {
  title: "Quiénes somos",
  description:
    "Conoce la trayectoria, la forma de trabajar y el compromiso de MCR Asesores con autónomos, sociedades y pymes."
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="MCR Asesores"
        title="Más de treinta años haciendo sencillo lo importante."
        text="Una trayectoria construida con seriedad, atención personal y relaciones que duran. Somos un despacho cercano con una visión completa de cada cliente."
      />

      <section className="story-section section-pad" id="quienes-somos">
        <div className="section-shell story-grid">
          <div className="story-image story-brand-panel" data-reveal>
            <Image
              src={assetPath("/images/logo-mcr-transparent-cropped.png")}
              alt="MCR Asesores S.L."
              fill
              sizes="(max-width: 800px) 100vw, 52vw"
            />
            <div className="story-stamp">
              <strong>1994</strong>
              <span>El inicio de nuestra trayectoria</span>
            </div>
          </div>
          <div className="story-copy" data-reveal>
            <p className="eyebrow">Nuestra historia</p>
            <h2>El mismo compromiso, una forma de trabajar que evoluciona.</h2>
            <p>
              La trayectoria profesional que da origen a MCR Asesores comenzó en
              1994. Desde entonces, cada etapa ha reforzado una idea sencilla:
              detrás de cada trámite hay una persona, una familia o un negocio que
              necesita respuestas claras.
            </p>
            <p>
              Hoy reunimos experiencia y herramientas actuales para ofrecer un
              servicio más ágil, sin perder el trato directo. Conocemos a nuestros
              clientes, anticipamos sus necesidades y coordinamos las distintas
              áreas para que no tengan que repetir su historia en cada consulta.
            </p>
          </div>
        </div>
      </section>

      <section className="values-section section-pad">
        <div className="section-shell">
          <div className="section-heading split-heading" data-reveal>
            <div>
              <p className="eyebrow light">Nuestra forma de trabajar</p>
              <h2>Lo profesional también puede sentirse cercano.</h2>
            </div>
            <p>
              Creemos en una asesoría que escucha primero, explica bien y permanece
              disponible cuando hay que tomar una decisión.
            </p>
          </div>
          <div className="values-grid">
            {[
              ["Cercanía", "Te atendemos con nombres y apellidos. Conocemos tu situación y evitamos respuestas impersonales."],
              ["Claridad", "Traducimos la normativa y los números para que entiendas tus opciones antes de decidir."],
              ["Rigor", "Revisamos cada gestión con método, responsabilidad y atención a los detalles."],
              ["Compromiso", "No nos limitamos a presentar documentos: acompañamos, prevenimos y buscamos soluciones."]
            ].map(([title, text]) => (
              <div className="value-card" key={title} data-reveal>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="audience-detail section-pad">
        <div className="section-shell">
          <div className="section-heading centered" data-reveal>
            <p className="eyebrow">A quién ayudamos</p>
            <h2>Una respuesta para cada realidad</h2>
          </div>
          <div className="audience-detail-grid">
            {audiences.map((audience) => (
              <article id={audience.slug} key={audience.title} data-reveal>
                <h3>{audience.title}</h3>
                <p>{audience.text}</p>
                <Link href="/contacto">
                  Cuéntanos tu caso <Icon name="arrow" size={18} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <AppointmentBand />
    </>
  );
}
