import { FAQ } from '@/data/content';
import { SectionHeading } from '../ui/SectionHeading';
import { revealDelay } from '@/lib/reveal';
import styles from './Faq.module.css';

export function Faq() {
  return (
    <section className={styles.section} id="faq">
      <div className={styles.inner}>
        <SectionHeading
          align="center"
          eyebrow="Preguntas frecuentes"
          title={
            <>
              Lo que la gente suele <span className="accent-text">preguntar</span>
            </>
          }
        />

        <div className={styles.list}>
          {FAQ.map((item, i) => (
            <details
              key={item.question}
              className={styles.item}
              data-reveal
              style={revealDelay(i, 70)}
            >
              <summary className={styles.question}>
                {item.question}
                <span className={styles.chevron} aria-hidden="true" />
              </summary>
              <p className={styles.answer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
