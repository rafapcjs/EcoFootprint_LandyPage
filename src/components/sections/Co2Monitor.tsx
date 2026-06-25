import { useEffect, useMemo, useState } from 'react';
import {
  downsample,
  formatTime,
  formatShortTime,
  formatDateRange,
  type Reading,
} from '@/lib/co2Data';
import styles from './Co2Monitor.module.css';

type LoadState = 'loading' | 'ready' | 'error';

/**
 * Lecturas de demostración que reproducen el panel de referencia:
 * Sensor 1 ≈ 485, Sensor 2 ≈ 479, diferencia +6 (mín 6 / máx 15), 5 lecturas.
 */
const DEMO_READINGS: Reading[] = [
  { time: new Date('2026-06-02T15:27:47-05:00'), s1: 478, s2: 463 },
  { time: new Date('2026-06-02T15:28:15-05:00'), s1: 480, s2: 468 },
  { time: new Date('2026-06-02T15:28:45-05:00'), s1: 481, s2: 470 },
  { time: new Date('2026-06-02T15:29:45-05:00'), s1: 484, s2: 475 },
  { time: new Date('2026-06-02T15:30:15-05:00'), s1: 485, s2: 479 },
];

/** Minutos de actividad del ESP32 mostrados en la tarjeta de uptime. */
const UPTIME_MIN = 11;

interface Status {
  readonly label: string;
  readonly className: string;
}

/** Clasifica un nivel de CO₂ (ppm) en Normal / Elevado / Alto. */
function levelStatus(ppm: number): Status {
  if (ppm > 1000) return { label: 'Alto', className: styles.high };
  if (ppm > 800) return { label: 'Elevado', className: styles.mid };
  return { label: 'Normal', className: styles.ok };
}

/** Redondea hacia un múltiplo de `step` (abajo o arriba). */
const floorTo = (v: number, step: number) => Math.floor(v / step) * step;
const ceilTo = (v: number, step: number) => Math.ceil(v / step) * step;

