/**
 * Seed file — fills the database with sample categories, books, and an admin user.
 * Run with: npm run db:seed
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ── Admin user ──────────────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@bookstore.com' },
    update: {},
    create: {
      email: 'admin@bookstore.com',
      name: 'Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Sample regular user
  const userPassword = await bcrypt.hash('user123', 12);
  await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Demo User',
      password: userPassword,
      role: 'USER',
    },
  });
  console.log('✅ Demo user created: user@example.com');

  // ── Categories ──────────────────────────────────────────────────────────
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'programming' },
      update: {},
      create: {
        name: 'Programming',
        nameHe: 'תכנות',
        slug: 'programming',
        description: 'Software development and coding books',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'fiction' },
      update: {},
      create: {
        name: 'Fiction',
        nameHe: 'בדיה',
        slug: 'fiction',
        description: 'Novels and storytelling',
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'science' },
      update: {},
      create: {
        name: 'Science',
        nameHe: 'מדע',
        slug: 'science',
        description: 'Physics, biology, chemistry and more',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'history' },
      update: {},
      create: {
        name: 'History',
        nameHe: 'היסטוריה',
        slug: 'history',
        description: 'World history and biographies',
        image: 'https://images.unsplash.com/photo-1461360370896-d0f93b083f21?w=400',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'children' },
      update: {},
      create: {
        name: "Children's Books",
        nameHe: 'ספרי ילדים',
        slug: 'children',
        description: 'Books for young readers',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'business' },
      update: {},
      create: {
        name: 'Business',
        nameHe: 'עסקים',
        slug: 'business',
        description: 'Entrepreneurship, management, and finance',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400',
      },
    }),
  ]);
  console.log(`✅ ${categories.length} categories created`);

  const [programming, fiction, science, history, children, business] = categories;

  // ── Books ────────────────────────────────────────────────────────────────
  const booksData = [
    // --- Programming ---
    {
      title: 'JavaScript: The Good Parts',
      titleHe: 'JavaScript: החלקים הטובים',
      author: 'Douglas Crockford',
      description:
        'A deep-dive into the best features of JavaScript. Essential reading for any web developer wanting to write clean, reliable code.',
      descriptionHe:
        'צלילה עמוקה לתכונות הטובות ביותר של JavaScript. קריאה הכרחית לכל מפתח אינטרנט.',
      price: 29.99,
      discountPrice: 19.99,
      coverImage: 'https://covers.openlibrary.org/b/id/8267560-L.jpg',
      language: 'en',
      stock: 50,
      rating: 4.5,
      reviewCount: 230,
      featured: true,
      categoryId: programming.id,
      pages: 176,
      publisher: "O'Reilly Media",
    },
    {
      title: 'Clean Code',
      titleHe: 'קוד נקי',
      author: 'Robert C. Martin',
      description:
        'Learn to write code that is readable, maintainable, and professional. The classic guide to software craftsmanship.',
      descriptionHe: 'למד לכתוב קוד קריא, בר-תחזוקה ומקצועי.',
      price: 39.99,
      coverImage: 'https://covers.openlibrary.org/b/id/8408966-L.jpg',
      language: 'en',
      stock: 35,
      rating: 4.8,
      reviewCount: 512,
      featured: true,
      categoryId: programming.id,
      pages: 464,
      publisher: 'Prentice Hall',
    },
    {
      title: 'Python Crash Course',
      titleHe: 'קורס Python מהיר',
      author: 'Eric Matthes',
      description:
        'A hands-on, project-based introduction to programming in Python. Perfect for beginners with no prior experience.',
      descriptionHe: 'מבוא מעשי לתכנות Python. מושלם למתחילים ללא ניסיון קודם.',
      price: 34.99,
      discountPrice: 24.99,
      coverImage: 'https://covers.openlibrary.org/b/id/10302048-L.jpg',
      language: 'en',
      stock: 80,
      rating: 4.7,
      reviewCount: 890,
      featured: true,
      categoryId: programming.id,
      pages: 544,
      publisher: 'No Starch Press',
    },
    // --- Fiction ---
    {
      title: 'Harry Potter and the Sorcerer\'s Stone',
      titleHe: 'הארי פוטר ואבן החכמים',
      author: 'J.K. Rowling',
      authorHe: 'ג\'יי קיי רולינג',
      description:
        'The magical story of a young boy who discovers he is a wizard. The beginning of a beloved worldwide phenomenon.',
      descriptionHe: 'הסיפור הקסום של ילד צעיר שמגלה שהוא קוסם.',
      price: 14.99,
      coverImage: 'https://covers.openlibrary.org/b/id/10110415-L.jpg',
      language: 'en',
      stock: 100,
      rating: 4.9,
      reviewCount: 2500,
      featured: true,
      categoryId: fiction.id,
      pages: 309,
      publisher: 'Scholastic',
    },
    {
      title: '1984',
      titleHe: '1984',
      author: 'George Orwell',
      authorHe: 'ג\'ורג\' אורוול',
      description:
        'A dystopian social science fiction novel. A chilling portrait of a totalitarian society where Big Brother watches your every move.',
      descriptionHe: 'רומן מדע בדיוני דיסטופי. תמונה מצמררת של חברה טוטליטרית.',
      price: 12.99,
      coverImage: 'https://covers.openlibrary.org/b/id/8575753-L.jpg',
      language: 'en',
      stock: 60,
      rating: 4.7,
      reviewCount: 1800,
      featured: false,
      categoryId: fiction.id,
      pages: 328,
      publisher: 'Secker & Warburg',
    },
    // --- Hebrew books ---
    {
      title: 'סוף העולם, ימינה',
      titleHe: 'סוף העולם, ימינה',
      author: 'Noa Yedlin',
      authorHe: 'נועה ידלין',
      description:
        'A bestselling Israeli novel about life, love, and unexpected friendships in Tel Aviv.',
      descriptionHe: 'רומן ישראלי רב-מכר על חיים, אהבה וידידויות בלתי צפויות בתל אביב.',
      price: 18.99,
      coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      language: 'he',
      stock: 45,
      rating: 4.6,
      reviewCount: 320,
      featured: true,
      categoryId: fiction.id,
      pages: 280,
      publisher: 'Kinneret',
    },
    {
      title: 'JavaScript למתחילים',
      titleHe: 'JavaScript למתחילים',
      author: 'Amir Cohen',
      authorHe: 'אמיר כהן',
      description: 'Complete JavaScript guide written in Hebrew for Israeli developers.',
      descriptionHe: 'מדריך JavaScript מלא בעברית למפתחים ישראלים.',
      price: 24.99,
      coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400',
      language: 'he',
      stock: 30,
      rating: 4.3,
      reviewCount: 85,
      featured: false,
      categoryId: programming.id,
      pages: 320,
      publisher: 'Matar',
    },
    // --- Science ---
    {
      title: 'A Brief History of Time',
      titleHe: 'היסטוריה קצרה של הזמן',
      author: 'Stephen Hawking',
      description:
        'From the Big Bang to black holes, Hawking explains complex ideas of physics in accessible language.',
      descriptionHe: 'מהמפץ הגדול לחורים שחורים, הוקינג מסביר רעיונות מורכבים בשפה נגישה.',
      price: 16.99,
      coverImage: 'https://covers.openlibrary.org/b/id/8739161-L.jpg',
      language: 'en',
      stock: 40,
      rating: 4.6,
      reviewCount: 1200,
      featured: false,
      categoryId: science.id,
      pages: 212,
      publisher: 'Bantam Books',
    },
    // --- Business ---
    {
      title: 'Zero to One',
      titleHe: 'מאפס לאחד',
      author: 'Peter Thiel',
      description:
        'Notes on startups, or how to build the future. Peter Thiel shares his unconventional thinking about innovation.',
      descriptionHe: 'הערות על סטארט-אפים, או כיצד לבנות את העתיד.',
      price: 22.99,
      coverImage: 'https://covers.openlibrary.org/b/id/8478849-L.jpg',
      language: 'en',
      stock: 55,
      rating: 4.4,
      reviewCount: 670,
      featured: true,
      categoryId: business.id,
      pages: 224,
      publisher: 'Crown Business',
    },
    // --- Children ---
    {
      title: 'The Very Hungry Caterpillar',
      titleHe: 'הזחל הרעבתן מאוד',
      author: 'Eric Carle',
      description: "A beloved children's classic about a caterpillar's journey to becoming a butterfly.",
      descriptionHe: 'קלאסיקה לילדים על מסע של זחל להפוך לפרפר.',
      price: 9.99,
      coverImage: 'https://covers.openlibrary.org/b/id/8739420-L.jpg',
      language: 'en',
      stock: 120,
      rating: 4.9,
      reviewCount: 3200,
      featured: false,
      categoryId: children.id,
      pages: 26,
      publisher: 'Philomel Books',
    },
  ];

  for (const bookData of booksData) {
    await prisma.book.create({ data: bookData });
  }
  console.log(`✅ ${booksData.length} books created`);

  console.log('\n🎉 Database seeded successfully!');
  console.log('   Admin login: admin@bookstore.com / admin123');
  console.log('   User login:  user@example.com / user123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
