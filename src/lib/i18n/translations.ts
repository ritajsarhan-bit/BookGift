// Full translations for BookGift — English and Hebrew
// This file contains all UI strings used across the application

export type Language = 'en' | 'he';

export interface Translations {
  nav: {
    home: string;
    books: string;
    hebrew_books: string;
    cart: string;
    wishlist: string;
    orders: string;
    profile: string;
    admin: string;
    login: string;
    register: string;
    logout: string;
    search_placeholder: string;
  };
  home: {
    hero_title: string;
    hero_subtitle: string;
    hero_cta: string;
    search_placeholder: string;
    featured_title: string;
    featured_subtitle: string;
    categories_title: string;
    categories_subtitle: string;
    new_arrivals: string;
    bestsellers: string;
    view_all: string;
    no_books: string;
  };
  books: {
    title: string;
    filter_by: string;
    sort_by: string;
    sort_newest: string;
    sort_oldest: string;
    sort_price_low: string;
    sort_price_high: string;
    sort_rating: string;
    all_categories: string;
    all_languages: string;
    english_only: string;
    hebrew_only: string;
    in_stock: string;
    out_of_stock: string;
    add_to_cart: string;
    add_to_wishlist: string;
    remove_from_wishlist: string;
    view_details: string;
    no_results: string;
    showing: string;
    of: string;
    results: string;
    pages: string;
    publisher: string;
    isbn: string;
    language: string;
    category: string;
    rating: string;
    reviews: string;
    description: string;
    related_books: string;
    write_review: string;
    your_rating: string;
    your_review: string;
    submit_review: string;
    discount: string;
    original_price: string;
    sale_price: string;
    save: string;
    featured: string;
    new: string;
  };
  cart: {
    title: string;
    empty: string;
    empty_subtitle: string;
    continue_shopping: string;
    item: string;
    items: string;
    quantity: string;
    price: string;
    total: string;
    subtotal: string;
    shipping: string;
    free_shipping: string;
    order_total: string;
    checkout: string;
    remove: string;
    clear_cart: string;
    update: string;
    promo_code: string;
    apply: string;
    gift_wrap: string;
    gift_message: string;
  };
  checkout: {
    title: string;
    shipping_info: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    payment_info: string;
    card_number: string;
    expiry: string;
    cvv: string;
    place_order: string;
    processing: string;
    success: string;
    success_message: string;
    order_number: string;
    back_to_shop: string;
  };
  auth: {
    login_title: string;
    register_title: string;
    email: string;
    password: string;
    name: string;
    confirm_password: string;
    login_btn: string;
    register_btn: string;
    forgot_password: string;
    no_account: string;
    have_account: string;
    sign_in: string;
    sign_up: string;
    or: string;
    continue_google: string;
    demo_hint: string;
    invalid_credentials: string;
    email_taken: string;
    password_too_short: string;
    passwords_no_match: string;
  };
  profile: {
    title: string;
    my_orders: string;
    my_wishlist: string;
    my_reviews: string;
    settings: string;
    edit_profile: string;
    save_changes: string;
    change_password: string;
    current_password: string;
    new_password: string;
    confirm_new_password: string;
    account_info: string;
    preferences: string;
    language_preference: string;
    notifications: string;
    delete_account: string;
    joined: string;
  };
  orders: {
    title: string;
    no_orders: string;
    no_orders_subtitle: string;
    order_id: string;
    date: string;
    status: string;
    total: string;
    view_order: string;
    status_pending: string;
    status_paid: string;
    status_shipped: string;
    status_delivered: string;
    status_cancelled: string;
    items: string;
    shipping_to: string;
    payment_method: string;
    track_order: string;
  };
  admin: {
    dashboard: string;
    books: string;
    orders: string;
    users: string;
    categories: string;
    add_book: string;
    edit_book: string;
    delete_book: string;
    total_books: string;
    total_orders: string;
    total_users: string;
    total_revenue: string;
    recent_orders: string;
    recent_users: string;
    publish: string;
    unpublish: string;
    featured: string;
    unfeatured: string;
    save: string;
    cancel: string;
    confirm_delete: string;
    search_books: string;
    search_users: string;
    filter_status: string;
    export: string;
  };
  chatbot: {
    title: string;
    subtitle: string;
    greeting: string;
    placeholder: string;
    send: string;
    thinking: string;
    error: string;
    suggestions: string[];
  };
  gift: {
    title: string;
    subtitle: string;
    select_book: string;
    wrapping_style: string;
    wrapping_classic: string;
    wrapping_modern: string;
    wrapping_festive: string;
    wrapping_minimal: string;
    gift_message: string;
    message_placeholder: string;
    recipient_name: string;
    preview: string;
    add_to_cart: string;
    price_includes: string;
  };
  common: {
    loading: string;
    error: string;
    retry: string;
    back: string;
    next: string;
    previous: string;
    close: string;
    open: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    view: string;
    share: string;
    copy: string;
    copied: string;
    search: string;
    filter: string;
    sort: string;
    clear: string;
    apply: string;
    reset: string;
    yes: string;
    no: string;
    ok: string;
    confirm: string;
    success: string;
    warning: string;
    info: string;
    new_badge: string;
    sale_badge: string;
    out_of_stock_badge: string;
    currency_usd: string;
    currency_ils: string;
  };
  footer: {
    tagline: string;
    shop: string;
    all_books: string;
    hebrew_books: string;
    programming: string;
    fiction: string;
    about: string;
    contact: string;
    account: string;
    sign_in: string;
    register: string;
    my_orders: string;
    wishlist: string;
    language_section: string;
    rights: string;
    payments: string;
    privacy: string;
  };
}