export function Co2Monitor() {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [state, setState] = useState<LoadState>('loading');
  const [logCleared, setLogCleared] = useState(false);

  useEffect(() => {
    // Pequeño retardo para simular la conexión con el sensor.
    const t = setTimeout(() => {
      setReadings(DEMO_READINGS);
      setState('ready');
    }, 400);
    return () => clearTimeout(t);
  }, []);

  const view = useMemo(() => {
    if (readings.length === 0) return null;

    const last = readings[readings.length - 1];
    const diffs = readings.map((r) => r.s1 - r.s2);
    const diffMin = Math.min(...diffs);
    const diffMax = Math.max(...diffs);

    const first = readings[0];
    const spanMin = Math.round((last.time.getTime() - first.time.getTime()) / 60000);

    return {
      last,
      date: formatDateRange(first.time, last.time),
      diff: last.s1 - last.s2,
      diffMin,
      diffMax,
      total: readings.length,
      spanMin,
      line: downsample(readings, 140),
      bars: downsample(readings, 40),
      log: readings.slice(-40).reverse(),
    };
  }, [readings]);

  return (
    <section className={styles.section} id="monitor">
      <div className={styles.inner}>
        <header className={styles.head}>
          <div className={styles.brand}>
            <span className={styles.live} />
            CO₂ MONITOR
          </div>
          <div className={styles.meta}>
            <span className={styles.connected}>
              <span className={styles.dot} />
              {state === 'ready' ? 'Conectado' : state === 'error' ? 'Sin datos' : 'Conectando…'}
            </span>
            {view && <span>{view.date}</span>}
            {view && <span>Última lectura: {formatTime(view.last.time)}</span>}
          </div>
        </header>

        {state === 'error' && (
          <p className={styles.message}>No se pudieron cargar las lecturas del sensor.</p>
        )}
        {state === 'loading' && <p className={styles.message}>Cargando lecturas…</p>}

        {view && (
          <>
            <div className={styles.cards}>
              <KpiCard
                title="SENSOR 1 — GPIO 18"
                value={view.last.s1}
                unit="ppm CO₂"
                accent="s1"
                status={levelStatus(view.last.s1)}
              />
              <KpiCard
                title="SENSOR 2 — GPIO 19"
                value={view.last.s2}
                unit="ppm CO₂"
                accent="s2"
                status={levelStatus(view.last.s2)}
              />
              <div className={`${styles.card} ${styles.cardDiff}`}>
                <span className={styles.cardTitle}>DIFERENCIA S1 - S2</span>
                <span className={`${styles.cardValue} ${styles.diffValue}`}>
                  {view.diff >= 0 ? '+' : ''}
                  {view.diff}
                </span>
                <span className={styles.cardUnit}>ppm</span>
                <div className={styles.cardFoot}>
                  <span>Mín: {view.diffMin}</span>
                  <span>Máx: {view.diffMax}</span>
                </div>
              </div>
              <div className={`${styles.card} ${styles.cardUptime}`}>
                <span className={styles.cardTitle}>UPTIME ESP32</span>
                <span className={styles.cardValue}>{UPTIME_MIN}</span>
                <span className={styles.cardUnit}>minutos</span>
                <div className={styles.cardFoot}>
                  <span>Lecturas: {view.total}</span>
                </div>
              </div>
            </div>

            <div className={styles.panel}>
              <div className={styles.panelHead}>
                <h3 className={styles.panelTitle}>HISTORIAL CO₂ EN TIEMPO REAL</h3>
                <div className={styles.legend}>
                  <span className={styles.legS1}>● Sensor 1</span>
                  <span className={styles.legS2}>● Sensor 2</span>
                </div>
              </div>
              <LineChart readings={view.line} />
            </div>

            <div className={styles.grid2}>
              <div className={styles.panel}>
                <div className={styles.panelHead}>
                  <h3 className={styles.panelTitle}>DIFERENCIA ENTRE SENSORES</h3>
                  <span className={styles.legDiff}>● S1 - S2</span>
                </div>
                <DiffChart readings={view.bars} />
              </div>

              <div className={styles.panel}>
                <div className={styles.panelHead}>
                  <h3 className={styles.panelTitle}>REGISTRO DE LECTURAS</h3>
                  <button
                    type="button"
                    className={styles.clear}
                    onClick={() => setLogCleared(true)}
                  >
                    Limpiar
                  </button>
                </div>
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Hora</th>
                        <th>S1</th>
                        <th>S2</th>
                        <th>Δ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logCleared ? (
                        <tr>
                          <td colSpan={4} className={styles.empty}>
                            Registro limpiado.
                          </td>
                        </tr>
                      ) : (
                        view.log.map((r, i) => {
                          const d = r.s1 - r.s2;
                          return (
                            <tr key={i}>
                              <td>{formatTime(r.time)}</td>
                              <td className={styles.valS1}>{r.s1}</td>
                              <td className={styles.valS2}>{r.s2}</td>
                              <td className={styles.valDiff}>
                                {d >= 0 ? '+' : ''}
                                {d}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

interface KpiCardProps {
  readonly title: string;
  readonly value: number;
  readonly unit: string;
  readonly accent: 's1' | 's2';
  readonly status: Status;
}

function KpiCard({ title, value, unit, accent, status }: KpiCardProps) {
  // Barra de nivel: 400 ppm (vacío) → 1200 ppm (lleno).
  const pct = Math.max(0, Math.min(100, ((value - 400) / 800) * 100));
  return (
    <div className={`${styles.card} ${accent === 's1' ? styles.cardS1 : styles.cardS2}`}>
      <span className={styles.cardTitle}>{title}</span>
      <span className={`${styles.cardValue} ${accent === 's1' ? styles.s1Value : styles.s2Value}`}>
        {value}
      </span>
      <span className={styles.cardUnit}>{unit}</span>
      <div className={styles.cardFoot}>
        <div className={styles.bar}>
          <div
            className={accent === 's1' ? styles.barFillS1 : styles.barFillS2}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className={`${styles.badge} ${status.className}`}>{status.label}</span>
      </div>
    </div>
  );
}

// ---- Gráficos SVG (sin dependencias externas) ----

const W = 840;
const H = 300;
const PAD = { l: 46, r: 16, t: 16, b: 28 };

function LineChart({ readings }: { readings: readonly Reading[] }) {
  const { line1, line2, area1, area2, ticks, xLabels } = useMemo(() => {
    const values = readings.flatMap((r) => [r.s1, r.s2]);
    const yMin = floorTo(Math.min(...values), 50);
    const yMax = ceilTo(Math.max(...values), 50);
    const n = readings.length;

    const x = (i: number) => PAD.l + (i / (n - 1)) * (W - PAD.l - PAD.r);
    const y = (v: number) =>
      PAD.t + (1 - (v - yMin) / (yMax - yMin || 1)) * (H - PAD.t - PAD.b);

    const pts = (sel: (r: Reading) => number) =>
      readings.map((r, i) => `${x(i).toFixed(1)},${y(sel(r)).toFixed(1)}`).join(' ');

    const baseline = y(yMin);
    const line1Pts = pts((r) => r.s1);
    const line2Pts = pts((r) => r.s2);
    const area1Pts = `${PAD.l},${baseline} ${line1Pts} ${x(n - 1)},${baseline}`;
    const area2Pts = `${PAD.l},${baseline} ${line2Pts} ${x(n - 1)},${baseline}`;

    const tickCount = 5;
    const ticks = Array.from({ length: tickCount }, (_, i) => {
      const v = yMin + ((yMax - yMin) / (tickCount - 1)) * i;
      return { v: Math.round(v), y: y(v) };
    });

    const labelCount = Math.min(5, n);
    const xLabels = Array.from({ length: labelCount }, (_, i) => {
      const idx = Math.round((i / (labelCount - 1)) * (n - 1));
      return { x: x(idx), label: formatShortTime(readings[idx].time) };
    });

    return { line1: line1Pts, line2: line2Pts, area1: area1Pts, area2: area2Pts, ticks, xLabels };
  }, [readings]);

  return (
    <svg className={styles.chart} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Historial de CO₂">
      {ticks.map((t) => (
        <g key={t.v}>
          <line x1={PAD.l} x2={W - PAD.r} y1={t.y} y2={t.y} className={styles.gridLine} />
          <text x={PAD.l - 8} y={t.y + 3} className={styles.axisText} textAnchor="end">
            {t.v}
          </text>
        </g>
      ))}
      {xLabels.map((l, i) => (
        <text
          key={i}
          x={l.x}
          y={H - 8}
          className={styles.axisText}
          textAnchor={i === 0 ? 'start' : i === xLabels.length - 1 ? 'end' : 'middle'}
        >
          {l.label}
        </text>
      ))}
      <polygon points={area2} className={styles.areaS2} />
      <polygon points={area1} className={styles.areaS1} />
      <polyline points={line2} className={styles.lineS2} vectorEffect="non-scaling-stroke" />
      <polyline points={line1} className={styles.lineS1} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

const BW = 840;
const BH = 260;

function DiffChart({ readings }: { readings: readonly Reading[] }) {
  const { bars, baseY, labels } = useMemo(() => {
    const diffs = readings.map((r) => r.s1 - r.s2);
    const n = diffs.length;
    const pad = { l: 16, r: 16, t: 24, b: 22 };
    const plotH = BH - pad.t - pad.b;

    // Dominio que siempre incluye el cero: si todo es positivo, el cero queda
    // abajo y las barras crecen hacia arriba llenando el área.
    const dMax = Math.max(0, ...diffs);
    const dMin = Math.min(0, ...diffs);
    const range = dMax - dMin || 1;
    const y = (v: number) => pad.t + (1 - (v - dMin) / range) * plotH;

    const baseY = y(0);
    const slot = (BW - pad.l - pad.r) / n;
    const bw = Math.min(56, slot * 0.55);

    const bars = diffs.map((d, i) => {
      const yd = y(d);
      const xc = pad.l + slot * i + slot / 2;
      return {
        x: xc - bw / 2,
        y: Math.min(yd, baseY),
        h: Math.abs(yd - baseY),
        w: bw,
        labelX: xc,
        labelY: Math.min(yd, baseY) - 7,
        value: d,
      };
    });

    const labels = bars.map((b) => ({ x: b.labelX, y: b.labelY, value: b.value }));

    return { bars, baseY, labels };
  }, [readings]);

  return (
    <svg className={styles.chart} viewBox={`0 0 ${BW} ${BH}`} role="img" aria-label="Diferencia entre sensores">
      <line x1={16} x2={BW - 16} y1={baseY} y2={baseY} className={styles.gridLine} />
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={b.w} height={Math.max(2, b.h)} className={styles.barDiff} rx={4} />
      ))}
      {labels.map((l, i) => (
        <text key={i} x={l.x} y={l.y} className={styles.barLabel} textAnchor="middle">
          {l.value >= 0 ? '+' : ''}
          {l.value}
        </text>
      ))}
    </svg>
  );
}
