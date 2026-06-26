import { NAV_LINKS, PARTNERS, RESEARCH, SITE } from '@/data/content';
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

      <div className={styles.research}>
        <p className={styles.group}>{RESEARCH.group}</p>
        <span className={styles.seedbedsLabel}>{RESEARCH.seedbedsLabel}</span>
        <ul className={styles.seedbeds}>
          {RESEARCH.seedbeds.map((seedbed) => (
            <li key={seedbed.name} className={styles.seedbed}>
              <img src={seedbed.logo} alt={seedbed.alt} loading="lazy" />
              <span>{seedbed.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.partners}>
        <span className={styles.partnersLabel}>{PARTNERS.label}</span>
        <ul className={styles.partnerList}>
          {PARTNERS.items.map((partner) => (
            <li key={partner.name} className={styles.partner}>
              <img src={partner.logo} alt={partner.alt} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>

      <p className={styles.reference}>{SITE.reference}</p>

      <div className={styles.bottom}>
        <span>
          © {year} {SITE.name}. Proyecto de captura biológica de CO₂.
        </span>
        <span>Hecho con ciencia y microalgas 🌱</span>
      </div>
    </footer>
  );
}
