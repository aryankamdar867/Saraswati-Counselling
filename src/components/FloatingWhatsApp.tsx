'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = '917387773164';
  const defaultMessage = encodeURIComponent(
    'Hello Saraswati Career Counselling Centre, I would like to get admission counselling guidance.'
  );
  const instaUrl = 'https://www.instagram.com/saraswaticoaching1?stkn=MWh1eTZkbnIydjEzMg==';

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2 sm:gap-2.5">
      {/* Subtle WhatsApp & Instagram Floating Action Buttons */}
      <div className="flex flex-col gap-2">
        {/* Instagram quick link */}
        <a
          href={instaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:text-rose-500 border border-stone-200 dark:border-stone-800 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 touch-manipulation"
          title="Instagram @saraswaticoaching1"
          aria-label="Instagram Profile"
        >
          <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 transition-transform group-hover:scale-110" />
        </a>

        {/* WhatsApp Action Button */}
        <a
          href={`https://wa.me/${phoneNumber}?text=${defaultMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 touch-manipulation"
          title="Chat on WhatsApp (+91 7387773164)"
          aria-label="Chat with Counsellor on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-emerald-600" />
        </a>
      </div>
    </div>
  );
}