export const en: Translations = {
  nav: {
    home: 'Home',
    books: 'Books',
    hebrew_books: 'Hebrew Books',
    cart: 'Cart',
    wishlist: 'Wishlist',
    orders: 'My Orders',
    profile: 'Profile',
    admin: 'Admin',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    search_placeholder: 'Search books, authors, ISBN...',
  },
  home: {
    hero_title: 'Discover Your Next Favorite Book',
    hero_subtitle: 'Browse thousands of books in English and Hebrew. Find programming guides, fiction, science, children\'s books and more.',
    hero_cta: 'Shop Now',
    search_placeholder: 'Search books, authors, ISBN...',
    featured_title: 'Featured Books',
    featured_subtitle: 'Hand-picked selections our team loves',
    categories_title: 'Browse by Category',
    categories_subtitle: 'Find exactly what you are looking for',
    new_arrivals: 'New Arrivals',
    bestsellers: 'Bestsellers',
    view_all: 'View All',
    no_books: 'No books found',
  },
  books: {
    title: 'All Books',
    filter_by: 'Filter by',
    sort_by: 'Sort by',
    sort_newest: 'Newest First',
    sort_oldest: 'Oldest First',
    sort_price_low: 'Price: Low to High',
    sort_price_high: 'Price: High to Low',
    sort_rating: 'Highest Rated',
    all_categories: 'All Categories',
    all_languages: 'All Languages',
    english_only: 'English Only',
    hebrew_only: 'Hebrew Only',
    in_stock: 'In Stock',
    out_of_stock: 'Out of Stock',
    add_to_cart: 'Add to Cart',
    add_to_wishlist: 'Add to Wishlist',
    remove_from_wishlist: 'Remove from Wishlist',
    view_details: 'View Details',
    no_results: 'No books match your search',
    showing: 'Showing',
    of: 'of',
    results: 'results',
    pages: 'pages',
    publisher: 'Publisher',
    isbn: 'ISBN',
    language: 'Language',
    category: 'Category',
    rating: 'Rating',
    reviews: 'reviews',
    description: 'Description',
    related_books: 'You May Also Like',
    write_review: 'Write a Review',
    your_rating: 'Your Rating',
    your_review: 'Your Review',
    submit_review: 'Submit Review',
    discount: 'discount',
    original_price: 'Original Price',
    sale_price: 'Sale Price',
    save: 'Save',
    featured: 'Featured',
    new: 'New',
  },
  cart: {
    title: 'Your Cart',
    empty: 'Your cart is empty',
    empty_subtitle: 'Add some books to get started',
    continue_shopping: 'Continue Shopping',
    item: 'item',
    items: 'items',
    quantity: 'Quantity',
    price: 'Price',
    total: 'Total',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    free_shipping: 'Free Shipping',
    order_total: 'Order Total',
    checkout: 'Proceed to Checkout',
    remove: 'Remove',
    clear_cart: 'Clear Cart',
    update: 'Update',
    promo_code: 'Promo Code',
    apply: 'Apply',
    gift_wrap: 'Gift Wrap',
    gift_message: 'Gift Message',
  },
  checkout: {
    title: 'Checkout',
    shipping_info: 'Shipping Information',
    first_name: 'First Name',
    last_name: 'Last Name',
    email: 'Email Address',
    phone: 'Phone Number',
    address: 'Street Address',
    city: 'City',
    state: 'State / Province',
    zip: 'ZIP / Postal Code',
    country: 'Country',
    payment_info: 'Payment Information',
    card_number: 'Card Number',
    expiry: 'Expiry Date',
    cvv: 'CVV',
    place_order: 'Place Order',
    processing: 'Processing...',
    success: 'Order Placed!',
    success_message: 'Thank you for your order. You will receive a confirmation email shortly.',
    order_number: 'Order Number',
    back_to_shop: 'Back to Shop',
  },
  auth: {
    login_title: 'Sign In',
    register_title: 'Create Account',
    email: 'Email',
    password: 'Password',
    name: 'Full Name',
    confirm_password: 'Confirm Password',
    login_btn: 'Sign In',
    register_btn: 'Create Account',
    forgot_password: 'Forgot Password?',
    no_account: 'Don\'t have an account?',
    have_account: 'Already have an account?',
    sign_in: 'Sign In',
    sign_up: 'Sign Up',
    or: 'or',
    continue_google: 'Continue with Google',
    demo_hint: 'Demo credentials available below',
    invalid_credentials: 'Invalid email or password',
    email_taken: 'Email already in use',
    password_too_short: 'Password must be at least 6 characters',
    passwords_no_match: 'Passwords do not match',
  },
  profile: {
    title: 'My Profile',
    my_orders: 'My Orders',
    my_wishlist: 'My Wishlist',
    my_reviews: 'My Reviews',
    settings: 'Settings',
    edit_profile: 'Edit Profile',
    save_changes: 'Save Changes',
    change_password: 'Change Password',
    current_password: 'Current Password',
    new_password: 'New Password',
    confirm_new_password: 'Confirm New Password',
    account_info: 'Account Information',
    preferences: 'Preferences',
    language_preference: 'Language Preference',
    notifications: 'Email Notifications',
    delete_account: 'Delete Account',
    joined: 'Member since',
  },
  orders: {
    title: 'My Orders',
    no_orders: 'No orders yet',
    no_orders_subtitle: 'Start shopping to see your orders here',
    order_id: 'Order ID',
    date: 'Date',
    status: 'Status',
    total: 'Total',
    view_order: 'View Order',
    status_pending: 'Pending',
    status_paid: 'Paid',
    status_shipped: 'Shipped',
    status_delivered: 'Delivered',
    status_cancelled: 'Cancelled',
    items: 'Items',
    shipping_to: 'Shipping to',
    payment_method: 'Payment Method',
    track_order: 'Track Order',
  },
  admin: {
    dashboard: 'Dashboard',
    books: 'Books',
    orders: 'Orders',
    users: 'Users',
    categories: 'Categories',
    add_book: 'Add Book',
    edit_book: 'Edit Book',
    delete_book: 'Delete Book',
    total_books: 'Total Books',
    total_orders: 'Total Orders',
    total_users: 'Total Users',
    total_revenue: 'Total Revenue',
    recent_orders: 'Recent Orders',
    recent_users: 'Recent Users',
    publish: 'Publish',
    unpublish: 'Unpublish',
    featured: 'Mark as Featured',
    unfeatured: 'Remove from Featured',
    save: 'Save',
    cancel: 'Cancel',
    confirm_delete: 'Are you sure you want to delete this item?',
    search_books: 'Search books...',
    search_users: 'Search users...',
    filter_status: 'Filter by status',
    export: 'Export',
  },
  chatbot: {
    title: 'Book Assistant',
    subtitle: 'Powered by Claude AI',
    greeting: 'Hi! I\'m your book assistant. Ask me to recommend books, check availability, or help you find your next read!',
    placeholder: 'Ask me anything about books...',
    send: 'Send',
    thinking: 'Thinking...',
    error: 'Sorry, something went wrong. Please try again.',
    suggestions: ['Recommend a gift book', 'Books for kids', 'Popular fiction', 'Programming books'],
  },
  gift: {
    title: 'Create a Gift',
    subtitle: 'Make your book extra special with beautiful gift wrapping',
    select_book: 'Select a Book',
    wrapping_style: 'Wrapping Style',
    wrapping_classic: 'Classic',
    wrapping_modern: 'Modern',
    wrapping_festive: 'Festive',
    wrapping_minimal: 'Minimal',
    gift_message: 'Gift Message',
    message_placeholder: 'Write a personal message for the recipient...',
    recipient_name: 'Recipient Name',
    preview: 'Preview Gift',
    add_to_cart: 'Add Gift to Cart',
    price_includes: 'Price includes gift wrapping',
  },
  common: {
    loading: 'Loading...',
    error: 'Something went wrong',
    retry: 'Try Again',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    close: 'Close',
    open: 'Open',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    share: 'Share',
    copy: 'Copy',
    copied: 'Copied!',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    clear: 'Clear',
    apply: 'Apply',
    reset: 'Reset',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    confirm: 'Confirm',
    success: 'Success',
    warning: 'Warning',
    info: 'Info',
    new_badge: 'New',
    sale_badge: 'Sale',
    out_of_stock_badge: 'Out of Stock',
    currency_usd: 'USD',
    currency_ils: 'ILS',
  },
  footer: {
    tagline: 'Gift the perfect book, beautifully wrapped. Books in English and Hebrew.',
    shop: 'Shop',
    all_books: 'All Books',
    hebrew_books: 'Hebrew Books',
    programming: 'Programming',
    fiction: 'Fiction',
    about: 'About Us',
    contact: 'Contact',
    account: 'Account',
    sign_in: 'Sign In',
    register: 'Register',
    my_orders: 'My Orders',
    wishlist: 'Wishlist',
    language_section: 'Language / שפה',
    rights: 'All rights reserved.',
    payments: 'Payments secured by Stripe',
    privacy: 'Privacy Policy',
  },
};

