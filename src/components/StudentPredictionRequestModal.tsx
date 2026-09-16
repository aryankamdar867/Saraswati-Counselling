'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Phone, Mail, User, BookOpen, Sparkles, Send, ArrowRight, ShieldCheck } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface StudentPredictionRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StudentPredictionRequestModal({ isOpen, onClose }: StudentPredictionRequestModalProps) {
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    phone: '',
    targetExam: 'MHT-CET',
    currentPercentile: '',
    category: 'OPEN',
    targetBranch: 'Computer Science / IT',
    preferredCity: 'Pune & Mumbai',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const newRequest = {
      id: `req_${Date.now()}`,
      student_name: formData.studentName,
      studentName: formData.studentName,
      email: formData.email,
      phone: formData.phone,
      target_exam: formData.targetExam,
      targetExam: formData.targetExam,
      current_percentile: formData.currentPercentile ? parseFloat(formData.currentPercentile) : 95.0,
      currentPercentile: formData.currentPercentile ? parseFloat(formData.currentPercentile) : 95.0,
      category: formData.category,
      target_branch: formData.targetBranch,
      targetBranch: formData.targetBranch,
      preferred_city: formData.preferredCity,
      preferredCity: formData.preferredCity,
      notes: formData.notes,
      status: 'pending_prediction',
      created_at: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      isNewAlert: true
    };

    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.from('demo_requests').insert([newRequest]);
        if (error) console.error(error);
      }

      // Always save to localStorage and dispatch custom event for instant cross-tab / counsellor portal notification
      const existing = JSON.parse(localStorage.getItem('saraswati_demo_requests') || '[]');
      const updated = [newRequest, ...existing];
      localStorage.setItem('saraswati_demo_requests', JSON.stringify(updated));
      localStorage.setItem('saraswati_latest_prediction_request', JSON.stringify(newRequest));

      // Broadcast event for active counsellor tabs
      window.dispatchEvent(new Event('saraswati_new_request'));

      setSubmitted(true);
    } catch (err: any) {
      console.error('Error submitting prediction request:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-500/30 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-7 text-slate-900 dark:text-white transition-colors">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-10 touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-4 sm:py-6 space-y-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                Request Sent to Senior Counsellor
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-amber-200">
                Prediction Report in Progress!
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-slate-900 dark:text-white">{formData.studentName}</strong>! Our counsellor has received your details and is running the <strong className="text-amber-600 dark:text-amber-400">AI College Predictor</strong>.
            </p>

            <div className="bg-amber-50 dark:bg-slate-800/80 rounded-2xl p-3.5 sm:p-4 border border-amber-500/30 text-left text-xs space-y-2 text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Your official <strong>Branded Prediction PDF</strong> will be delivered directly to <strong className="text-slate-900 dark:text-white font-mono break-all">{formData.email}</strong>.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <span>
                  If you like the colleges recommended, you can enrol in our complete <strong>CAP Mentorship Package for ₹6,000</strong>.
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-2">
              <a
                href={`https://wa.me/917387773164?text=Hello%20Saraswati%20Counselling,%20I%20have%20requested%20an%20AI%20College%20Prediction%20PDF%20for%20${encodeURIComponent(
                  formData.studentName
                )}%20(${formData.targetExam}%20-%20${formData.currentPercentile}%25ile).`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white text-center transition-all shadow-md touch-manipulation"
              >
                Track Status on WhatsApp
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full py-3 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 touch-manipulation"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase">Free AI Prediction PDF • Zero Cost</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-amber-100 mb-1">
              Get Your Custom College Predictor PDF
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
              Fill in your details. Our counsellor will run our AI Cutoff engine and email the personalized PDF directly to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Student Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 sm:top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aryan Sharma"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2.5 sm:py-2 text-sm sm:text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Email (To Receive PDF) *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 sm:top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. student@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2.5 sm:py-2 text-sm sm:text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Phone / WhatsApp *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 sm:top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 7387773164"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2.5 sm:py-2 text-sm sm:text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Target Exam *</label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-3 sm:top-2.5 w-4 h-4 text-slate-400" />
                    <select
                      value={formData.targetExam}
                      onChange={(e) => setFormData({ ...formData, targetExam: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2.5 sm:py-2 text-sm sm:text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="MHT-CET">MHT-CET (Engineering / Pharmacy)</option>
                      <option value="JEE-MAIN">JEE Main (VNIT / IIITs / NITs)</option>
                      <option value="NEET">NEET (MBBS / Medical)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Score / Percentile *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    required
                    placeholder="e.g. 98.4"
                    value={formData.currentPercentile}
                    onChange={(e) => setFormData({ ...formData, currentPercentile: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Category / Quota</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="OPEN">OPEN / General</option>
                    <option value="OBC">OBC (Non-Creamy)</option>
                    <option value="EWS">EWS</option>
                    <option value="TFWS">TFWS (Tuition Fee Waiver)</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="VJ/NT">VJ / NT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Target Branch</label>
                  <input
                    type="text"
                    placeholder="e.g. Computer Science / AI / IT"
                    value={formData.targetBranch}
                    onChange={(e) => setFormData({ ...formData, targetBranch: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">College / Location Preferences</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Top Pune colleges (COEP, PICT, PCCOE) or Mumbai (VJTI, SPIT)"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              {errorMsg && (
                <p className="text-rose-500 text-xs">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 touch-manipulation"
              >
                {loading ? 'Sending to Counsellor...' : 'Submit & Email Me My Prediction PDF'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
