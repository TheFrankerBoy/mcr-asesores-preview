import DemoTimeClock from "@/components/DemoTimeClock";
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
  return <DemoTimeClock />;
}
