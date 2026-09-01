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
  'image/heic': 'heic',
  'image/heif': 'heif',
};

function extensionFor(filename = '', mimeType = '') {
  const fromMime = MIME_EXT[String(mimeType || '').toLowerCase()];
  if (fromMime) return fromMime === 'jpeg' ? 'jpg' : fromMime;
  const match = String(filename).toLowerCase().match(/\.([a-z0-9]{2,4})$/);
  if (match && ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'svg', 'heic', 'heif'].includes(match[1])) {
    return match[1] === 'jpeg' ? 'jpg' : match[1];
  }
  return 'jpg';
}

function objectKey(filename, mimeType) {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${extensionFor(filename, mimeType)}`;
}

function toBytes(buffer) {
  if (buffer instanceof Uint8Array && !(buffer instanceof Buffer)) return buffer;
  return Uint8Array.from(buffer);
}

function isMissingBucket(error) {
  const text = `${error?.message || ''} ${error?.error || ''} ${error?.statusCode || ''}`.toLowerCase();
  return text.includes('bucket') && (text.includes('not found') || text.includes('does not exist'));
}

function supabaseAdmin() {
  const { url, key, ready } = getSupabaseConfig();
  if (!ready) return null;
  return {
    origin: url,
    client: createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }),
  };
}

async function ensurePublicBucket(client) {
  const { error } = await client.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: 8388608,
  });
  if (!error) return;
  const message = String(error.message || '').toLowerCase();
  if (message.includes('already') || message.includes('exists')) return;
  throw new Error(error.message || 'Could not create the uploads folder');
}

async function uploadObject(client, name, bytes, mimeType) {
  return client.storage.from(BUCKET).upload(name, bytes, {
    contentType: mimeType || 'image/jpeg',
    upsert: true,
  });
}

export async function storeImage({ buffer, filename, mimeType }) {
  if (!buffer?.length) {
    throw new Error('No image uploaded');
  }

  const name = objectKey(filename, mimeType);
  const storage = supabaseAdmin();

  if (storage) {
    const bytes = toBytes(buffer);
    let { error } = await uploadObject(storage.client, name, bytes, mimeType);
    if (error && isMissingBucket(error)) {
      await ensurePublicBucket(storage.client);
      ({ error } = await uploadObject(storage.client, name, bytes, mimeType));
    }
    if (error) {
      const detail = error.message || error.error || error.statusCode || 'Could not store the image';
      throw new Error(String(detail));
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
