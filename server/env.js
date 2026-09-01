function clean(value) {
  return String(value || '')
    .trim()
    .replace(/^["']|["']$/g, '');
}

function readEnv(names) {
  for (const name of names) {
    const value = clean(process.env[name]);
    if (value) return value;
  }

  const wanted = names.map((name) => name.replace(/[^A-Z0-9]/gi, '').toUpperCase());
  for (const [key, value] of Object.entries(process.env)) {
    if (!wanted.includes(key.replace(/[^A-Z0-9]/gi, '').toUpperCase())) continue;
    const cleaned = clean(value);
    if (cleaned) return cleaned;
  }
  return '';
}

function urlFromDatabase() {
  const databaseUrl = clean(process.env.DATABASE_URL || process.env.DIRECT_URL);
  const match = databaseUrl.match(/postgres\.([a-z0-9]+)/i);
  if (!match) return '';
  return `https://${match[1]}.supabase.co`;
}

export function normalizeSupabaseUrl(raw) {
  const value = clean(raw);
  if (!value || /^(postgres(ql)?|prisma)/i.test(value)) return '';
  try {
    const parsed = new URL(value);
    if (!parsed.hostname) return '';
    return `${parsed.protocol}//${parsed.host}`;
  } catch {
    return '';
  }
}

export function getSupabaseConfig() {
  const url = normalizeSupabaseUrl(
    readEnv(['SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_URL', 'VITE_SUPABASE_URL']) || urlFromDatabase()
  );
  const key = readEnv([
    'SUPABASE_SERVICE_ROLE_KEY',
    'SUPABASE_SERVICE_ROLE',
    'SUPABASE_SERVICE_KEY',
    'SUPABASE_SECRET_KEY',
  ]);

  return {
    url,
    key,
    hasUrl: Boolean(url),
    hasKey: Boolean(key),
    ready: Boolean(url && key),
  };
}
