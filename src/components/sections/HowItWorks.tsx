import type { MouseEvent } from 'react';
import { PROCESS_STEPS } from '@/data/content';
import { SectionHeading } from '../ui/SectionHeading';
import { revealDelay } from '@/lib/reveal';
import { italicizeSpecies } from '@/lib/sciName';
import styles from './HowItWorks.module.css';

export function HowItWorks() {
  // Foco de luz que sigue al cursor: guardamos la posición en variables CSS.
  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <section className={styles.section} id="proceso" onMouseMove={handleMove}>
      <div className={styles.spotlight} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <SectionHeading
          tone="onDark"
          eyebrow="Cómo funciona"
          title={
            <>
              Del CO₂ a la <span className="accent-text">biomasa</span> en cuatro pasos
            </>
          }
          lead="Un ciclo continuo y controlado donde la microalga hace el trabajo pesado: absorber carbono y crecer."
        />

        <ol className={styles.steps}>
          {PROCESS_STEPS.map((step, i) => (
            <li key={step.number} className={styles.step} data-reveal style={revealDelay(i, 110)}>
              <span className={styles.ghost} aria-hidden="true">
                {step.number}
              </span>
              <span className={styles.number}>{step.number}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{italicizeSpecies(step.description)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
