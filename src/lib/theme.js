export const FONT_OPTIONS = [
  { id: 'Inter', css: "'Inter', system-ui, sans-serif", google: 'Inter:wght@300;400;500;600;700' },
  { id: 'Open Sans', css: "'Open Sans', system-ui, sans-serif", google: 'Open+Sans:wght@400;500;600;700' },
  { id: 'Roboto', css: "'Roboto', system-ui, sans-serif", google: 'Roboto:wght@400;500;700' },
  { id: 'Poppins', css: "'Poppins', system-ui, sans-serif", google: 'Poppins:wght@400;500;600;700' },
  { id: 'Lato', css: "'Lato', system-ui, sans-serif", google: 'Lato:wght@400;700' },
  { id: 'Georgia', css: "Georgia, 'Times New Roman', serif", google: null },
  { id: 'Playfair Display', css: "'Playfair Display', Georgia, serif", google: 'Playfair+Display:wght@600;700' },
  { id: 'Merriweather', css: "'Merriweather', Georgia, serif", google: 'Merriweather:wght@400;700' },
  { id: 'Lora', css: "'Lora', Georgia, serif", google: 'Lora:wght@500;600;700' },
  { id: 'Libre Baskerville', css: "'Libre Baskerville', Georgia, serif", google: 'Libre+Baskerville:wght@400;700' },
];

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbToHex({ r, g, b }) {
  return `#${[r, g, b]
    .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0'))
    .join('')}`;
}

function mix(hex, target, amount) {
  const a = hexToRgb(hex);
  const b = hexToRgb(target);
  return rgbToHex({
    r: a.r + (b.r - a.r) * amount,
    g: a.g + (b.g - a.g) * amount,
    b: a.b + (b.b - a.b) * amount,
  });
}

function fontCss(id) {
  return FONT_OPTIONS.find((font) => font.id === id)?.css || `'${id}', sans-serif`;
}

export function applyTheme(settings) {
  if (!settings || typeof document === 'undefined') return;

  const root = document.documentElement;
  const primary = settings.primaryColor || '#1a2846';
  const text = settings.textColor || primary;
  const accent = settings.accentColor || '#e5a830';

  const navy = {
    50: mix(primary, '#ffffff', 0.92),
    100: mix(primary, '#ffffff', 0.82),
    200: mix(primary, '#ffffff', 0.68),
    300: mix(primary, '#ffffff', 0.52),
    400: mix(primary, '#ffffff', 0.35),
    500: mix(primary, '#ffffff', 0.12),
    600: mix(primary, '#000000', 0.12),
    700: mix(primary, '#000000', 0.28),
    800: primary,
    900: mix(primary, '#000000', 0.4),
    950: mix(primary, '#000000', 0.62),
  };

  const ink = {
    50: mix(text, '#ffffff', 0.92),
    100: mix(text, '#ffffff', 0.82),
    200: mix(text, '#ffffff', 0.68),
    300: mix(text, '#ffffff', 0.52),
    400: mix(text, '#ffffff', 0.35),
    500: mix(text, '#ffffff', 0.12),
    600: mix(text, '#000000', 0.12),
    700: mix(text, '#000000', 0.28),
    800: text,
    900: mix(text, '#000000', 0.4),
    950: mix(text, '#000000', 0.62),
  };

  const gold = {
    50: mix(accent, '#ffffff', 0.9),
    100: mix(accent, '#ffffff', 0.78),
    200: mix(accent, '#ffffff', 0.6),
    300: mix(accent, '#ffffff', 0.38),
    400: mix(accent, '#ffffff', 0.16),
    500: accent,
    600: mix(accent, '#000000', 0.18),
    700: mix(accent, '#000000', 0.36),
    800: mix(accent, '#000000', 0.52),
    900: mix(accent, '#000000', 0.7),
  };

  for (const [step, value] of Object.entries(navy)) {
    root.style.setProperty(`--color-navy-${step}`, value);
  }
  for (const [step, value] of Object.entries(ink)) {
    root.style.setProperty(`--color-ink-${step}`, value);
  }
  for (const [step, value] of Object.entries(gold)) {
    root.style.setProperty(`--color-gold-${step}`, value);
  }

  root.style.setProperty('--font-serif', fontCss(settings.headingFont));
  root.style.setProperty('--font-sans', fontCss(settings.bodyFont));

  const google = [settings.headingFont, settings.bodyFont]
    .map((id) => FONT_OPTIONS.find((font) => font.id === id)?.google)
    .filter(Boolean);

  const href = google.length
    ? `https://fonts.googleapis.com/css2?${google.map((f) => `family=${f}`).join('&')}&display=swap`
    : '';

  let link = document.getElementById('cms-fonts');
  if (href) {
    if (!link) {
      link = document.createElement('link');
      link.id = 'cms-fonts';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = href;
  }
}
