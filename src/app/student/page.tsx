'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Phone,
  Mail,
  Download,
  Calendar,
  CreditCard,
  QrCode,
  ArrowRight,
  User,
  GraduationCap,
  Clock,
  FileText,
  AlertCircle
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { predictColleges, PredictionResult } from '@/lib/college-data';
import { generateCounsellingDossierPDF } from '@/lib/pdf-generator';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function StudentPortal() {
  const [studentData, setStudentData] = useState({
    fullName: 'Aryan Sharma',
    email: 'aryan.sharma@gmail.com',
    phone: '7387773164',
    exam: 'MHT-CET' as 'MHT-CET' | 'JEE-MAIN' | 'NEET',
    percentile: 98.4,
    category: 'OPEN',
    targetBranch: 'Computer Engineering'
  });

  const [isPaid, setIsPaid] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'checkout' | 'processing' | 'success'>('checkout');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [utrNumber, setUtrNumber] = useState('');
  const [scheduledMeeting, setScheduledMeeting] = useState('2025-06-20 at 5:00 PM (Google Meet)');

  // Predictor state in student portal
  const [studentPrediction, setStudentPrediction] = useState<PredictionResult | null>(null);

  useEffect(() => {
    // Check if student has paid in local storage
    const paidStatus = localStorage.getItem('saraswati_student_paid');
    if (paidStatus === 'true') {
      setIsPaid(true);
      setPaymentStep('success');
      runStudentPrediction();
    }
  }, []);

  const runStudentPrediction = () => {
    const res = predictColleges({
      exam: studentData.exam,
      percentile: studentData.percentile,
      category: studentData.category,
      branches: ['Computer', 'Information Technology', 'AI']
    });
    setStudentPrediction(res);
  };

  const handleSimulatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStep('processing');

    const assignedUtr = utrNumber || `UTR${Date.now().toString().slice(-8)}`;

    const paymentRecord = {
      id: `pay_${Date.now()}`,
      student_name: studentData.fullName,
      studentName: studentData.fullName,
      email: studentData.email,
      phone: studentData.phone,
      target_exam: studentData.exam,
      targetExam: studentData.exam,
      current_percentile: studentData.percentile,
      currentPercentile: studentData.percentile,
      category: studentData.category,
      target_branch: studentData.targetBranch,
      targetBranch: studentData.targetBranch,
      preferred_city: 'Maharashtra',
      amount_paid: 6000,
      amountPaid: 6000,
      payment_status: 'paid',
      paymentStatus: 'paid',
      payment_method: paymentMethod,
      paymentMethod: paymentMethod,
      utr_number: assignedUtr,
      status: 'enrolled_paid',
      paid_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      isNewAlert: true
    };

    // Save to payments list
    try {
      const existingPayments = JSON.parse(localStorage.getItem('saraswati_payments') || '[]');
      localStorage.setItem('saraswati_payments', JSON.stringify([paymentRecord, ...existingPayments]));

      // Update demo_requests list
      const existingReqs = JSON.parse(localStorage.getItem('saraswati_demo_requests') || '[]');
      const updatedReqs = existingReqs.map((r: any) => {
        if (r.email?.toLowerCase() === studentData.email.toLowerCase() || r.phone === studentData.phone) {
          return { ...r, ...paymentRecord, payment_status: 'paid', status: 'enrolled_paid' };
        }
        return r;
      });
      // If not already in list, prepend
      if (!updatedReqs.some((r: any) => r.email?.toLowerCase() === studentData.email.toLowerCase())) {
        updatedReqs.unshift(paymentRecord);
      }
      localStorage.setItem('saraswati_demo_requests', JSON.stringify(updatedReqs));

      // Push to Supabase if configured
      if (isSupabaseConfigured()) {
        await supabase.from('demo_requests').insert([paymentRecord]);
      }

      window.dispatchEvent(new Event('saraswati_payment_received'));
      window.dispatchEvent(new Event('saraswati_new_request'));
    } catch (err) {
      console.warn('Payment logging note:', err);
    }

    setTimeout(() => {
      setIsPaid(true);
      setPaymentStep('success');
      localStorage.setItem('saraswati_student_paid', 'true');
      runStudentPrediction();

      // Trigger Confetti Celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  const handleDownloadReport = async () => {
    if (!studentPrediction) return;
    await generateCounsellingDossierPDF({
      studentName: studentData.fullName,
      studentPhone: studentData.phone,
      studentEmail: studentData.email,
      exam: studentData.exam,
      percentile: studentData.percentile,
      category: studentData.category,
      preferredBranches: [studentData.targetBranch],
      counsellorName: 'Dr. Rajesh Deshmukh (Sr. Counsellor)',
      counsellorRemarks: 'Approved Option Form draft. Lock choices with COEP/PICT first, followed by PCCOE & VIT Pune.',
      predictions: studentPrediction
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Navbar */}
      <header className="bg-white dark:bg-slate-900 border-b border-amber-500/20 px-3 sm:px-8 py-2.5 sm:py-3 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-amber-400 bg-white p-0.5 shrink-0">
              <Image src="/logo.png" alt="Saraswati" fill className="object-contain" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-bold font-serif text-slate-900 dark:text-amber-200 uppercase truncate">
                Saraswati Student Portal
              </div>
              <div className="text-[9px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate">
                Right Guidance • Brighter Tomorrow
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <ThemeToggle />
            <Link
              href="/"
              className="text-xs text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors hidden xs:inline"
            >
              Main Site
            </Link>
            <a
              href="tel:7387773164"
              className="px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs bg-amber-500/20 text-amber-800 dark:text-amber-300 hover:bg-amber-500 hover:text-slate-950 font-semibold transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3 text-amber-600 dark:text-amber-400" />
              <span className="hidden sm:inline">Helpline: </span>
              <span>7387773164</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* ========================================================================= */}
        {/* PAYMENT GATEWAY / UNPAID STATE                                            */}
        {/* ========================================================================= */}
        {!isPaid ? (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Complete Admission Counselling Enrolment</span>
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white">
                Secure Your Spot for End-to-End CAP Guidance
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                Join our premium admission mentorship program with dedicated senior counsellors, personalized option form locking, and guaranteed support.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Student Details & Fee Summary */}
              <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-500/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <h2 className="text-base font-bold font-serif text-slate-900 dark:text-amber-200 border-b border-slate-200 dark:border-slate-800 pb-3">
                  Student Registration Details
                </h2>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-400 mb-1">Student Full Name</label>
                    <input
                      type="text"
                      value={studentData.fullName}
                      onChange={(e) => setStudentData({ ...studentData, fullName: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-400 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={studentData.phone}
                      onChange={(e) => setStudentData({ ...studentData, phone: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={studentData.email}
                      onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-400 mb-1">Target Exam</label>
                      <select
                        value={studentData.exam}
                        onChange={(e) => setStudentData({ ...studentData, exam: e.target.value as any })}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="MHT-CET">MHT-CET</option>
                        <option value="JEE-MAIN">JEE Main</option>
                        <option value="NEET">NEET</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-400 mb-1">Percentile / Score</label>
                      <input
                        type="number"
                        step="0.01"
                        value={studentData.percentile}
                        onChange={(e) => setStudentData({ ...studentData, percentile: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-slate-50 dark:bg-slate-950/80 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-700 dark:text-slate-300">
                    <span>Full Season Counselling Mentorship</span>
                    <span>₹6,000</span>
                  </div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                    <span>Option Form Drafting (Rounds 1, 2, 3)</span>
                    <span className="text-emerald-600 dark:text-emerald-400">Included</span>
                  </div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                    <span>1-on-1 Strategy Video Consultation</span>
                    <span className="text-emerald-600 dark:text-emerald-400">Included</span>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-2 flex justify-between font-bold text-sm text-slate-900 dark:text-white">
                    <span>Total Payable</span>
                    <span className="text-amber-600 dark:text-amber-400 text-lg">₹6,000</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Payment Gateway Simulation */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h2 className="text-lg font-bold font-serif text-slate-900 dark:text-amber-200">
                      Select Payment Method
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      100% Secure Transaction • Instant Dashboard Access
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
                    <Lock className="w-3.5 h-3.5" />
                    <span>256-bit Encrypted</span>
                  </div>
                </div>

                {/* Payment Tabs */}
                <div className="grid grid-cols-3 gap-3 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-3 px-2 rounded-xl border flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-800 dark:text-amber-200 shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <QrCode className="w-5 h-5" />
                    <span>UPI / QR Scan</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-3 px-2 rounded-xl border flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-800 dark:text-amber-200 shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Debit / Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`py-3 px-2 rounded-xl border flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                      paymentMethod === 'netbanking'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-800 dark:text-amber-200 shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span>Net Banking / Wallet</span>
                  </button>
                </div>

                <form onSubmit={handleSimulatePayment} className="space-y-4 text-xs">
                  {/* UPI QR Payment UI */}
                  {paymentMethod === 'upi' && (
                    <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center space-y-4">
                      <div className="w-44 h-44 mx-auto bg-white rounded-2xl p-3 shadow-xl flex flex-col items-center justify-center border-2 border-amber-400">
                        <div className="w-full h-full border-4 border-dashed border-slate-900 rounded-lg flex flex-col items-center justify-center text-slate-900 p-2">
                          <QrCode className="w-16 h-16 text-slate-900 mb-1" />
                          <span className="font-mono text-[10px] font-bold">UPI ID: 7387773164@upi</span>
                          <span className="text-[9px] text-slate-600">Saraswati Counselling</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-slate-700 dark:text-slate-300 font-medium">Scan using GPay, PhonePe, Paytm or BHIM</p>
                        <p className="text-amber-600 dark:text-amber-400 text-sm font-bold">Amount: ₹6,000</p>
                      </div>

                      <div className="max-w-xs mx-auto">
                        <label className="block text-slate-600 dark:text-slate-400 text-[11px] mb-1">Enter UPI Reference ID / UTR (Optional)</label>
                        <input
                          type="text"
                          placeholder="e.g. 412356789012"
                          value={utrNumber}
                          onChange={(e) => setUtrNumber(e.target.value)}
                          className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white text-center focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  )}

                  {/* Card Payment UI */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-slate-600 dark:text-slate-400 mb-1">Card Number</label>
                        <input
                          type="text"
                          placeholder="4532 •••• •••• 8892"
                          defaultValue="4532 8921 4452 8892"
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400 font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-600 dark:text-slate-400 mb-1">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            defaultValue="08/28"
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-600 dark:text-slate-400 mb-1">CVV</label>
                          <input
                            type="password"
                            placeholder="•••"
                            defaultValue="482"
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* NetBanking UI */}
                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-3">
                      <label className="block text-slate-600 dark:text-slate-400">Choose Your Bank</label>
                      <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400">
                        <option>State Bank of India (SBI)</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                        <option>Bank of Maharashtra</option>
                      </select>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={paymentStep === 'processing'}
                    className="w-full py-3.5 rounded-xl font-bold bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-xl shadow-amber-500/25 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {paymentStep === 'processing' ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin" />
                        <span>Verifying Payment of ₹6,000...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Pay ₹6,000 & Unlock Student Dashboard</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="flex items-center justify-center gap-2 text-slate-500 text-[11px]">
                  <span>Need help paying? Call helpline:</span>
                  <a href="tel:7387773164" className="text-amber-600 dark:text-amber-400 font-bold hover:underline">+91 7387773164</a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* PAID STUDENT DASHBOARD                                                    */
          /* ========================================================================= */
          <div className="space-y-8">
            {/* Top Welcome Banner */}
            <div className="bg-white dark:bg-gradient-to-r dark:from-slate-900 dark:via-[#310a17] dark:to-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-wrap justify-between items-center gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Counselling Enrolment Active (Paid ₹6,000)</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">
                  Welcome to Your Admission Portal, {studentData.fullName}
                </h1>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Target: <strong className="text-amber-700 dark:text-amber-300">{studentData.exam}</strong> | Score: <strong className="text-amber-700 dark:text-amber-300">{studentData.percentile}%ile</strong> | Category: <strong className="text-amber-700 dark:text-amber-300">{studentData.category}</strong>
                </p>
              </div>

              <button
                onClick={handleDownloadReport}
                className="px-5 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Strategy PDF</span>
              </button>
            </div>

            {/* Counsellor Assigned Card & Appointment */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-500/20 rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-700 dark:text-amber-300 font-bold text-lg">
                    RD
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">Dr. Rajesh Deshmukh</h3>
                    <p className="text-xs text-amber-700 dark:text-amber-300">Senior Admission Mentor</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Assigned personally to design your CAP Round 1, 2, and 3 option forms and review branch priorities.
                </p>
                <div className="pt-2 flex gap-2">
                  <a
                    href="https://wa.me/917387773164?text=Hello%20Dr.%20Rajesh,%20I%20am%20enrolled%20in%20Saraswati%20Counselling."
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 rounded-xl text-xs font-semibold bg-emerald-100 dark:bg-emerald-600/20 hover:bg-emerald-600 text-emerald-800 dark:text-emerald-300 hover:text-white text-center transition-all border border-emerald-300 dark:border-emerald-600/40"
                  >
                    WhatsApp Mentor
                  </a>
                  <a
                    href="tel:7387773164"
                    className="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-center transition-all border border-slate-300 dark:border-slate-700"
                  >
                    Call Helpline
                  </a>
                </div>
              </div>

              {/* Next Scheduled 1-on-1 Call */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-500/20 rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                  <Calendar className="w-5 h-5" />
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Upcoming 1-on-1 Strategy Call</h3>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/80 rounded-xl p-3 border border-slate-200 dark:border-slate-700 space-y-1 text-xs">
                  <div className="text-slate-900 dark:text-white font-bold">{scheduledMeeting}</div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-medium">Status: Link Active on Slot</div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Prepare your HSC marksheet and category validity documents for live screen-share review.
                </p>
              </div>

              {/* CAP Admission Checklist */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-500/20 rounded-2xl p-6 space-y-3 text-xs shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-amber-200 text-sm flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Mandatory Documents Checklist</span>
                </h3>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>MHT-CET / JEE Scorecard & Hall Ticket</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Domicile & Nationality Certificate</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Income Certificate (For TFWS / EWS)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Caste Validity & Non-Creamy Layer</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Predicted College Matches for Student */}
            {studentPrediction && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-500/20 rounded-2xl p-6 space-y-6 shadow-xl">
                <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h2 className="text-lg font-bold font-serif text-slate-900 dark:text-amber-200">
                      Your Customized College Predictions
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Calculated from historical CAP Round Cutoffs for {studentData.percentile}%ile ({studentData.category})
                    </p>
                  </div>

                  <button
                    onClick={handleDownloadReport}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Official PDF</span>
                  </button>
                </div>

                {/* Target Table */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 font-bold text-xs">
                      Target / Realistic Choices
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Best options for CAP Round 1 seat allocation</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                          <th className="py-2 pr-2">Code</th>
                          <th className="py-2 px-2">College</th>
                          <th className="py-2 px-2">Branch</th>
                          <th className="py-2 px-2">City</th>
                          <th className="py-2 px-2 text-center">Cutoff</th>
                          <th className="py-2 pl-2 text-right">Avg Package</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                        {studentPrediction.target.map((c) => (
                          <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                            <td className="py-2.5 pr-2 font-mono text-slate-500 dark:text-slate-400">{c.collegeCode}</td>
                            <td className="py-2.5 px-2 font-semibold text-slate-900 dark:text-white">{c.collegeName}</td>
                            <td className="py-2.5 px-2 text-blue-700 dark:text-blue-200">{c.branch}</td>
                            <td className="py-2.5 px-2 text-slate-600 dark:text-slate-300">{c.city}</td>
                            <td className="py-2.5 px-2 text-center font-bold text-blue-600 dark:text-blue-400">{c.closingPercentile}%</td>
                            <td className="py-2.5 pl-2 text-right text-slate-600 dark:text-slate-300">{c.avgPackageLpa ? `₹${c.avgPackageLpa} LPA` : '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
