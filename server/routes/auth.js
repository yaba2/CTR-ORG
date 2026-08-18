import express from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../prisma.js';
import { signToken, setAuthCookie, clearAuthCookie, requireAuth } from '../auth.js';
import { receiveFile, saveUploadedImage } from './upload.js';

export const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  setAuthCookie(res, signToken(user));
  res.json({ id: user.id, email: user.email, name: user.name });
});

authRouter.post('/logout', (req, res) => {
  clearAuthCookie(res);
  res.json({ ok: true });
});

authRouter.get('/me', requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, email: true, name: true },
  });
  if (!user) return res.status(401).json({ error: 'User not found' });
  res.json(user);
});

authRouter.post('/upload', requireAuth, receiveFile, saveUploadedImage);
