import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const orders = await prisma.$queryRawUnsafe(`
      SELECT o.id, o.status, o.total, o."createdAt",
             o.is_gift, o.gift_wrapping, o.gift_message,
             o.wrapping_style, o.wrapping_color, o.ribbon_color, o.gift_card_design,
             json_build_object('name', u.name, 'email', u.email) as user,
             json_agg(json_build_object(
               'quantity', oi.quantity,
               'price', oi.price,
               'book', json_build_object('title', b.title)
             )) as items
      FROM orders o
      LEFT JOIN users u ON u.id = o."userId"
      LEFT JOIN order_items oi ON oi."orderId" = o.id
      LEFT JOIN books b ON b.id = oi."bookId"::uuid
      GROUP BY o.id, u.name, u.email
      ORDER BY o."createdAt" DESC
    `) as any[];

    return NextResponse.json({ orders });
  } catch (err) {
    console.error('GET /api/admin/orders:', err);
    return NextResponse.json({ orders: [] });
  }
}
