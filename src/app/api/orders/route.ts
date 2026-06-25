import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/orders — get current user's orders
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const orders = await prisma.order.findMany({
      where: { userId: (session.user as any).id },
      include: {
        items: { include: { book: { select: { id: true, title: true, coverImage: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST /api/orders — create a new order after payment
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { items, total, stripePaymentId, shippingAddress } = await req.json();

    const order = await prisma.order.create({
      data: {
        userId: (session.user as any).id,
        total,
        stripePaymentId,
        status: 'PAID',
        shippingAddress,
        items: {
          create: items.map((item: any) => ({
            bookId: item.bookId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    });

    // Decrement stock for each book ordered
    for (const item of items) {
      await prisma.book.update({
        where: { id: item.bookId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return NextResponse.json({ order }, { status: 201 });
  } catch (err) {
    console.error('POST /api/orders:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
