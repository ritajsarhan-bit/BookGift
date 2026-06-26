// BookGift Form Validators
// Validation functions for all user input across the application

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

// ─── EMAIL ────────────────────────────────────────────────────────────────────

export function validateEmail(email: string): ValidationResult {
  if (!email || !email.trim()) return { valid: false, error: 'Email is required' };
  if (email.length > 254) return { valid: false, error: 'Email is too long' };
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(email)) return { valid: false, error: 'Please enter a valid email address' };
  return { valid: true };
}

// ─── PASSWORD ─────────────────────────────────────────────────────────────────

export function validatePassword(password: string): ValidationResult {
  if (!password) return { valid: false, error: 'Password is required' };
  if (password.length < 6) return { valid: false, error: 'Password must be at least 6 characters' };
  if (password.length > 128) return { valid: false, error: 'Password is too long' };
  return { valid: true };
}

export function validatePasswordMatch(password: string, confirm: string): ValidationResult {
  const base = validatePassword(password);
  if (!base.valid) return base;
  if (password !== confirm) return { valid: false, error: 'Passwords do not match' };
  return { valid: true };
}

export function validatePasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: 'Weak', color: 'red' };
  if (score <= 2) return { score, label: 'Fair', color: 'orange' };
  if (score <= 3) return { score, label: 'Good', color: 'yellow' };
  if (score <= 4) return { score, label: 'Strong', color: 'green' };
  return { score, label: 'Very Strong', color: 'emerald' };
}

// ─── NAME ─────────────────────────────────────────────────────────────────────

export function validateName(name: string): ValidationResult {
  if (!name || !name.trim()) return { valid: false, error: 'Name is required' };
  if (name.trim().length < 2) return { valid: false, error: 'Name must be at least 2 characters' };
  if (name.length > 100) return { valid: false, error: 'Name is too long' };
  return { valid: true };
}

// ─── PHONE ────────────────────────────────────────────────────────────────────

export function validatePhone(phone: string): ValidationResult {
  if (!phone) return { valid: true }; // phone is optional
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
  if (!/^\+?[0-9]{7,15}$/.test(cleaned)) return { valid: false, error: 'Please enter a valid phone number' };
  return { valid: true };
}

// ─── ADDRESS ──────────────────────────────────────────────────────────────────

export interface AddressInput {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  phone?: string;
}

export function validateAddress(input: AddressInput): Record<keyof AddressInput, ValidationResult> {
  return {
    firstName: validateName(input.firstName),
    lastName: validateName(input.lastName),
    address: input.address?.trim().length > 3 ? { valid: true } : { valid: false, error: 'Please enter a valid address' },
    city: input.city?.trim().length > 1 ? { valid: true } : { valid: false, error: 'City is required' },
    zip: /^[A-Z0-9\- ]{3,10}$/i.test(input.zip) ? { valid: true } : { valid: false, error: 'Invalid ZIP / postal code' },
    country: input.country?.trim().length > 1 ? { valid: true } : { valid: false, error: 'Country is required' },
    phone: validatePhone(input.phone || ''),
  };
}

// ─── REVIEW ───────────────────────────────────────────────────────────────────

export function validateReview(rating: number, comment: string): ValidationResult {
  if (!rating || rating < 1 || rating > 5) return { valid: false, error: 'Please select a rating between 1 and 5' };
  if (comment && comment.length > 1000) return { valid: false, error: 'Review is too long (max 1000 characters)' };
  return { valid: true };
}

// ─── GIFT MESSAGE ─────────────────────────────────────────────────────────────

export function validateGiftMessage(message: string): ValidationResult {
  if (!message) return { valid: true };
  if (message.length > 500) return { valid: false, error: 'Gift message is too long (max 500 characters)' };
  return { valid: true };
}

// ─── SEARCH QUERY ─────────────────────────────────────────────────────────────

export function validateSearchQuery(query: string): ValidationResult {
  if (!query || !query.trim()) return { valid: false, error: 'Please enter a search term' };
  if (query.length > 200) return { valid: false, error: 'Search query is too long' };
  if (query.trim().length < 2) return { valid: false, error: 'Please enter at least 2 characters' };
  return { valid: true };
}

// ─── BOOK FORM (ADMIN) ────────────────────────────────────────────────────────

export interface BookFormInput {
  title: string;
  author: string;
  description: string;
  price: number | string;
  stock: number | string;
  categoryId: string;
  language: string;
  isbn?: string;
}

export function validateBookForm(input: BookFormInput): Record<string, ValidationResult> {
  const price = Number(input.price);
  const stock = Number(input.stock);
  return {
    title: input.title?.trim().length > 1 ? { valid: true } : { valid: false, error: 'Title is required' },
    author: input.author?.trim().length > 1 ? { valid: true } : { valid: false, error: 'Author is required' },
    description: input.description?.trim().length > 10 ? { valid: true } : { valid: false, error: 'Description must be at least 10 characters' },
    price: !isNaN(price) && price > 0 ? { valid: true } : { valid: false, error: 'Price must be a positive number' },
    stock: !isNaN(stock) && stock >= 0 ? { valid: true } : { valid: false, error: 'Stock must be 0 or more' },
    categoryId: input.categoryId ? { valid: true } : { valid: false, error: 'Please select a category' },
    language: ['en', 'he'].includes(input.language) ? { valid: true } : { valid: false, error: 'Please select a language' },
    isbn: !input.isbn || input.isbn.length === 0 || input.isbn.length === 10 || input.isbn.length === 13
      ? { valid: true }
      : { valid: false, error: 'ISBN must be 10 or 13 digits' },
  };
}

// ─── REGISTER FORM ────────────────────────────────────────────────────────────

export interface RegisterFormInput {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

export function validateRegisterForm(input: RegisterFormInput): Record<keyof RegisterFormInput, ValidationResult> {
  return {
    name: validateName(input.name),
    email: validateEmail(input.email),
    password: validatePassword(input.password),
    confirm: validatePasswordMatch(input.password, input.confirm),
  };
}

export function isFormValid(results: Record<string, ValidationResult>): boolean {
  return Object.values(results).every((r) => r.valid);
}

// ─── LOGIN FORM ───────────────────────────────────────────────────────────────

export interface LoginFormInput {
  email: string;
  password: string;
}

export function validateLoginForm(input: LoginFormInput): Record<keyof LoginFormInput, ValidationResult> {
  return {
    email: validateEmail(input.email),
    password: input.password ? { valid: true } : { valid: false, error: 'Password is required' },
  };
}

// ─── SANITIZE ─────────────────────────────────────────────────────────────────

export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function sanitizeSearchQuery(query: string): string {
  return query.trim().replace(/[^\w\s֐-׿\-']/g, '').substring(0, 200);
}

export function formatPrice(price: number, currency = '$'): string {
  return `${currency}${price.toFixed(2)}`;
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function formatDateShort(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function slugify(text: string): string {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function titleCase(text: string): string {
  return text.split(' ').map(capitalize).join(' ');
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BG-${timestamp}-${random}`;
}

export function calculateDiscount(price: number, discountPrice: number): number {
  return Math.round(((price - discountPrice) / price) * 100);
}

export function calculateShipping(subtotal: number): number {
  return subtotal >= 50 ? 0 : 4.99;
}

export function calculateOrderTotal(subtotal: number, shipping: number, discount = 0): number {
  return Math.max(0, subtotal + shipping - discount);
}
