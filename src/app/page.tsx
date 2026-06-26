export const dynamic = 'force-dynamic';

import HeroSection from '@/components/home/HeroSection';
import FeaturedBooks from '@/components/home/FeaturedBooks';

async function getHomeData() {
  try {
    const { prisma } = await import('@/lib/prisma');
    const rawBooks = await prisma.$queryRawUnsafe(
      `SELECT id, title, author, description, price, stock, category, language, image_url FROM books ORDER BY created_at DESC LIMIT 8`
    ) as any[];

    const featuredBooks = rawBooks.map((b: any) => ({
      id: b.id,
      title: b.title,
      author: b.author,
      price: Number(b.price),
      discountPrice: null,
      coverImage: b.image_url || null,
      stock: b.stock ?? 10,
      rating: 4.5,
      reviewCount: 0,
      language: b.language || 'en',
      category: b.category ? { name: b.category } : null,
    }));

    return { featuredBooks };
  } catch (e: any) {
    console.error('Homepage error:', e?.message);
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
