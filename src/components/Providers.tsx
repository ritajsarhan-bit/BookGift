'use client';

/**
 * Wraps the app with all context providers.
 * Kept in a separate file because layout.tsx is a Server Component
 * but providers use client-side state.
 */
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatBot from '@/components/chatbot/ChatBot';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LanguageProvider>
        <CartProvider>
          {/* Toast notifications */}
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

          {/* Site header */}
          <Header />

          {/* Page content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <Footer />

          {/* AI floating chatbot */}
          <ChatBot />
        </CartProvider>
      </LanguageProvider>
    </SessionProvider>
  );
}
