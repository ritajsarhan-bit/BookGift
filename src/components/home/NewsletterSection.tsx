'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useLanguage } from '@/context/LanguageContext';
import { isValidEmail } from '@/lib/utils/formatting';

export default function NewsletterSection() {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const isHe = language === 'he';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      toast.error(isHe ? 'כתובת אימייל לא תקינה' : 'Please enter a valid email address');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
    toast.success(isHe ? 'נרשמת בהצלחה!' : 'You\'re subscribed!');
  };

  return (
    <section className="bg-gradient-to-br from-blue-700 to-indigo-800 py-16" dir={isHe ? 'rtl' : 'ltr'}>
      <div className="max-w-2xl mx-auto px-4 text-center text-white">
        <span className="text-4xl mb-4 block">📬</span>
        <h2 className="text-3xl font-bold mb-3">
          {isHe ? 'הישאר מעודכן' : 'Stay in the Loop'}
        </h2>
        <p className="text-blue-200 mb-8 text-lg">
          {isHe
            ? 'קבל המלצות ספרים, מבצעים בלעדיים ועדכונים ישירות למייל שלך'
            : 'Get book recommendations, exclusive deals, and updates delivered to your inbox'}
        </p>

        {submitted ? (
          <div className="bg-white/10 border border-white/20 rounded-2xl px-8 py-6 inline-block">
            <p className="text-2xl mb-2">🎉</p>
            <p className="font-semibold text-lg">
              {isHe ? 'תודה שנרשמת!' : 'Thank you for subscribing!'}
            </p>
            <p className="text-blue-200 text-sm mt-1">
              {isHe ? 'נשלח לך עדכונים בקרוב' : "We'll send you updates soon"}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isHe ? 'כתובת האימייל שלך' : 'Your email address'}
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors disabled:opacity-60 text-sm whitespace-nowrap"
            >
              {loading
                ? (isHe ? 'שולח...' : 'Subscribing...')
                : (isHe ? 'הרשם עכשיו' : 'Subscribe')}
            </button>
          </form>
        )}

        <p className="text-blue-300 text-xs mt-4">
          {isHe ? 'ניתן לבטל בכל עת. אנחנו לא שולחים ספאם.' : 'Unsubscribe anytime. We respect your privacy.'}
        </p>

        <div className="mt-10 grid grid-cols-3 gap-6 text-center">
          {[
            { num: '5,000+', label: isHe ? 'מנויים' : 'Subscribers', icon: '👥' },
            { num: '2×', label: isHe ? 'עדכונים בשבוע' : 'Updates/week', icon: '📅' },
            { num: '100%', label: isHe ? 'ללא ספאם' : 'Spam-free', icon: '✅' },
          ].map(({ num, label, icon }) => (
            <div key={label}>
              <p className="text-2xl mb-1">{icon}</p>
              <p className="text-xl font-bold">{num}</p>
              <p className="text-blue-300 text-xs">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
