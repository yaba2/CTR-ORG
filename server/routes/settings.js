import express from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../prisma.js';
import { requireAuth } from '../auth.js';

export const settingsRouter = express.Router();
settingsRouter.use(requireAuth);

settingsRouter.get('/', async (_req, res) => {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 'default' } });
  res.json(settings);
});

settingsRouter.put('/', async (req, res) => {
  const data = req.body || {};
  const allowed = [
    'siteName',
    'tagline',
    'footerText',
    'email',
    'phone',
    'address',
    'hours',
    'primaryColor',
    'textColor',
    'accentColor',
    'headingFont',
    'bodyFont',
  ];
  const update = {};
  for (const key of allowed) {
    if (data[key] !== undefined) update[key] = data[key];
  }

  const settings = await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update,
    create: {
      id: 'default',
      siteName: data.siteName || 'CTR',
      tagline: data.tagline || 'Center for Training & Research',
      footerText: data.footerText || '',
      email: data.email || '',
      phone: data.phone || '',
      address: data.address || '',
      hours: data.hours || '',
      primaryColor: data.primaryColor || '#1a2846',
      textColor: data.textColor || data.primaryColor || '#1a2846',
      accentColor: data.accentColor || '#e5a830',
      headingFont: data.headingFont || 'Georgia',
      bodyFont: data.bodyFont || 'Inter',
    },
  });
  res.json(settings);
});

settingsRouter.put('/password', async (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current and new password are required' });
  }
  if (String(newPassword).length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters' });
  }

  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
    return res.status(401).json({ error: 'Current password is incorrect' });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { password: await bcrypt.hash(newPassword, 12) },
  });
  res.json({ ok: true });
});
