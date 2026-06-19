import { useCountUp } from '@/hooks/useCountUp';

interface CountUpProps {
  readonly value: number;
  readonly decimals?: number;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly className?: string;
}

/**
 * Muestra un número con conteo ascendente al entrar en pantalla,
 * con prefijo/sufijo opcionales (p. ej. "≈ ", " kg", "×").
 */
export function CountUp({ value, decimals = 0, prefix, suffix, className }: CountUpProps) {
  const { ref, text } = useCountUp(value, { decimals });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}
