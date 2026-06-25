import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/wishlist
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const wishlist = await prisma.wishlist.findMany({
    where: { userId: (session.user as any).id },
    include: { book: { include: { category: true } } },
  });

  return NextResponse.json({ wishlist });
}

// POST /api/wishlist — toggle a book in/out of wishlist
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { bookId } = await req.json();
  const userId = (session.user as any).id;

  const existing = await prisma.wishlist.findUnique({
    where: { userId_bookId: { userId, bookId } },
  });

  if (existing) {
    await prisma.wishlist.delete({ where: { userId_bookId: { userId, bookId } } });
    return NextResponse.json({ added: false });
  }

  await prisma.wishlist.create({ data: { userId, bookId } });
  return NextResponse.json({ added: true });
}
