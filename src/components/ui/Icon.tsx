interface IconProps {
  readonly name: string;
  readonly size?: number;
}

/**
 * Conjunto reducido de iconos SVG en línea (sin dependencias externas).
 * Todos comparten el mismo viewBox y heredan el color con `currentColor`.
 */
const PATHS: Record<string, JSX.Element> = {
  leaf: (
    <path d="M11 20A7 7 0 0 1 4 13c0-5 5-9 16-9 0 8-5 13-12 13a7 7 0 0 1 .5-3M5 21c2-6 6-9 10-10" />
  ),
  wind: (
    <path d="M3 8h9a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h9a3 3 0 1 1-3 3" />
  ),
  recycle: (
    <path d="M7 19H4l2.5-4M17 19h3l-2-3.5M12 4l2 3.5M7 8 5 12l-2-3M14 7.5 17 6l-2-2M10 16.5 7 18l2 2M16 11l2 4 3-1" />
  ),
  sun: (
    <path d="M12 4V2M12 22v-2M5 12H2M22 12h-3M6 6 4.5 4.5M18 6l1.5-1.5M6 18l-1.5 1.5M18 18l1.5 1.5M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
  ),
  arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
};

export function Icon({ name, size = 24 }: IconProps) {
  const path = PATHS[name] ?? PATHS.leaf;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {path}
    </svg>
  );
}
