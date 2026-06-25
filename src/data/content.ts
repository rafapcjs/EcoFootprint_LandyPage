/**
 * Fuente única de contenido del sitio.
 * Mantener los textos aquí (separados de los componentes) facilita
 * traducir, revisar o conectar un CMS más adelante.
 */

export interface NavLink {
  readonly id: string;
  readonly label: string;
}

export interface Stat {
  readonly icon: string;
  /** Texto antes del número (p. ej. "≈ ", "hasta "). */
  readonly prefix?: string;
  /** Valor numérico que se anima con conteo ascendente. */
  readonly value: number;
  /** Decimales a mostrar (formato español con coma). */
  readonly decimals?: number;
  /** Texto tras el número (p. ej. " kg", "×", " %"). */
  readonly suffix?: string;
  readonly label: string;
  readonly detail: string;
}

export interface ProcessStep {
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

export interface Benefit {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
}

export interface MediaItem {
  readonly type: 'image' | 'video';
  readonly src: string;
  readonly caption: string;
  readonly alt: string;
}

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

export const SITE = {
  name: 'BioCaptura CO₂',
  tagline: 'Microalgas que convierten el dióxido de carbono en vida',
  reference:
    ' Evaluación de la captación de CO₂ basada en el uso de microalgas, como alternativa en la reducción de la huella de carbono en la ciudad de Montería, Córdoba, Colombia. Acta FE - 09-24. MAS VISIBLE, SI PUDES AL INICIO DE LA PAGINA, QUE QUEDE LO MÁS VISIBLE.',
} as const;

export interface Seedbed {
  readonly name: string;
  readonly logo: string;
  readonly alt: string;
}

export const RESEARCH = {
  group: 'Grupo de Investigación BOTÁNICA — COL 0018349',
  seedbedsLabel: 'Semilleros de investigación',
  seedbeds: [
    {
      name: 'BioAqua',
      logo: '/media/semillero-bioaqua.jpeg',
      alt: 'Logo del semillero de investigación BioAqua.',
    },
    {
      name: 'Quercus',
      logo: '/media/semillero-quercus.jpeg',
      alt: 'Logo del semillero de investigación Quercus.',
    },
    {
      name: 'Herbario',
      logo: '/media/herbario.jpeg',
      alt: 'Logo del Herbario.',
    },
  ] as readonly Seedbed[],
} as const;

export const NAV_LINKS: readonly NavLink[] = [
  { id: 'proyecto', label: 'El proyecto' },
  { id: 'proceso', label: 'Cómo funciona' },
  { id: 'monitor', label: 'Monitor' },
  { id: 'galeria', label: 'Galería' },
  { id: 'beneficios', label: 'Beneficios' },
  { id: 'faq', label: 'Preguntas' },
];

export const HERO = {
  eyebrow: 'Biotecnología para el clima',
  title: 'Capturamos CO₂ con microalgas y lo transformamos en',
  titleAccent: 'oxígeno y biomasa',
  subtitle:
    'Cultivamos Chlorella en fotobiorreactores que absorben dióxido de carbono mediante fotosíntesis, mucho más rápido que un bosque por metro cuadrado. Una solución natural, escalable y de bajo costo.',
  primaryCta: 'Conoce el proceso',
  secondaryCta: 'Ver galería',
  chip: {
    title: 'Chlorella sp.',
    subtitle: 'Cultivo vivo en biorreactor',
  },
} as const;

export const MARQUEE: readonly string[] = [
  'Fotosíntesis',
  'Captura de carbono',
  'Chlorella',
  'Oxígeno',
  'Biomasa',
  'Fotobiorreactor',
  'Energía solar',
  'Economía circular',
  'Biofertilizante',
  'Cero residuos',
];

export const STATS: readonly Stat[] = [
  {
    icon: 'leaf',
    prefix: '≈ ',
    value: 1.8,
    decimals: 1,
    suffix: ' kg',
    label: 'CO₂ fijado',
    detail: 'Por cada kilogramo de biomasa de microalga producida.',
  },
  {
    icon: 'wind',
    prefix: 'hasta ',
    value: 50,
    suffix: '×',
    label: 'más eficiente',
    detail: 'Que las plantas terrestres en captura por área.',
  },
  {
    icon: 'sun',
    value: 100,
    suffix: ' %',
    label: 'natural',
    detail: 'Sin químicos: solo luz, agua, nutrientes y CO₂.',
  },
];

export const ABOUT = {
  eyebrow: 'El proyecto',
  title: 'Un pulmón microscópico cultivado en el laboratorio',
  paragraphs: [
    'Chlorella es una microalga unicelular de agua dulce que crece a gran velocidad. Durante la fotosíntesis toma el CO₂ disuelto en el medio , usando la energía de la luz, lo incorpora a su propia estructura liberando oxígeno.',
    'En nuestros fotobiorreactores —desde matraces de laboratorio hasta garrafas de varios litros— inyectamos aire del ambiente, que ya trae el CO₂ presente en la atmósfera, y controlamos luz, temperatura y nutrientes para maximizar el crecimiento del cultivo.',
    'La biomasa resultante puede aprovecharse como biofertilizante, suplemento alimentario o materia prima para biocombustibles, cerrando un ciclo donde el carbono capturado se vuelve un recurso útil.',
  ],
  image: '/media/microalga-microscopio.jpeg',
  imageAlt:
    'Células de microalga Chlorella vistas al microscopio, de color verde brillante.',
  imageCaption: 'Chlorella. Al microscopio — cada célula es una fábrica de oxígeno.',
  badge: {
    icon: 'leaf',
    value: 'Fotosíntesis',
    label: 'CO₂ + luz → O₂ + biomasa',
  },
} as const;

export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    number: '01',
    title: 'Cultivo inicial',
    description:
      'Partimos de una cepa pura de Chlorella en matraces con medio nutritivo, en condiciones controladas de luz y temperatura.',
  },
  {
    number: '02',
    title: 'Inyección de CO₂',
    description:
      'Se suministra aire con dióxido de carbono dentro del cultivo. Las microalgas lo absorben y fotosintetizan, multiplicándose día a día.',
  },
  {
    number: '03',
    title: 'Escalado en fotobiorreactores',
    description:
      'El cultivo se transfiere a garrafas y columnas de mayor volumen, donde la densidad de algas —y la captura de CO₂— aumenta.',
  },
  {
    number: '04',
    title: 'Cosecha y aprovechamiento',
    description:
      'La biomasa se separa del agua y se seca para usarla como fertilizante, alimento o bioproducto.  ',
  },
];

