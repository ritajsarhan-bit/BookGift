// BookGift App Constants and Configuration
// Central place for all app-wide constants, routes, and configuration values

// ─── APP CONFIG ───────────────────────────────────────────────────────────────

export const APP_CONFIG = {
  name: 'BookGift',
  tagline: 'Gift the perfect book, beautifully wrapped.',
  description: 'Discover thousands of books in English and Hebrew. Gift books with beautiful wrapping.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://bookgift-production.up.railway.app',
  email: 'contact@bookgift.com',
  supportEmail: 'support@bookgift.com',
  social: {
    twitter: 'https://twitter.com/bookgift',
    instagram: 'https://instagram.com/bookgift',
    facebook: 'https://facebook.com/bookgift',
  },
  currency: {
    usd: { symbol: '$', code: 'USD', locale: 'en-US' },
    ils: { symbol: '₪', code: 'ILS', locale: 'he-IL' },
  },
  defaultLanguage: 'en' as const,
  supportedLanguages: ['en', 'he'] as const,
  pagination: {
    defaultPageSize: 12,
    maxPageSize: 48,
    pageSizeOptions: [12, 24, 48],
  },
  search: {
    debounceMs: 300,
    minQueryLength: 2,
    maxResults: 100,
  },
  images: {
    bookCoverFallback: '/images/book-placeholder.png',
    avatarFallback: '/images/avatar-placeholder.png',
  },
} as const;

// ─── ROUTES ───────────────────────────────────────────────────────────────────

export const ROUTES = {
  home: '/',
  books: '/books',
  book: (id: string) => `/books/${id}`,
  cart: '/cart',
  checkout: '/checkout',
  orders: '/orders',
  order: (id: string) => `/orders/${id}`,
  wishlist: '/wishlist',
  profile: '/profile',
  login: '/login',
  register: '/register',
  about: '/about',
  contact: '/contact',
  privacy: '/privacy',
  admin: {
    dashboard: '/admin',
    books: '/admin/books',
    orders: '/admin/orders',
    users: '/admin/users',
    categories: '/admin/categories',
    newBook: '/admin/books/new',
    editBook: (id: string) => `/admin/books/${id}/edit`,
  },
  api: {
    chatbot: '/api/chatbot',
    register: '/api/auth/register',
    books: '/api/books',
    orders: '/api/orders',
    wishlist: '/api/wishlist',
    reviews: '/api/reviews',
  },
} as const;

// ─── CATEGORIES ───────────────────────────────────────────────────────────────

export const CATEGORIES = [
  { id: 'cat-1', name: 'Programming', nameHe: 'תכנות', slug: 'programming', icon: '💻', color: 'blue' },
  { id: 'cat-2', name: 'Fiction', nameHe: 'ספרות', slug: 'fiction', icon: '📖', color: 'purple' },
  { id: 'cat-3', name: 'Science', nameHe: 'מדע', slug: 'science', icon: '🔬', color: 'green' },
  { id: 'cat-4', name: 'Children', nameHe: 'ילדים', slug: 'children', icon: '🧸', color: 'yellow' },
  { id: 'cat-5', name: 'History', nameHe: 'היסטוריה', slug: 'history', icon: '🏛️', color: 'orange' },
  { id: 'cat-6', name: 'Self Help', nameHe: 'עזרה עצמית', slug: 'self-help', icon: '🌱', color: 'teal' },
  { id: 'cat-7', name: 'Hebrew Literature', nameHe: 'ספרות עברית', slug: 'hebrew-literature', icon: '✡️', color: 'indigo' },
  { id: 'cat-8', name: 'Business', nameHe: 'עסקים', slug: 'business', icon: '💼', color: 'gray' },
] as const;

// ─── SORT OPTIONS ─────────────────────────────────────────────────────────────

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First', labelHe: 'חדש ביותר' },
  { value: 'oldest', label: 'Oldest First', labelHe: 'ישן ביותר' },
  { value: 'price-asc', label: 'Price: Low to High', labelHe: 'מחיר: מהנמוך לגבוה' },
  { value: 'price-desc', label: 'Price: High to Low', labelHe: 'מחיר: מהגבוה לנמוך' },
  { value: 'rating', label: 'Highest Rated', labelHe: 'דירוג גבוה ביותר' },
  { value: 'title', label: 'Title A-Z', labelHe: 'כותרת א-ת' },
] as const;

// ─── ORDER STATUS ─────────────────────────────────────────────────────────────

export const ORDER_STATUS = {
  PENDING: { label: 'Pending', labelHe: 'ממתין', color: 'warning', icon: '⏳' },
  PAID: { label: 'Paid', labelHe: 'שולם', color: 'info', icon: '✅' },
  SHIPPED: { label: 'Shipped', labelHe: 'נשלח', color: 'info', icon: '📦' },
  DELIVERED: { label: 'Delivered', labelHe: 'נמסר', color: 'success', icon: '🎉' },
  CANCELLED: { label: 'Cancelled', labelHe: 'בוטל', color: 'danger', icon: '❌' },
} as const;

// ─── USER ROLES ───────────────────────────────────────────────────────────────

export const USER_ROLES = {
  USER: { label: 'User', labelHe: 'משתמש', permissions: ['read', 'cart', 'orders', 'reviews'] },
  ADMIN: { label: 'Admin', labelHe: 'מנהל', permissions: ['read', 'cart', 'orders', 'reviews', 'admin'] },
} as const;

// ─── SHIPPING ─────────────────────────────────────────────────────────────────

