import express from 'express';
import { prisma } from '../prisma.js';
import { requireAuth } from '../auth.js';

export const pagesRouter = express.Router();
pagesRouter.use(requireAuth);

pagesRouter.get('/', async (_req, res) => {
  const pages = await prisma.page.findMany({ orderBy: { title: 'asc' } });
  res.json(pages);
});

pagesRouter.get('/:slug', async (req, res) => {
  const page = await prisma.page.findUnique({ where: { slug: req.params.slug } });
  if (!page) return res.status(404).json({ error: 'Page not found' });
  res.json(page);
});

pagesRouter.put('/:slug', async (req, res) => {
  const { title, content } = req.body || {};
  const page = await prisma.page.update({
    where: { slug: req.params.slug },
    data: {
      ...(title !== undefined ? { title } : {}),
      ...(content !== undefined ? { content } : {}),
    },
  });
  res.json(page);
});
