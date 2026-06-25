import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: {
    default: 'BookStore – Your Online Library',
    template: '%s | BookStore',
  },
  description:
    'Discover thousands of books in English and Hebrew. Programming, fiction, science, children\'s books and more.',
  keywords: ['books', 'online bookstore', 'ebooks', 'Hebrew books', 'programming books'],
  openGraph: {
    type: 'website',
    title: 'BookStore',
    description: 'Your online library in English and Hebrew',
    siteName: 'BookStore',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // lang and dir are set dynamically by LanguageContext on the client
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
