import { useEffect, useState } from 'react';
import { NAV_LINKS, SITE } from '@/data/content';
import { Icon } from '../ui/Icon';
import styles from './Navbar.module.css';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scrollspy: marca el enlace de la sección visible más relevante.
  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#top" aria-label={`${SITE.name} — inicio`}>
          <span className={styles.brandIcon}>
            <Icon name="leaf" size={20} />
          </span>
          {SITE.name}
        </a>

        <nav
          className={`${styles.nav} ${open ? styles.navOpen : ''}`}
          aria-label="Navegación principal"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`${styles.link} ${active === link.id ? styles.active : ''}`}
              aria-current={active === link.id ? 'true' : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="#vision" className={styles.cta} onClick={() => setOpen(false)}>
            Conoce más
          </a>
        </nav>

        <button
          className={styles.burger}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span data-open={open} />
        </button>
      </div>
    </header>
  );
}
