import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// POST /api/reviews — add or update a review
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { bookId, rating, comment } = await req.json();
  const userId = (session.user as any).id;

  if (!bookId || !rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Invalid review data' }, { status: 400 });
  }

  // Upsert: one review per user per book
  const review = await prisma.review.upsert({
    where: { userId_bookId: { userId, bookId } },
    update: { rating, comment },
    create: { userId, bookId, rating, comment },
  });

  // Recalculate the book's average rating
  const stats = await prisma.review.aggregate({
    where: { bookId },
    _avg: { rating: true },
    _count: { rating: true },
  });

  await prisma.book.update({
    where: { id: bookId },
    data: {
      rating: Math.round((stats._avg.rating ?? 0) * 10) / 10,
      reviewCount: stats._count.rating,
    },
  });

  return NextResponse.json({ review }, { status: 201 });
}
