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
  Award,
  BookOpen,
  Compass,
  Users,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  ShieldCheck,
  TrendingUp,
  FileText,
  Star,
  Layers,
  GraduationCap,
  Send,
  Zap,
  MailCheck
} from 'lucide-react';

export default function LandingPage() {
  const [predictionModalOpen, setPredictionModalOpen] = useState(false);

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950 font-sans transition-colors duration-200">
      <Navbar onOpenPredictionModal={() => setPredictionModalOpen(true)} />

      {/* --- HERO SECTION WITH 3D CANVAS & PREDICTION FORM --- */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-amber-50/60 via-rose-50/30 to-amber-50/40 dark:from-slate-950 dark:via-[#230914] dark:to-slate-950">
        {/* 3D Interactive Three.js Background */}
        <ThreeCanvas />

        {/* Subtle radial aura */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-600/30 dark:border-amber-400/30 text-amber-800 dark:text-amber-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>AI College Predictor & Counselling 2025-26</span>
            </div>

            {/* Logo Showcase with Royal Golden Aura */}
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-3 border-amber-400/90 shadow-2xl shadow-amber-500/30 bg-white p-1">
                <Image
                  src="/logo.png"
                  alt="Saraswati Career Counselling Centre"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl font-black font-serif text-slate-900 dark:text-white leading-tight">
                  SARASWATI
                </h1>
                <p className="text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-300/90 uppercase tracking-widest">
                  Career Counselling Centre
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Right Guidance • Brighter Tomorrow
                </p>
              </div>
            </div>

            {/* Main Pitch */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
                Get Your Personalized <br />
                <span className="bg-gradient-to-r from-red-800 via-amber-600 to-red-900 dark:from-amber-200 dark:via-amber-400 dark:to-amber-100 bg-clip-text text-transparent">
                  College Prediction PDF Directly to Your Email
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Enter your score details below. Our senior counsellor will run our <strong>AI Predictor engine</strong> with CAP cutoff data and dispatch your official Strategy Dossier straight to your email.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => setPredictionModalOpen(true)}
                className="px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-xl shadow-amber-500/25 transition-all text-xs flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Fill Detailed Form & Get PDF</span>
              </button>

              <Link
                href="/counsellor"
                className="px-5 py-3 rounded-xl font-semibold bg-red-900/90 hover:bg-red-800 border border-amber-500/40 text-amber-100 hover:text-white transition-all text-xs flex items-center gap-1.5 shadow-lg"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Counsellor Portal</span>
              </Link>

              <Link
                href="/student"
                className="px-5 py-3 rounded-xl font-semibold bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 transition-all text-xs flex items-center gap-1.5"
              >
                <GraduationCap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <span>Enrol (₹6,000)</span>
              </Link>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-6 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Free AI PDF Direct to Email
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Zero Obligation
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Enrol Later for ₹6,000
              </span>
            </div>
          </div>

          {/* Right Hero Column: Direct Prediction Form Box */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900/95 border border-slate-200 dark:border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            {quickSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <MailCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-amber-200">
                  Prediction Request Received!
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Our counsellor has received your alert. The <strong>AI Predictor</strong> is processing your score and will email your official PDF to <strong className="text-slate-900 dark:text-white font-mono">{quickForm.email}</strong> shortly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setQuickSubmitted(false);
                      setQuickForm({ studentName: '', email: '', phone: '', targetExam: 'MHT-CET', currentPercentile: '' });
                    }}
                    className="text-xs text-amber-600 dark:text-amber-400 font-bold hover:underline"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Instant Prediction Request</span>
                  </div>
                  <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white mt-0.5">
                    Get Free AI Predictor PDF
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Counsellor generates & emails your customized report.
                  </p>
                </div>

                <form onSubmit={handleQuickSubmit} className="space-y-3">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Student Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aryan Sharma"
                      value={quickForm.studentName}
                      onChange={(e) => setQuickForm({ ...quickForm, studentName: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Email ID (To receive PDF) *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. student@gmail.com"
                      value={quickForm.email}
                      onChange={(e) => setQuickForm({ ...quickForm, email: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 7387773164"
                        value={quickForm.phone}
                        onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Exam *</label>
                      <select
                        value={quickForm.targetExam}
                        onChange={(e) => setQuickForm({ ...quickForm, targetExam: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="MHT-CET">MHT-CET</option>
                        <option value="JEE-MAIN">JEE Main</option>
                        <option value="NEET">NEET</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Percentile / Score *</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      required
                      placeholder="e.g. 98.40"
                      value={quickForm.currentPercentile}
                      onChange={(e) => setQuickForm({ ...quickForm, currentPercentile: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-amber-500/60 rounded-xl px-3 py-2 text-amber-700 dark:text-amber-300 font-bold focus:outline-none focus:border-amber-400 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 transition-all text-xs flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Generate & Email My Prediction PDF</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS 3-STEP PROCESS --- */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 bg-amber-50/50 dark:bg-slate-900/60 border-y border-amber-500/20">
        <div className="max-w-6xl mx-auto space-y-12 text-center">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
              Simple 3-Step Journey
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white">
              How You Get Guided to Your Dream College
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Step 1 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-500/20 rounded-2xl p-6 space-y-4 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-black text-base flex items-center justify-center border border-amber-400/50">
                1
              </div>
              <h3 className="text-base font-bold font-serif text-slate-900 dark:text-amber-200">
                Submit Your Score
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Enter your exam score, percentile, and category. The request sends an instant alert directly to our counsellors.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-500/20 rounded-2xl p-6 space-y-4 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-black text-base flex items-center justify-center border border-amber-400/50">
                2
              </div>
              <h3 className="text-base font-bold font-serif text-slate-900 dark:text-amber-200">
                Counsellor Runs AI Predictor & Emails PDF
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Our counsellor evaluates your profile, runs the AI predictor, and dispatches your official 3-Tier PDF directly to your email inbox.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-500/20 rounded-2xl p-6 space-y-4 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-black text-base flex items-center justify-center border border-emerald-400/50">
                3
              </div>
              <h3 className="text-base font-bold font-serif text-slate-900 dark:text-amber-200">
                Like the Plan? Enrol for ₹6,000
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Unlock 1-on-1 strategy calls, personalized Option Form draft locking for CAP Rounds 1, 2, & 3, and spot-round guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROGRAMS SECTION --- */}
      <section id="programs" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
            Specialized Guidance Streams
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white">
            Targeted Counselling for Top Competitive Exams
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We decode complex CAP rounds, seat matrices, quota categories, and cutoffs to maximize your admission prospects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: MHT-CET */}
          <div className="bg-white dark:bg-gradient-to-b dark:from-slate-800/90 dark:to-slate-900/90 border border-amber-500/25 rounded-2xl p-6 sm:p-8 space-y-5 hover:border-amber-500 transition-all shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
              <Compass className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-amber-100">
                MHT-CET Engineering & Pharmacy
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Specialized option form strategy for COEP, VJTI, SPIT, PICT, VIT Pune, PCCOE, DJSCE, and top state colleges.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                CAP Round 1, 2, 3 & ACAP (Spot) Strategy
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                TFWS & EWS 100% Tuition Fee Waiver Guidance
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Home University vs Other Than Home University Seats
              </li>
            </ul>
            <button
              onClick={() => setPredictionModalOpen(true)}
              className="w-full py-2.5 rounded-xl text-xs font-semibold bg-amber-50 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-700 dark:text-amber-300 border border-amber-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Get MHT-CET Prediction PDF</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: JEE MAIN & ADVANCED */}
          <div className="bg-white dark:bg-gradient-to-b dark:from-slate-800/90 dark:to-slate-900/90 border border-amber-500/25 rounded-2xl p-6 sm:p-8 space-y-5 hover:border-amber-500 transition-all shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-amber-100">
                JEE Main & All India JoSAA / CSAB
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Expert guidance for VNIT Nagpur, IIIT Pune, IIIT Nagpur, All India quota in Maharashtra & top autonomous institutes.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                JoSAA & CSAB Special Round Choice Filling
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                All-India Seat Quota in Maharashtra Colleges
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Branch vs College Reputation Optimization
              </li>
            </ul>
            <button
              onClick={() => setPredictionModalOpen(true)}
              className="w-full py-2.5 rounded-xl text-xs font-semibold bg-amber-50 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-700 dark:text-amber-300 border border-amber-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Get JEE Prediction PDF</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: NEET MEDICAL */}
          <div className="bg-white dark:bg-gradient-to-b dark:from-slate-800/90 dark:to-slate-900/90 border border-amber-500/25 rounded-2xl p-6 sm:p-8 space-y-5 hover:border-amber-500 transition-all shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-amber-100">
                NEET Medical & Healthcare
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                MBBS, BDS, BAMS, BHMS admission counseling across Maharashtra State Quota (85%) and All India Quota (15%).
              </p>
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Govt vs Private vs Deemed Medical Fee Roadmap
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Category Cutoffs & Bond Conditions Analysis
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Mop-Up and Institutional Round Monitoring
              </li>
            </ul>
            <button
              onClick={() => setPredictionModalOpen(true)}
              className="w-full py-2.5 rounded-xl text-xs font-semibold bg-amber-50 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-700 dark:text-amber-300 border border-amber-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Get NEET Prediction PDF</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* --- PRICING & ENROLMENT SECTION (RS 6000) --- */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-amber-50/50 dark:bg-gradient-to-b dark:from-slate-950 dark:via-[#1f0812] dark:to-slate-950 border-t border-amber-500/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
              Full Season Mentorship
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white">
              Transparent Package: Enrol for ₹6,000
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Once you review your predicted PDF report, unlock our comprehensive 1-on-1 mentorship for all CAP rounds.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border-2 border-amber-500/80 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-left">
            <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow">
              All-Inclusive • Guaranteed Mentorship
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-amber-200">
                    Full CAP Admission Mentorship
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    End-to-end guidance from result to final college registration
                  </p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white font-sans">
                    ₹6,000
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">/ complete admission season</span>
                </div>

                <p className="text-xs text-amber-700 dark:text-amber-300/90">
                  Includes custom Option Form Drafts for CAP Rounds 1, 2, 3, Spot rounds, and 1-on-1 calls.
                </p>

                <div className="pt-2">
                  <Link
                    href="/student"
                    className="w-full py-3.5 rounded-xl font-bold bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-xl shadow-amber-500/25 transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <span>Enrol & Pay Online (₹6,000)</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Package Inclusions */}
              <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 text-xs">
                <h4 className="font-bold text-amber-700 dark:text-amber-200 uppercase tracking-wider text-[11px]">
                  Package Inclusions:
                </h4>
                <ul className="space-y-2.5 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>1-on-1 Personal Strategy Session</strong> with Senior Counsellor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Custom Option Form Locking Draft</strong> for CAP Round 1, 2, & 3</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>3-Tier College Prediction Dossier</strong> & Official Downloadable PDF</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>TFWS & Category Quota Strategy</strong> to save up to ₹5 Lakhs tuition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>ACAP & Institutional Spot Round</strong> live vacancy alerts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Unlimited WhatsApp / Call query support</strong> throughout admission</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT & HELPLINE --- */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
            Direct Helpline
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white">
            Connect Directly with Aryan & Senior Counsellors
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Phone Box */}
          <a
            href="tel:7387773164"
            className="flex items-center gap-5 p-6 rounded-2xl bg-white dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-amber-500/30 hover:border-amber-400 transition-all group shadow-xl"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Phone className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs text-amber-700 dark:text-amber-300 font-semibold uppercase tracking-wider">
                Call / WhatsApp Direct
              </div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans mt-0.5">
                +91 7387773164
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Available 9:00 AM – 9:00 PM IST
              </div>
            </div>
          </a>

          {/* Email Box */}
          <a
            href="mailto:khotarearyan@gmail.com"
            className="flex items-center gap-5 p-6 rounded-2xl bg-white dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-amber-500/30 hover:border-amber-400 transition-all group shadow-xl"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mail className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs text-amber-700 dark:text-amber-300 font-semibold uppercase tracking-wider">
                Email Inquiries
              </div>
              <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white break-all mt-0.5">
                khotarearyan@gmail.com
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Guaranteed response within 4 hours
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Detailed Prediction Modal */}
      <StudentPredictionRequestModal
        isOpen={predictionModalOpen}
        onClose={() => setPredictionModalOpen(false)}
      />

      <Footer onOpenDemoModal={() => setPredictionModalOpen(true)} />
    </div>
  );
}
