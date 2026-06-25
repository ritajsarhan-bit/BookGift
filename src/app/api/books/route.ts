import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/books — list books with optional filters
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const language = searchParams.get('lang') || '';
    const minPrice = parseFloat(searchParams.get('minPrice') || '0');
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '99999');
    const sort = searchParams.get('sort') || 'newest';
    const featured = searchParams.get('featured') === 'true';
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    const where: any = {
      published: true,
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { titleHe: { contains: search, mode: 'insensitive' } },
          { author: { contains: search, mode: 'insensitive' } },
          { isbn: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(category && { category: { slug: category } }),
      ...(language && { language }),
      ...(featured && { featured: true }),
      price: { gte: minPrice, lte: maxPrice },
    };

    const orderBy: any =
      sort === 'price_asc' ? { price: 'asc' }
      : sort === 'price_desc' ? { price: 'desc' }
      : sort === 'rating' ? { rating: 'desc' }
      : { createdAt: 'desc' };

    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where,
        orderBy,
        take: limit,
        skip,
        include: { category: { select: { name: true, nameHe: true, slug: true } } },
      }),
      prisma.book.count({ where }),
    ]);

    return NextResponse.json({ books, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error('GET /api/books error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST /api/books — admin only: create a book
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if ((session?.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await req.json();
    const book = await prisma.book.create({ data });
    return NextResponse.json({ book }, { status: 201 });
  } catch (err) {
    console.error('POST /api/books error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
