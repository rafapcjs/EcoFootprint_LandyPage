import { useCallback, useEffect, useState } from 'react';
import { GALLERY, type MediaItem } from '@/data/content';
import { SectionHeading } from '../ui/SectionHeading';
import { revealDelay } from '@/lib/reveal';
import styles from './Gallery.module.css';

/**
 * Tamaño de cada celda en el mosaico (collage), por orden de aparición.
 * Las imágenes verticales reciben celdas "tall" y los videos celdas "wide"
 * para que el recorte sea natural.
 */
const LAYOUT = ['big', 'tall', 'tall', 'normal', 'wide', 'normal'] as const;

export function Gallery() {
  const [active, setActive] = useState<MediaItem | null>(null);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [active, close]);

  return (
    <section className={styles.section} id="galeria">
      <div className={styles.inner}>
        <SectionHeading
          eyebrow="Galería"
          title={
            <>
              El proyecto en <span className="accent-text">imágenes</span>
            </>
          }
          lead="Del microscopio al biorreactor: así se ve la captura de CO₂ en marcha."
        />

        <div className={styles.grid}>
          {GALLERY.map((item, i) => (
            <button
              key={item.src}
              className={`${styles.tile} ${styles[LAYOUT[i % LAYOUT.length]]}`}
              onClick={() => setActive(item)}
              aria-label={`Ampliar: ${item.caption}`}
              data-reveal
              style={revealDelay(i, 80)}
            >
              {item.type === 'image' ? (
                <img src={item.src} alt={item.alt} loading="lazy" />
              ) : (
                <video src={item.src} muted loop playsInline preload="metadata" />
              )}
              <span className={styles.tileCaption}>
                {item.type === 'video' && <span className={styles.playDot}>▶</span>}
                {item.caption}
              </span>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          onClick={close}
        >
          <button className={styles.close} aria-label="Cerrar" onClick={close}>
            ✕
          </button>
          <figure className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
            {active.type === 'image' ? (
              <img src={active.src} alt={active.alt} />
            ) : (
              <video src={active.src} controls autoPlay loop playsInline muted />
            )}
            <figcaption>{active.caption}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
