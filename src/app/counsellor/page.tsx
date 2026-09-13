'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ShieldCheck,
  Search,
  Download,
  Users,
  Database,
  PlusCircle,
  FileCheck,
  Phone,
  Mail,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  Trash2,
  ChevronRight,
  TrendingUp,
  RefreshCw,
  LogOut,
  UploadCloud,
  Send,
  Bell,
  MailCheck,
  X,
  ExternalLink
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import {
  CollegeCutoff,
  INITIAL_COLLEGES,
  PredictionResult,
  predictColleges
} from '@/lib/college-data';
import { generateCounsellingDossierPDF } from '@/lib/pdf-generator';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function CounsellorPortal() {
  // Authentication & Counsellor State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [counsellorEmail, setCounsellorEmail] = useState('aryan@saraswati.com');
  const [counsellorPassword, setCounsellorPassword] = useState('admin123');
  const [counsellorName, setCounsellorName] = useState('Aryan Khotare (Director of Admissions)');

  // Active Tab: 'predictor' | 'demos' | 'dataset' | 'saved'
  const [activeTab, setActiveTab] = useState<'predictor' | 'demos' | 'dataset' | 'saved'>('predictor');

  // Predictor Form State
  const [studentName, setStudentName] = useState('Aryan Sharma');
  const [studentPhone, setStudentPhone] = useState('7387773164');
  const [studentEmail, setStudentEmail] = useState('khotarearyan@gmail.com');
  const [exam, setExam] = useState<'MHT-CET' | 'JEE-MAIN' | 'NEET'>('MHT-CET');
  const [percentile, setPercentile] = useState<number>(98.40);
  const [rank, setRank] = useState<number>(2100);
  const [category, setCategory] = useState('OPEN');
  const [selectedBranches, setSelectedBranches] = useState<string[]>(['Computer', 'Information Technology', 'AI']);
  const [cityFilter, setCityFilter] = useState('ALL');
  const [counsellorRemarks, setCounsellorRemarks] = useState(
    'Prioritize Pune Tier-1 colleges in choices 1-10 (COEP, PICT, PCCOE). Keep VIT Pune and DJSCE as strong target options for CAP Round 1.'
  );

  // Prediction Output
  const [predictionResults, setPredictionResults] = useState<PredictionResult | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [emailStatusModalOpen, setEmailStatusModalOpen] = useState(false);
  const [emailedStudentInfo, setEmailedStudentInfo] = useState<any>(null);

  // Real-Time Notification Pop-up for incoming requests
  const [incomingAlert, setIncomingAlert] = useState<any>(null);

  // Dataset State
  const [collegeData, setCollegeData] = useState<CollegeCutoff[]>(INITIAL_COLLEGES);
  const [newCollegeModalOpen, setNewCollegeModalOpen] = useState(false);
  const [newCollege, setNewCollege] = useState<Partial<CollegeCutoff>>({
    exam: 'MHT-CET',
    collegeCode: '',
    collegeName: '',
    city: 'Pune',
    state: 'Maharashtra',
    branch: 'Computer Engineering',
    category: 'OPEN',
    closingPercentile: 95.0,
    closingRank: 7500,
    tier: 'Tier 2',
    avgPackageLpa: 7.5,
    annualFees: 130000
  });

  // Demo / Prediction Requests List
  const [demoRequests, setDemoRequests] = useState<any[]>([]);

  // Saved Predictions List
  const [savedPredictions, setSavedPredictions] = useState<any[]>([]);

  // Load Initial Data & Setup Real-time Listener
  useEffect(() => {
    const savedLogin = localStorage.getItem('saraswati_counsellor_logged_in');
    if (savedLogin === 'true') {
      setIsLoggedIn(true);
    }

    loadDemoRequests();

    const savedDataset = localStorage.getItem('saraswati_custom_colleges');
    if (savedDataset) {
      try {
        setCollegeData(JSON.parse(savedDataset));
      } catch (e) {
        console.error(e);
      }
    }

    const savedPreds = localStorage.getItem('saraswati_saved_predictions');
    if (savedPreds) {
      try {
        setSavedPredictions(JSON.parse(savedPreds));
      } catch (e) {
        console.error(e);
      }
    }

    // Check for latest incoming alert
    const checkLatestAlert = () => {
      const latest = localStorage.getItem('saraswati_latest_prediction_request');
      if (latest) {
        try {
          const parsed = JSON.parse(latest);
          if (parsed && parsed.isNewAlert) {
            setIncomingAlert(parsed);
          }
        } catch (e) {
          console.error(e);
        }
      }
    };

    checkLatestAlert();

    const handleNewRequest = () => {
      loadDemoRequests();
      checkLatestAlert();
    };

    window.addEventListener('saraswati_new_request', handleNewRequest);
    window.addEventListener('storage', handleNewRequest);

    return () => {
      window.removeEventListener('saraswati_new_request', handleNewRequest);
      window.removeEventListener('storage', handleNewRequest);
    };
  }, []);

  const loadDemoRequests = async () => {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('demo_requests')
          .select('*')
          .order('created_at', { ascending: false });
        if (data && !error) {
          setDemoRequests(data);
          return;
        }
      } catch (err) {
        console.error('Supabase fetch error, fallback to local', err);
      }
    }

    const localDemos = JSON.parse(localStorage.getItem('saraswati_demo_requests') || '[]');
    if (localDemos.length === 0) {
      const sampleDemos = [
        {
          id: 'req_101',
          student_name: 'Aditya Deshmukh',
          email: 'aditya.deshmukh@gmail.com',
          phone: '9822334455',
          target_exam: 'MHT-CET',
          current_percentile: 98.4,
          status: 'pending_prediction',
          notes: 'Targeting Computer / IT in COEP, PICT, or PCCOE',
          created_at: new Date().toISOString()
        },
        {
          id: 'req_102',
          student_name: 'Sneha Patil',
          email: 'sneha.patil@gmail.com',
          phone: '9765432190',
          target_exam: 'JEE-MAIN',
          current_percentile: 97.9,
          status: 'pdf_emailed',
          notes: 'Wants VNIT Nagpur / IIIT Pune',
          created_at: new Date(Date.now() - 3600000 * 3).toISOString()
        }
      ];
      setDemoRequests(sampleDemos);
      localStorage.setItem('saraswati_demo_requests', JSON.stringify(sampleDemos));
    } else {
      setDemoRequests(localDemos);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (counsellorEmail && counsellorPassword) {
      setIsLoggedIn(true);
      localStorage.setItem('saraswati_counsellor_logged_in', 'true');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('saraswati_counsellor_logged_in');
  };

  // Run Prediction Engine
  const handleRunPrediction = () => {
    setIsPredicting(true);
    setTimeout(() => {
      const results = predictColleges({
        exam,
        percentile: Number(percentile),
        category,
        branches: selectedBranches,
        city: cityFilter,
        customData: collegeData
      });
      setPredictionResults(results);
      setIsPredicting(false);

      const newPredictionRecord = {
        id: `pred_${Date.now()}`,
        studentName,
        studentPhone,
        studentEmail,
        exam,
        percentile,
        rank,
        category,
        results,
        counsellorRemarks,
        createdAt: new Date().toISOString()
      };

      const updated = [newPredictionRecord, ...savedPredictions.slice(0, 19)];
      setSavedPredictions(updated);
      localStorage.setItem('saraswati_saved_predictions', JSON.stringify(updated));
    }, 300);
  };

  // Execute AI Predictor & Direct Email PDF Workflow
  const handleRunAndEmailPDF = async () => {
    setIsPredicting(true);
    setPdfGenerating(true);

    const results = predictColleges({
      exam,
      percentile: Number(percentile),
      category,
      branches: selectedBranches,
      city: cityFilter,
      customData: collegeData
    });
    setPredictionResults(results);

    try {
      // Generate PDF for local download & get base64 string
      const { base64 } = await generateCounsellingDossierPDF({
        studentName,
        studentPhone,
        studentEmail,
        exam,
        percentile: Number(percentile),
        rank: Number(rank),
        category,
        preferredBranches: selectedBranches,
        counsellorName,
        counsellorRemarks,
        predictions: results
      });

      // Call Backend API to send real email with PDF attached
      let apiDeliveryInfo = null;
      try {
        const response = await fetch('/api/send-pdf-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentName,
            studentEmail,
            studentPhone,
            exam,
            percentile: Number(percentile),
            counsellorName,
            counsellorRemarks,
            pdfBase64: base64
          })
        });
        apiDeliveryInfo = await response.json();
      } catch (apiErr) {
        console.warn('API email fetch note:', apiErr);
      }

      // Update Request status in list
      const updatedRequests = demoRequests.map((r) => {
        if (
          r.email?.toLowerCase() === studentEmail?.toLowerCase() ||
          r.phone === studentPhone ||
          r.student_name === studentName
        ) {
          return { ...r, status: 'pdf_emailed' };
        }
        return r;
      });
      setDemoRequests(updatedRequests);
      localStorage.setItem('saraswati_demo_requests', JSON.stringify(updatedRequests));

      // Dismiss any active alert for this student
      if (incomingAlert && (incomingAlert.email === studentEmail || incomingAlert.student_name === studentName)) {
        setIncomingAlert(null);
        localStorage.removeItem('saraswati_latest_prediction_request');
      }

      // Show confirmation dialog with email details
      setEmailedStudentInfo({
        studentName,
        studentEmail,
        studentPhone,
        exam,
        percentile,
        counsellorRemarks,
        apiDeliveryInfo
      });
      setEmailStatusModalOpen(true);
    } catch (err) {
      console.error('Error generating and emailing PDF', err);
    } finally {
      setIsPredicting(false);
      setPdfGenerating(false);
    }
  };

  // Counsellor accepts incoming alert popup
  const handleAcceptAlert = (req: any) => {
    setStudentName(req.student_name || req.studentName || '');
    setStudentEmail(req.email || '');
    setStudentPhone(req.phone || '');
    setExam(req.target_exam || req.targetExam || 'MHT-CET');
    setPercentile(req.current_percentile || req.currentPercentile || 95.0);
    setCategory(req.category || 'OPEN');
    if (req.notes) {
      setCounsellorRemarks(`Student Notes: "${req.notes}". Strategic guidance: Lock top dream options 1-5, target options 6-15.`);
    }

    setIncomingAlert(null);
    localStorage.removeItem('saraswati_latest_prediction_request');

    setActiveTab('predictor');
    setTimeout(() => {
      handleRunPrediction();
    }, 200);
  };

  // Add College Cutoff to Dataset
  const handleAddCollege = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollege.collegeName || !newCollege.branch) return;

    const entry: CollegeCutoff = {
      id: `custom_${Date.now()}`,
      exam: newCollege.exam as any,
      collegeCode: newCollege.collegeCode || 'CUSTOM',
      collegeName: newCollege.collegeName,
      city: newCollege.city || 'Pune',
      state: 'Maharashtra',
      branch: newCollege.branch,
      category: newCollege.category || 'OPEN',
      closingPercentile: Number(newCollege.closingPercentile) || 90.0,
      closingRank: Number(newCollege.closingRank) || 10000,
      roundNumber: 1,
      tier: (newCollege.tier as any) || 'Tier 2',
      avgPackageLpa: Number(newCollege.avgPackageLpa) || 6.0,
      annualFees: Number(newCollege.annualFees) || 120000
    };

    const updated = [entry, ...collegeData];
    setCollegeData(updated);
    localStorage.setItem('saraswati_custom_colleges', JSON.stringify(updated));
    setNewCollegeModalOpen(false);
    alert('College Cutoff added successfully to live engine!');
  };

  // Bulk CSV / JSON Data Import
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed)) {
            const combined = [...parsed, ...collegeData];
            setCollegeData(combined);
            localStorage.setItem('saraswati_custom_colleges', JSON.stringify(combined));
            alert(`Successfully imported ${parsed.length} college cutoffs!`);
          }
        } else if (file.name.endsWith('.csv')) {
          const lines = text.split('\n');
          const newEntries: CollegeCutoff[] = [];
          for (let i = 1; i < lines.length; i++) {
            const row = lines[i].split(',');
            if (row.length >= 5) {
              newEntries.push({
                id: `csv_${Date.now()}_${i}`,
                exam: (row[0]?.trim() as any) || 'MHT-CET',
                collegeCode: row[1]?.trim() || '',
                collegeName: row[2]?.trim() || '',
                city: row[3]?.trim() || 'Maharashtra',
                state: 'Maharashtra',
                branch: row[4]?.trim() || 'Computer Engineering',
                category: row[5]?.trim() || 'OPEN',
                closingPercentile: parseFloat(row[6]) || 90.0,
                closingRank: parseInt(row[7]) || 10000,
                roundNumber: 1,
                tier: 'Tier 2',
                avgPackageLpa: parseFloat(row[8]) || 6.5,
                annualFees: parseInt(row[9]) || 120000
              });
            }
          }
          if (newEntries.length > 0) {
            const combined = [...newEntries, ...collegeData];
            setCollegeData(combined);
            localStorage.setItem('saraswati_custom_colleges', JSON.stringify(combined));
            alert(`Successfully imported ${newEntries.length} colleges from CSV!`);
          }
        }
      } catch (err) {
        console.error('File parsing error', err);
        alert('Invalid file format. Please upload valid JSON or CSV.');
      }
    };
    reader.readAsText(file);
  };

  const updateDemoStatus = (id: string, newStatus: string) => {
    const updated = demoRequests.map((d) =>
      d.id === id ? { ...d, status: newStatus } : d
    );
    setDemoRequests(updated);
    localStorage.setItem('saraswati_demo_requests', JSON.stringify(updated));
  };

  // --- LOGIN SCREEN ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col justify-center items-center px-4 py-12 relative transition-colors duration-200">
        <div className="absolute top-4 right-4 z-20">
          <ThemeToggle />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-rose-100/40 via-transparent to-transparent dark:from-red-950/40 dark:via-slate-950 dark:to-slate-950 pointer-events-none" />

        <div className="relative z-10 w-full max-w-md bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-amber-500/30 rounded-3xl p-8 shadow-2xl backdrop-blur-md space-y-6">
          <div className="text-center space-y-3">
            <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-amber-500 dark:border-amber-400 bg-white p-1 shadow-md">
              <Image
                src="/logo.png"
                alt="Saraswati Counselling"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-xl font-bold font-serif text-slate-900 dark:text-amber-200">
              Counsellor Portal Login
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Saraswati Career Counselling Centre Admission & Prediction Suite
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Counsellor Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={counsellorEmail}
                  onChange={(e) => setCounsellorEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Password</label>
              <input
                type="password"
                required
                value={counsellorPassword}
                onChange={(e) => setCounsellorPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-2">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
              <span>Demo accounts enabled: Dr. Rajesh Deshmukh / Aryan Khotare. Click login to access immediately.</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 transition-all text-sm cursor-pointer"
            >
              Enter Counsellor Dashboard
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link href="/" className="text-xs text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400">
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- LOGGED IN COUNSELLOR DASHBOARD ---
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 relative">
      
      {/* ========================================================================= */}
      {/* REAL-TIME INCOMING POP-UP ALERT NOTIFICATION MODAL                        */}
      {/* ========================================================================= */}
      {incomingAlert && (
        <div className="fixed top-6 right-6 z-50 max-w-md w-full animate-bounce-short">
          <div className="bg-amber-500 text-slate-950 p-4 rounded-2xl shadow-2xl border-2 border-amber-300 flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5 animate-pulse" />
            </div>

            <div className="flex-1 space-y-1 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-extrabold uppercase tracking-wider text-[11px] bg-slate-950 text-amber-300 px-2 py-0.5 rounded">
                  🚨 New Student Prediction Alert
                </span>
                <button
                  onClick={() => setIncomingAlert(null)}
                  className="p-1 hover:bg-amber-600 rounded text-slate-950"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="font-black text-sm">
                {incomingAlert.student_name || incomingAlert.studentName}
              </div>

              <p className="text-[11px] font-medium leading-tight">
                Exam: <strong>{incomingAlert.target_exam || incomingAlert.targetExam}</strong> | Score: <strong>{incomingAlert.current_percentile || incomingAlert.currentPercentile}%ile</strong> | Email: <strong>{incomingAlert.email}</strong>
              </p>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => handleAcceptAlert(incomingAlert)}
                  className="flex-1 py-1.5 px-3 rounded-lg font-bold bg-slate-950 text-amber-300 hover:bg-slate-900 text-center transition-all text-xs"
                >
                  Review & Run AI Predictor Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-amber-500/20 px-4 sm:px-8 py-3 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-amber-400 bg-white p-0.5">
              <Image src="/logo.png" alt="Saraswati" fill className="object-contain" />
            </div>
            <div>
              <div className="text-sm font-bold font-serif text-slate-900 dark:text-amber-200">
                SARASWATI COUNSELLOR SUITE
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Logged in as: <strong className="text-slate-900 dark:text-white">{counsellorName}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              View Main Site
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg text-xs bg-red-100 dark:bg-red-950/80 hover:bg-red-200 dark:hover:bg-red-900 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-800 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-slate-100 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex gap-6 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('predictor')}
            className={`py-3.5 border-b-2 flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === 'predictor'
                ? 'border-amber-500 dark:border-amber-400 text-amber-700 dark:text-amber-300'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>AI College Predictor & Direct Email Dispatch</span>
          </button>

          <button
            onClick={() => setActiveTab('demos')}
            className={`py-3.5 border-b-2 flex items-center gap-2 cursor-pointer transition-colors relative ${
              activeTab === 'demos'
                ? 'border-amber-500 dark:border-amber-400 text-amber-700 dark:text-amber-300'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Incoming Student Requests</span>
            {demoRequests.filter(d => d.status === 'pending_prediction' || d.status === 'pending').length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-red-500 text-white font-bold animate-pulse">
                {demoRequests.filter(d => d.status === 'pending_prediction' || d.status === 'pending').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('dataset')}
            className={`py-3.5 border-b-2 flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === 'dataset'
                ? 'border-amber-500 dark:border-amber-400 text-amber-700 dark:text-amber-300'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>College Cutoff Master ({collegeData.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`py-3.5 border-b-2 flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === 'saved'
                ? 'border-amber-500 dark:border-amber-400 text-amber-700 dark:text-amber-300'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Emailed Student Dossiers ({savedPredictions.length})</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6">

        {/* ========================================================================= */}
        {/* TAB 1: AI PREDICTOR & DIRECT EMAIL DISPATCH                               */}
        {/* ========================================================================= */}
        {activeTab === 'predictor' && (
          <div className="space-y-6">
            {/* Input Form Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-500/20 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg font-bold font-serif text-slate-900 dark:text-amber-200">
                    Candidate Profile & Predictor Parameters
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Run AI Predictor to generate Dream, Target, and Safe colleges and email the PDF directly to student.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleRunPrediction}
                    disabled={isPredicting}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Calculate Preview</span>
                  </button>

                  <button
                    onClick={handleRunAndEmailPDF}
                    disabled={isPredicting || pdfGenerating}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>Run AI Predictor & Email PDF to Student</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Student Email (PDF Recipient) *</label>
                  <input
                    type="email"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-amber-500/60 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Student Phone *</label>
                  <input
                    type="tel"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Target Exam *</label>
                  <select
                    value={exam}
                    onChange={(e) => setExam(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-amber-700 dark:text-amber-300 font-semibold focus:outline-none focus:border-amber-400"
                  >
                    <option value="MHT-CET">MHT-CET (Engineering / Pharmacy)</option>
                    <option value="JEE-MAIN">JEE Main / All India NITs</option>
                    <option value="NEET">NEET Medical (MBBS)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Percentile / Score *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={percentile}
                    onChange={(e) => setPercentile(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-amber-500/60 rounded-xl px-3 py-2 text-amber-700 dark:text-amber-300 font-bold focus:outline-none focus:border-amber-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Predicted / State Rank</label>
                  <input
                    type="number"
                    value={rank}
                    onChange={(e) => setRank(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Category / Quota *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="OPEN">OPEN / General</option>
                    <option value="OBC">OBC (Non-Creamy Layer)</option>
                    <option value="EWS">EWS (Economically Weaker)</option>
                    <option value="TFWS">TFWS (100% Tuition Waiver)</option>
                    <option value="SC">SC (Scheduled Caste)</option>
                    <option value="ST">ST (Scheduled Tribe)</option>
                    <option value="VJ/NT">VJ / NT / SBC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">City Filter</label>
                  <select
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="ALL">All Cities (Maharashtra)</option>
                    <option value="Pune">Pune & PCMC</option>
                    <option value="Mumbai">Mumbai & MMR</option>
                    <option value="Nagpur">Nagpur</option>
                    <option value="Baramati">Baramati</option>
                  </select>
                </div>
              </div>

              {/* Counsellor Strategic Advisory Notes */}
              <div className="text-xs">
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Counsellor Guidance Notes (Printed on official PDF report & included in email)
                </label>
                <textarea
                  rows={2}
                  value={counsellorRemarks}
                  onChange={(e) => setCounsellorRemarks(e.target.value)}
                  placeholder="Enter strategic Option Form order recommendations..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* PREDICTION RESULTS SECTION */}
            {predictionResults ? (
              <div className="space-y-6">
                {/* Action Bar */}
                <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-amber-500/30 rounded-2xl p-4 flex flex-wrap justify-between items-center gap-4 shadow-md">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Calculated for: </span>
                    <strong className="text-amber-700 dark:text-amber-300 text-sm">{studentName}</strong>
                    <span className="text-xs text-slate-600 dark:text-slate-300 ml-2">({percentile}%ile | {category} | {exam})</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleRunAndEmailPDF}
                      disabled={pdfGenerating}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>Email PDF to {studentEmail}</span>
                    </button>
                  </div>
                </div>

                {/* 3-Tier Results Cards */}
                <div className="grid grid-cols-1 gap-6">

                  {/* 1. TARGET COLLEGES (HIGH CHANCE) */}
                  <div className="bg-white dark:bg-slate-900 border border-blue-300 dark:border-blue-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-blue-100 dark:border-blue-500/20 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-1 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 font-bold text-xs uppercase tracking-wider">
                          🎯 Target Tier (Best Fit)
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          High Probability for CAP Round 1 & 2 ({predictionResults.target.length} Matches)
                        </h3>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">Closing cutoffs match score range</span>
                    </div>

                    {predictionResults.target.length === 0 ? (
                      <p className="text-xs text-slate-500 dark:text-slate-400 py-2">No direct target matches in current filter.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                              <th className="py-2.5 pr-2">Code</th>
                              <th className="py-2.5 px-2">College Name</th>
                              <th className="py-2.5 px-2">Branch</th>
                              <th className="py-2.5 px-2">City</th>
                              <th className="py-2.5 px-2 text-center">Cutoff %ile</th>
                              <th className="py-2.5 px-2 text-center">Avg CTC</th>
                              <th className="py-2.5 pl-2 text-right">Annual Fees</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                            {predictionResults.target.map((c) => (
                              <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                                <td className="py-3 pr-2 font-mono text-slate-500 dark:text-slate-400">{c.collegeCode || '-'}</td>
                                <td className="py-3 px-2 font-semibold text-slate-900 dark:text-white">{c.collegeName}</td>
                                <td className="py-3 px-2 text-blue-700 dark:text-amber-200">{c.branch}</td>
                                <td className="py-3 px-2 text-slate-600 dark:text-slate-300">{c.city}</td>
                                <td className="py-3 px-2 text-center font-bold text-blue-600 dark:text-blue-400">{c.closingPercentile}%</td>
                                <td className="py-3 px-2 text-center text-slate-600 dark:text-slate-300">{c.avgPackageLpa ? `₹${c.avgPackageLpa} LPA` : '-'}</td>
                                <td className="py-3 pl-2 text-right font-medium text-slate-600 dark:text-slate-300">₹{(c.annualFees / 1000).toFixed(0)}k/yr</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* 2. DREAM COLLEGES (AMBITIOUS) */}
                  <div className="bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-rose-100 dark:border-rose-500/20 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-1 rounded bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 font-bold text-xs uppercase tracking-wider">
                          🌟 Dream Tier (Reach / Top Preferences)
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          Fill in Option Form Choices 1 to 10 ({predictionResults.dream.length} Matches)
                        </h3>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">Cutoff +0.1% to +2.5% higher</span>
                    </div>

                    {predictionResults.dream.length === 0 ? (
                      <p className="text-xs text-slate-500 dark:text-slate-400 py-2">No colleges currently in dream threshold.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                              <th className="py-2.5 pr-2">Code</th>
                              <th className="py-2.5 px-2">College Name</th>
                              <th className="py-2.5 px-2">Branch</th>
                              <th className="py-2.5 px-2">City</th>
                              <th className="py-2.5 px-2 text-center">Cutoff %ile</th>
                              <th className="py-2.5 px-2 text-center">Avg CTC</th>
                              <th className="py-2.5 pl-2 text-right">Annual Fees</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                            {predictionResults.dream.map((c) => (
                              <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                                <td className="py-3 pr-2 font-mono text-slate-500 dark:text-slate-400">{c.collegeCode || '-'}</td>
                                <td className="py-3 px-2 font-semibold text-slate-900 dark:text-white">{c.collegeName}</td>
                                <td className="py-3 px-2 text-rose-700 dark:text-rose-200">{c.branch}</td>
                                <td className="py-3 px-2 text-slate-600 dark:text-slate-300">{c.city}</td>
                                <td className="py-3 px-2 text-center font-bold text-rose-600 dark:text-rose-400">{c.closingPercentile}%</td>
                                <td className="py-3 px-2 text-center text-slate-600 dark:text-slate-300">{c.avgPackageLpa ? `₹${c.avgPackageLpa} LPA` : '-'}</td>
                                <td className="py-3 pl-2 text-right font-medium text-slate-600 dark:text-slate-300">₹{(c.annualFees / 1000).toFixed(0)}k/yr</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* 3. SAFE COLLEGES (BACKUP CONFIDENCE) */}
                  <div className="bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-emerald-100 dark:border-emerald-500/20 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider">
                          🛡️ Safe Tier (High Confidence)
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          Guaranteed Safety Net ({predictionResults.safe.length} Matches)
                        </h3>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">Closing cutoffs safely below score</span>
                    </div>

                    {predictionResults.safe.length === 0 ? (
                      <p className="text-xs text-slate-500 dark:text-slate-400 py-2">No safe colleges in current filter range.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                              <th className="py-2.5 pr-2">Code</th>
                              <th className="py-2.5 px-2">College Name</th>
                              <th className="py-2.5 px-2">Branch</th>
                              <th className="py-2.5 px-2">City</th>
                              <th className="py-2.5 px-2 text-center">Cutoff %ile</th>
                              <th className="py-2.5 px-2 text-center">Avg CTC</th>
                              <th className="py-2.5 pl-2 text-right">Annual Fees</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                            {predictionResults.safe.map((c) => (
                              <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                                <td className="py-3 pr-2 font-mono text-slate-500 dark:text-slate-400">{c.collegeCode || '-'}</td>
                                <td className="py-3 px-2 font-semibold text-slate-900 dark:text-white">{c.collegeName}</td>
                                <td className="py-3 px-2 text-emerald-700 dark:text-emerald-200">{c.branch}</td>
                                <td className="py-3 px-2 text-slate-600 dark:text-slate-300">{c.city}</td>
                                <td className="py-3 px-2 text-center font-bold text-emerald-600 dark:text-emerald-400">{c.closingPercentile}%</td>
                                <td className="py-3 px-2 text-center text-slate-600 dark:text-slate-300">{c.avgPackageLpa ? `₹${c.avgPackageLpa} LPA` : '-'}</td>
                                <td className="py-3 pl-2 text-right font-medium text-slate-600 dark:text-slate-300">₹{(c.annualFees / 1000).toFixed(0)}k/yr</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Ready to Run AI Predictor & Dispatch PDF
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Click "Run AI Predictor & Email PDF to Student" to generate the candidate dossier and send it directly to their email.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: INCOMING STUDENT REQUESTS                                           */}
        {/* ========================================================================= */}
        {activeTab === 'demos' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-500/20 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold font-serif text-slate-900 dark:text-amber-200">
                  Incoming Student Prediction Requests
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Leads submitted through website prediction forms. Review scores and email customized PDFs.
                </p>
              </div>
              <button
                onClick={loadDemoRequests}
                className="px-3 py-1.5 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh Leads
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                    <th className="py-2.5 pr-2">Student</th>
                    <th className="py-2.5 px-2">Contact & Email</th>
                    <th className="py-2.5 px-2">Exam & Score</th>
                    <th className="py-2.5 px-2">Location/Notes</th>
                    <th className="py-2.5 px-2 text-center">Status</th>
                    <th className="py-2.5 pl-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {demoRequests.map((demo) => (
                    <tr key={demo.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="py-3.5 pr-2">
                        <div className="font-bold text-slate-900 dark:text-white">{demo.student_name || demo.studentName}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">
                          {new Date(demo.created_at || demo.createdAt || Date.now()).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-3.5 px-2">
                        <div className="text-slate-800 dark:text-slate-200 font-medium">{demo.phone}</div>
                        <div className="text-[10px] text-amber-700 dark:text-amber-300 font-mono">{demo.email}</div>
                      </td>
                      <td className="py-3.5 px-2">
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 font-semibold text-[11px]">
                          {demo.target_exam || demo.targetExam}
                        </span>
                        {(demo.current_percentile || demo.currentPercentile) && (
                          <div className="text-[11px] text-slate-700 dark:text-slate-300 mt-1 font-bold">
                            {demo.current_percentile || demo.currentPercentile}%ile
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-2 text-slate-500 dark:text-slate-400 max-w-xs truncate">
                        {demo.notes || demo.preferred_city || '-'}
                      </td>
                      <td className="py-3.5 px-2 text-center">
                        <span
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full border inline-block ${
                            demo.status === 'pending_prediction' || demo.status === 'pending'
                              ? 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-rose-300 border-red-300 dark:border-rose-800'
                              : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                          }`}
                        >
                          {demo.status === 'pdf_emailed' ? 'PDF Emailed' : 'Needs Prediction'}
                        </span>
                      </td>
                      <td className="py-3.5 pl-2 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              handleAcceptAlert(demo);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors text-[11px] flex items-center gap-1 cursor-pointer"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>Run & Email PDF</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: DATASET MANAGER (UPLOAD & CUSTOM CUTOFFS)                            */}
        {/* ========================================================================= */}
        {activeTab === 'dataset' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-500/20 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold font-serif text-slate-900 dark:text-amber-200">
                  College Cutoff Master Database
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Manage current college cutoffs. Add new institutions manually or upload your custom CSV/JSON data anytime.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <label className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-amber-700 dark:text-amber-300 border border-amber-500/30 transition-all flex items-center gap-1.5 cursor-pointer">
                  <UploadCloud className="w-4 h-4" />
                  <span>Import CSV / JSON</span>
                  <input
                    type="file"
                    accept=".csv,.json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={() => setNewCollegeModalOpen(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add College Cutoff</span>
                </button>
              </div>
            </div>

            {/* List of Cutoffs */}
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead className="sticky top-0 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                  <tr className="text-slate-600 dark:text-slate-400 font-semibold">
                    <th className="py-2.5 pr-2">Exam</th>
                    <th className="py-2.5 px-2">Code</th>
                    <th className="py-2.5 px-2">College Name</th>
                    <th className="py-2.5 px-2">Branch</th>
                    <th className="py-2.5 px-2">City</th>
                    <th className="py-2.5 px-2 text-center">Closing %ile</th>
                    <th className="py-2.5 px-2 text-center">Avg CTC</th>
                    <th className="py-2.5 pl-2 text-right">Annual Fees</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {collegeData.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="py-2.5 pr-2">
                        <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-amber-800 dark:text-amber-300 font-mono text-[10px]">
                          {c.exam}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 font-mono text-slate-500 dark:text-slate-400">{c.collegeCode || '-'}</td>
                      <td className="py-2.5 px-2 font-semibold text-slate-900 dark:text-white">{c.collegeName}</td>
                      <td className="py-2.5 px-2 text-slate-700 dark:text-slate-300">{c.branch}</td>
                      <td className="py-2.5 px-2 text-slate-500 dark:text-slate-400">{c.city}</td>
                      <td className="py-2.5 px-2 text-center font-bold text-amber-600 dark:text-amber-400">{c.closingPercentile}%</td>
                      <td className="py-2.5 px-2 text-center text-slate-600 dark:text-slate-300">{c.avgPackageLpa ? `₹${c.avgPackageLpa} LPA` : '-'}</td>
                      <td className="py-2.5 pl-2 text-right text-slate-600 dark:text-slate-300">₹{(c.annualFees / 1000).toFixed(0)}k</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: EMAILED STUDENT DOSSIERS                                            */}
        {/* ========================================================================= */}
        {activeTab === 'saved' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-500/20 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold font-serif text-slate-900 dark:text-amber-200">
                  Recent Emailed Student Prediction Dossiers
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  History of reports generated and dispatched to students.
                </p>
              </div>
            </div>

            {savedPredictions.length === 0 ? (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-xs">
                No predictions recorded yet. Run a prediction in the first tab to save student reports here.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedPredictions.map((pred) => (
                  <div
                    key={pred.id}
                    className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3 text-xs shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-sm">{pred.studentName}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">{pred.studentPhone} | {pred.studentEmail}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold">
                        {pred.percentile}%ile ({pred.exam})
                      </span>
                    </div>

                    <div className="text-slate-700 dark:text-slate-300 space-y-1">
                      <div><strong>Category:</strong> {pred.category}</div>
                      <div><strong>Matches:</strong> {pred.results?.target?.length || 0} Target, {pred.results?.dream?.length || 0} Dream, {pred.results?.safe?.length || 0} Safe</div>
                    </div>

                    <div className="pt-2 flex justify-between items-center border-t border-slate-200 dark:border-slate-700/60">
                      <span className="text-[10px] text-slate-500">
                        {new Date(pred.createdAt).toLocaleString()}
                      </span>
                      <button
                        onClick={async () => {
                          await generateCounsellingDossierPDF({
                            studentName: pred.studentName,
                            studentPhone: pred.studentPhone,
                            studentEmail: pred.studentEmail,
                            exam: pred.exam,
                            percentile: pred.percentile,
                            rank: pred.rank,
                            category: pred.category,
                            preferredBranches: [],
                            counsellorName,
                            counsellorRemarks: pred.counsellorRemarks,
                            predictions: pred.results
                          });
                        }}
                        className="px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-600/20 hover:bg-emerald-600 text-emerald-800 dark:text-emerald-300 hover:text-white transition-colors text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3 h-3" />
                        Download PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* MODAL: EMAIL DISPATCH CONFIRMATION                                        */}
      {/* ========================================================================= */}
      {emailStatusModalOpen && emailedStudentInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-slate-900 dark:text-white space-y-5 text-xs shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                <MailCheck className="w-5 h-5" />
                <span className="text-sm">Prediction PDF Emailed Successfully!</span>
              </div>
              <button
                onClick={() => setEmailStatusModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              The official branded college prediction PDF has been generated and dispatched to:
            </p>

            <div className="bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Student:</span>
                <strong className="text-slate-900 dark:text-white">{emailedStudentInfo.studentName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email:</span>
                <strong className="text-amber-600 dark:text-amber-400 font-mono">{emailedStudentInfo.studentEmail}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Scorecard:</span>
                <span>{emailedStudentInfo.percentile}%ile ({emailedStudentInfo.exam})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Enrolment Fee:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">₹6,000 (Student can pay online)</span>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-[11px] text-amber-800 dark:text-amber-300">
              💡 <strong>Email Content Included:</strong> Attached official PDF dossier, summary of Dream/Target colleges, and direct student enrolment checkout link for ₹6,000.
            </div>

            <div className="flex gap-2 pt-2">
              <a
                href={`mailto:${emailedStudentInfo.studentEmail}?subject=Your%20Official%20College%20Prediction%20Report%20-%20Saraswati%20Career%20Counselling&body=Dear%20${encodeURIComponent(
                  emailedStudentInfo.studentName
                )},%0D%0A%0D%0APlease%20find%20attached%20your%20official%20AI%20College%20Prediction%20Report%20for%20${emailedStudentInfo.exam}%20(${emailedStudentInfo.percentile}%25ile).%0D%0A%0D%0AIf%20you%20would%20like%20to%20proceed%20with%20our%20full%20CAP%20Admission%20Mentorship%20package,%20you%20can%20enrol%20for%20Rs%206,000%20here:%20http://localhost:3000/student%0D%0A%0D%0ABest%20regards,%0D%0A${encodeURIComponent(
                  counsellorName
                )}%0D%0ASaraswati%20Career%20Counselling%20Centre%0D%0AHelpline:%20+91%207387773164`}
                className="flex-1 py-2.5 rounded-xl font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-center transition-all flex items-center justify-center gap-1.5 border border-slate-300 dark:border-slate-700"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Email App</span>
              </a>

              <button
                onClick={() => setEmailStatusModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 text-center transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD COLLEGE CUTOFF */}
      {newCollegeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-500/30 rounded-2xl p-6 max-w-lg w-full text-slate-900 dark:text-white space-y-4 text-xs shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-amber-200">Add New College Cutoff Entry</h3>
            <form onSubmit={handleAddCollege} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Exam</label>
                  <select
                    value={newCollege.exam}
                    onChange={(e) => setNewCollege({ ...newCollege, exam: e.target.value as any })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white"
                  >
                    <option value="MHT-CET">MHT-CET</option>
                    <option value="JEE-MAIN">JEE-MAIN</option>
                    <option value="NEET">NEET</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">College DTE Code</label>
                  <input
                    type="text"
                    placeholder="e.g. 6006"
                    value={newCollege.collegeCode}
                    onChange={(e) => setNewCollege({ ...newCollege, collegeCode: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1">College Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. College of Engineering Pune (COEP)"
                  value={newCollege.collegeName}
                  onChange={(e) => setNewCollege({ ...newCollege, collegeName: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Branch / Course *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Computer Science"
                    value={newCollege.branch}
                    onChange={(e) => setNewCollege({ ...newCollege, branch: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">City</label>
                  <input
                    type="text"
                    placeholder="e.g. Pune"
                    value={newCollege.city}
                    onChange={(e) => setNewCollege({ ...newCollege, city: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Closing Percentile *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newCollege.closingPercentile}
                    onChange={(e) => setNewCollege({ ...newCollege, closingPercentile: parseFloat(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Avg Package (LPA)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newCollege.avgPackageLpa}
                    onChange={(e) => setNewCollege({ ...newCollege, avgPackageLpa: parseFloat(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewCollegeModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ========================================================================= */}
      {/* MODAL: EMAIL DISPATCH CONFIRMATION                                        */}
      {/* ========================================================================= */}
      {emailStatusModalOpen && emailedStudentInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-slate-900 dark:text-white space-y-5 text-xs shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                <MailCheck className="w-5 h-5" />
                <span className="text-sm">
                  {emailedStudentInfo.apiDeliveryInfo?.delivered
                    ? 'Official PDF Emailed to Student Inbox!'
                    : 'Prediction PDF & Email Prepared!'}
                </span>
              </div>
              <button
                onClick={() => setEmailStatusModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              The official branded college prediction PDF has been generated for:
            </p>

            <div className="bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Student Name:</span>
                <strong className="text-slate-900 dark:text-white">{emailedStudentInfo.studentName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Recipient Email:</span>
                <strong className="text-amber-600 dark:text-amber-400 font-mono">{emailedStudentInfo.studentEmail}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Score / Exam:</span>
                <span>{emailedStudentInfo.percentile}%ile ({emailedStudentInfo.exam})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mentorship Fee:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">₹6,000 (Student can pay online)</span>
              </div>
            </div>

            {emailedStudentInfo.apiDeliveryInfo?.delivered ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-xl p-3 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Delivered directly:</strong> Email with attached PDF was sent to <strong>{emailedStudentInfo.studentEmail}</strong>.
                </span>
              </div>
            ) : (
              <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-[11px] text-amber-800 dark:text-amber-300 space-y-1">
                <p>
                  💡 <strong>Direct Email Dispatch Ready:</strong> The PDF was downloaded and the email is formatted.
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  To send automatically from your Gmail in background, add <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">GMAIL_APP_PASSWORD</code> to your environment file.
                </p>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <a
                href={`mailto:${emailedStudentInfo.studentEmail}?subject=Your%20Official%20College%20Prediction%20Report%20-%20Saraswati%20Career%20Counselling&body=Dear%20${encodeURIComponent(
                  emailedStudentInfo.studentName
                )},%0D%0A%0D%0APlease%20find%20attached%20your%20official%20AI%20College%20Prediction%20Report%20for%20${emailedStudentInfo.exam}%20(${emailedStudentInfo.percentile}%25ile).%0D%0A%0D%0AIf%20you%20would%20like%20to%20proceed%20with%20our%20full%20CAP%20Admission%20Mentorship%20package,%20you%20can%20enrol%20for%20Rs%206,000%20here:%20http://localhost:3000/student%0D%0A%0D%0ABest%20regards,%0D%0A${encodeURIComponent(
                  counsellorName
                )}%0D%0ASaraswati%20Career%20Counselling%20Centre%0D%0AHelpline:%20+91%207387773164`}
                className="flex-1 py-2.5 rounded-xl font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-center transition-all flex items-center justify-center gap-1.5 border border-slate-300 dark:border-slate-700"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Email Client</span>
              </a>

              <button
                onClick={() => setEmailStatusModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 text-center transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
