-- Additional 60 books seed data for BookGift
-- Run in Supabase SQL Editor after running seed-books.sql

INSERT INTO books (id, title, author, description, price, "discountPrice", language, stock, rating, "reviewCount", featured, published, "categoryId", "createdAt", "updatedAt") VALUES

-- More Programming books
('book-41', 'Structure and Interpretation of Computer Programs', 'Harold Abelson, Gerald Jay Sussman', 'Known as SICP, this legendary MIT textbook teaches fundamental principles of computer programming including abstraction, modularity, and programming paradigms.', 59.99, 44.99, 'en', 25, 4.9, 780, false, true, 'cat-1', now(), now()),
('book-42', 'Head First Design Patterns', 'Eric Freeman, Elisabeth Robson', 'A brain-friendly guide to design patterns. Learn patterns in a way that sticks using visual learning, puzzles, and real-world examples.', 49.99, 39.99, 'en', 40, 4.6, 650, false, true, 'cat-1', now(), now()),
('book-43', 'Refactoring', 'Martin Fowler', 'Improving the design of existing code. Learn how to improve code structure without changing its external behavior through step-by-step techniques.', 54.99, 42.99, 'en', 35, 4.7, 520, false, true, 'cat-1', now(), now()),
('book-44', 'Working Effectively with Legacy Code', 'Michael Feathers', 'Practical strategies for dealing with large, untested legacy code bases. Essential reading for any developer working on real-world software.', 52.99, NULL, 'en', 30, 4.5, 480, false, true, 'cat-1', now(), now()),
('book-45', 'Domain-Driven Design', 'Eric Evans', 'Tackling complexity in the heart of software. Learn how to model complex business domains effectively in your code.', 64.99, 49.99, 'en', 28, 4.6, 410, false, true, 'cat-1', now(), now()),
('book-46', 'The Phoenix Project', 'Gene Kim, Kevin Behr', 'A novel about IT, DevOps, and helping your business win. A compelling story that teaches modern software delivery practices.', 29.99, 22.99, 'en', 55, 4.7, 890, true, true, 'cat-1', now(), now()),
('book-47', 'Accelerate', 'Nicole Forsgren, Jez Humble', 'The science of lean software and DevOps. Building and scaling high performing technology organizations with data-backed research.', 34.99, 27.99, 'en', 40, 4.6, 560, false, true, 'cat-1', now(), now()),
('book-48', 'Continuous Delivery', 'Jez Humble, David Farley', 'Reliable software releases through build, test, and deployment automation. The definitive guide to modern software delivery pipelines.', 59.99, 46.99, 'en', 32, 4.5, 390, false, true, 'cat-1', now(), now()),
('book-49', 'The Docker Book', 'James Turnbull', 'Containerization is the new virtualization. Learn Docker from scratch and understand how to build, ship, and run applications in containers.', 39.99, 29.99, 'en', 45, 4.4, 620, false, true, 'cat-1', now(), now()),
('book-50', 'Kubernetes in Action', 'Marko Luksa', 'A comprehensive guide to Kubernetes. Learn how to deploy, manage, and scale containerized applications in production environments.', 59.99, 47.99, 'en', 38, 4.7, 480, false, true, 'cat-1', now(), now()),
('book-51', 'Learning React', 'Alex Banks, Eve Porcello', 'Functional web development with React and Redux. Build dynamic, high-performing web applications using the latest React features.', 44.99, 34.99, 'en', 50, 4.5, 720, false, true, 'cat-1', now(), now()),
('book-52', 'Node.js Design Patterns', 'Mario Casciaro', 'Master best practices for building efficient and scalable Node.js applications. Covers patterns, streams, and asynchronous programming.', 49.99, 39.99, 'en', 42, 4.6, 380, false, true, 'cat-1', now(), now()),
('book-53', 'TypeScript Deep Dive', 'Basarat Ali Syed', 'The definitive guide to TypeScript. Go from JavaScript to TypeScript with deep coverage of types, generics, and advanced patterns.', 34.99, 26.99, 'en', 48, 4.7, 540, false, true, 'cat-1', now(), now()),
('book-54', 'Database Internals', 'Alex Petrov', 'A deep dive into how distributed data systems work. Essential reading for engineers building or working with database systems.', 69.99, 54.99, 'en', 22, 4.7, 290, false, true, 'cat-1', now(), now()),
('book-55', 'Designing Data-Intensive Applications', 'Martin Kleppmann', 'The big ideas behind reliable, scalable, and maintainable systems. A thorough guide to modern data systems architecture.', 74.99, 59.99, 'en', 30, 4.9, 920, true, true, 'cat-1', now(), now()),

