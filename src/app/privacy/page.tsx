import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'BookGift privacy policy and data usage information.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-gray-500 mb-10">Last updated: June 2026</p>

      <div className="space-y-8 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Information We Collect</h2>
          <p>We collect information you provide when creating an account, placing orders, or contacting us. This includes your name, email address, and shipping address.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">How We Use Your Information</h2>
          <p>We use your information to process orders, send order confirmations, and improve our service. We never sell your personal data to third parties.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Data Security</h2>
          <p>Your data is stored securely. Passwords are encrypted using industry-standard bcrypt hashing. Payments are processed securely through Stripe.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact</h2>
          <p>For privacy-related questions, contact us at <a href="mailto:contact@bookgift.com" className="text-blue-700 hover:underline">contact@bookgift.com</a>.</p>
        </section>
      </div>
    </div>
  );
}
