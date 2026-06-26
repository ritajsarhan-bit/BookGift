-- Seed categories and books for BookGift
-- Run this in Supabase SQL Editor

-- Insert categories
INSERT INTO categories (id, name, "nameHe", slug, description) VALUES
('cat-1', 'Programming', 'תכנות', 'programming', 'Books about software development and coding'),
('cat-2', 'Fiction', 'ספרות', 'fiction', 'Novels and short stories'),
('cat-3', 'Science', 'מדע', 'science', 'Scientific books and discoveries'),
('cat-4', 'Children', 'ילדים', 'children', 'Books for children and young readers'),
('cat-5', 'History', 'היסטוריה', 'history', 'Historical books and biographies'),
('cat-6', 'Self Help', 'עזרה עצמית', 'self-help', 'Personal development and motivation'),
('cat-7', 'Hebrew Literature', 'ספרות עברית', 'hebrew-literature', 'Books in Hebrew language'),
('cat-8', 'Business', 'עסקים', 'business', 'Business, economics and entrepreneurship')
ON CONFLICT (slug) DO NOTHING;

-- Insert books
INSERT INTO books (id, title, author, description, price, "discountPrice", language, stock, rating, "reviewCount", featured, published, "categoryId", "createdAt", "updatedAt") VALUES

-- Programming books
('book-1', 'Clean Code', 'Robert C. Martin', 'A handbook of agile software craftsmanship. Learn to write clean, maintainable, and efficient code that your team will love working with.', 39.99, 29.99, 'en', 50, 4.8, 1240, true, true, 'cat-1', now(), now()),
('book-2', 'The Pragmatic Programmer', 'David Thomas, Andrew Hunt', 'Your journey to mastery. This classic guide will help you become a better programmer with practical advice and real-world examples.', 44.99, 34.99, 'en', 40, 4.7, 980, true, true, 'cat-1', now(), now()),
('book-3', 'JavaScript: The Good Parts', 'Douglas Crockford', 'Discover the beauty and simplicity of JavaScript. This book focuses on the good parts of JavaScript that make it a powerful language.', 29.99, NULL, 'en', 60, 4.5, 750, false, true, 'cat-1', now(), now()),
('book-4', 'Introduction to Algorithms', 'Thomas H. Cormen', 'The bible of algorithms. Comprehensive coverage of algorithms and data structures used in computer science and software engineering.', 89.99, 69.99, 'en', 30, 4.6, 620, false, true, 'cat-1', now(), now()),
('book-5', 'Design Patterns', 'Gang of Four', 'Elements of Reusable Object-Oriented Software. The classic book that introduced design patterns to the programming world.', 54.99, 44.99, 'en', 35, 4.6, 890, true, true, 'cat-1', now(), now()),
('book-6', 'You Don''t Know JS', 'Kyle Simpson', 'A deep dive into the core mechanisms of JavaScript. Understand the language from the ground up and become a JavaScript expert.', 34.99, 24.99, 'en', 45, 4.7, 560, false, true, 'cat-1', now(), now()),
('book-7', 'Python Crash Course', 'Eric Matthes', 'A hands-on, project-based introduction to Python programming. Perfect for beginners who want to learn Python quickly and effectively.', 35.99, 27.99, 'en', 70, 4.8, 1100, true, true, 'cat-1', now(), now()),
('book-8', 'The Art of Computer Programming', 'Donald Knuth', 'The definitive reference on algorithms and data structures by one of the greatest computer scientists of all time.', 149.99, 119.99, 'en', 20, 4.9, 430, false, true, 'cat-1', now(), now()),

