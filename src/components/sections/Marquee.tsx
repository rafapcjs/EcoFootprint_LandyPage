import { MARQUEE } from '@/data/content';
import { italicizeSpecies } from '@/lib/sciName';
import styles from './Marquee.module.css';

export function Marquee() {
  // Duplicamos la lista para que el desplazamiento sea continuo (loop sin saltos).
  const items = [...MARQUEE, ...MARQUEE];

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.track}>
        {items.map((word, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.dot} />
            {italicizeSpecies(word)}
          </span>
        ))}
      </div>
    </div>
  );
}