-- More Fiction books
('book-56', 'The Catcher in the Rye', 'J.D. Salinger', 'The story of Holden Caulfield, a teenager navigating alienation and identity in post-war America. A defining novel of teenage rebellion.', 13.99, NULL, 'en', 70, 4.3, 2400, false, true, 'cat-2', now(), now()),
('book-57', 'Brave New World', 'Aldous Huxley', 'A dystopian novel set in a futuristic World State where citizens are environmentally engineered into predetermined classes.', 14.99, 11.99, 'en', 65, 4.5, 1800, false, true, 'cat-2', now(), now()),
('book-58', 'The Road', 'Cormac McCarthy', 'A father and his son walk alone through burned America, heading through the ravaged landscape to the coast. Pulitzer Prize winner.', 15.99, 12.99, 'en', 55, 4.4, 1400, false, true, 'cat-2', now(), now()),
('book-59', 'Life of Pi', 'Yann Martel', 'A remarkable story of a young man who survives a disaster at sea and is marooned on a lifeboat with an adult Bengal tiger.', 16.99, 13.99, 'en', 60, 4.5, 1900, true, true, 'cat-2', now(), now()),
('book-60', 'The Kite Runner', 'Khaled Hosseini', 'A sweeping story of family, friendship, betrayal and salvation set against the backdrop of history in Afghanistan over several decades.', 15.99, NULL, 'en', 75, 4.7, 2600, true, true, 'cat-2', now(), now()),
('book-61', 'One Hundred Years of Solitude', 'Gabriel Garcia Marquez', 'The Buendia family across seven generations in the fictional town of Macondo. A masterpiece of magical realism and Nobel Prize-winning literature.', 17.99, 14.99, 'en', 50, 4.6, 1700, false, true, 'cat-2', now(), now()),
('book-62', 'The Name of the Rose', 'Umberto Eco', 'A historical murder mystery set in an Italian monastery in 1327. A thrilling mix of history, philosophy, and detective fiction.', 16.99, 13.99, 'en', 45, 4.4, 980, false, true, 'cat-2', now(), now()),
('book-63', 'Norwegian Wood', 'Haruki Murakami', 'A nostalgic story of loss and sexuality set in 1960s Tokyo. One of the most beloved modern Japanese novels translated worldwide.', 15.99, 12.99, 'en', 55, 4.5, 1500, false, true, 'cat-2', now(), now()),
('book-64', 'The Shadow of the Wind', 'Carlos Ruiz Zafon', 'A young boy discovers a forgotten book in the Cemetery of Forgotten Books in post-war Barcelona. A spellbinding literary mystery.', 16.99, 13.99, 'en', 48, 4.7, 1200, false, true, 'cat-2', now(), now()),
('book-65', 'Gone Girl', 'Gillian Flynn', 'A psychological thriller about the disappearance of Amy Dunne on the morning of her fifth wedding anniversary. Full of shocking twists.', 14.99, 11.99, 'en', 80, 4.3, 3200, true, true, 'cat-2', now(), now()),
('book-66', 'The Girl with the Dragon Tattoo', 'Stieg Larsson', 'A financial journalist and a brilliant hacker investigate a decades-old disappearance. The gripping first novel in the Millennium series.', 15.99, 12.99, 'en', 72, 4.4, 2800, false, true, 'cat-2', now(), now()),
('book-67', 'A Song of Ice and Fire', 'George R.R. Martin', 'The epic fantasy series that inspired Game of Thrones. A tale of power, betrayal, and survival in the Seven Kingdoms of Westeros.', 34.99, 27.99, 'en', 60, 4.7, 4100, true, true, 'cat-2', now(), now()),
('book-68', 'The Martian', 'Andy Weir', 'An astronaut is stranded alone on Mars and must use his ingenuity and humor to survive. A thrilling and scientifically accurate adventure.', 14.99, 11.99, 'en', 85, 4.7, 2900, true, true, 'cat-2', now(), now()),

