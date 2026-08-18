import express from 'express';
import { prisma } from '../prisma.js';

export const publicRouter = express.Router();

publicRouter.get('/settings', async (_req, res) => {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 'default' } });
  res.json(settings);
});

publicRouter.get('/pages', async (_req, res) => {
  const pages = await prisma.page.findMany({ orderBy: { title: 'asc' } });
  res.json(pages);
});

publicRouter.get('/pages/:slug', async (req, res) => {
  const page = await prisma.page.findUnique({ where: { slug: req.params.slug } });
  if (!page) return res.status(404).json({ error: 'Page not found' });
  res.json(page);
});

publicRouter.get('/posts', async (_req, res) => {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
  });
  res.json(posts);
});

publicRouter.get('/posts/:slug', async (req, res) => {
  const post = await prisma.blogPost.findFirst({
    where: { slug: req.params.slug, published: true },
  });
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

publicRouter.get('/testimonials', async (_req, res) => {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { sortOrder: 'asc' },
  });
  res.json(testimonials);
});
