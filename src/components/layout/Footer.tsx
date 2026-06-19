import { NAV_LINKS, SITE } from '@/data/content';
import { Icon } from '../ui/Icon';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <a className={styles.brand} href="#top">
            <span className={styles.brandIcon}>
              <Icon name="leaf" size={18} />
            </span>
            {SITE.name}
          </a>
          <p className={styles.tagline}>{SITE.tagline}</p>
        </div>

        <nav className={styles.links} aria-label="Pie de página">
          {NAV_LINKS.map((link) => (
            <a key={link.id} href={`#${link.id}`} className={styles.link}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className={styles.bottom}>
        <span>
          © {year} {SITE.name}. Proyecto de captura biológica de CO₂.
        </span>
        <span>Hecho con ciencia y microalgas 🌱</span>
      </div>
    </footer>
  );
}
