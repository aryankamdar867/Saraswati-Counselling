'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThreeCanvas from '@/components/ThreeCanvas';
import StudentPredictionRequestModal from '@/components/StudentPredictionRequestModal';
import {
  Sparkles,
  Compass,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  ShieldCheck,
  TrendingUp,
  BookOpen,
  GraduationCap,
  Send,
  MailCheck,
  ArrowUpRight
} from 'lucide-react';
import InstagramIcon from '@/components/InstagramIcon';

export default function LandingPage() {
  const [predictionModalOpen, setPredictionModalOpen] = useState(false);
  const instaUrl = 'https://www.instagram.com/saraswaticoaching1?stkn=MWh1eTZkbnIydjEzMg==';

  // Quick form state in hero
  const [quickForm, setQuickForm] = useState({
    studentName: '',
    email: '',
    phone: '',
    targetExam: 'MHT-CET',
    currentPercentile: ''
  });
  const [quickSubmitted, setQuickSubmitted] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest = {
      id: `req_${Date.now()}`,
      student_name: quickForm.studentName,
      studentName: quickForm.studentName,
      email: quickForm.email,
      phone: quickForm.phone,
      target_exam: quickForm.targetExam,
      targetExam: quickForm.targetExam,
      current_percentile: quickForm.currentPercentile ? parseFloat(quickForm.currentPercentile) : 95.0,
      currentPercentile: quickForm.currentPercentile ? parseFloat(quickForm.currentPercentile) : 95.0,
      category: 'OPEN',
      target_branch: 'Engineering / Medical',
      preferred_city: 'Maharashtra',
      status: 'pending_prediction',
      created_at: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      isNewAlert: true
    };

    const existing = JSON.parse(localStorage.getItem('saraswati_demo_requests') || '[]');
    localStorage.setItem('saraswati_demo_requests', JSON.stringify([newRequest, ...existing]));
    localStorage.setItem('saraswati_latest_prediction_request', JSON.stringify(newRequest));
    window.dispatchEvent(new Event('saraswati_new_request'));

    setQuickSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-100 flex flex-col font-sans transition-colors duration-200">
      <Navbar onOpenPredictionModal={() => setPredictionModalOpen(true)} />

      {/* --- HERO SECTION WITH 3D AMBIENT & CLEAN FORM --- */}
      <section className="relative min-h-[82vh] flex items-center justify-center px-3 sm:px-6 lg:px-8 py-8 sm:py-16 overflow-hidden">
        {/* Subtle Ambient 3D */}
        <ThreeCanvas />

        <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Refined Pitch */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
            {/* Subtle Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/60 dark:bg-stone-900 border border-stone-300/80 dark:border-stone-800 text-stone-700 dark:text-amber-400 text-[11px] sm:text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span>Admissions & Option Form Guidance 2025-26</span>
            </div>

            {/* Logo & Headline */}
            <div className="space-y-3">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-amber-500/40 bg-white p-0.5 shadow-sm shrink-0">
                  <Image
                    src="/logo.png"
                    alt="Saraswati Career Counselling"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div>
                  <h1 className="text-lg sm:text-2xl font-bold font-serif uppercase tracking-wider text-stone-900 dark:text-stone-100">
                    Saraswati
                  </h1>
                  <p className="text-[10px] sm:text-xs font-medium text-amber-700 dark:text-amber-400 uppercase tracking-widest">
                    Career Counselling Centre
                  </p>
                </div>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
                Right Guidance for a <br className="hidden sm:inline" />
                <span className="text-amber-700 dark:text-amber-300 font-serif italic">
                  Brighter Tomorrow.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Personalized admission mentorship for <strong>MHT-CET</strong>, <strong>JEE Main</strong>, and <strong>NEET</strong>. Get a data-backed college cutoff prediction report sent directly to your inbox.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-1">
              <button
                onClick={() => setPredictionModalOpen(true)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl font-semibold bg-stone-900 dark:bg-amber-500 hover:bg-stone-800 dark:hover:bg-amber-400 text-white dark:text-stone-950 transition-all text-xs shadow-sm flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 dark:text-stone-950" />
                <span>Get Free Prediction PDF</span>
              </button>

              <Link
                href="/counsellor"
                className="w-full sm:w-auto px-4 py-3 rounded-xl font-medium bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-850 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 transition-all text-xs flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Counsellor Portal</span>
              </Link>

              <a
                href={instaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-3.5 py-3 rounded-xl font-medium text-stone-700 dark:text-stone-400 hover:text-rose-500 bg-white/60 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 transition-all text-xs flex items-center justify-center gap-1.5"
                title="Instagram Profile"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-rose-500" />
                <span>@saraswaticoaching1</span>
              </a>
            </div>

            {/* Subtle Key Numbers */}
            <div className="pt-4 grid grid-cols-3 gap-2 sm:gap-4 border-t border-stone-200/80 dark:border-stone-800/80 max-w-lg mx-auto lg:mx-0 text-center sm:text-left">
              <div className="p-2 sm:p-0 rounded-lg bg-stone-100/50 dark:bg-stone-900/40 sm:bg-transparent">
                <div className="text-base sm:text-lg font-bold font-serif text-stone-900 dark:text-stone-100">99.4%</div>
                <div className="text-[10px] sm:text-[11px] text-stone-500">CAP Allocation</div>
              </div>
              <div className="p-2 sm:p-0 rounded-lg bg-stone-100/50 dark:bg-stone-900/40 sm:bg-transparent">
                <div className="text-base sm:text-lg font-bold font-serif text-stone-900 dark:text-stone-100">2,500+</div>
                <div className="text-[10px] sm:text-[11px] text-stone-500">Students Guided</div>
              </div>
              <div className="p-2 sm:p-0 rounded-lg bg-stone-100/50 dark:bg-stone-900/40 sm:bg-transparent">
                <div className="text-base sm:text-lg font-bold font-serif text-stone-900 dark:text-stone-100">1-on-1</div>
                <div className="text-[10px] sm:text-[11px] text-stone-500">Personal Mentor</div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Minimal Score Form Card */}
          <div className="lg:col-span-5 bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-2xl p-4 sm:p-7 shadow-sm text-left">
            {quickSubmitted ? (
              <div className="text-center py-6 space-y-3.5">
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <MailCheck className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold font-serif text-stone-900 dark:text-stone-100">
                    Request Received
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    Our counsellor is preparing your personalized AI Prediction PDF. It will be emailed to <strong className="text-stone-900 dark:text-stone-100 font-mono">{quickForm.email}</strong>.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setQuickSubmitted(false);
                    setQuickForm({ studentName: '', email: '', phone: '', targetExam: 'MHT-CET', currentPercentile: '' });
                  }}
                  className="text-xs text-amber-700 dark:text-amber-400 font-semibold hover:underline"
                >
                  Submit Another Score
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div>
                  <h3 className="text-base font-bold font-serif text-stone-900 dark:text-stone-100">
                    Request Prediction PDF
                  </h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    Free AI-generated cutoff report emailed directly to you.
                  </p>
                </div>

                <form onSubmit={handleQuickSubmit} className="space-y-3">
                  <div>
                    <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Student Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aryan Sharma"
                      value={quickForm.studentName}
                      onChange={(e) => setQuickForm({ ...quickForm, studentName: e.target.value })}
                      className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Email ID (To receive PDF)</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. student@gmail.com"
                      value={quickForm.email}
                      onChange={(e) => setQuickForm({ ...quickForm, email: e.target.value })}
                      className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 7387773164"
                        value={quickForm.phone}
                        onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                        className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Exam</label>
                      <select
                        value={quickForm.targetExam}
                        onChange={(e) => setQuickForm({ ...quickForm, targetExam: e.target.value })}
                        className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500 transition-colors"
                      >
                        <option value="MHT-CET">MHT-CET</option>
                        <option value="JEE-MAIN">JEE Main</option>
                        <option value="NEET">NEET</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Score / Percentile</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      required
                      placeholder="e.g. 98.40"
                      value={quickForm.currentPercentile}
                      onChange={(e) => setQuickForm({ ...quickForm, currentPercentile: e.target.value })}
                      className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-amber-700 dark:text-amber-400 font-bold focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-semibold bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-sm transition-all text-xs flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation mt-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Email Me My Prediction PDF</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS (CLEAN 3-STEP FLOW) --- */}
      <section id="how-it-works" className="py-14 px-4 sm:px-6 lg:px-8 border-t border-stone-200/80 dark:border-stone-800/80 bg-white/50 dark:bg-stone-900/30">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-1.5">
            <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              The Process
            </span>
            <h2 className="text-xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-100">
              How You Receive Your Strategy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2.5 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-amber-400 font-bold text-xs flex items-center justify-center">
                01
              </div>
              <h3 className="text-sm font-bold font-serif text-stone-900 dark:text-stone-100">
                Submit Your Score
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Provide your exam percentile and preferences. Your submission alerts our senior counsellor instantly.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2.5 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-amber-400 font-bold text-xs flex items-center justify-center">
                02
              </div>
              <h3 className="text-sm font-bold font-serif text-stone-900 dark:text-stone-100">
                AI Prediction & Email PDF
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Counsellor evaluates past 3-year CAP cutoffs and emails your customized 3-Tier PDF directly to your inbox.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2.5 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center">
                03
              </div>
              <h3 className="text-sm font-bold font-serif text-stone-900 dark:text-stone-100">
                Enrol for Full Mentorship
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                If you like the strategy, enrol for ₹6,000 to get personalized Option Form locking for Rounds 1, 2, 3, and spot rounds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROGRAMS SECTION --- */}
      <section id="programs" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-1.5">
          <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            Specializations
          </span>
          <h2 className="text-xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-100">
            Admission Guidance by Stream
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: MHT-CET */}
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4 shadow-sm hover:border-amber-500/50 transition-all text-xs">
            <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-amber-400 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold font-serif text-stone-900 dark:text-stone-100">
                MHT-CET Engineering
              </h3>
              <p className="text-stone-600 dark:text-stone-400 text-[11px]">
                Strategic preference order for COEP, VJTI, SPIT, PICT, PCCOE, and VIT Pune.
              </p>
            </div>
            <ul className="space-y-1.5 text-stone-600 dark:text-stone-300 text-[11px]">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                CAP Round 1, 2, 3 & ACAP Spot Strategy
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                TFWS 100% Tuition Fee Waiver Guidance
              </li>
            </ul>
            <button
              onClick={() => setPredictionModalOpen(true)}
              className="pt-2 text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>Get MHT-CET Report</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Card 2: JEE MAIN */}
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4 shadow-sm hover:border-amber-500/50 transition-all text-xs">
            <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-amber-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold font-serif text-stone-900 dark:text-stone-100">
                JEE Main & NITs / IIITs
              </h3>
              <p className="text-stone-600 dark:text-stone-400 text-[11px]">
                JoSAA / CSAB special rounds & All India seats in top Maharashtra autonomous colleges.
              </p>
            </div>
            <ul className="space-y-1.5 text-stone-600 dark:text-stone-300 text-[11px]">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                VNIT Nagpur & IIIT Pune Choice Filling
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                Branch vs Institution Evaluation
              </li>
            </ul>
            <button
              onClick={() => setPredictionModalOpen(true)}
              className="pt-2 text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>Get JEE Report</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Card 3: NEET MEDICAL */}
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4 shadow-sm hover:border-amber-500/50 transition-all text-xs">
            <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-amber-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold font-serif text-stone-900 dark:text-stone-100">
                NEET Medical & Healthcare
              </h3>
              <p className="text-stone-600 dark:text-stone-400 text-[11px]">
                MBBS, BDS, and BAMS admission counseling across 85% State & 15% AIQ seats.
              </p>
            </div>
            <ul className="space-y-1.5 text-stone-600 dark:text-stone-300 text-[11px]">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                Govt vs Private Medical Fee Structures
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                Mop-up Round Strategy & Cutoffs
              </li>
            </ul>
            <button
              onClick={() => setPredictionModalOpen(true)}
              className="pt-2 text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>Get NEET Report</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION (RS 6,000) --- */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-stone-200/80 dark:border-stone-800/80 bg-white/40 dark:bg-stone-900/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              Mentorship Fee
            </span>
            <h2 className="text-xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-100">
              Complete Admission Mentorship Package
            </h2>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              One clear, transparent package for the entire admission cycle.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-7 sm:p-9 shadow-sm text-left max-w-2xl mx-auto space-y-6 text-xs">
            <div className="flex flex-wrap justify-between items-baseline gap-2 border-b border-stone-200 dark:border-stone-800 pb-4">
              <div>
                <h3 className="text-base font-bold font-serif text-stone-900 dark:text-stone-100">
                  Full Season CAP Guidance
                </h3>
                <p className="text-stone-500 text-[11px]">Results to Final College Seat Confirmation</p>
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-100">
                ₹6,000 <span className="text-xs font-normal text-stone-500">/ season</span>
              </div>
            </div>

            <ul className="space-y-2.5 text-stone-700 dark:text-stone-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span><strong>1-on-1 Strategy Video Session</strong> with Senior Counsellor</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span><strong>Customized Option Form Locking Draft</strong> for CAP Rounds 1, 2, & 3</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span><strong>TFWS & Category Quota Optimization</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span><strong>ACAP & Institutional Spot Round</strong> live vacancy alerts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span><strong>Direct WhatsApp / Call Access</strong> with Counsellor</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/student"
                className="w-full py-3 rounded-xl font-semibold bg-stone-900 dark:bg-amber-500 hover:bg-stone-800 dark:hover:bg-amber-400 text-white dark:text-stone-950 text-center transition-all text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Enrol & Pay Online (₹6,000)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT & SOCIAL SECTION --- */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-1.5">
          <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            Reach Out
          </span>
          <h2 className="text-xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-100">
            Direct Helpline & Social
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* Phone */}
          <a
            href="tel:7387773164"
            className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 transition-all flex flex-col gap-2 shadow-sm"
          >
            <Phone className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <div>
              <div className="font-bold text-stone-900 dark:text-stone-100 text-sm">+91 7387773164</div>
              <div className="text-[11px] text-stone-500 mt-0.5">Helpline & WhatsApp Support</div>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:khotarearyan@gmail.com"
            className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 transition-all flex flex-col gap-2 shadow-sm"
          >
            <Mail className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <div>
              <div className="font-bold text-stone-900 dark:text-stone-100 text-sm truncate">khotarearyan@gmail.com</div>
              <div className="text-[11px] text-stone-500 mt-0.5">Inquiries & Admissions</div>
            </div>
          </a>

          {/* Instagram */}
          <a
            href={instaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-rose-400 transition-all flex flex-col gap-2 shadow-sm group"
          >
            <div className="flex items-center justify-between">
              <InstagramIcon className="w-5 h-5 text-rose-500" />
              <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-rose-500 transition-colors" />
            </div>
            <div>
              <div className="font-bold text-stone-900 dark:text-stone-100 text-sm">@saraswaticoaching1</div>
              <div className="text-[11px] text-stone-500 mt-0.5">Follow us on Instagram</div>
            </div>
          </a>
        </div>
      </section>

      {/* Prediction Modal */}
      <StudentPredictionRequestModal
        isOpen={predictionModalOpen}
        onClose={() => setPredictionModalOpen(false)}
      />

      <Footer onOpenDemoModal={() => setPredictionModalOpen(true)} />
    </div>
  );
}
