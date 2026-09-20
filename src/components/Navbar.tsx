'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Menu, X, Sparkles, User, ShieldCheck, Crown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import InstagramIcon from './InstagramIcon';

interface NavbarProps {
  onOpenPredictionModal?: () => void;
}

export default function Navbar({ onOpenPredictionModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const instaUrl = 'https://www.instagram.com/saraswaticoaching1?stkn=MWh1eTZkbnIydjEzMg==';

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-stone-950/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 transition-colors duration-200">
      {/* Top subtle bar */}
      <div className="bg-stone-900 text-stone-300 border-b border-stone-800 px-3 sm:px-4 py-1.5 text-[10px] sm:text-[11px]">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 sm:gap-4 truncate">
            <a
              href="tel:7387773164"
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors shrink-0"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>+91 7387773164</span>
            </a>
            <span className="hidden sm:inline text-stone-700">|</span>
            <a
              href="mailto:khotarearyan@gmail.com"
              className="hidden md:flex items-center gap-1.5 hover:text-amber-400 transition-colors truncate"
            >
              <Mail className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="truncate">khotarearyan@gmail.com</span>
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={instaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-stone-300 hover:text-rose-400 transition-colors"
              title="Follow Saraswati Coaching on Instagram"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden xs:inline sm:inline text-[10px] sm:text-[11px]">@saraswaticoaching1</span>
            </a>
            <span className="text-stone-700 hidden sm:inline">|</span>
            <span className="text-amber-400/90 font-medium hidden lg:inline">
              Admissions Guidance 2025-26
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-amber-500/40 bg-white p-0.5 shadow-sm group-hover:border-amber-500 transition-all shrink-0">
              <Image
                src="/logo.png"
                alt="Saraswati Career Counselling Centre"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-base font-bold tracking-wide text-stone-900 dark:text-stone-100 font-serif uppercase truncate">
                Saraswati
              </span>
              <span className="text-[9px] sm:text-[11px] font-medium tracking-wider text-amber-700 dark:text-amber-400 uppercase truncate">
                Career Counselling Centre
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-stone-600 dark:text-stone-300">
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
              <span>Counsellor</span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2 sm:gap-2.5">
            <ThemeToggle />

            {onOpenPredictionModal && (
              <button
                onClick={onOpenPredictionModal}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-stone-950 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-stone-950" />
                <span>Prediction PDF</span>
              </button>
            )}

            <Link
              href="/student"
              className="px-3 py-2 rounded-xl text-xs font-medium bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-all flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>Student</span>
            </Link>

            <Link
              href="/owner"
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-stone-900 dark:bg-stone-800 border border-amber-500/40 text-amber-400 hover:bg-stone-800 dark:hover:bg-stone-700 transition-all flex items-center gap-1.5 shadow-sm"
              title="Owner Executive Portal & Mastersheet"
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Owner</span>
            </Link>
          </div>

          {/* Mobile Menu Actions */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors touch-manipulation min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 px-4 pt-3 pb-6 space-y-3 text-xs shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            <Link
              href="/#programs"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900 font-medium transition-colors"
            >
              <span>Admission Programs (MHT-CET, JEE, NEET)</span>
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900 font-medium transition-colors"
            >
              <span>How AI Prediction Works</span>
            </Link>
            <Link
              href="/#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900 font-medium transition-colors"
            >
              <span>Mentorship Fee (₹6,000)</span>
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900 font-medium transition-colors"
            >
              <span>Contact & Helpline</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-stone-200 dark:border-stone-800/80 space-y-2">
            {onOpenPredictionModal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPredictionModal();
                }}
                className="w-full py-3 rounded-xl font-semibold bg-amber-500 hover:bg-amber-400 text-stone-950 text-center transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer touch-manipulation"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get Free Prediction PDF</span>
              </button>
            )}

            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <Link
                href="/student"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-2 rounded-xl font-medium bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 text-center flex items-center justify-center gap-1 text-[11px]"
              >
                <User className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Student</span>
              </Link>

              <Link
                href="/counsellor"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-2 rounded-xl font-medium bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 text-center flex items-center justify-center gap-1 text-[11px]"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Counsellor</span>
              </Link>

              <Link
                href="/owner"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-2 rounded-xl font-semibold bg-stone-900 dark:bg-stone-800 border border-amber-500/40 text-amber-400 text-center flex items-center justify-center gap-1 text-[11px]"
              >
                <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Owner</span>
              </Link>
            </div>

            <a
              href={instaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 text-rose-600 dark:text-rose-400 font-medium text-center hover:underline pt-1"
            >
              <InstagramIcon className="w-4 h-4 text-rose-500" />
              <span>Follow @saraswaticoaching1</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
