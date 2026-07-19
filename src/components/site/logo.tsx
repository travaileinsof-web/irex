type LogoProps = {
  className?: string;
  size?: number;
  variant?: "full" | "mark" | "light";
};

export function Logo({ className = "", size = 40, variant = "full" }: LogoProps) {
  return (
    <img 
      src="/logo.png" 
      alt="IREX Mining logo" 
      className={className} 
      style={{ height: size, width: 'auto', objectFit: 'contain' }} 
    />
  );
}