-- More Science books
('book-69', 'The Emperor of All Maladies', 'Siddhartha Mukherjee', 'A biography of cancer — a sweeping epic of an inquiry into the origins of a disease that has shaped much of modern medicine.', 22.99, 17.99, 'en', 40, 4.8, 1200, true, true, 'cat-3', now(), now()),
('book-70', 'The Structure of Scientific Revolutions', 'Thomas S. Kuhn', 'One of the most influential works of history and philosophy of science. Introduced the concept of the paradigm shift to scientific thought.', 19.99, NULL, 'en', 35, 4.6, 680, false, true, 'cat-3', now(), now()),
('book-71', 'Thinking About Thinking', 'Jeremy Butterfield', 'An exploration of cognitive biases, logical fallacies, and the science of decision-making. How our minds trick us every day.', 21.99, 16.99, 'en', 42, 4.5, 520, false, true, 'cat-3', now(), now()),
('book-72', 'The Body: A Guide for Occupants', 'Bill Bryson', 'A joyful tour of your own body from one of the world''s most beloved writers. Entertaining and endlessly surprising.', 24.99, 19.99, 'en', 55, 4.7, 1600, true, true, 'cat-3', now(), now()),
('book-73', 'Surely You''re Joking, Mr. Feynman!', 'Richard Feynman', 'Adventures of a curious character. The Nobel Prize-winning physicist shares hilarious and insightful stories from his remarkable life.', 18.99, 14.99, 'en', 48, 4.8, 1900, true, true, 'cat-3', now(), now()),
('book-74', 'The Sixth Extinction', 'Elizabeth Kolbert', 'An unnatural history of the sixth mass extinction currently underway on Earth due to human activity. Pulitzer Prize winner.', 19.99, 15.99, 'en', 38, 4.5, 840, false, true, 'cat-3', now(), now()),

-- More Self-Help books
('book-75', 'Deep Work', 'Cal Newport', 'Rules for focused success in a distracted world. Learn to cultivate the ability to focus without distraction on cognitively demanding tasks.', 25.99, 19.99, 'en', 62, 4.7, 2400, true, true, 'cat-6', now(), now()),
('book-76', 'Man''s Search for Meaning', 'Viktor E. Frankl', 'A psychiatrist and Holocaust survivor''s account of finding meaning in suffering. One of the most influential books of the 20th century.', 14.99, 11.99, 'en', 70, 4.9, 3800, true, true, 'cat-6', now(), now()),
('book-77', 'The Subtle Art of Not Giving a F*ck', 'Mark Manson', 'A counterintuitive approach to living a good life. Reject the constant positivity and instead embrace limitations and failures.', 22.99, 17.99, 'en', 80, 4.5, 4200, true, true, 'cat-6', now(), now()),
('book-78', 'Mindset', 'Carol S. Dweck', 'The new psychology of success. Discover how the view you adopt for yourself profoundly affects how you lead your life.', 19.99, 15.99, 'en', 65, 4.6, 2600, false, true, 'cat-6', now(), now()),
('book-79', 'The Miracle Morning', 'Hal Elrod', 'The not-so-obvious secret guaranteed to transform your life before 8am. A morning routine that can change your life.', 18.99, 14.99, 'en', 55, 4.4, 1800, false, true, 'cat-6', now(), now()),
('book-80', 'Ikigai', 'Hector Garcia, Francesc Miralles', 'The Japanese secret to a long and happy life. Discover your ikigai — the reason for being that gives your life purpose and meaning.', 19.99, 15.99, 'en', 70, 4.6, 2100, true, true, 'cat-6', now(), now()),
('book-81', 'The 4-Hour Workweek', 'Tim Ferriss', 'Escape the 9-5, live anywhere, and join the new rich. A step-by-step guide to designing your dream lifestyle.', 24.99, 19.99, 'en', 58, 4.3, 2800, false, true, 'cat-6', now(), now()),
('book-82', 'Grit', 'Angela Duckworth', 'The power of passion and perseverance. Angela Duckworth shows that the secret to outstanding achievement is not talent but grit.', 22.99, 17.99, 'en', 62, 4.5, 1900, false, true, 'cat-6', now(), now()),

