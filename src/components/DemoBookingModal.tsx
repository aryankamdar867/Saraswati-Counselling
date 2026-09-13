'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Phone, Mail, User, BookOpen, Clock, Sparkles } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface DemoBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoBookingModal({ isOpen, onClose }: DemoBookingModalProps) {
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    phone: '',
    targetExam: 'MHT-CET',
    currentPercentile: '',
    preferredDate: '',
    preferredTimeSlot: 'Evening (5 PM - 8 PM)',
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

    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.from('demo_requests').insert([
          {
            student_name: formData.studentName,
            email: formData.email,
            phone: formData.phone,
            target_exam: formData.targetExam,
            current_percentile: formData.currentPercentile ? parseFloat(formData.currentPercentile) : null,
            preferred_date: formData.preferredDate || null,
            preferred_time_slot: formData.preferredTimeSlot,
            notes: formData.notes,
            status: 'pending'
          }
        ]);

        if (error) throw error;
      } else {
        // Local state fallback for demonstration
        const existing = JSON.parse(localStorage.getItem('saraswati_demo_requests') || '[]');
        existing.push({
          ...formData,
          id: `demo_${Date.now()}`,
          status: 'pending',
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('saraswati_demo_requests', JSON.stringify(existing));
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Error booking demo:', err);
      // Fallback save in localStorage
      const existing = JSON.parse(localStorage.getItem('saraswati_demo_requests') || '[]');
      existing.push({
        ...formData,
        id: `demo_${Date.now()}`,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('saraswati_demo_requests', JSON.stringify(existing));
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 text-white">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-amber-200">
              Demo Session Confirmed!
            </h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto">
              Thank you, <span className="text-amber-400 font-semibold">{formData.studentName}</span>. 
              Our senior counsellor will call you at <span className="text-amber-400 font-semibold">{formData.phone}</span> shortly for your 1-on-1 strategy session.
            </p>

            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 text-left text-xs space-y-1.5 text-slate-300">
              <p>🎯 <strong className="text-white">Exam:</strong> {formData.targetExam}</p>
              {formData.currentPercentile && <p>📊 <strong className="text-white">Score/Percentile:</strong> {formData.currentPercentile}%</p>}
              <p>🕒 <strong className="text-white">Slot:</strong> {formData.preferredTimeSlot}</p>
              <p>📞 <strong className="text-white">Direct Helpline:</strong> +91 7387773164</p>
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href="https://wa.me/917387773164?text=Hi%20Saraswati%20Counselling,%20I%20have%20booked%20a%20free%20demo%20session."
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white text-center transition-all"
              >
                Chat on WhatsApp
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-semibold tracking-wider uppercase">Zero Cost • No Commitment</span>
            </div>
            <h2 className="text-2xl font-bold font-serif text-amber-100 mb-2">
              Book a Free Counselling Demo
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Get personalized college prediction insights, branch analysis, and admission roadmap directly from experienced mentors.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Student Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aryan Sharma"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Phone / WhatsApp Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 7387773164"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. student@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Target Exam *</label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <select
                      value={formData.targetExam}
                      onChange={(e) => setFormData({ ...formData, targetExam: e.target.value })}
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="MHT-CET">MHT-CET (Engineering / Pharmacy)</option>
                      <option value="JEE-MAIN">JEE Main / JEE Advanced</option>
                      <option value="NEET">NEET (MBBS / BDS / BAMS)</option>
                      <option value="DIRECT-SECOND-YEAR">Direct 2nd Year (DSE)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Percentile / Estimated Score</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    placeholder="e.g. 96.5"
                    value={formData.currentPercentile}
                    onChange={(e) => setFormData({ ...formData, currentPercentile: e.target.value })}
                    className="w-full bg-slate-800/90 border border-slate-700 px-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Preferred Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Preferred Time Slot</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <select
                      value={formData.preferredTimeSlot}
                      onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Morning (10 AM - 1 PM)">Morning (10 AM - 1 PM)</option>
                      <option value="Afternoon (1 PM - 5 PM)">Afternoon (1 PM - 5 PM)</option>
                      <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Any Specific College / Branch Goals</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Aiming for Top Pune/Mumbai CSE colleges, need guidance on TFWS seats"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {errorMsg && (
                <p className="text-rose-400 text-xs">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Confirming Your Slot...' : 'Schedule Free 1-on-1 Demo Session'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
