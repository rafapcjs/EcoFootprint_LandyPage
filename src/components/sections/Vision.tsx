import { CLOSING } from '@/data/content';
import { italicizeSpecies } from '@/lib/sciName';
import styles from './Vision.module.css';

export function Vision() {
  return (
    <section className={styles.section} id="vision">
      <div className={styles.card} data-reveal>
        <div className={styles.cardGlow} aria-hidden="true" />
        <div className={styles.top}>
          <div className={styles.text}>
            <span className={styles.eyebrow}>{CLOSING.eyebrow}</span>
            <h2 className={styles.title}>{CLOSING.title}</h2>

            <div className={styles.body}>
              {CLOSING.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className={styles.paragraph}>
                  {italicizeSpecies(paragraph)}
                </p>
              ))}
            </div>
          </div>

          <figure className={styles.figure}>
            <img src={CLOSING.image} alt={CLOSING.imageAlt} loading="lazy" />
          </figure>
        </div>

        <dl className={styles.highlights}>
          {CLOSING.highlights.map((item) => (
            <div key={item.value} className={styles.highlight}>
              <dt className={styles.highlightValue}>{italicizeSpecies(item.value)}</dt>
              <dd className={styles.highlightLabel}>{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
