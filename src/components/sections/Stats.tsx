import { STATS } from '@/data/content';
import { Icon } from '../ui/Icon';
import { CountUp } from '../ui/CountUp';
import { revealDelay } from '@/lib/reveal';
import styles from './Stats.module.css';

export function Stats() {
  return (
    <section className={styles.section} aria-label="Cifras clave">
      <div className={styles.grid}>
        {STATS.map((stat, i) => (
          <article key={stat.label} className={styles.card} data-reveal style={revealDelay(i, 110)}>
            <span className={styles.icon}>
              <Icon name={stat.icon} size={22} />
            </span>
            <CountUp
              className={styles.value}
              value={stat.value}
              decimals={stat.decimals}
              prefix={stat.prefix}
              suffix={stat.suffix}
            />
            <span className={styles.label}>{stat.label}</span>
            <p className={styles.detail}>{stat.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
