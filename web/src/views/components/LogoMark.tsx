import { useId } from "react";

/** Logo "J." mordido. Mismo dibujo que public/logo.svg (de ahí salen los íconos). */
export function LogoMark({ className = "" }: { className?: string }) {
  const id = useId();
  const bite = `${id}-bite`;
  const card = `${id}-card`;
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <defs>
        <mask id={bite}>
          <rect width="64" height="64" fill="#fff" />
          <circle cx="57" cy="7" r="11" fill="#000" />
        </mask>
        <clipPath id={card}>
          <rect x="4" y="4" width="52" height="52" rx="12" />
        </clipPath>
      </defs>
      <g mask={`url(#${bite})`}>
        <rect x="8" y="8" width="52" height="52" rx="12" fill="var(--color-violeta)" />
        <rect x="4" y="4" width="52" height="52" rx="12" fill="var(--color-lima)" stroke="var(--color-tinta)" strokeWidth="3" />
      </g>
      <circle
        cx="57"
        cy="7"
        r="12.5"
        fill="none"
        stroke="var(--color-tinta)"
        strokeWidth="3"
        clipPath={`url(#${card})`}
        mask={`url(#${bite})`}
      />
      <path d="M24 14H42V38A12 12 0 0 1 18 38V34H27V38A3 3 0 0 0 33 38V21H24Z" fill="var(--color-tinta)" />
      <rect x="45" y="41" width="7" height="7" fill="var(--color-violeta)" />
    </svg>
  );
}
