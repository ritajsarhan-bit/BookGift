// BookGift UI Component Library
// Reusable components used throughout the application

'use client';

import { useState, useEffect, useRef, ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';
import { FiStar, FiX, FiCheck, FiAlertCircle, FiInfo, FiAlertTriangle, FiChevronDown, FiChevronUp, FiSearch, FiLoader } from 'react-icons/fi';

// ─── BUTTON ───────────────────────────────────────────────────────────────────

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-blue-700 hover:bg-blue-800 text-white focus:ring-blue-500',
    secondary: 'bg-amber-400 hover:bg-amber-500 text-amber-900 focus:ring-amber-400',
    outline: 'border-2 border-blue-700 text-blue-700 hover:bg-blue-50 focus:ring-blue-500',
    ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-400',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {loading && <FiLoader className="animate-spin" size={16} />}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
    </button>
  );
}

// ─── INPUT ────────────────────────────────────────────────────────────────────

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export function Input({
  label,
  error,
  hint,
  icon,
  iconPosition = 'left',
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
        )}
        <input
          id={inputId}
          className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors
            ${error ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}
            ${icon && iconPosition === 'left' ? 'pl-10' : ''}
            ${icon && iconPosition === 'right' ? 'pr-10' : ''}
            ${className}`}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 flex items-center gap-1"><FiAlertCircle size={12} />{error}</p>}
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

// ─── BADGE ────────────────────────────────────────────────────────────────────

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'new' | 'sale';
  size?: 'sm' | 'md';
}

export function Badge({ children, variant = 'default', size = 'md' }: BadgeProps) {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    new: 'bg-purple-100 text-purple-700',
    sale: 'bg-orange-100 text-orange-700',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span className={`inline-flex items-center gap-1 font-semibold rounded-full ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </span>
  );
}

// ─── ALERT ────────────────────────────────────────────────────────────────────

interface AlertProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info';
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function Alert({ children, variant = 'info', title, dismissible = false, onDismiss }: AlertProps) {
  const [visible, setVisible] = useState(true);

  const configs = {
    success: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', icon: <FiCheck className="text-green-600" /> },
    warning: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', icon: <FiAlertTriangle className="text-amber-600" /> },
    danger: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: <FiAlertCircle className="text-red-600" /> },
    info: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: <FiInfo className="text-blue-600" /> },
  };

  const config = configs[variant];

  if (!visible) return null;

  return (
    <div className={`flex gap-3 p-4 rounded-xl border ${config.bg} ${config.border} ${config.text}`}>
      <div className="flex-shrink-0 mt-0.5">{config.icon}</div>
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold text-sm mb-1">{title}</p>}
        <div className="text-sm">{children}</div>
      </div>
      {dismissible && (
        <button
          onClick={() => { setVisible(false); onDismiss?.(); }}
          className="flex-shrink-0 hover:opacity-70 transition-opacity"
        >
          <FiX size={16} />
        </button>
      )}
    </div>
  );
}

// ─── STAR RATING ──────────────────────────────────────────────────────────────

interface StarRatingProps {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  size?: number;
  readonly?: boolean;
}

export function StarRating({ value, max = 5, onChange, size = 18, readonly = false }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1;
        const filled = (hovered || value) >= starValue;
        return (
          <button
            key={i}
            type="button"
            disabled={readonly}
            onClick={() => onChange?.(starValue)}
            onMouseEnter={() => !readonly && setHovered(starValue)}
            onMouseLeave={() => !readonly && setHovered(0)}
            className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
          >
            <FiStar
              size={size}
              className={filled ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
            />
          </button>
        );
      })}
    </div>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!open) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <div className={`w-full ${sizeClasses[size]} bg-white rounded-2xl shadow-2xl`}>
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <FiX size={18} />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ─── SEARCH BAR ───────────────────────────────────────────────────────────────

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ value, onChange, onSearch, placeholder = 'Search...', className = '' }: SearchBarProps) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSearch?.(value); }}
      className={`flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all ${className}`}
    >
      <FiSearch className="text-gray-400 flex-shrink-0" size={18} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
      />
      {value && (
        <button type="button" onClick={() => onChange('')} className="text-gray-400 hover:text-gray-600 transition-colors">
          <FiX size={16} />
        </button>
      )}
    </form>
  );
}

// ─── ACCORDION ────────────────────────────────────────────────────────────────

interface AccordionItem {
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggle = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div key={index}>
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-800 text-sm">{item.title}</span>
              {isOpen ? <FiChevronUp className="text-gray-500 flex-shrink-0" /> : <FiChevronDown className="text-gray-500 flex-shrink-0" />}
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── PRICE DISPLAY ────────────────────────────────────────────────────────────

interface PriceDisplayProps {
  price: number;
  discountPrice?: number | null;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PriceDisplay({ price, discountPrice, currency = '$', size = 'md' }: PriceDisplayProps) {
  const hasDiscount = discountPrice != null && discountPrice < price;
  const discountPercent = hasDiscount ? Math.round(((price - discountPrice!) / price) * 100) : 0;

  const sizeClasses = {
    sm: { current: 'text-sm font-bold', original: 'text-xs', badge: 'text-xs px-1.5 py-0.5' },
    md: { current: 'text-lg font-bold', original: 'text-sm', badge: 'text-xs px-2 py-0.5' },
    lg: { current: 'text-2xl font-bold', original: 'text-base', badge: 'text-sm px-2 py-1' },
  };

  const classes = sizeClasses[size];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className={`text-blue-700 ${classes.current}`}>
        {currency}{(hasDiscount ? discountPrice! : price).toFixed(2)}
      </span>
      {hasDiscount && (
        <>
          <span className={`text-gray-400 line-through ${classes.original}`}>
            {currency}{price.toFixed(2)}
          </span>
          <span className={`bg-orange-100 text-orange-700 font-semibold rounded-full ${classes.badge}`}>
            -{discountPercent}%
          </span>
        </>
      )}
    </div>
  );
}

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon = '📚', title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      {description && <p className="text-sm text-gray-500 max-w-sm mb-6">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}

// ─── TOOLTIP ──────────────────────────────────────────────────────────────────

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className={`absolute z-50 ${positionClasses[position]} whitespace-nowrap bg-gray-900 text-white text-xs rounded-lg px-2.5 py-1.5 pointer-events-none`}>
          {content}
        </div>
      )}
    </div>
  );
}

// ─── SPINNER ──────────────────────────────────────────────────────────────────

export function Spinner({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`border-2 border-blue-200 border-t-blue-700 rounded-full animate-spin ${className}`}
    />
  );
}

// ─── DIVIDER ──────────────────────────────────────────────────────────────────

export function Divider({ label }: { label?: string }) {
  if (!label) return <hr className="border-gray-100 my-4" />;
  return (
    <div className="flex items-center gap-3 my-4">
      <hr className="flex-1 border-gray-200" />
      <span className="text-xs text-gray-400 font-medium">{label}</span>
      <hr className="flex-1 border-gray-200" />
    </div>
  );
}
