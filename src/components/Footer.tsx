'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Award, CheckCircle, ArrowRight } from 'lucide-react';

export default function Footer({ onOpenDemoModal }: { onOpenDemoModal?: () => void }) {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 border-t border-amber-500/20 pt-16 pb-8 relative overflow-hidden transition-colors duration-200">
      {/* Background glow accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-amber-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Institute Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border border-amber-400/50 bg-white p-0.5 shadow-md">
                <Image
                  src="/logo.png"
                  alt="Saraswati Career Counselling"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-base font-bold font-serif text-amber-200">
                  SARASWATI
                </h3>
                <p className="text-xs text-amber-400/90 font-medium tracking-wide">
                  CAREER COUNSELLING CENTRE
                </p>
                <p className="text-[10px] text-slate-400">
                  Right Guidance • Brighter Tomorrow
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Maharashtra's premier admission strategy consultancy. Assisting students and parents in securing seats in top engineering, medical, and pharmacy colleges across CAP rounds.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>100% Transparent • Data-Backed Predictions</span>
            </div>
          </div>

          {/* Col 2: Counselling Portals & Exams */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
              Admission Portals
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <span className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                  MHT-CET Engineering (COEP, VJTI, SPIT, PICT)
                </span>
              </li>
              <li>
                <span className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                  JEE Main (VNIT, IIIT Pune, NITs)
                </span>
              </li>
              <li>
                <span className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                  NEET Medical (MBBS, BDS, BAMS Govt/Pvt)
                </span>
              </li>
              <li>
                <span className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                  Direct Second Year Engineering (DSE)
                </span>
              </li>
              <li>
                <span className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                  Option Form Locking & Preference Strategy
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Portals */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
              Quick Portals
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/counsellor" className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-amber-300/90 font-medium">
                  <ArrowRight className="w-3 h-3 text-amber-400" />
                  Counsellor College Predictor & PDF Suite
                </Link>
              </li>
              <li>
                <Link href="/student" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-amber-400" />
                  Student Enrolment & Payment (₹6,000)
                </Link>
              </li>
              {onOpenDemoModal && (
                <li>
                  <button onClick={onOpenDemoModal} className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-left text-amber-400">
                    <ArrowRight className="w-3 h-3 text-amber-400" />
                    Book Free 1-on-1 Demo Session
                  </button>
                </li>
              )}
              <li>
                <a href="#pricing" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-amber-400" />
                  End-to-End Counselling Package Details
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Helpline */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
              Direct Contact
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href="tel:7387773164"
                className="flex items-start gap-2.5 text-slate-300 hover:text-amber-300 transition-colors p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40"
              >
                <Phone className="w-4 h-4 text-amber-400 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">+91 7387773164</div>
                  <div className="text-[10px] text-slate-400">Primary Admission Helpline</div>
                </div>
              </a>

              <a
                href="mailto:khotarearyan@gmail.com"
                className="flex items-start gap-2.5 text-slate-300 hover:text-amber-300 transition-colors p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40"
              >
                <Mail className="w-4 h-4 text-amber-400 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">khotarearyan@gmail.com</div>
                  <div className="text-[10px] text-slate-400">Official Inquiries & Support</div>
                </div>
              </a>

              <div className="flex items-start gap-2 text-slate-400 pt-1">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Maharashtra, India (Online Counselling PAN-India)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Saraswati Career Counselling Centre. All rights reserved.</p>
          <div className="flex items-center gap-6 text-slate-400">
            <span>JEE • MHT-CET • NEET • ADMISSIONS • CAREER GUIDANCE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
