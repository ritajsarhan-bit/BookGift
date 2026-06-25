'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-6xl mb-4">⚠️</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Something went wrong</h2>
        <p className="text-gray-500 mb-6">{error.message || 'An unexpected error occurred.'}</p>
        <button onClick={reset} className="btn-primary">Try Again</button>
      </div>
    </div>
  );
}