-- Fiction books
('book-9', 'The Great Gatsby', 'F. Scott Fitzgerald', 'A story of the mysteriously wealthy Jay Gatsby and his love for Daisy Buchanan set against the Jazz Age of the 1920s.', 12.99, 9.99, 'en', 100, 4.4, 2100, true, true, 'cat-2', now(), now()),
('book-10', 'To Kill a Mockingbird', 'Harper Lee', 'A gripping tale of racial injustice and the loss of innocence in the American South, told through the eyes of young Scout Finch.', 13.99, NULL, 'en', 80, 4.8, 3200, true, true, 'cat-2', now(), now()),
('book-11', '1984', 'George Orwell', 'A haunting vision of a totalitarian future where Big Brother watches your every move. One of the most influential novels ever written.', 14.99, 11.99, 'en', 90, 4.7, 2800, true, true, 'cat-2', now(), now()),
('book-12', 'Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling', 'The magical story of a boy who discovers he is a wizard and begins his education at Hogwarts School of Witchcraft and Wizardry.', 19.99, 14.99, 'en', 120, 4.9, 5600, true, true, 'cat-2', now(), now()),
('book-13', 'The Hobbit', 'J.R.R. Tolkien', 'The classic tale of Bilbo Baggins, a hobbit who is swept into an epic quest to reclaim the lost dwarf kingdom of Erebor.', 16.99, 12.99, 'en', 75, 4.8, 3100, false, true, 'cat-2', now(), now()),
('book-14', 'Pride and Prejudice', 'Jane Austen', 'The beloved story of Elizabeth Bennet and Mr. Darcy, a timeless tale of love, class, and social expectations in 19th century England.', 11.99, NULL, 'en', 85, 4.7, 2400, false, true, 'cat-2', now(), now()),
('book-15', 'The Alchemist', 'Paulo Coelho', 'A magical story about following your dreams and listening to your heart. One of the best-selling books in history, translated worldwide.', 15.99, 12.99, 'en', 95, 4.6, 4200, true, true, 'cat-2', now(), now()),
('book-16', 'Dune', 'Frank Herbert', 'The epic science fiction masterpiece set on the desert planet Arrakis. A story of politics, religion, and human survival.', 18.99, 14.99, 'en', 60, 4.7, 1900, true, true, 'cat-2', now(), now()),

-- Science books
('book-17', 'A Brief History of Time', 'Stephen Hawking', 'A landmark volume in science writing that makes the most complex topics in physics accessible to everyone. A must-read classic.', 18.99, 14.99, 'en', 55, 4.7, 1800, true, true, 'cat-3', now(), now()),
('book-18', 'The Selfish Gene', 'Richard Dawkins', 'A revolutionary book that introduced the gene-centered view of evolution. One of the most important science books of the 20th century.', 19.99, NULL, 'en', 40, 4.5, 980, false, true, 'cat-3', now(), now()),
('book-19', 'Cosmos', 'Carl Sagan', 'Carl Sagan takes us on a journey through the universe with stunning descriptions of space, time, and human exploration of the cosmos.', 22.99, 17.99, 'en', 50, 4.8, 1400, true, true, 'cat-3', now(), now()),
('book-20', 'The Gene', 'Siddhartha Mukherjee', 'An intimate history of the gene, told through the prism of science, society, and the personal history of the author''s family.', 24.99, 19.99, 'en', 35, 4.6, 720, false, true, 'cat-3', now(), now()),

-- Children books
('book-21', 'The Very Hungry Caterpillar', 'Eric Carle', 'The classic picture book that has delighted children for generations. Follow a hungry caterpillar as he eats his way through the week.', 9.99, 7.99, 'en', 150, 4.9, 4500, true, true, 'cat-4', now(), now()),
('book-22', 'Where the Wild Things Are', 'Maurice Sendak', 'Max puts on his wolf suit and sails to the land where the wild things are in this timeless picture book masterpiece.', 10.99, NULL, 'en', 120, 4.8, 3200, false, true, 'cat-4', now(), now()),
('book-23', 'Charlie and the Chocolate Factory', 'Roald Dahl', 'Charlie Bucket wins a golden ticket to visit Willy Wonka''s mysterious chocolate factory in this delightful children''s classic.', 13.99, 10.99, 'en', 100, 4.8, 2800, true, true, 'cat-4', now(), now()),
('book-24', 'The Little Prince', 'Antoine de Saint-Exupery', 'A young prince travels the universe learning about the nature of love and friendship in this beautiful philosophical tale.', 12.99, 9.99, 'en', 90, 4.9, 3800, true, true, 'cat-4', now(), now()),

