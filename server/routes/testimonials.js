import express from 'express';
import { prisma } from '../prisma.js';
import { requireAuth } from '../auth.js';

export const testimonialsRouter = express.Router();
testimonialsRouter.use(requireAuth);

testimonialsRouter.get('/', async (_req, res) => {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { sortOrder: 'asc' } });
  res.json(testimonials);
});

testimonialsRouter.post('/', async (req, res) => {
  const { name, role, text, rating, sortOrder } = req.body || {};
  if (!name || !text) return res.status(400).json({ error: 'Name and quote are required' });

  const count = await prisma.testimonial.count();
  const testimonial = await prisma.testimonial.create({
    data: {
      name,
      role: role || '',
      text,
      rating: Number(rating) || 5,
      sortOrder: sortOrder ?? count,
    },
  });
  res.status(201).json(testimonial);
});

testimonialsRouter.put('/:id', async (req, res) => {
  const { name, role, text, rating, sortOrder } = req.body || {};
  const testimonial = await prisma.testimonial.update({
    where: { id: req.params.id },
    data: {
      ...(name !== undefined ? { name } : {}),
      ...(role !== undefined ? { role } : {}),
      ...(text !== undefined ? { text } : {}),
      ...(rating !== undefined ? { rating: Number(rating) } : {}),
      ...(sortOrder !== undefined ? { sortOrder: Number(sortOrder) } : {}),
    },
  });
  res.json(testimonial);
});

testimonialsRouter.delete('/:id', async (req, res) => {
  await prisma.testimonial.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
});
