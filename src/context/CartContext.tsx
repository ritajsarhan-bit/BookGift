'use client';

/**
 * Cart context — manages the shopping cart state in memory.
 * When a user is logged in, cart is also synced to the database.
 */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

export interface CartBook {
  id: string;
  title: string;
  author: string;
  price: number;
  discountPrice?: number | null;
  coverImage?: string | null;
  stock: number;
}

export interface CartItem {
  book: CartBook;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (book: CartBook) => void;
  removeItem: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on startup
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        // ignore corrupt data
      }
    }
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (book: CartBook) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.book.id === book.id);
      if (existing) {
        if (existing.quantity >= book.stock) {
          toast.error('No more stock available');
          return prev;
        }
        toast.success('Quantity updated!');
        return prev.map((i) =>
          i.book.id === book.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      toast.success('Added to cart!');
      return [...prev, { book, quantity: 1 }];
    });
  };

  const removeItem = (bookId: string) => {
    setItems((prev) => prev.filter((i) => i.book.id !== bookId));
    toast.success('Removed from cart');
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(bookId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.book.id === bookId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => {
    const price = i.book.discountPrice ?? i.book.price;
    return sum + price * i.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