-- History books
('book-25', 'Sapiens', 'Yuval Noah Harari', 'A brief history of humankind from the Stone Age to the 21st century. One of the most thought-provoking books of our generation.', 24.99, 18.99, 'en', 65, 4.7, 3100, true, true, 'cat-5', now(), now()),
('book-26', 'Homo Deus', 'Yuval Noah Harari', 'A bold vision of tomorrow exploring what may happen to jobs, wars, politics and everyday life when algorithms know us better than we know ourselves.', 22.99, 17.99, 'en', 55, 4.5, 1800, true, true, 'cat-5', now(), now()),
('book-27', 'The Diary of a Young Girl', 'Anne Frank', 'The moving diary of Anne Frank, written while hiding from the Nazis. One of the most important documents of the 20th century.', 14.99, NULL, 'en', 80, 4.9, 4200, false, true, 'cat-5', now(), now()),
('book-28', 'Guns, Germs, and Steel', 'Jared Diamond', 'The fates of human societies — a fascinating account of why Western civilization has come to dominate the world.', 19.99, 15.99, 'en', 45, 4.5, 1200, false, true, 'cat-5', now(), now()),

-- Self Help books
('book-29', 'Atomic Habits', 'James Clear', 'An easy and proven way to build good habits and break bad ones. The definitive guide to making tiny changes that deliver remarkable results.', 26.99, 19.99, 'en', 85, 4.8, 4800, true, true, 'cat-6', now(), now()),
('book-30', 'The 7 Habits of Highly Effective People', 'Stephen R. Covey', 'A principle-centered approach for solving personal and professional problems. One of the most influential business books ever written.', 22.99, 17.99, 'en', 70, 4.6, 3200, false, true, 'cat-6', now(), now()),
('book-31', 'Thinking, Fast and Slow', 'Daniel Kahneman', 'Nobel Prize winner Daniel Kahneman explains the two systems that drive the way we think and make choices in this groundbreaking work.', 24.99, 19.99, 'en', 60, 4.6, 2100, true, true, 'cat-6', now(), now()),
('book-32', 'The Power of Now', 'Eckhart Tolle', 'A guide to spiritual enlightenment focusing on the importance of living in the present moment and the peace it can bring.', 18.99, 14.99, 'en', 55, 4.5, 1900, false, true, 'cat-6', now(), now()),

-- Hebrew Literature
('book-33', 'מישהו לרוץ איתו', 'דוד גרוסמן', 'רומן מרגש ומלא חיים על נוער ירושלמי. סיפור על אהבה, חברות ועצמאות בעיר הקדושה.', 79.00, 65.00, 'he', 40, 4.7, 890, true, true, 'cat-7', now(), now()),
('book-34', 'לאן נעלמה מרים', 'אמיר גוטפרוינד', 'רומן מרתק על משפחה ישראלית וסודות שנחשפים לאורך דורות. יצירה מופת של הספרות העברית המודרנית.', 74.00, NULL, 'he', 35, 4.6, 650, false, true, 'cat-7', now(), now()),
('book-35', 'הנוסע ממונרוביה', 'אריה שרנסקי', 'מסע מרתק בין תרבויות ועולמות. רומן פילוסופי על זהות, שייכות ומשמעות החיים.', 69.00, 55.00, 'he', 30, 4.4, 420, false, true, 'cat-7', now(), now()),
('book-36', 'אורות', 'הרב קוק', 'יצירת מופת של הספרות הדתית העברית. הגות עמוקה על אמונה, לאומיות ורוחניות.', 59.00, NULL, 'he', 25, 4.8, 380, false, true, 'cat-7', now(), now()),

-- Business books
('book-37', 'Zero to One', 'Peter Thiel', 'Notes on startups and how to build the future. Peter Thiel shares the contrarian thinking that built PayPal and funded Facebook.', 27.99, 21.99, 'en', 60, 4.6, 2200, true, true, 'cat-8', now(), now()),
('book-38', 'The Lean Startup', 'Eric Ries', 'How today''s entrepreneurs use continuous innovation to create radically successful businesses. A must-read for every founder.', 25.99, 19.99, 'en', 55, 4.5, 1800, true, true, 'cat-8', now(), now()),
('book-39', 'Good to Great', 'Jim Collins', 'Why some companies make the leap and others don''t. A rigorous study of what separates truly great companies from their competitors.', 23.99, NULL, 'en', 45, 4.5, 1400, false, true, 'cat-8', now(), now()),
('book-40', 'Rich Dad Poor Dad', 'Robert Kiyosaki', 'What the rich teach their kids about money that the poor and middle class do not. A classic guide to financial independence.', 19.99, 14.99, 'en', 80, 4.4, 3600, true, true, 'cat-8', now(), now())

ON CONFLICT (id) DO NOTHING;
