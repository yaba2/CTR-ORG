import fs from 'fs';
import path from 'path';
import express from 'express';
import multer from 'multer';
import { requireAuth } from '../auth.js';

const uploadDir = path.join(process.cwd(), 'public', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase() || '.jpg';
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!String(file.mimetype || '').startsWith('image/')) {
      cb(new Error('Please upload an image file'));
      return;
    }
    cb(null, true);
  },
});

export function receiveFile(req, res, next) {
  upload.single('file')(req, res, (err) => {
    if (!err) {
      next();
      return;
    }
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(413).json({ error: 'Image is too large. Please use a file under 20 MB.' });
      return;
    }
    res.status(400).json({ error: err.message || 'Could not upload the image' });
  });
}

export function saveUploadedImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }
  res.json({ url: `/uploads/${req.file.filename}` });
}

export const uploadRouter = express.Router();
uploadRouter.post('/file', requireAuth, receiveFile, saveUploadedImage);
