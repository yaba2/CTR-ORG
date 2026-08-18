import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import {
  defaultSettings,
  defaultPages,
  defaultTestimonials,
  defaultPosts,
} from '../../src/data/cmsDefaults.js';

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.ADMIN_EMAIL || 'admin@ctr.org').toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'Admin123!';
  const name = process.env.ADMIN_NAME || 'Site Admin';

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name,
      password: await bcrypt.hash(password, 12),
    },
  });

  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: { id: 'default', ...defaultSettings },
  });

  for (const [slug, page] of Object.entries(defaultPages)) {
    await prisma.page.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        title: page.title,
        content: page.content,
      },
    });
  }

  const home = await prisma.page.findUnique({ where: { slug: 'home' } });
  const homeContent = home?.content && typeof home.content === 'object' ? home.content : {};
  const storedImages = homeContent.grandOpening?.images;
  if (!Array.isArray(storedImages) || storedImages.length === 0) {
    await prisma.page.update({
      where: { slug: 'home' },
      data: {
        content: {
          ...homeContent,
          grandOpening: {
            ...homeContent.grandOpening,
            ...defaultPages.home.content.grandOpening,
            images: defaultPages.home.content.grandOpening.images,
          },
        },
      },
    });
  }

  if ((await prisma.testimonial.count()) === 0) {
    await prisma.testimonial.createMany({
      data: defaultTestimonials.map((item, index) => ({
        ...item,
        sortOrder: index,
      })),
    });
  }

  for (const post of defaultPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        ...post,
        published: true,
        publishedAt: new Date(post.publishedAt),
      },
    });
  }

  console.log('CMS seed complete.');
  console.log(`Admin login: ${email} / ${password}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
