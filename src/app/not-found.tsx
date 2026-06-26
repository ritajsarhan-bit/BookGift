import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl mb-6">📚</div>
      <h1 className="text-6xl font-bold text-blue-700 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you are looking for does not exist. It may have been moved or deleted.
      </p>
      <div className="flex gap-4">
        <Link href="/" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
          Go Home
        </Link>
        <Link href="/books" className="border border-blue-700 text-blue-700 hover:bg-blue-50 font-semibold px-6 py-3 rounded-xl transition-colors">
          Browse Books
        </Link>
      </div>
    </div>
  );
}
