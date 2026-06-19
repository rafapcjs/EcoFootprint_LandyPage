import { HERO } from '@/data/content';
import { Icon } from '../ui/Icon';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.bgVideoWrap} aria-hidden="true">
        <video
          className={styles.bgVideo}
          src="/media/proceso-2.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="/media/biorreactores-garrafa.jpeg"
        />
        <div className={styles.overlay} />
        <span className={`orb ${styles.orbA}`} />
        <span className={`orb ${styles.orbB}`} />
        <div className={styles.grain} />
      </div>

      <div className={styles.content}>
        <span className={styles.badge}>
          <span className={styles.pulse} />
          Cultivo activo en laboratorio
        </span>

        <span className={styles.eyebrow}>{HERO.eyebrow}</span>
        <h1 className={styles.title}>
          {HERO.title} <span className="accent-text">{HERO.titleAccent}</span>
        </h1>
        <p className={styles.subtitle}>{HERO.subtitle}</p>

        <div className={styles.actions}>
          <a href="#proceso" className={styles.primary}>
            {HERO.primaryCta}
            <Icon name="arrowDown" size={18} />
          </a>
          <a href="#galeria" className={styles.secondary}>
            {HERO.secondaryCta}
          </a>
        </div>

        <div className={styles.chip}>
          <span className={styles.chipIcon}>
            <Icon name="leaf" size={20} />
          </span>
          <span className={styles.chipText}>
            <strong>{HERO.chip.title}</strong>
            {HERO.chip.subtitle}
          </span>
        </div>
      </div>

      <a href="#proyecto" className={styles.scrollHint} aria-label="Bajar al contenido">
        <span className={styles.mouse}>
          <span className={styles.wheel} />
        </span>
      </a>
    </section>
  );
}