export const he: Translations = {
  nav: {
    home: 'דף הבית',
    books: 'ספרים',
    hebrew_books: 'ספרים בעברית',
    cart: 'עגלת קניות',
    wishlist: 'רשימת משאלות',
    orders: 'ההזמנות שלי',
    profile: 'פרופיל',
    admin: 'ניהול',
    login: 'כניסה',
    register: 'הרשמה',
    logout: 'יציאה',
    search_placeholder: 'חפש ספרים, מחברים, ISBN...',
  },
  home: {
    hero_title: 'גלה את הספר הבא שלך',
    hero_subtitle: 'עיין באלפי ספרים בעברית ובאנגלית. מדריכי תכנות, ספרות, מדע, ספרי ילדים ועוד.',
    hero_cta: 'קנה עכשיו',
    search_placeholder: 'חפש ספרים, מחברים, ISBN...',
    featured_title: 'ספרים מומלצים',
    featured_subtitle: 'בחירות מיוחדות שהצוות שלנו אוהב',
    categories_title: 'עיין לפי קטגוריה',
    categories_subtitle: 'מצא בדיוק את מה שאתה מחפש',
    new_arrivals: 'חדש בחנות',
    bestsellers: 'רבי מכר',
    view_all: 'הצג הכל',
    no_books: 'לא נמצאו ספרים',
  },
  books: {
    title: 'כל הספרים',
    filter_by: 'סנן לפי',
    sort_by: 'מיין לפי',
    sort_newest: 'חדש ביותר',
    sort_oldest: 'ישן ביותר',
    sort_price_low: 'מחיר: מהנמוך לגבוה',
    sort_price_high: 'מחיר: מהגבוה לנמוך',
    sort_rating: 'דירוג גבוה ביותר',
    all_categories: 'כל הקטגוריות',
    all_languages: 'כל השפות',
    english_only: 'אנגלית בלבד',
    hebrew_only: 'עברית בלבד',
    in_stock: 'במלאי',
    out_of_stock: 'אזל מהמלאי',
    add_to_cart: 'הוסף לעגלה',
    add_to_wishlist: 'הוסף לרשימת משאלות',
    remove_from_wishlist: 'הסר מרשימת משאלות',
    view_details: 'צפה בפרטים',
    no_results: 'לא נמצאו ספרים התואמים את החיפוש',
    showing: 'מציג',
    of: 'מתוך',
    results: 'תוצאות',
    pages: 'עמודים',
    publisher: 'מוציא לאור',
    isbn: 'ISBN',
    language: 'שפה',
    category: 'קטגוריה',
    rating: 'דירוג',
    reviews: 'ביקורות',
    description: 'תיאור',
    related_books: 'אולי תאהב גם',
    write_review: 'כתוב ביקורת',
    your_rating: 'הדירוג שלך',
    your_review: 'הביקורת שלך',
    submit_review: 'שלח ביקורת',
    discount: 'הנחה',
    original_price: 'מחיר מקורי',
    sale_price: 'מחיר מבצע',
    save: 'חסוך',
    featured: 'מומלץ',
    new: 'חדש',
  },
  cart: {
    title: 'עגלת הקניות שלך',
    empty: 'העגלה שלך ריקה',
    empty_subtitle: 'הוסף ספרים כדי להתחיל',
    continue_shopping: 'המשך לקנות',
    item: 'פריט',
    items: 'פריטים',
    quantity: 'כמות',
    price: 'מחיר',
    total: 'סה"כ',
    subtotal: 'סכום ביניים',
    shipping: 'משלוח',
    free_shipping: 'משלוח חינם',
    order_total: 'סה"כ להזמנה',
    checkout: 'המשך לתשלום',
    remove: 'הסר',
    clear_cart: 'נקה עגלה',
    update: 'עדכן',
    promo_code: 'קוד קופון',
    apply: 'החל',
    gift_wrap: 'עטיפת מתנה',
    gift_message: 'הודעת מתנה',
  },
  checkout: {
    title: 'תשלום',
    shipping_info: 'פרטי משלוח',
    first_name: 'שם פרטי',
    last_name: 'שם משפחה',
    email: 'כתובת אימייל',
    phone: 'מספר טלפון',
    address: 'כתובת',
    city: 'עיר',
    state: 'מדינה / מחוז',
    zip: 'מיקוד',
    country: 'מדינה',
    payment_info: 'פרטי תשלום',
    card_number: 'מספר כרטיס',
    expiry: 'תאריך תפוגה',
    cvv: 'CVV',
    place_order: 'בצע הזמנה',
    processing: 'מעבד...',
    success: 'ההזמנה בוצעה!',
    success_message: 'תודה על הזמנתך. תקבל אישור במייל בקרוב.',
    order_number: 'מספר הזמנה',
    back_to_shop: 'חזור לחנות',
  },
  auth: {
    login_title: 'כניסה',
    register_title: 'יצירת חשבון',
    email: 'אימייל',
    password: 'סיסמה',
    name: 'שם מלא',
    confirm_password: 'אימות סיסמה',
    login_btn: 'כניסה',
    register_btn: 'יצירת חשבון',
    forgot_password: 'שכחתי סיסמה',
    no_account: 'אין לך חשבון?',
    have_account: 'כבר יש לך חשבון?',
    sign_in: 'כניסה',
    sign_up: 'הרשמה',
    or: 'או',
    continue_google: 'המשך עם Google',
    demo_hint: 'פרטי כניסה לדמו זמינים למטה',
    invalid_credentials: 'אימייל או סיסמה שגויים',
    email_taken: 'האימייל כבר בשימוש',
    password_too_short: 'הסיסמה חייבת להכיל לפחות 6 תווים',
    passwords_no_match: 'הסיסמאות אינן תואמות',
  },
  profile: {
    title: 'הפרופיל שלי',
    my_orders: 'ההזמנות שלי',
    my_wishlist: 'רשימת המשאלות שלי',
    my_reviews: 'הביקורות שלי',
    settings: 'הגדרות',
    edit_profile: 'ערוך פרופיל',
    save_changes: 'שמור שינויים',
    change_password: 'שנה סיסמה',
    current_password: 'סיסמה נוכחית',
    new_password: 'סיסמה חדשה',
    confirm_new_password: 'אמת סיסמה חדשה',
    account_info: 'פרטי חשבון',
    preferences: 'העדפות',
    language_preference: 'שפה מועדפת',
    notifications: 'התראות אימייל',
    delete_account: 'מחק חשבון',
    joined: 'חבר מאז',
  },
  orders: {
    title: 'ההזמנות שלי',
    no_orders: 'אין הזמנות עדיין',
    no_orders_subtitle: 'התחל לקנות כדי לראות את ההזמנות שלך כאן',
    order_id: 'מספר הזמנה',
    date: 'תאריך',
    status: 'סטטוס',
    total: 'סה"כ',
    view_order: 'צפה בהזמנה',
    status_pending: 'ממתין',
    status_paid: 'שולם',
    status_shipped: 'נשלח',
    status_delivered: 'נמסר',
    status_cancelled: 'בוטל',
    items: 'פריטים',
    shipping_to: 'נשלח ל',
    payment_method: 'אמצעי תשלום',
    track_order: 'עקוב אחר ההזמנה',
  },
  admin: {
    dashboard: 'לוח בקרה',
    books: 'ספרים',
    orders: 'הזמנות',
    users: 'משתמשים',
    categories: 'קטגוריות',
    add_book: 'הוסף ספר',
    edit_book: 'ערוך ספר',
    delete_book: 'מחק ספר',
    total_books: 'סה"כ ספרים',
    total_orders: 'סה"כ הזמנות',
    total_users: 'סה"כ משתמשים',
    total_revenue: 'סה"כ הכנסות',
    recent_orders: 'הזמנות אחרונות',
    recent_users: 'משתמשים אחרונים',
    publish: 'פרסם',
    unpublish: 'בטל פרסום',
    featured: 'סמן כמומלץ',
    unfeatured: 'הסר מהמומלצים',
    save: 'שמור',
    cancel: 'ביטול',
    confirm_delete: 'האם אתה בטוח שברצונך למחוק פריט זה?',
    search_books: 'חפש ספרים...',
    search_users: 'חפש משתמשים...',
    filter_status: 'סנן לפי סטטוס',
    export: 'ייצא',
  },
  chatbot: {
    title: 'עוזר הספרים',
    subtitle: 'מופעל על ידי Claude AI',
    greeting: 'שלום! אני עוזר הספרים שלך. שאל אותי להמליץ על ספרים, לבדוק זמינות, או לעזור לך למצוא את הקריאה הבאה שלך!',
    placeholder: 'שאל אותי כל דבר על ספרים...',
    send: 'שלח',
    thinking: 'חושב...',
    error: 'מצטער, משהו השתבש. נסה שוב.',
    suggestions: ['המלץ על ספר מתנה', 'ספרים לילדים', 'ספרות פופולרית', 'ספרי תכנות'],
  },
  gift: {
    title: 'צור מתנה',
    subtitle: 'הפוך את הספר שלך למיוחד עם עטיפת מתנה יפה',
    select_book: 'בחר ספר',
    wrapping_style: 'סגנון עטיפה',
    wrapping_classic: 'קלאסי',
    wrapping_modern: 'מודרני',
    wrapping_festive: 'חגיגי',
    wrapping_minimal: 'מינימליסטי',
    gift_message: 'הודעת מתנה',
    message_placeholder: 'כתוב הודעה אישית למקבל המתנה...',
    recipient_name: 'שם המקבל',
    preview: 'תצוגה מקדימה',
    add_to_cart: 'הוסף מתנה לעגלה',
    price_includes: 'המחיר כולל עטיפת מתנה',
  },
  common: {
    loading: 'טוען...',
    error: 'משהו השתבש',
    retry: 'נסה שוב',
    back: 'חזור',
    next: 'הבא',
    previous: 'הקודם',
    close: 'סגור',
    open: 'פתח',
    save: 'שמור',
    cancel: 'ביטול',
    delete: 'מחק',
    edit: 'ערוך',
    view: 'צפה',
    share: 'שתף',
    copy: 'העתק',
    copied: 'הועתק!',
    search: 'חפש',
    filter: 'סנן',
    sort: 'מיין',
    clear: 'נקה',
    apply: 'החל',
    reset: 'אפס',
    yes: 'כן',
    no: 'לא',
    ok: 'אישור',
    confirm: 'אשר',
    success: 'הצלחה',
    warning: 'אזהרה',
    info: 'מידע',
    new_badge: 'חדש',
    sale_badge: 'מבצע',
    out_of_stock_badge: 'אזל מהמלאי',
    currency_usd: 'דולר',
    currency_ils: 'שקל',
  },
  footer: {
    tagline: 'תן את הספר המושלם, עטוף בצורה יפה. ספרים בעברית ובאנגלית.',
    shop: 'קניות',
    all_books: 'כל הספרים',
    hebrew_books: 'ספרים בעברית',
    programming: 'תכנות',
    fiction: 'ספרות',
    about: 'אודות',
    contact: 'צור קשר',
    account: 'חשבון',
    sign_in: 'כניסה',
    register: 'הרשמה',
    my_orders: 'ההזמנות שלי',
    wishlist: 'רשימת משאלות',
    language_section: 'שפה / Language',
    rights: 'כל הזכויות שמורות.',
    payments: 'תשלומים מאובטחים על ידי Stripe',
    privacy: 'מדיניות פרטיות',
  },
};

export const translations: Record<Language, Translations> = { en, he };
