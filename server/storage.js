import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { getSupabaseConfig } from './env.js';

const BUCKET = 'uploads';
const uploadDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'uploads');

const MIME_EXT = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/pjpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/avif': 'avif',
  'image/svg+xml': 'svg',
};

function extensionFor(filename = '', mimeType = '') {
  const fromMime = MIME_EXT[String(mimeType || '').toLowerCase()];
  if (fromMime) return fromMime;
  const match = String(filename).toLowerCase().match(/\.([a-z0-9]{2,4})$/);
  if (match && ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'svg'].includes(match[1])) {
    return match[1] === 'jpeg' ? 'jpg' : match[1];
  }
  return 'jpg';
}

function objectKey(filename, mimeType) {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${extensionFor(filename, mimeType)}`;
}

function supabaseAdmin() {
  const { url, key, ready } = getSupabaseConfig();
  if (!ready) return null;
  return {
    origin: url,
    client: createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }),
  };
}

export async function storeImage({ buffer, filename, mimeType }) {
  if (!buffer?.length) {
    throw new Error('No image uploaded');
  }

  const name = objectKey(filename, mimeType);
  const storage = supabaseAdmin();

  if (storage) {
    const { error } = await storage.client.storage.from(BUCKET).upload(name, buffer, {
      contentType: mimeType || 'image/jpeg',
      upsert: false,
    });
    if (error) {
      throw new Error(error.message || 'Could not store the image');
    }
    return `${storage.origin}/storage/v1/object/public/${BUCKET}/${name}`;
  }

  if (process.env.VERCEL) {
    const { hasUrl, hasKey } = getSupabaseConfig();
    const missing = [!hasUrl && 'SUPABASE_URL', !hasKey && 'SUPABASE_SERVICE_ROLE_KEY'].filter(Boolean);
    throw new Error(
      `Image storage is not configured. Missing on Vercel: ${missing.join(' and ')}. Set them for Production, then Redeploy without build cache.`
    );
  }

  fs.mkdirSync(uploadDir, { recursive: true });
  fs.writeFileSync(path.join(uploadDir, name), buffer);
  return `/uploads/${name}`;
}
