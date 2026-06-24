import { ABOUT } from '@/data/content';
import { Icon } from '../ui/Icon';
import { revealDelay } from '@/lib/reveal';
import { italicizeSpecies } from '@/lib/sciName';
import styles from './About.module.css';

export function About() {
  return (
    <section className={styles.section} id="proyecto">
      <div className={styles.grid}>
        <div className={styles.text} data-reveal>
          <span className="eyebrow">{ABOUT.eyebrow}</span>
          <h2 className={styles.title}>{ABOUT.title}</h2>
          {ABOUT.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className={styles.paragraph}>
              {italicizeSpecies(paragraph)}
            </p>
          ))}
        </div>

        <figure className={styles.figure} data-reveal style={revealDelay(1, 140)}>
          <div className={styles.figureGlow} aria-hidden="true" />
          <div className={styles.figureFrame}>
            <img src={ABOUT.image} alt={ABOUT.imageAlt} loading="lazy" />
            <figcaption>{italicizeSpecies(ABOUT.imageCaption)}</figcaption>
          </div>

          <div className={styles.badge}>
            <span className={styles.badgeIcon}>
              <Icon name={ABOUT.badge.icon} size={20} />
            </span>
            <span className={styles.badgeText}>
              <strong>{ABOUT.badge.value}</strong>
              {ABOUT.badge.label}
            </span>
          </div>
        </figure>
      </div>
    </section>
  );
}