export const GALLERY: readonly MediaItem[] = [
  {
    type: 'image',
    src: '/media/investigador-laboratorio.png',
    alt: 'Investigador con bata y guantes revisando dos garrafas con cultivo denso de microalga.',
    caption: 'Fotobiorreactor a escala piloto.',
  },
  {
    type: 'image',
    src: '/media/cultivo-erlenmeyer.jpeg',
    alt: 'Serie de matraces Erlenmeyer con cultivos de Chlorella en distintas etapas de crecimiento.',
    caption: 'Escalamiento del cultivo de microalgas.  '
  },
  {
    type: 'image',
    src: '/media/biorreactores-garrafa.jpeg',
    alt: 'Dos garrafas con cultivo verde de Chlorella conectadas a un sistema de aireación.',
    caption: 'Fotobiorreactores con aireación continua de CO₂.',
  },
  {
    type: 'image',
    src: '/media/cultivo-frascos.jpeg',
    alt: 'Dos grandes recipientes con cultivo verde de microalga sobre una mesa de laboratorio.',
    caption: 'Cultivos densos listos para la fase de cosecha.',
  },
  {
    type: 'video',
    src: '/media/instalacion.mp4',
    alt: 'Video de la instalación exterior del fotobiorreactor con panel solar.',
    caption: 'Prototipo exterior alimentado con energía solar.',
  },
  {
    type: 'video',
    src: '/media/proceso-1.mp4',
    alt: 'Video del proceso de cultivo y aireación de microalgas.',
    caption: 'Aireación del cultivo en funcionamiento.',
  },
];

export const BENEFITS: readonly Benefit[] = [
  {
    icon: 'leaf',
    title: 'Captura real de carbono',
    description:
      'Cada lote de microalgas retira CO₂ de la atmósfera y lo fija en biomasa de forma medible.',
  },
  {
    icon: 'wind',
    title: 'Más oxígeno',
    description:
      'La fotosíntesis libera oxígeno como subproducto, mejorando el balance del aire.',
  },
  {
    icon: 'recycle',
    title: 'Economía circular',
    description:
      'La biomasa se convierte en fertilizante, alimento o biocombustible. Nada se desperdicia.',
  },
  {
    icon: 'sun',
    title: 'Bajo costo energético',
    description:
      'Funciona con luz solar y un mínimo de infraestructura, fácil de replicar y escalar.',
  },
];

export const FAQ: readonly FaqItem[] = [
  {
    question: '¿Por qué microalgas y no árboles?',
    answer:
      'Las microalgas crecen mucho más rápido y capturan más CO₂ por metro cuadrado. No compiten por tierra cultivable y pueden instalarse en espacios reducidos, incluso urbanos.',
  },
  {
    question: '¿Qué pasa con la biomasa cosechada?',
    answer:
      'Se aprovecha como biofertilizante, suplemento nutricional rico en proteínas o materia prima para biocombustibles, manteniendo el carbono fuera de la atmósfera.',
  },
  {
    question: '¿Es seguro y sostenible?',
    answer:
      'Sí. El proceso solo usa luz, agua, nutrientes y CO₂. No genera residuos tóxicos y el agua del cultivo se recircula.',
  },
  {
    question: '¿Se puede escalar?',
    answer:
      'El sistema es modular: pasamos de matraces de laboratorio a garrafas y columnas, y el mismo principio se aplica a instalaciones industriales.',
  },
];

export interface ClosingHighlight {
  readonly value: string;
  readonly label: string;
}

export const CLOSING = {
  eyebrow: 'Nuestra visión',
  title: 'Convertir un gas contaminante en una oportunidad para el planeta',
  paragraphs: [
    'El dióxido de carbono es el principal gas de efecto invernadero. En lugar de verlo solo como un problema, este proyecto lo trata como materia prima: las microalgas lo absorben y lo transforman en biomasa rica en proteínas, pigmentos y lípidos.',
    'A partir de un cultivo de laboratorio de Chlorella escalado en fotobiorreactores, demostramos que es posible capturar carbono de forma biológica, medible y replicable, sentando las bases para llevar el sistema a escuelas, comunidades e industrias.',
  ],
  image: '/media/frascos.png',
  imageAlt: 'Frascos con cultivo verde de microalga Chlorella en el laboratorio.',
  highlights: [
    { value: 'Chlorella sp.', label: 'Microalga utilizada en el cultivo' },
    { value: 'Fotobiorreactores', label: 'De matraz a columnas de varios litros' },
    { value: 'Energía solar', label: 'El prototipo exterior funciona con el sol' },
  ] as readonly ClosingHighlight[],
} as const;
