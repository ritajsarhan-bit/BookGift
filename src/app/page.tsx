export const dynamic = 'force-dynamic';

import HeroSection from '@/components/home/HeroSection';
import FeaturedBooks from '@/components/home/FeaturedBooks';
import CategoryGrid from '@/components/home/CategoryGrid';

async function getHomeData() {
  try {
    const { prisma } = await import('@/lib/prisma');
    const [featuredBooks, categories] = await Promise.all([
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
    return { featuredBooks, categories };
  } catch {
    return { featuredBooks: [], categories: [] };
  }
}

export default async function HomePage() {
  const { featuredBooks, categories } = await getHomeData();

  return (
    <>
      <HeroSection />
      <FeaturedBooks books={featuredBooks} />
      <CategoryGrid categories={categories} />
    </>
  );
}
