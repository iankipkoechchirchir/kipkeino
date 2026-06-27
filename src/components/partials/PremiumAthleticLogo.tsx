import React from 'react';

export function PremiumAthleticLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="landing-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" /> {/* Electric Crimson */}
          <stop offset="50%" stopColor="#f97316" /> {/* Fast Orange */}
          <stop offset="100%" stopColor="#f59e0b" /> {/* Aurum Gold */}
        </linearGradient>
      </defs>
      {/* Background card with subtle glowing shadow */}
      <rect width="100" height="100" rx="24" fill="#0c0c0e" stroke="#1f1f24" strokeWidth="2" />
      {/* Dynamic running lanes forming the abstract K */}
      <path 
        d="M32 22 L32 78 M32 50 L68 22 M32 50 L68 78" 
        stroke="url(#landing-grad)" 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Dynamic overlay curves representing track lanes & stadium architecture */}
      <path 
        d="M42 35 C42 35, 55 50, 42 65" 
        stroke="#ffffff" 
        strokeWidth="4" 
        strokeLinecap="round" 
        fill="none" 
        opacity="0.4" 
      />
      {/* Electronic start nodes */}
      <circle cx="32" cy="22" r="4.5" fill="#f59e0b" />
      <circle cx="32" cy="78" r="4.5" fill="#ef4444" />
      <circle cx="68" cy="22" r="4.5" fill="#f59e0b" />
      <circle cx="68" cy="78" r="4.5" fill="#ef4444" />
    </svg>
  );
}

export default PremiumAthleticLogo;
