import { Fragment, type ReactNode } from 'react';

/**
 * Los nombres científicos de género se escriben en cursiva (p. ej. *Chlorella*).
 * Esta utilidad recorre un texto plano y envuelve cada aparición del género en
 * `<em>`, dejando el contenido en `content.ts` como cadena (apto para CMS o
 * traducción). El epíteto "sp." se mantiene en redonda, por eso solo se
 * envuelve la palabra del género.
 */
const GENUS_PATTERN = /(Chlorella)/g;

export function italicizeSpecies(text: string): ReactNode {
  return text.split(GENUS_PATTERN).map((part, i) =>
    part === 'Chlorella' ? <em key={i}>{part}</em> : <Fragment key={i}>{part}</Fragment>,
  );
}
