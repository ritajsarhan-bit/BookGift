export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import HeroSection from '@/components/home/HeroSection';
import FeaturedBooks from '@/components/home/FeaturedBooks';
import CategoryGrid from '@/components/home/CategoryGrid';

export default async function HomePage() {
  let featuredBooks: any[] = [];
  let categories: any[] = [];

  try {
    [featuredBooks, categories] = await Promise.all([
      prisma.book.findMany({
        where: { featured: true, published: true },
        include: { category: true },
        orderBy: { createdAt: 'desc' },
        take: 8,
      }),
      prisma.category.findMany({
        include: { _count: { select: { books: true } } },
        orderBy: { name: 'asc' },
      }),
    ]);
  } catch (err) {
    console.error('Homepage DB error:', err);
  }

  return (
    <>
      <HeroSection />
      <FeaturedBooks books={featuredBooks} />
      <CategoryGrid categories={categories} />
    </>
  );
}
