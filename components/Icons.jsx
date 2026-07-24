export function Icon({ name, size = 24, strokeWidth = 1.7 }) {
  const paths = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    chevron: <path d="m7 9 5 5 5-5" />,
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.8a2 2 0 0 1-.45 2.11L8.09 9.88a16 16 0 0 0 6 6l1.25-1.25a2 2 0 0 1 2.11-.45c.9.32 1.84.55 2.8.68A2 2 0 0 1 22 16.92Z" />
    ),
    whatsapp: (
      <>
        <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.45L3 20.5l1.55-5.2A8.5 8.5 0 1 1 21 11.5Z" />
        <path d="M8.1 8.2c.4 3.1 2.2 4.9 5.3 5.6" />
        <path d="M8.2 8.1c.35-.38.7-.43 1.02.02l.75 1.3c.18.32.05.58-.18.82l-.45.47" />
        <path d="M13.4 13.8c.4.05.85-.22 1.2-.5.25-.2.55-.13.8.05l1.05.78c.35.26.33.62.04.93-.45.47-.95.78-1.64.77" />
      </>
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.6 2.6L16.5 9" />
      </>
    ),
    fiscal: (
      <>
        <path d="M4 20h16" />
        <path d="M6 17V9h12v8" />
        <path d="M4 9 12 4l8 5" />
        <path d="M9 12v3M15 12v3" />
      </>
    ),
    laboral: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M3 12h18M10 12v2h4v-2" />
      </>
    ),
    contable: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 7h8M8 11h2M14 11h2M8 15h2M14 15h2" />
      </>
    ),
    juridico: (
      <>
        <path d="M12 3v18M5 6h14" />
        <path d="m5 6-3 7h6L5 6ZM19 6l-3 7h6l-3-7Z" />
        <path d="M8 21h8" />
      </>
    ),
    gestoria: (
      <>
        <path d="M6 3h9l3 3v15H6Z" />
        <path d="M14 3v4h4M9 12h6M9 16h6" />
      </>
    ),
    agricultura: (
      <>
        <path d="M12 21V10" />
        <path d="M12 14c-4 0-7-2-7-6 4 0 7 2 7 6Z" />
        <path d="M12 18c4 0 7-2 7-6-4 0-7 2-7 6Z" />
      </>
    ),
    extranjeria: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" />
      </>
    )
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}
