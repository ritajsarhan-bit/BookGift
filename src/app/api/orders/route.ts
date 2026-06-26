import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const userId = (session.user as any).id;
    const orders = await prisma.$queryRawUnsafe(`
      SELECT o.id, o.status, o.total, o."createdAt",
             o.is_gift, o.gift_wrapping, o.gift_message,
             o.wrapping_style, o.wrapping_color, o.ribbon_color, o.gift_card_design,
             o."shippingAddress",
             json_agg(json_build_object(
               'id', oi.id,
               'quantity', oi.quantity,
               'price', oi.price,
               'book', json_build_object('id', b.id, 'title', b.title, 'image_url', b.image_url)
             )) as items
      FROM orders o
      LEFT JOIN order_items oi ON oi."orderId" = o.id
      LEFT JOIN books b ON b.id = oi."bookId"::uuid
      WHERE o."userId" = '${userId}'
      GROUP BY o.id
      ORDER BY o."createdAt" DESC
    `) as any[];

    return NextResponse.json({ orders });
  } catch (err) {
    console.error('GET /api/orders:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const {
      items, total, stripePaymentId, shippingAddress,
      isGift = false, giftWrapping = false, giftMessage,
      wrappingStyle, wrappingColor, ribbonColor, giftCardDesign,
    } = await req.json();

    const userId = (session.user as any).id;
    const safeAddress = JSON.stringify(shippingAddress).replace(/'/g, "''");
    const safePaymentId = (stripePaymentId || '').replace(/'/g, "''");
    const safeMessage = giftMessage ? giftMessage.replace(/'/g, "''") : null;
    const safeStyle = wrappingStyle ? wrappingStyle.replace(/'/g, "''") : null;
    const safeColor = wrappingColor ? wrappingColor.replace(/'/g, "''") : null;
    const safeRibbon = ribbonColor ? ribbonColor.replace(/'/g, "''") : null;
    const safeCard = giftCardDesign ? giftCardDesign.replace(/'/g, "''") : null;

    const orderRows = await prisma.$queryRawUnsafe(`
      INSERT INTO orders (
        "userId", total, "stripePaymentId", status, "shippingAddress",
        is_gift, gift_wrapping, gift_message,
        wrapping_style, wrapping_color, ribbon_color, gift_card_design,
        "createdAt", "updatedAt"
      ) VALUES (
        '${userId}', ${total}, '${safePaymentId}', 'PAID', '${safeAddress}'::jsonb,
        ${isGift}, ${giftWrapping},
        ${safeMessage ? `'${safeMessage}'` : 'NULL'},
        ${safeStyle ? `'${safeStyle}'` : 'NULL'},
        ${safeColor ? `'${safeColor}'` : 'NULL'},
        ${safeRibbon ? `'${safeRibbon}'` : 'NULL'},
        ${safeCard ? `'${safeCard}'` : 'NULL'},
        now(), now()
      ) RETURNING id, status, total, "createdAt", is_gift, gift_wrapping, gift_message,
        wrapping_style, wrapping_color, ribbon_color, gift_card_design
    `) as any[];

    const order = orderRows[0];

    // Insert order items
    for (const item of items) {
      const bookId = item.bookId.replace(/'/g, "''");
      await prisma.$queryRawUnsafe(`
        INSERT INTO order_items ("orderId", "bookId", quantity, price)
        VALUES ('${order.id}', '${bookId}'::uuid, ${item.quantity}, ${item.price})
      `);

      // Decrement stock
      await prisma.$queryRawUnsafe(`
        UPDATE books SET stock = GREATEST(0, stock - ${item.quantity}) WHERE id = '${bookId}'::uuid
      `);
    }

    return NextResponse.json({ order }, { status: 201 });
  } catch (err) {
    console.error('POST /api/orders:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
