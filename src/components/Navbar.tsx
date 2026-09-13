'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Menu, X, Sparkles, User, ShieldCheck, FileSpreadsheet } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  onOpenPredictionModal?: () => void;
}

export default function Navbar({ onOpenPredictionModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/85 backdrop-blur-md border-b border-amber-500/20 text-slate-800 dark:text-white transition-colors duration-200">
      {/* Top micro-banner with Contact Info */}
      <div className="bg-gradient-to-r from-red-950 via-[#701a2b] to-red-950 border-b border-amber-500/30 px-4 py-1.5 text-xs text-white">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-amber-200">
            <a
              href="tel:7387773164"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold">+91 7387773164</span>
            </a>
            <span className="hidden sm:inline text-amber-500/50">|</span>
            <a
              href="mailto:khotarearyan@gmail.com"
              className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>khotarearyan@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-400/20 text-amber-300 border border-amber-400/30">
              ⚡ Admissions 2025-26 Open
            </span>
            <span className="text-amber-100/80 hidden md:inline text-[11px]">
              Maharashtra CAP & All India Counselling Specialists
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400/60 shadow-lg shadow-amber-500/20 group-hover:border-amber-400 transition-all bg-white p-0.5">
              <Image
                src="/logo.png"
                alt="Saraswati Career Counselling Centre"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider text-red-950 dark:text-amber-100 uppercase group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors font-serif">
                Saraswati
              </span>
              <span className="text-[11px] font-semibold tracking-widest text-amber-600 dark:text-amber-300/90 uppercase">
                Career Counselling Centre
              </span>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 tracking-wider">
                Right Guidance • Brighter Tomorrow
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/#programs"
              className="text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
            >
              Programs
            </Link>
            <Link
              href="/#how-it-works"
              className="text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/#pricing"
              className="text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
            >
              Enrol (₹6,000)
            </Link>
            <Link
              href="/#contact"
              className="text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/counsellor"
              className="text-amber-600 dark:text-amber-400 hover:text-amber-500 dark:hover:text-amber-300 flex items-center gap-1.5 transition-colors font-semibold"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Counsellor Portal</span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            {onOpenPredictionModal && (
              <button
                onClick={onOpenPredictionModal}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Get Prediction PDF
              </button>
            )}

            <Link
              href="/student"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-amber-400/60 text-slate-800 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-300 transition-all flex items-center gap-1.5"
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
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-amber-500/20 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/#programs"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400"
          >
            Programs (JEE, MHT-CET, NEET)
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400"
          >
            How It Works (Get PDF → Enrol)
          </Link>
          <Link
            href="/#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400"
          >
            Counselling Package (₹6,000)
          </Link>
          <Link
            href="/counsellor"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-amber-600 dark:text-amber-400 font-semibold"
          >
            Counsellor Portal & Predictor
          </Link>
          <Link
            href="/student"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-800 dark:text-amber-200"
          >
            Student Portal / Payment
          </Link>
          <div className="pt-2 flex flex-col gap-2">
            {onOpenPredictionModal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPredictionModal();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 text-center"
              >
                Get Free Prediction PDF
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
