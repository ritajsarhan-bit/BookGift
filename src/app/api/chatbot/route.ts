import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// POST /api/chatbot
export async function POST(req: NextRequest) {
  try {
    const { message, history = [], language = 'en' } = await req.json();

    // Fetch the available books so the AI can recommend real ones
    let books: any[] = [];
    try {
      books = await prisma.book.findMany({
        where: { published: true },
        select: {
          id: true,
          title: true,
          titleHe: true,
          author: true,
          language: true,
          price: true,
          discountPrice: true,
          rating: true,
          stock: true,
          category: { select: { name: true, nameHe: true } },
          description: true,
        },
        take: 50,
      });
    } catch {
      books = [];
    }

    const bookList = books
      .map(
        (b) =>
          `- "${b.title}"${b.titleHe ? ` / "${b.titleHe}"` : ''} by ${b.author} | ${b.category?.name} | $${b.discountPrice ?? b.price} | lang:${b.language} | rating:${b.rating} | stock:${b.stock > 0 ? 'available' : 'out of stock'} | id:${b.id}`
      )
      .join('\n');

    const systemPrompt = `You are a helpful BookGift assistant for an online BookGift that sells books in English and Hebrew.
You should help customers find books, make recommendations, and answer questions about the store.

Always be friendly, concise, and helpful. When recommending books, only recommend books from our actual catalog below.
If asked for a book we don't have, say so politely and suggest the closest match we do carry.

The user's preferred language is: ${language === 'he' ? 'Hebrew (עברית) — respond in Hebrew' : 'English — respond in English'}.

Our current book catalog:
${bookList}

When recommending books, include the title and mention the price.
Keep responses short (2-4 sentences) unless the user asks for detailed information.`;

    // Build conversation history for Claude
    const messages: Anthropic.MessageParam[] = [
      ...history.map((msg: any) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      { role: 'user', content: message },
    ];

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: systemPrompt,
      messages,
    });

    const reply = response.content[0].type === 'text' ? response.content[0].text : 'Sorry, I could not generate a response.';

    return NextResponse.json({ reply });
  } catch (err: any) {
    // Print the full error in the terminal so you can see what went wrong
    console.error('Chatbot error details:', err?.status, err?.message, err?.error);
    const msg = err?.status === 401
      ? 'Invalid API key. Check ANTHROPIC_API_KEY in your .env file.'
      : err?.status === 429
      ? 'Rate limit reached. Please wait a moment and try again.'
      : 'Sorry, the chat assistant is temporarily unavailable. Please try again.';
    return NextResponse.json({ reply: msg }, { status: 200 });
  }
}
