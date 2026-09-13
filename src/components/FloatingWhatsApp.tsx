'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);
  const phoneNumber = '917387773164';
  const defaultMessage = encodeURIComponent(
    'Hello Saraswati Career Counselling Centre, I would like to get admission counselling guidance.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Interactive Tooltip Card */}
      {showTooltip && (
        <div className="relative bg-white dark:bg-slate-900 border border-amber-500/40 text-slate-800 dark:text-slate-100 p-3 rounded-2xl shadow-2xl max-w-xs text-xs space-y-1.5 animate-bounce-short">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="absolute top-1.5 right-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white p-0.5"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Need Admission Guidance?</span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-300">
            Chat directly with our senior admission counsellor on WhatsApp!
          </p>
        </div>
      )}

      {/* WhatsApp Action Button */}
      <a
        href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl shadow-emerald-600/40 transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Chat with Counsellor on WhatsApp"
      >
        {/* Animated Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-40 animate-ping pointer-events-none" />

        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 fill-white text-emerald-500 group-hover:rotate-12 transition-transform duration-200" />
      </a>
    </div>
  );
}