export const SHIPPING = {
  free: { threshold: 50, label: 'Free Shipping', labelHe: 'משלוח חינם', price: 0 },
  standard: { label: 'Standard Shipping', labelHe: 'משלוח רגיל', price: 4.99, days: '5-7 business days' },
  express: { label: 'Express Shipping', labelHe: 'משלוח מהיר', price: 12.99, days: '1-2 business days' },
} as const;

// ─── GIFT WRAPPING ────────────────────────────────────────────────────────────

export const GIFT_WRAPPING_STYLES = [
  { id: 'classic', name: 'Classic', nameHe: 'קלאסי', price: 3.99, emoji: '🎁', description: 'Traditional brown paper with ribbon' },
  { id: 'modern', name: 'Modern', nameHe: 'מודרני', price: 4.99, emoji: '✨', description: 'Sleek white with gold accents' },
  { id: 'festive', name: 'Festive', nameHe: 'חגיגי', price: 5.99, emoji: '🎊', description: 'Colorful with balloons and confetti pattern' },
  { id: 'minimal', name: 'Minimal', nameHe: 'מינימליסטי', price: 2.99, emoji: '🤍', description: 'Simple kraft paper with twine' },
] as const;

// ─── CHATBOT SUGGESTIONS ──────────────────────────────────────────────────────

export const CHATBOT_SUGGESTIONS = {
  en: [
    'Recommend a gift for my dad',
    'Best books for a 10-year-old',
    'Popular fiction novels',
    'Programming books for beginners',
    'Books about self-improvement',
    'Hebrew books available',
    'What are your bestsellers?',
    'Books under $20',
  ],
  he: [
    'המלץ על מתנה לאבא שלי',
    'ספרים טובים לילד בן 10',
    'רומנים פופולריים',
    'ספרי תכנות למתחילים',
    'ספרים על פיתוח עצמי',
    'ספרים בעברית זמינים',
    'מה הספרים הנמכרים ביותר?',
    'ספרים עד 80 שקל',
  ],
} as const;

// ─── VALIDATION ───────────────────────────────────────────────────────────────

export const VALIDATION = {
  email: { maxLength: 254, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  password: { minLength: 6, maxLength: 128 },
  name: { minLength: 2, maxLength: 100 },
  review: { minLength: 10, maxLength: 1000 },
  giftMessage: { maxLength: 500 },
  searchQuery: { maxLength: 200 },
  isbn: { pattern: /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)/ },
} as const;

// ─── ERROR MESSAGES ───────────────────────────────────────────────────────────

export const ERROR_MESSAGES = {
  generic: 'Something went wrong. Please try again.',
  network: 'Network error. Please check your connection.',
  unauthorized: 'You must be logged in to do this.',
  forbidden: 'You do not have permission to do this.',
  notFound: 'The requested resource was not found.',
  validation: 'Please check your input and try again.',
  server: 'Server error. Please try again later.',
  payment: 'Payment failed. Please try a different payment method.',
  outOfStock: 'This item is out of stock.',
  invalidCoupon: 'Invalid or expired coupon code.',
} as const;

// ─── SUCCESS MESSAGES ─────────────────────────────────────────────────────────

export const SUCCESS_MESSAGES = {
  addedToCart: 'Added to cart!',
  removedFromCart: 'Removed from cart.',
  addedToWishlist: 'Added to wishlist!',
  removedFromWishlist: 'Removed from wishlist.',
  orderPlaced: 'Order placed successfully!',
  reviewSubmitted: 'Review submitted successfully!',
  profileUpdated: 'Profile updated successfully!',
  passwordChanged: 'Password changed successfully!',
  accountCreated: 'Account created! Welcome to BookGift!',
  loggedIn: 'Welcome back!',
  loggedOut: 'Logged out successfully.',
  copied: 'Copied to clipboard!',
} as const;

// ─── BREAKPOINTS ──────────────────────────────────────────────────────────────

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// ─── ANIMATION DURATIONS ──────────────────────────────────────────────────────

export const ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 800,
} as const;

// ─── LOCAL STORAGE KEYS ───────────────────────────────────────────────────────

export const STORAGE_KEYS = {
  language: 'bookgift-language',
  wishlist: 'bookgift-wishlist',
  recentlyViewed: 'bookgift-recently-viewed',
  cartBackup: 'bookgift-cart-backup',
  searchHistory: 'bookgift-search-history',
  cookieConsent: 'bookgift-cookie-consent',
} as const;

// ─── API ENDPOINTS ────────────────────────────────────────────────────────────

export const API = {
  chatbot: '/api/chatbot',
  register: '/api/auth/register',
  books: {
    list: '/api/books',
    detail: (id: string) => `/api/books/${id}`,
    featured: '/api/books/featured',
    search: '/api/books/search',
  },
  orders: {
    list: '/api/orders',
    detail: (id: string) => `/api/orders/${id}`,
    create: '/api/orders',
  },
  reviews: {
    create: '/api/reviews',
    list: (bookId: string) => `/api/reviews?bookId=${bookId}`,
  },
  admin: {
    stats: '/api/admin/stats',
    books: '/api/admin/books',
    orders: '/api/admin/orders',
    users: '/api/admin/users',
  },
} as const;

// ─── FEATURE FLAGS ────────────────────────────────────────────────────────────

export const FEATURES = {
  giftWrapping: true,
  hebrewLanguage: true,
  wishlist: true,
  reviews: true,
  stripePayments: false,
  googleAuth: false,
  newsletter: false,
  liveChat: true,
  searchSuggestions: true,
  recentlyViewed: true,
} as const;
