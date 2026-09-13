'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

export default function Footer({ onOpenDemoModal }: { onOpenDemoModal?: () => void }) {
  const instaUrl = 'https://www.instagram.com/saraswaticoaching1?stkn=MWh1eTZkbnIydjEzMg==';

  return (
    <footer className="bg-stone-900 text-stone-400 border-t border-stone-800 pt-14 pb-8 transition-colors duration-200 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-stone-800/80">
          
          {/* Col 1: Institute Info */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-amber-500/30 bg-white p-0.5 shadow-sm">
                <Image
                  src="/logo.png"
                  alt="Saraswati Career Counselling"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-sm font-bold font-serif text-stone-100 uppercase tracking-wide">
                  Saraswati
                </h3>
                <p className="text-[10px] text-amber-400/90 font-medium tracking-wider uppercase">
                  Career Counselling Centre
                </p>
              </div>
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Premier admission strategists in Maharashtra. Assisting students and parents with data-backed college predictions and CAP option form locking.
            </p>
            <div className="pt-1">
              <a
                href={instaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 border border-stone-700 text-stone-300 hover:text-rose-400 transition-all text-[11px]"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-rose-400" />
                <span>Follow on Instagram</span>
                <ArrowUpRight className="w-3 h-3 text-stone-500" />
              </a>
            </div>
          </div>

          {/* Col 2: Counselling Portals & Exams */}
          <div>
            <h4 className="text-xs font-semibold text-stone-200 uppercase tracking-wider mb-3.5">
              Admission Streams
            </h4>
            <ul className="space-y-2 text-[11px] text-stone-400">
              <li>MHT-CET Engineering (COEP, VJTI, SPIT, PICT)</li>
              <li>JEE Main & JoSAA / CSAB Special Rounds</li>
              <li>NEET Medical (MBBS, BDS, BAMS Govt/Private)</li>
              <li>Direct Second Year Engineering (DSE)</li>
              <li>TFWS & EWS 100% Tuition Fee Waiver Guidance</li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-stone-200 uppercase tracking-wider mb-3.5">
              Quick Portals
            </h4>
            <ul className="space-y-2 text-[11px] text-stone-400">
              <li>
                <Link href="/counsellor" className="hover:text-amber-400 transition-colors">
                  Counsellor Predictor Suite
                </Link>
              </li>
              <li>
                <Link href="/student" className="hover:text-amber-400 transition-colors">
                  Student Portal & Enrolment (₹6,000)
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-amber-400 transition-colors">
                  How AI Prediction Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-amber-400 transition-colors">
                  Full Counselling Package Details
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Helpline */}
          <div>
            <h4 className="text-xs font-semibold text-stone-200 uppercase tracking-wider mb-3.5">
              Contact & Support
            </h4>
            <div className="space-y-2.5 text-[11px]">
              <a
                href="tel:7387773164"
                className="flex items-center gap-2 text-stone-300 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>+91 7387773164</span>
              </a>

              <a
                href="mailto:khotarearyan@gmail.com"
                className="flex items-center gap-2 text-stone-300 hover:text-amber-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">khotarearyan@gmail.com</span>
              </a>

              <a
                href={instaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-stone-300 hover:text-rose-400 transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>@saraswaticoaching1</span>
              </a>

              <div className="flex items-center gap-2 text-stone-400 pt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Maharashtra, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} Saraswati Career Counselling Centre. Right Guidance • Brighter Tomorrow.</p>
          <div className="flex items-center gap-4 text-stone-500">
            <span>JEE • MHT-CET • NEET</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
