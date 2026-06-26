export const dynamic = 'force-dynamic';

import HeroSection from '@/components/home/HeroSection';
import FeaturedBooks from '@/components/home/FeaturedBooks';

async function getHomeData() {
  try {
    const { prisma } = await import('@/lib/prisma');
    const featuredBooks = await prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
      take: 8,
    });
    return { featuredBooks };
  } catch {
    return { featuredBooks: [] };
  }
}

export default async function HomePage() {
  const { featuredBooks } = await getHomeData();

  return (
    <>
      <HeroSection />
      <FeaturedBooks books={featuredBooks as any} />
    </>
  );
}
