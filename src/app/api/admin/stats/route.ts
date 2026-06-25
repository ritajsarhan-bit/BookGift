import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/admin/stats — admin dashboard statistics
export async function GET() {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const [totalBooks, totalUsers, totalOrders, revenueData] = await Promise.all([
    prisma.book.count(),
    prisma.user.count({ where: { role: 'USER' } }),
    prisma.order.count({ where: { status: 'PAID' } }),
    prisma.order.aggregate({
      where: { status: 'PAID' },
      _sum: { total: true },
    }),
  ]);

  const recentOrders = await prisma.order.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { name: true, email: true } },
      items: { include: { book: { select: { title: true } } } },
    },
  });

  return NextResponse.json({
    totalBooks,
    totalUsers,
    totalOrders,
    revenue: revenueData._sum.total ?? 0,
    recentOrders,
  });
}
