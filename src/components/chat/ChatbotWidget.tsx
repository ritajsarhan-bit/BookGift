"use client";

import { useState } from "react";

// AI CHATBOT PLACEHOLDER
// This is a non-functional UI shell. Wire it to an assistant endpoint later
// (e.g. a /api/chat route backed by the Claude API). For now it echoes a
// canned reply so the experience can be designed and reviewed.

interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
}

const greeting: Message = {
  id: 0,
  role: "bot",
  text: "Hi! I'm Margin, your reading companion. Looking for a gift? Tell me who it's for and I'll suggest a few books. ✨",
};

const suggestions = [
  "A gift for my dad",
  "Cozy mystery novels",
  "Best books for a 6-year-old",
];

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [draft, setDraft] = useState("");

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Message = { id: Date.now(), role: "user", text: trimmed };
    const botMsg: Message = {
      id: Date.now() + 1,
      role: "bot",
      text: "Thanks! I'm just a placeholder for now — soon I'll suggest perfect books and gift wraps from our catalog. 📚",
    };
    setMessages((m) => [...m, userMsg, botMsg]);
    setDraft("");
  }

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-ribbon text-white shadow-lift transition-transform hover:scale-105"
        aria-label="Open chat assistant"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 5h16v11H8l-4 4V5z" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[460px] w-[min(360px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-ink/10">
          <div className="flex items-center gap-3 bg-ribbon px-4 py-3 text-white">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 font-serif font-semibold">
              M
            </span>
            <div>
              <p className="text-sm font-semibold">Margin · AI Assistant</p>
              <p className="text-xs text-white/80">Placeholder · coming soon</p>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-paper px-4 py-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === "user" ? "flex justify-end" : "flex justify-start"
                }
              >
                <p
                  className={
                    m.role === "user"
                      ? "max-w-[80%] rounded-2xl rounded-br-sm bg-brand-500 px-3.5 py-2 text-sm text-white"
                      : "max-w-[85%] rounded-2xl rounded-bl-sm bg-white px-3.5 py-2 text-sm text-ink shadow-sm ring-1 ring-ink/5"
                  }
                >
                  {m.text}
                </p>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-ink/15 bg-white px-3 py-1.5 text-xs text-ink-soft hover:border-brand-300 hover:text-brand-600"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
            className="flex items-center gap-2 border-t border-ink/8 bg-white px-3 py-3"
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask for a recommendation…"
              className="flex-1 rounded-full border border-ink/15 bg-paper px-3.5 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brand-400 focus:outline-none"
            />
            <button
              type="submit"
              className="grid h-9 w-9 place-items-center rounded-full bg-brand-500 text-white transition-colors hover:bg-brand-600"
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