-- More Business books
('book-83', 'Start with Why', 'Simon Sinek', 'How great leaders inspire everyone to take action. The golden circle concept explains why some organizations achieve far more than others.', 23.99, 18.99, 'en', 68, 4.6, 2800, true, true, 'cat-8', now(), now()),
('book-84', 'Thinking in Bets', 'Annie Duke', 'Making smarter decisions when you don''t have all the facts. A former poker champion applies decision-making strategies to everyday life.', 24.99, 19.99, 'en', 45, 4.4, 980, false, true, 'cat-8', now(), now()),
('book-85', 'The Hard Thing About Hard Things', 'Ben Horowitz', 'Building a business when there are no easy answers. Invaluable advice from a venture capitalist who has been in the trenches.', 27.99, 21.99, 'en', 52, 4.7, 1800, true, true, 'cat-8', now(), now()),
('book-86', 'Crossing the Chasm', 'Geoffrey A. Moore', 'Marketing and selling disruptive products to mainstream customers. The bible of high-tech marketing strategy.', 26.99, 20.99, 'en', 38, 4.5, 1100, false, true, 'cat-8', now(), now()),
('book-87', 'Measure What Matters', 'John Doerr', 'How Google, Bono, and the Gates Foundation rock the world with OKRs. The definitive guide to objective and key results.', 28.99, 22.99, 'en', 48, 4.5, 1400, false, true, 'cat-8', now(), now()),
('book-88', 'Never Split the Difference', 'Chris Voss', 'Negotiating as if your life depended on it. An ex-FBI hostage negotiator reveals the negotiation skills that will change your life.', 25.99, 20.99, 'en', 65, 4.7, 2900, true, true, 'cat-8', now(), now()),
('book-89', 'Built to Last', 'Jim Collins, Jerry I. Porras', 'Successful habits of visionary companies. A fascinating study of enduring great companies and what makes them tick.', 22.99, NULL, 'en', 40, 4.4, 1200, false, true, 'cat-8', now(), now()),
('book-90', 'Hooked', 'Nir Eyal', 'How to build habit-forming products. The book that shows you how to design products that people use compulsively without advertising.', 24.99, 19.99, 'en', 55, 4.5, 1600, false, true, 'cat-8', now(), now()),

-- More Hebrew books
('book-91', 'עת לאהוב', 'אהרון מגד', 'אחד הרומנים הגדולים של הספרות העברית. סיפור אהבה עז ומרגש על רקע ישראל של שנות החמישים.', 72.00, 58.00, 'he', 30, 4.6, 420, false, true, 'cat-7', now(), now()),
('book-92', 'חיי אהבה', 'חיים באר', 'רומן מופתי על אהבה, בגידה ותמימות שנוטלת בהיסח הדעת. יצירה מרגשת ועמוקה של הספרות העברית.', 76.00, 62.00, 'he', 28, 4.5, 380, false, true, 'cat-7', now(), now()),
('book-93', 'ימים כלילות', 'אורי אורלב', 'ספר ילדים ועוסק בשואה. סיפור על ילד יהודי שנאלץ להתמודד עם הנאצים בפולין. ספר חשוב לכל גיל.', 68.00, NULL, 'he', 35, 4.8, 560, false, true, 'cat-7', now(), now()),
('book-94', 'אל תגיד לילה', 'אמנון שמוש', 'רומן מרתק ומלא מתח על ישראל בתקופת מלחמת לבנון. כתיבה מרהיבה ועלילה מסחררת.', 74.00, 60.00, 'he', 25, 4.4, 290, false, true, 'cat-7', now(), now()),
('book-95', 'המאהב', 'א.ב. יהושע', 'אחד הרומנים החשובים ביותר בספרות העברית המודרנית. סיפור על אהבה, מלחמה וזהות ישראלית.', 78.00, NULL, 'he', 32, 4.7, 640, true, true, 'cat-7', now(), now()),
('book-96', 'מר מני', 'א.ב. יהושע', 'חמישה שיחות על פני מאה שנה. רומן יוצא דופן על משפחה יהודית לאורך הדורות.', 74.00, 60.00, 'he', 28, 4.5, 410, false, true, 'cat-7', now(), now()),
('book-97', 'צמרות', 'שי מורנו', 'ספר שירה מרגש ועמוק על טבע, אדם ומקום. מהספרים הפואטיים היפים שיצאו בשנים האחרונות.', 65.00, NULL, 'he', 20, 4.6, 180, false, true, 'cat-7', now(), now()),
('book-98', 'מה שרואים מכאן', 'שרי שפירא', 'רומן עכשווי ומרתק על ישראלים בעידן המודרני. כתיבה חדה ורגישה על יחסים, זהות וחיים.', 72.00, 58.00, 'he', 22, 4.4, 220, false, true, 'cat-7', now(), now()),
('book-99', 'אחות', 'ויקי שירן', 'רומן ביכורים מרגש על שתי אחיות, אהבה ואובדן. קול ספרותי חדש ומבטיח בספרות העברית.', 70.00, 56.00, 'he', 18, 4.5, 160, false, true, 'cat-7', now(), now()),
('book-100', 'לבד', 'שמעון אדף', 'שירה וסיפורת המשלבים בין עברית לשפות נוספות. יצירה פורצת גבולות ומרתקת.', 68.00, NULL, 'he', 15, 4.6, 140, false, true, 'cat-7', now(), now())

ON CONFLICT (id) DO NOTHING;
