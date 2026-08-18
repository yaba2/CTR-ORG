import express from 'express';
import { prisma } from '../prisma.js';
import { requireAuth } from '../auth.js';

export const postsRouter = express.Router();
postsRouter.use(requireAuth);

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function normalizeContent(content) {
  if (Array.isArray(content)) {
    return content.map((part) => String(part).trim()).filter(Boolean);
  }
  if (typeof content === 'string') {
    return content
      .split(/\n\s*\n/)
      .map((part) => part.trim())
      .filter(Boolean);
  }
  return [];
}

postsRouter.get('/', async (_req, res) => {
  const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: 'desc' } });
  res.json(posts);
});

postsRouter.get('/:id', async (req, res) => {
  const post = await prisma.blogPost.findUnique({ where: { id: req.params.id } });
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

postsRouter.post('/', async (req, res) => {
  const { title, slug, summary, content, featuredImage, published, publishedAt } = req.body || {};
  if (!title) return res.status(400).json({ error: 'Title is required' });

  try {
    const post = await prisma.blogPost.create({
      data: {
        title,
        slug: slugify(slug || title),
        summary: summary || '',
        content: normalizeContent(content),
        featuredImage: featuredImage || null,
        published: published !== false,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      },
    });
    res.status(201).json(post);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'A post with this slug already exists' });
    }
    throw error;
  }
});

postsRouter.put('/:id', async (req, res) => {
  const { title, slug, summary, content, featuredImage, published, publishedAt } = req.body || {};
  const post = await prisma.blogPost.update({
    where: { id: req.params.id },
    data: {
      ...(title !== undefined ? { title } : {}),
      ...(slug !== undefined ? { slug: slugify(slug) } : {}),
      ...(summary !== undefined ? { summary } : {}),
      ...(content !== undefined ? { content: normalizeContent(content) } : {}),
      ...(featuredImage !== undefined ? { featuredImage } : {}),
      ...(published !== undefined ? { published } : {}),
      ...(publishedAt !== undefined ? { publishedAt: new Date(publishedAt) } : {}),
    },
  });
  res.json(post);
});

postsRouter.delete('/:id', async (req, res) => {
  await prisma.blogPost.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
});
