import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the BookGift team.',
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <span className="text-5xl">✉️</span>
        <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Contact Us</h1>
        <p className="text-gray-500">We would love to hear from you!</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input type="text" placeholder="Jane Doe" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" placeholder="jane@example.com" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea rows={5} placeholder="How can we help?" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 resize-none" />
        </div>
        <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition-colors">
          Send Message
        </button>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Or email us directly at <a href="mailto:contact@bookgift.com" className="text-blue-700 hover:underline">contact@bookgift.com</a></p>
      </div>
    </div>
  );
}
