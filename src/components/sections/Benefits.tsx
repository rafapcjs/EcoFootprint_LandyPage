import { BENEFITS } from '@/data/content';
import { Icon } from '../ui/Icon';
import { SectionHeading } from '../ui/SectionHeading';
import { revealDelay } from '@/lib/reveal';
import styles from './Benefits.module.css';

export function Benefits() {
  return (
    <section className={styles.section} id="beneficios">
      <span className={`orb ${styles.orbA}`} aria-hidden="true" />
      <span className={`orb ${styles.orbB}`} aria-hidden="true" />
      <div className={styles.inner}>
        <SectionHeading
          eyebrow="Beneficios"
          title={
            <>
              Por qué las <span className="accent-text">microalgas</span> son parte de la
              solución
            </>
          }
        />

        <div className={styles.grid}>
          {BENEFITS.map((b, i) => (
            <article
              key={b.title}
              className={styles.card}
              data-reveal
              style={revealDelay(i)}
            >
              <span className={styles.icon}>
                <Icon name={b.icon} size={26} />
              </span>
              <h3 className={styles.cardTitle}>{b.title}</h3>
              <p className={styles.cardText}>{b.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
