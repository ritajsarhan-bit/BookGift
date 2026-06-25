// Database schema types for the BookGift Supabase project.
//
// These mirror the SQL in supabase/migrations. If you change the schema, keep
// this file in sync (or regenerate with:
//   npx supabase gen types typescript --project-id <id> > src/lib/supabase/database.types.ts
// once the Supabase CLI is linked to your project).

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type WrappingStyle =
  | "classic"
  | "rustic"
  | "elegant"
  | "festive"
  | "minimal";

export type OrderStatus =
  | "pending"
  | "paid"
  | "fulfilled"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      books: {
        Row: {
          id: string;
          title: string;
          author: string;
          description: string | null;
          price: number;
          stock: number;
          category: string | null;
          language: string;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          author: string;
          description?: string | null;
          price: number;
          stock?: number;
          category?: string | null;
          language?: string;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          author?: string;
          description?: string | null;
          price?: number;
          stock?: number;
          category?: string | null;
          language?: string;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      cart_items: {
        Row: {
          id: string;
          user_id: string;
          book_id: string;
          quantity: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          book_id: string;
          quantity?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          book_id?: string;
          quantity?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cart_items_book_id_fkey";
            columns: ["book_id"];
            referencedRelation: "books";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cart_items_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          status: OrderStatus;
          subtotal: number;
          shipping: number;
          total: number;
          shipping_name: string | null;
          shipping_email: string | null;
          shipping_address: string | null;
          shipping_city: string | null;
          shipping_postal_code: string | null;
          shipping_country: string | null;
          is_gift: boolean;
          gift_message: string | null;
          wrapping_style: WrappingStyle | null;
          wrapping_color: string | null;
          ribbon_color: string | null;
          gift_card_design: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          status?: OrderStatus;
          subtotal: number;
          shipping?: number;
          total: number;
          shipping_name?: string | null;
          shipping_email?: string | null;
          shipping_address?: string | null;
          shipping_city?: string | null;
          shipping_postal_code?: string | null;
          shipping_country?: string | null;
          is_gift?: boolean;
          gift_message?: string | null;
          wrapping_style?: WrappingStyle | null;
          wrapping_color?: string | null;
          ribbon_color?: string | null;
          gift_card_design?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          status?: OrderStatus;
          subtotal?: number;
          shipping?: number;
          total?: number;
          shipping_name?: string | null;
          shipping_email?: string | null;
          shipping_address?: string | null;
          shipping_city?: string | null;
          shipping_postal_code?: string | null;
          shipping_country?: string | null;
          is_gift?: boolean;
          gift_message?: string | null;
          wrapping_style?: WrappingStyle | null;
          wrapping_color?: string | null;
          ribbon_color?: string | null;
          gift_card_design?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          book_id: string | null;
          title: string;
          author: string;
          unit_price: number;
          quantity: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          book_id?: string | null;
          title: string;
          author: string;
          unit_price: number;
          quantity?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          book_id?: string | null;
          title?: string;
          author?: string;
          unit_price?: number;
          quantity?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_book_id_fkey";
            columns: ["book_id"];
            referencedRelation: "books";
            referencedColumns: ["id"];
          }
        ];
      };
      gift_customizations: {
        Row: {
          id: string;
          order_item_id: string;
          recipient_name: string | null;
          message: string | null;
          wrapping_style: WrappingStyle | null;
          wrapping_color: string | null;
          ribbon_color: string | null;
          gift_card_design: string | null;
          gift_box: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_item_id: string;
          recipient_name?: string | null;
          message?: string | null;
          wrapping_style?: WrappingStyle | null;
          wrapping_color?: string | null;
          ribbon_color?: string | null;
          gift_card_design?: string | null;
          gift_box?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_item_id?: string;
          recipient_name?: string | null;
          message?: string | null;
          wrapping_style?: WrappingStyle | null;
          wrapping_color?: string | null;
          ribbon_color?: string | null;
          gift_card_design?: string | null;
          gift_box?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "gift_customizations_order_item_id_fkey";
            columns: ["order_item_id"];
            referencedRelation: "order_items";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      order_status: OrderStatus;
      wrapping_style: WrappingStyle;
    };
    CompositeTypes: Record<string, never>;
  };
}

// Convenience row aliases.
export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
export type BookRow = Database["public"]["Tables"]["books"]["Row"];
export type CartItemRow = Database["public"]["Tables"]["cart_items"]["Row"];
export type OrderRow = Database["public"]["Tables"]["orders"]["Row"];
export type OrderItemRow = Database["public"]["Tables"]["order_items"]["Row"];
export type GiftCustomizationRow =
  Database["public"]["Tables"]["gift_customizations"]["Row"];
