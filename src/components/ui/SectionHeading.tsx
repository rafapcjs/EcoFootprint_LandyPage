import type { ReactNode } from 'react';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  /** Etiqueta superior (kicker) en mayúsculas. */
  readonly eyebrow: string;
  /** Título; acepta nodos para resaltar palabras con `.accent-text`. */
  readonly title: ReactNode;
  /** Texto introductorio opcional bajo el título. */
  readonly lead?: string;
  /** Alineación del bloque. */
  readonly align?: 'left' | 'center';
  /** Esquema de color para fondos oscuros. */
  readonly tone?: 'onLight' | 'onDark';
}

/**
 * Cabecera de sección reutilizable (eyebrow + título + lead).
 * Aparece con la animación de scroll y unifica la tipografía entre secciones.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  tone = 'onLight',
}: SectionHeadingProps) {
  const classes = [styles.head, styles[align], tone === 'onDark' && styles.onDark]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={classes} data-reveal>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className={styles.title}>{title}</h2>
      {lead && <p className={styles.lead}>{lead}</p>}
    </header>
  );
}
