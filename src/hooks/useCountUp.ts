import { useEffect, useRef, useState } from 'react';

interface CountUpOptions {
  readonly duration?: number;
  readonly decimals?: number;
}

/**
 * Anima un número desde 0 hasta `target` con easing, pero solo cuando el
 * elemento referenciado entra en el viewport (una sola vez).
 *
 * Devuelve `{ ref, text }`: asigna `ref` al nodo a observar y pinta `text`.
 * Respeta `prefers-reduced-motion` mostrando el valor final de inmediato.
 */
export function useCountUp(target: number, { duration = 1600, decimals = 0 }: CountUpOptions = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      setValue(target);
      return;
    }

    let frame = 0;
    let startTime: number | undefined;

    const animate = (now: number) => {
      startTime ??= now;
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          frame = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  // Formato español: coma como separador decimal.
  const text = value.toFixed(decimals).replace('.', ',');
  return { ref, text };
}
