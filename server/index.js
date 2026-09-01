import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/auth.js';
import { publicRouter } from './routes/public.js';
import { pagesRouter } from './routes/pages.js';
import { postsRouter } from './routes/posts.js';
import { settingsRouter } from './routes/settings.js';
import { testimonialsRouter } from './routes/testimonials.js';
import { uploadRouter } from './routes/upload.js';
import { getSupabaseConfig } from './env.js';

const app = express();
const port = Number(process.env.PORT) || 4000;

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];
if (process.env.SITE_URL) allowedOrigins.push(process.env.SITE_URL.replace(/\/$/, ''));
if (process.env.VERCEL_URL) allowedOrigins.push(`https://${process.env.VERCEL_URL}`);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    credentials: true,
  })
);
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.set('Pragma', 'no-cache');
  }
  next();
});
app.use(express.json({ limit: '25mb' }));
app.use(cookieParser());

app.get('/api/health', (_req, res) => {
  const storage = getSupabaseConfig();
  res.json({
    ok: true,
    storage: {
      hasUrl: storage.hasUrl,
      hasKey: storage.hasKey,
      ready: storage.ready,
    },
  });
});

app.use('/api/auth', authRouter);
app.use('/api/public', publicRouter);
app.use('/api/pages', pagesRouter);
app.use('/api/posts', postsRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/uploads', uploadRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  if (err.type === 'entity.too.large' || err.status === 413) {
    res.status(413).json({ error: 'Image is too large. Please use a smaller photo.' });
    return;
  }
  res.status(500).json({ error: err.message || 'Server error' });
});

export default app;

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`CMS API running on http://localhost:${port}`);
  });
}

