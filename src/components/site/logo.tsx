/**
 * IREX Mining Logo — Premium SVG logo
 * Hexagonal mining coin with embedded "I" monogram and pickaxe motif
 */

type LogoProps = {
  className?: string;
  size?: number;
  variant?: "full" | "mark" | "light";
};

export function Logo({ className = "", size = 40, variant = "full" }: LogoProps) {
  if (variant === "mark") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="IREX Mining logo"
      >
        <defs>
          <linearGradient id="irex-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5c842" />
            <stop offset="50%" stopColor="#d4a547" />
            <stop offset="100%" stopColor="#b8612c" />
          </linearGradient>
          <linearGradient id="irex-shine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff7e0" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d4a547" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Hexagon outline */}
        <path
          d="M50 4 L88 25 L88 75 L50 96 L12 75 L12 25 Z"
          fill="url(#irex-gold)"
          stroke="#8b5a1f"
          strokeWidth="1.5"
        />
        {/* Inner hexagon cut */}
        <path
          d="M50 12 L80 28 L80 72 L50 88 L20 72 L20 28 Z"
          fill="#0a0a0b"
        />
        {/* Shine overlay */}
        <path
          d="M50 12 L80 28 L80 50 L50 50 L20 50 L20 28 Z"
          fill="url(#irex-shine)"
          opacity="0.3"
        />
        {/* I monogram */}
        <text
          x="50"
          y="60"
          textAnchor="middle"
          fontFamily="Playfair Display, serif"
          fontSize="36"
          fontWeight="700"
          fill="url(#irex-gold)"
        >
          I
        </text>
        {/* Pickaxe accent below */}
        <path
          d="M35 70 L65 70"
          stroke="url(#irex-gold)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width={variant === "light" ? size * 2.8 : size * 2.8}
      height={size}
      viewBox="0 0 280 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="IREX Mining logo"
    >
      <defs>
        <linearGradient id="irex-gold-full" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5c842" />
          <stop offset="50%" stopColor="#d4a547" />
          <stop offset="100%" stopColor="#b8612c" />
        </linearGradient>
        <linearGradient id="irex-shine-full" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff7e0" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#d4a547" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Hexagon mark */}
      <g>
        <path
          d="M50 8 L86 28 L86 72 L50 92 L14 72 L14 28 Z"
          fill="url(#irex-gold-full)"
          stroke="#8b5a1f"
          strokeWidth="1.5"
        />
        <path
          d="M50 14 L80 30 L80 70 L50 86 L20 70 L20 30 Z"
          fill="#0a0a0b"
        />
        <path
          d="M50 14 L80 30 L80 50 L50 50 L20 50 L20 30 Z"
          fill="url(#irex-shine-full)"
          opacity="0.3"
        />
        <text
          x="50"
          y="58"
          textAnchor="middle"
          fontFamily="Playfair Display, serif"
          fontSize="32"
          fontWeight="700"
          fill="url(#irex-gold-full)"
        >
          I
        </text>
        <path
          d="M35 68 L65 68"
          stroke="url(#irex-gold-full)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>

      {/* Wordmark */}
      <text
        x="110"
        y="48"
        fontFamily="Playfair Display, serif"
        fontSize="26"
        fontWeight="700"
        letterSpacing="2"
        fill="#faf7f0"
      >
        IREX
      </text>
      <text
        x="110"
        y="70"
        fontFamily="Inter, sans-serif"
        fontSize="9"
        fontWeight="500"
        letterSpacing="6"
        fill="#d4a547"
      >
        MINING
      </text>
    </svg>
  );
}
