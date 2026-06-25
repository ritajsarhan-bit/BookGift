"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { Book, CartItem, GiftOptions } from "@/lib/types";
import { makeId } from "@/lib/utils";
import { giftWraps } from "@/lib/data/books";

const STORAGE_KEY = "bookgift.cart.v1";
const FREE_SHIPPING_THRESHOLD = 35;
const SHIPPING_FLAT = 4.99;

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "HYDRATE"; items: CartItem[] }
  | { type: "ADD"; book: Book; quantity?: number; gift?: GiftOptions }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; quantity: number }
  | { type: "SET_GIFT"; id: string; gift: GiftOptions | undefined }
  | { type: "CLEAR" };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items };
    case "ADD": {
      // Plain (non-gift) lines for the same book stack; gift lines stay distinct.
      if (!action.gift) {
        const existing = state.items.find(
          (i) => i.book.id === action.book.id && !i.gift
        );
        if (existing) {
          return {
            items: state.items.map((i) =>
              i.id === existing.id
                ? { ...i, quantity: i.quantity + (action.quantity ?? 1) }
                : i
            ),
          };
        }
      }
      const item: CartItem = {
        id: makeId(),
        book: action.book,
        quantity: action.quantity ?? 1,
        gift: action.gift,
      };
      return { items: [...state.items, item] };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "SET_QTY":
      return {
        items: state.items.map((i) =>
          i.id === action.id
            ? { ...i, quantity: Math.max(1, action.quantity) }
            : i
        ),
      };
    case "SET_GIFT":
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, gift: action.gift } : i
        ),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

function giftPrice(gift?: GiftOptions): number {
  if (!gift) return 0;
  const wrap = giftWraps.find((w) => w.id === gift.wrapId);
  const wrapCost = wrap?.price ?? 0;
  const boxCost = gift.giftBox ? 6.0 : 0;
  return wrapCost + boxCost;
}

export function lineTotal(item: CartItem): number {
  return (item.book.price + giftPrice(item.gift)) * item.quantity;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  freeShippingThreshold: number;
  addItem: (book: Book, quantity?: number, gift?: GiftOptions) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  setGift: (id: string, gift: GiftOptions | undefined) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  // Hydrate from localStorage on mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const items = JSON.parse(raw) as CartItem[];
        dispatch({ type: "HYDRATE", items });
      }
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  // Persist on change.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* storage may be unavailable */
    }
  }, [state.items]);

  const value = useMemo<CartContextValue>(() => {
    const count = state.items.reduce((n, i) => n + i.quantity, 0);
    const subtotal = state.items.reduce((sum, i) => sum + lineTotal(i), 0);
    const shipping =
      subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
    return {
      items: state.items,
      count,
      subtotal,
      shipping,
      total: subtotal + shipping,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      addItem: (book, quantity, gift) =>
        dispatch({ type: "ADD", book, quantity, gift }),
      removeItem: (id) => dispatch({ type: "REMOVE", id }),
      setQuantity: (id, quantity) =>
        dispatch({ type: "SET_QTY", id, quantity }),
      setGift: (id, gift) => dispatch({ type: "SET_GIFT", id, gift }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
