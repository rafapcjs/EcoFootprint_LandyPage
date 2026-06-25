/**
 * Carga y normaliza las lecturas de CO₂ exportadas desde ThingSpeak
 * (public/media/co2-readings.csv). Mantener el parseo aquí —separado del
 * componente— facilita reutilizarlo o cambiar la fuente de datos.
 *
 * Columnas del CSV: created_at, entry_id, field1, field2, field3, …
 *   created_at → marca de tiempo ISO (-05:00)
 *   field1     → Sensor 1 (ppm de CO₂)
 *   field2     → Sensor 2 (ppm de CO₂)
 *   field3     → diferencia absoluta entre sensores (no se usa: se recalcula)
 */

export interface Reading {
  readonly time: Date;
  readonly s1: number;
  readonly s2: number;
}

export function parseReadings(csv: string): Reading[] {
  const lines = csv.trim().split(/\r?\n/);
  const out: Reading[] = [];

  // Empezamos en 1 para saltar la fila de cabecera.
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    if (cols.length < 4) continue;

    const time = new Date(cols[0]);
    const s1 = Number(cols[2]);
    const s2 = Number(cols[3]);
    if (Number.isNaN(time.getTime()) || Number.isNaN(s1) || Number.isNaN(s2)) continue;

    out.push({ time, s1, s2 });
  }

  out.sort((a, b) => a.time.getTime() - b.time.getTime());
  return out;
}

export async function loadReadings(url: string): Promise<Reading[]> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No se pudo cargar ${url} (${res.status})`);
  return parseReadings(await res.text());
}

/** Reduce la serie a como máximo `max` puntos conservando inicio y fin. */
export function downsample<T>(arr: readonly T[], max: number): T[] {
  if (arr.length <= max) return [...arr];
  const step = (arr.length - 1) / (max - 1);
  const out: T[] = [];
  for (let i = 0; i < max; i++) out.push(arr[Math.round(i * step)]);
  return out;
}

const timeFmt = new Intl.DateTimeFormat('es-CO', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
});

const shortTimeFmt = new Intl.DateTimeFormat('es-CO', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
});

const dateFmt = new Intl.DateTimeFormat('es-CO', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export const formatTime = (d: Date): string => timeFmt.format(d);
export const formatShortTime = (d: Date): string => shortTimeFmt.format(d);
export const formatDate = (d: Date): string => dateFmt.format(d);

/**
 * Rango de fechas legible. Si ambas caen el mismo día muestra una sola fecha;
 * si comparten mes y año, las compacta ("2–5 de junio de 2026").
 */
export function formatDateRange(from: Date, to: Date): string {
  const sameDay = from.toDateString() === to.toDateString();
  if (sameDay) return formatDate(from);

  const sameMonth =
    from.getMonth() === to.getMonth() && from.getFullYear() === to.getFullYear();
  if (sameMonth) {
    const month = new Intl.DateTimeFormat('es-CO', { month: 'long' }).format(to);
    return `${from.getDate()}–${to.getDate()} de ${month} de ${to.getFullYear()}`;
  }

  return `${formatDate(from)} – ${formatDate(to)}`;
}
