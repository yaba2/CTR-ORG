import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { getSupabaseConfig } from './env.js';

const BUCKET = 'uploads';
const uploadDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'uploads');

function fileName(originalName = 'image.jpg') {
  const ext = path.extname(originalName).toLowerCase() || '.jpg';
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
}

function supabaseAdmin() {
  const { url, key, ready } = getSupabaseConfig();
  if (!ready) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

async function ensureBucket(client) {
  const { data } = await client.storage.getBucket(BUCKET);
  if (data) return;
  const { error } = await client.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: '8MB',
  });
  if (error && !String(error.message || '').toLowerCase().includes('already')) {
    throw error;
  }
}

export async function storeImage({ buffer, filename, mimeType }) {
  if (!buffer?.length) {
    throw new Error('No image uploaded');
  }

  const name = fileName(filename);
  const client = supabaseAdmin();

  if (client) {
    await ensureBucket(client);
    const { error } = await client.storage.from(BUCKET).upload(name, buffer, {
      contentType: mimeType || 'image/jpeg',
      upsert: false,
    });
    if (error) throw new Error(error.message || 'Could not store the image');
    const { data } = client.storage.from(BUCKET).getPublicUrl(name);
    return data.publicUrl;
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
