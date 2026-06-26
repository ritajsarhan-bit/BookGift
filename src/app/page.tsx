export const dynamic = 'force-dynamic';

import HeroSection from '@/components/home/HeroSection';
import FeaturedBooks from '@/components/home/FeaturedBooks';

async function getHomeData() {
  try {
    const { prisma } = await import('@/lib/prisma');
    const rawBooks = await (prisma as any).book.findMany({
      orderBy: { created_at: 'desc' },
      take: 8,
    });

    const featuredBooks = rawBooks.map((b: any) => ({
      id: b.id,
      title: b.title,
      author: b.author,
      price: b.price,
      discountPrice: null,
      coverImage: b.image_url || null,
      stock: b.stock ?? 10,
      rating: 4.5,
      reviewCount: 0,
      language: b.language || 'en',
      category: b.category ? { name: b.category } : null,
    }));

    return { featuredBooks };
  } catch (e) {
    console.error('Homepage error:', e);
    return { featuredBooks: [] };
  }
}

export default async function HomePage() {
  const { featuredBooks } = await getHomeData();

  return (
    <>
      <HeroSection />
      <FeaturedBooks books={featuredBooks} />
    </>
  );
}
