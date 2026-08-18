import express from 'express';
import multer from 'multer';
import { requireAuth } from '../auth.js';
import { storeImage } from '../storage.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!String(file.mimetype || '').startsWith('image/')) {
      cb(new Error('Please upload an image file'));
      return;
    }
    cb(null, true);
  },
});

function bufferFromJson(body = {}) {
  const data = String(body.data || '').replace(/^data:image\/[a-zA-Z0-9.+-]+;base64,/, '');
  if (!data) return null;
  return Buffer.from(data, 'base64');
}

export function receiveFile(req, res, next) {
  if (req.body?.data) {
    const buffer = bufferFromJson(req.body);
    if (!buffer?.length) {
      res.status(400).json({ error: 'No image uploaded' });
      return;
    }
    req.file = {
      originalname: req.body.filename || 'image.jpg',
      mimetype: req.body.mimeType || 'image/jpeg',
      buffer,
    };
    next();
    return;
  }

  upload.single('file')(req, res, (err) => {
    if (!err) {
      next();
      return;
    }
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(413).json({ error: 'Image is too large. Please use a file under 8 MB.' });
      return;
    }
    res.status(400).json({ error: err.message || 'Could not upload the image' });
  });
}

export async function saveUploadedImage(req, res) {
  try {
    const file = req.file;
    if (!file?.buffer?.length) {
      return res.status(400).json({ error: 'No image uploaded' });
    }
    const url = await storeImage({
      buffer: file.buffer,
      filename: file.originalname || req.body?.filename,
      mimeType: file.mimetype || req.body?.mimeType,
    });
    res.json({ url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Could not save the image' });
  }
}

export const uploadRouter = express.Router();
uploadRouter.post('/file', requireAuth, receiveFile, saveUploadedImage);
