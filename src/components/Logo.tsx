
export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-bg" x1="0" y1="0" x2="120" y2="120">
          <stop offset="0%" stopColor="#0E1525" />
          <stop offset="100%" stopColor="#1A2540" />
        </linearGradient>
        <linearGradient id="logo-c" x1="22" y1="85" x2="70" y2="35">
          <stop offset="0%" stopColor="#B85636" />
          <stop offset="35%" stopColor="#DA7756" />
          <stop offset="100%" stopColor="#E8957A" />
        </linearGradient>
        <linearGradient id="logo-chev" x1="80" y1="70" x2="87" y2="36">
          <stop offset="0%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="26" fill="url(#logo-bg)" />
      <path
        d="M 70 35 A 30 30 0 1 0 70 85"
        stroke="url(#logo-c)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 76 69 L 87 39 L 98 69"
        stroke="url(#logo-chev)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
