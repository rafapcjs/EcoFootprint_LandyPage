import type { CSSProperties } from 'react';

/**
 * Genera el estilo en línea para escalonar la animación de aparición
 * (`[data-reveal]`) de una lista de elementos. Centraliza el cálculo del
 * retardo para no repetir el cast a CSSProperties en cada componente.
 *
 * @param index posición del elemento en la lista
 * @param step  milisegundos de separación entre elementos (por defecto 100)
 */
export function revealDelay(index: number, step = 100): CSSProperties {
  return { '--reveal-delay': `${index * step}ms` } as CSSProperties;
}
