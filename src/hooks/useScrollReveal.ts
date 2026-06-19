import { useEffect } from 'react';

/**
 * Observa todos los elementos con atributo [data-reveal] y les añade la clase
 * `is-visible` cuando entran en el viewport, disparando la animación de aparición
 * definida en index.css. Un único IntersectionObserver para toda la página.
 */
export function useScrollReveal() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    );

    // Si el navegador no soporta IntersectionObserver, mostramos todo sin animar.
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
