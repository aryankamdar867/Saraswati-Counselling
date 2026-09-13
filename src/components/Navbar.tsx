'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Menu, X, Sparkles, User, ShieldCheck } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import InstagramIcon from './InstagramIcon';

interface NavbarProps {
  onOpenPredictionModal?: () => void;
}

export default function Navbar({ onOpenPredictionModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const instaUrl = 'https://www.instagram.com/saraswaticoaching1?stkn=MWh1eTZkbnIydjEzMg==';

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-stone-950/80 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 transition-colors duration-200">
      {/* Top subtle bar */}
      <div className="bg-stone-900 text-stone-300 border-b border-stone-800 px-4 py-1.5 text-[11px]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a
              href="tel:7387773164"
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>+91 7387773164</span>
            </a>
            <span className="hidden sm:inline text-stone-700">|</span>
            <a
              href="mailto:khotarearyan@gmail.com"
              className="hidden sm:flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-3 h-3 text-amber-400" />
              <span>khotarearyan@gmail.com</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={instaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-stone-300 hover:text-rose-400 transition-colors"
              title="Follow Saraswati Coaching on Instagram"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">@saraswaticoaching1</span>
            </a>
            <span className="text-stone-700 hidden sm:inline">|</span>
            <span className="text-amber-400/90 font-medium hidden md:inline">
              Admissions Guidance 2025-26
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-amber-500/40 bg-white p-0.5 shadow-sm group-hover:border-amber-500 transition-all">
              <Image
                src="/logo.png"
                alt="Saraswati Career Counselling Centre"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold tracking-wide text-stone-900 dark:text-stone-100 font-serif uppercase">
                Saraswati
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium tracking-wider text-amber-700 dark:text-amber-400 uppercase">
                Career Counselling Centre
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-stone-600 dark:text-stone-300">
            <Link href="/#programs" className="hover:text-amber-700 dark:hover:text-amber-300 transition-colors">
              Programs
            </Link>
            <Link href="/#how-it-works" className="hover:text-amber-700 dark:hover:text-amber-300 transition-colors">
              How It Works
            </Link>
            <Link href="/#pricing" className="hover:text-amber-700 dark:hover:text-amber-300 transition-colors">
              Fee & Enrolment
            </Link>
            <Link href="/#contact" className="hover:text-amber-700 dark:hover:text-amber-300 transition-colors">
              Contact
            </Link>
            <Link
              href="/counsellor"
              className="text-stone-700 dark:text-amber-300/90 hover:text-amber-700 dark:hover:text-amber-300 flex items-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Counsellor Portal</span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            {onOpenPredictionModal && (
              <button
                onClick={onOpenPredictionModal}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-stone-900 dark:bg-amber-500 hover:bg-stone-800 dark:hover:bg-amber-400 text-white dark:text-stone-950 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-amber-400 dark:text-stone-950" />
                <span>Get Prediction PDF</span>
              </button>
            )}

            <Link
              href="/student"
              className="px-3.5 py-2 rounded-xl text-xs font-medium bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-all flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              Student Portal
            </Link>
          </div>

          {/* Mobile Menu Actions */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 px-4 pt-2 pb-6 space-y-3 text-xs">
          <Link
            href="/#programs"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-700 dark:text-stone-300"
          >
            Programs (JEE, MHT-CET, NEET)
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-700 dark:text-stone-300"
          >
            How It Works
          </Link>
          <Link
            href="/#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-700 dark:text-stone-300"
          >
            Fee & Enrolment (₹6,000)
          </Link>
          <Link
            href="/counsellor"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-amber-700 dark:text-amber-400 font-semibold"
          >
            Counsellor Portal & Predictor
          </Link>
          <Link
            href="/student"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-700 dark:text-stone-300"
          >
            Student Portal
          </Link>
          <a
            href={instaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-2 text-rose-600 dark:text-rose-400 font-medium"
          >
            <InstagramIcon className="w-4 h-4 text-rose-400" />
            <span>Follow us on Instagram</span>
          </a>
          <div className="pt-2 flex flex-col gap-2">
            {onOpenPredictionModal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPredictionModal();
                }}
                className="w-full py-2.5 rounded-xl font-semibold bg-amber-500 text-stone-950 text-center"
              >
                Get Prediction PDF
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
