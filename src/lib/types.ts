// Shared domain types for the BookGift platform.

export type Genre =
  | "Fiction"
  | "Non-Fiction"
  | "Children"
  | "Poetry"
  | "Mystery"
  | "Romance"
  | "Science"
  | "Biography";

export interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  genre: Genre;
  rating: number; // 0 - 5
  reviewCount: number;
  pages: number;
  publishedYear: number;
  language: string;
  description: string;
  featured?: boolean;
  bestseller?: boolean;
}

export interface GiftWrap {
  id: string;
  name: string;
  price: number;
  color: string; // tailwind-friendly hex for swatch
  pattern?: string;
}

export interface GiftOptions {
  wrapId: string | null;
  ribbonColor: string | null;
  message: string;
  giftBox: boolean;
  recipientName?: string;
}

export interface CartItem {
  id: string; // unique line id
  book: Book;
  quantity: number;
  gift?: GiftOptions;
}

export interface Category {
  name: Genre;
  description: string;
  icon: string; // emoji placeholder until real iconography
}
