export const company = {
  name: "MCR Asesores S.L.",
  shortName: "MCR Asesores",
  since: "1994",
  phone: "955 752 603",
  phoneHref: "tel:+34955752603",
  whatsapp: "601 639 828",
  whatsappHref:
    "https://wa.me/34601639828?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20vuestros%20servicios.",
  instagram: "https://www.instagram.com/",
  address: "Av. Pío XII, 43, 41840 Pilas, Sevilla",
  maps:
    "https://www.google.com/maps/search/?api=1&query=Av.%20P%C3%ADo%20XII%2C%2043%2C%2041840%20Pilas%2C%20Sevilla",
  mapEmbed:
    "https://www.google.com/maps?q=Av.%20P%C3%ADo%20XII%2C%2043%2C%2041840%20Pilas%2C%20Sevilla&output=embed"
};

export const assetPath = (path) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;

export const services = [
  {
    slug: "fiscal",
    number: "01",
    icon: "fiscal",
    title: "Asesoría fiscal",
    short:
      "Gestionamos tus obligaciones fiscales con seguridad, criterio y una planificación adaptada a tu actividad.",
    description:
      "Te acompañamos en la planificación y presentación de impuestos, resolvemos requerimientos y revisamos cada decisión con una visión práctica. Nuestro objetivo es que cumplas con tus obligaciones sin pagar de más ni asumir riesgos innecesarios.",
    details: [
      "IVA, IRPF e Impuesto sobre Sociedades",
      "Declaraciones informativas y censales",
      "Requerimientos y notificaciones",
      "Planificación fiscal para cada etapa"
    ]
  },
  {
    slug: "laboral",
    number: "02",
    icon: "laboral",
    title: "Asesoría laboral",
    short:
      "Contratos, nóminas y seguros sociales con acompañamiento continuo para que tu equipo esté bien gestionado.",
    description:
      "Nos ocupamos del día a día laboral de empresas y profesionales: altas, bajas, contratos, nóminas, seguros sociales y consultas. Traducimos la normativa en decisiones claras para que puedas centrarte en tu negocio.",
    details: [
      "Contratos, altas y bajas",
      "Nóminas y seguros sociales",
      "Convenios y costes laborales",
      "Consultas y acompañamiento continuo"
    ]
  },
  {
    slug: "contable",
    number: "03",
    icon: "contable",
    title: "Asesoría contable",
    short:
      "Una contabilidad rigurosa y fácil de entender para conocer la realidad de tu negocio y decidir con tiempo.",
    description:
      "Ordenamos, revisamos y analizamos la información contable de tu actividad. Más que registrar movimientos, convertimos los datos en una herramienta útil para anticiparte, planificar y crecer con una base sólida.",
    details: [
      "Contabilidad de autónomos y sociedades",
      "Cierres y libros oficiales",
      "Balances e informes de situación",
      "Coordinación fiscal y contable"
    ]
  },
  {
    slug: "juridico",
    number: "04",
    icon: "juridico",
    title: "Asesoramiento jurídico",
    short:
      "Orientación legal cercana para proteger tus intereses y tomar decisiones con mayor seguridad.",
    description:
      "Estudiamos cada situación con atención y explicamos las opciones de forma directa. Te ayudamos a prevenir conflictos, revisar documentación y actuar con seguridad cuando surge un problema.",
    details: [
      "Consultas y revisión documental",
      "Contratos y acuerdos",
      "Asesoramiento a empresas y particulares",
      "Prevención y resolución de conflictos"
    ]
  },
  {
    slug: "gestoria",
    number: "05",
    icon: "gestoria",
    title: "Gestoría administrativa",
    short:
      "Nos encargamos de los trámites y de la relación con los organismos para que tú recuperes tiempo.",
    description:
      "Gestionamos documentación, solicitudes y comunicaciones con distintas administraciones. Hacemos seguimiento de cada expediente y te mantenemos informado, con un proceso ordenado y sin vueltas innecesarias.",
    details: [
      "Presentación y seguimiento de trámites",
      "Certificados y registros",
      "Gestiones ante organismos públicos",
      "Atención y control de expedientes"
    ]
  },
  {
    slug: "agricultura",
    number: "06",
    icon: "agricultura",
    title: "Agricultura y ganadería",
    short:
      "Asesoramiento especializado para explotaciones agrícolas y ganaderas del entorno rural.",
    description:
      "Conocemos la realidad del campo y sus tiempos. Facilitamos la gestión administrativa, fiscal y laboral de cada explotación, además del seguimiento de ayudas y subvenciones aplicables.",
    details: [
      "Gestión integral de explotaciones",
      "Ayudas y subvenciones",
      "Trámites administrativos",
      "Asesoramiento adaptado al sector"
    ]
  },
  {
    slug: "extranjeria",
    number: "07",
    icon: "extranjeria",
    title: "Trámites de extranjería",
    short:
      "Permisos, renovaciones y documentación con una atención clara, cercana y personalizada.",
    description:
      "Revisamos tu situación, preparamos la documentación y te acompañamos durante el procedimiento. Queremos que sepas en todo momento qué se está tramitando y cuál es el siguiente paso.",
    details: [
      "Permisos y renovaciones",
      "Nacionalidad y residencia",
      "Preparación de documentación",
      "Seguimiento personalizado"
    ]
  }
];

export const audiences = [
  {
    title: "Autónomos",
    text: "Te ayudamos a empezar, cumplir con tus obligaciones y tener una visión clara de tus números sin que la gestión te quite tiempo."
  },
  {
    title: "Sociedades",
    text: "Coordinamos las áreas fiscal, contable, laboral y jurídica para que cada decisión esté respaldada y todo funcione como un conjunto."
  },
  {
    title: "Pymes",
    text: "Nos convertimos en un apoyo cercano para el día a día, con respuestas ágiles y soluciones pensadas para el tamaño real de tu empresa."
  }
];
