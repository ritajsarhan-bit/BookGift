import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function mapBook(b: any) {
  return {
    id: b.id,
    title: b.title,
    author: b.author,
    description: b.description,
    price: Number(b.price),
    discountPrice: null,
    coverImage: b.image_url || null,
    stock: b.stock ?? 10,
    rating: 4.5,
    reviewCount: 0,
    language: b.language || 'en',
    category: b.category ? { name: b.category, nameHe: null, slug: b.category.toLowerCase().replace(/\s+/g, '-') } : null,
  };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const language = searchParams.get('lang') || '';
    const minPrice = parseFloat(searchParams.get('minPrice') || '0');
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '99999');
    const sort = searchParams.get('sort') || 'newest';
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const offset = (page - 1) * limit;

    let whereClause = `WHERE price >= ${minPrice} AND price <= ${maxPrice}`;
    if (search) whereClause += ` AND (LOWER(title) LIKE LOWER('%${search.replace(/'/g, "''")}%') OR LOWER(author) LIKE LOWER('%${search.replace(/'/g, "''")}%'))`;
    if (language) whereClause += ` AND language = '${language}'`;
    if (category) whereClause += ` AND LOWER(category) LIKE LOWER('%${category.replace(/'/g, "''")}%')`;

    const orderClause =
      sort === 'price_asc' ? 'ORDER BY price ASC'
      : sort === 'price_desc' ? 'ORDER BY price DESC'
      : 'ORDER BY created_at DESC';

    const books = await prisma.$queryRawUnsafe(`
      SELECT id, title, author, description, price, stock, category, language, image_url
      FROM books
      ${whereClause}
      ${orderClause}
      LIMIT ${limit} OFFSET ${offset}
    `) as any[];

    const countResult = await prisma.$queryRawUnsafe(`
      SELECT COUNT(*) as total FROM books ${whereClause}
    `) as any[];

    const total = Number(countResult[0]?.total || 0);

    return NextResponse.json({
      books: books.map(mapBook),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error('GET /api/books error:', err);
    return NextResponse.json({ books: [], total: 0, page: 1, totalPages: 1 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const book = await prisma.$queryRawUnsafe(`
      INSERT INTO books (title, author, description, price, stock, category, language, created_at, updated_at)
      VALUES ('${data.title}', '${data.author}', '${data.description}', ${data.price}, ${data.stock || 0}, '${data.category}', '${data.language || 'en'}', now(), now())
      RETURNING *
    `);
    return NextResponse.json({ book }, { status: 201 });
  } catch (err) {
    console.error('POST /api/books error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
