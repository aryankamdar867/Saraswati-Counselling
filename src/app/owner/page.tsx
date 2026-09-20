'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldAlert,
  Download,
  Users,
  CreditCard,
  TrendingUp,
  FileSpreadsheet,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  RefreshCw,
  LogOut,
  IndianRupee,
  Trash2,
  Lock,
  Sparkles,
  FileDown
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface StudentRecord {
  id: string;
  student_name?: string;
  studentName?: string;
  email?: string;
  phone?: string;
  target_exam?: string;
  targetExam?: string;
  current_percentile?: number;
  currentPercentile?: number;
  category?: string;
  target_branch?: string;
  targetBranch?: string;
  preferred_city?: string;
  preferredCity?: string;
  status?: string;
  payment_status?: string;
  paymentStatus?: string;
  amount_paid?: number;
  amountPaid?: number;
  payment_method?: string;
  paymentMethod?: string;
  utr_number?: string;
  notes?: string;
  created_at?: string;
  createdAt?: string;
  paid_at?: string;
}

export default function OwnerPortal() {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ownerEmail, setOwnerEmail] = useState('owner@saraswati.com');
  const [ownerPassword, setOwnerPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');

  // Data State
  const [records, setRecords] = useState<StudentRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'paid' | 'pending' | 'mht-cet' | 'jee' | 'neet'>('all');
  const [sortBy, setSortBy] = useState<'date_desc' | 'date_asc' | 'score_desc' | 'name_asc'>('date_desc');
  const [isExporting, setIsExporting] = useState(false);

  // Load Initial Data & setup listeners
  useEffect(() => {
    const savedLogin = localStorage.getItem('saraswati_owner_logged_in');
    if (savedLogin === 'true') {
      setIsLoggedIn(true);
    }

    loadAllRecords();

    // Listen for live student submissions and payments
    const handleUpdate = () => {
      loadAllRecords();
    };

    window.addEventListener('saraswati_new_request', handleUpdate);
    window.addEventListener('saraswati_payment_received', handleUpdate);

    // Supabase Realtime Channel
    let realtimeChannel: any = null;
    if (isSupabaseConfigured()) {
      realtimeChannel = supabase
        .channel('public:owner_sync')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'demo_requests' },
          () => {
            loadAllRecords();
          }
        )
        .subscribe();
    }

    return () => {
      window.removeEventListener('saraswati_new_request', handleUpdate);
      window.removeEventListener('saraswati_payment_received', handleUpdate);
      if (realtimeChannel && isSupabaseConfigured()) {
        supabase.removeChannel(realtimeChannel);
      }
    };
  }, []);

  const loadAllRecords = async () => {
    let combinedList: StudentRecord[] = [];

    // 1. Fetch from Supabase
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('demo_requests')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          combinedList = data;
        }
      } catch (err) {
        console.warn('Supabase fetch note:', err);
      }
    }

    // 2. Fetch local storage fallback
    const localRequests: StudentRecord[] = JSON.parse(
      localStorage.getItem('saraswati_demo_requests') || '[]'
    );
    const localPayments: StudentRecord[] = JSON.parse(
      localStorage.getItem('saraswati_payments') || '[]'
    );

    // Merge unique by email/id
    const map = new Map<string, StudentRecord>();

    // Add default seed entries if list is empty for immediate rich preview
    const defaultDemos: StudentRecord[] = [
      {
        id: 'req_demo_1',
        studentName: 'Aryan Sharma',
        student_name: 'Aryan Sharma',
        email: 'aryan.sharma@gmail.com',
        phone: '7387773164',
        targetExam: 'MHT-CET',
        target_exam: 'MHT-CET',
        currentPercentile: 98.40,
        current_percentile: 98.40,
        category: 'OPEN',
        targetBranch: 'Computer Science / IT',
        preferredCity: 'Pune & Mumbai',
        status: 'enrolled_paid',
        paymentStatus: 'paid',
        payment_status: 'paid',
        amountPaid: 6000,
        amount_paid: 6000,
        paymentMethod: 'upi',
        utr_number: 'UTR984712039',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
        notes: 'Needs COEP & PICT option form priority lock.'
      },
      {
        id: 'req_demo_2',
        studentName: 'Pooja Kulkarni',
        student_name: 'Pooja Kulkarni',
        email: 'pooja.kulkarni@gmail.com',
        phone: '9822345671',
        targetExam: 'JEE-MAIN',
        target_exam: 'JEE-MAIN',
        currentPercentile: 96.85,
        current_percentile: 96.85,
        category: 'OBC',
        targetBranch: 'AI & Data Science',
        preferredCity: 'Nagpur & Pune',
        status: 'enrolled_paid',
        paymentStatus: 'paid',
        payment_status: 'paid',
        amountPaid: 6000,
        amount_paid: 6000,
        paymentMethod: 'card',
        utr_number: 'UTR452109847',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
        notes: 'Targeting VNIT Nagpur & IIIT Pune CSAB rounds.'
      },
      {
        id: 'req_demo_3',
        studentName: 'Rohan Deshpande',
        student_name: 'Rohan Deshpande',
        email: 'rohan.deshpande@yahoo.com',
        phone: '9423112233',
        targetExam: 'NEET',
        target_exam: 'NEET',
        currentPercentile: 94.20,
        current_percentile: 94.20,
        category: 'EWS',
        targetBranch: 'MBBS / Medical',
        preferredCity: 'Maharashtra (Govt & Semi-Govt)',
        status: 'pdf_emailed',
        paymentStatus: 'pending',
        payment_status: 'pending',
        amountPaid: 0,
        amount_paid: 0,
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
        notes: 'Generated 3-Tier prediction report. Awaiting CAP round token.'
      },
      {
        id: 'req_demo_4',
        studentName: 'Siddharth Patil',
        student_name: 'Siddharth Patil',
        email: 'siddharth.patil@outlook.com',
        phone: '8805123984',
        targetExam: 'MHT-CET',
        target_exam: 'MHT-CET',
        currentPercentile: 91.50,
        current_percentile: 91.50,
        category: 'TFWS',
        targetBranch: 'Mechanical / Civil',
        preferredCity: 'Pune (PCCOE, MIT)',
        status: 'enrolled_paid',
        paymentStatus: 'paid',
        payment_status: 'paid',
        amountPaid: 6000,
        amount_paid: 6000,
        paymentMethod: 'upi',
        utr_number: 'UTR110298374',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
        notes: '100% TFWS tuition fee waiver option locking requested.'
      }
    ];

    [...defaultDemos, ...localRequests, ...localPayments, ...combinedList].forEach((item) => {
      const key = (item.email || item.id || '').toLowerCase();
      if (key) {
        map.set(key, { ...map.get(key), ...item });
      }
    });

    setRecords(Array.from(map.values()));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (ownerEmail.toLowerCase() === 'owner@saraswati.com' || ownerEmail.toLowerCase() === 'aryan@saraswati.com') &&
      ownerPassword === 'admin123'
    ) {
      setIsLoggedIn(true);
      localStorage.setItem('saraswati_owner_logged_in', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid Owner credentials. Use owner@saraswati.com / admin123');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('saraswati_owner_logged_in');
  };

  const handleTogglePaymentStatus = (studentEmail: string, currentStatus: string) => {
    const isNowPaid = currentStatus !== 'paid';
    const updated = records.map((r) => {
      if (r.email?.toLowerCase() === studentEmail.toLowerCase()) {
        return {
          ...r,
          payment_status: isNowPaid ? 'paid' : 'pending',
          paymentStatus: isNowPaid ? 'paid' : 'pending',
          amount_paid: isNowPaid ? 6000 : 0,
          amountPaid: isNowPaid ? 6000 : 0,
          status: isNowPaid ? 'enrolled_paid' : 'pdf_emailed',
          utr_number: isNowPaid ? (r.utr_number || `UTR${Date.now().toString().slice(-8)}`) : undefined
        };
      }
      return r;
    });

    setRecords(updated);
    localStorage.setItem('saraswati_demo_requests', JSON.stringify(updated));
  };

  const handleDeleteRecord = (id: string) => {
    if (!confirm('Are you sure you want to remove this student entry from the mastersheet?')) return;
    const updated = records.filter((r) => r.id !== id);
    setRecords(updated);
    localStorage.setItem('saraswati_demo_requests', JSON.stringify(updated));
  };

  // --- KPI COMPUTATIONS ---
  const totalInquiries = records.length;
  const paidStudents = records.filter(
    (r) => r.payment_status === 'paid' || r.paymentStatus === 'paid' || r.status === 'enrolled_paid'
  );
  const paidCount = paidStudents.length;
  const totalRevenue = paidCount * 6000;
  const conversionRate = totalInquiries > 0 ? ((paidCount / totalInquiries) * 100).toFixed(1) : '0';
  const mhtCetCount = records.filter((r) => (r.target_exam || r.targetExam) === 'MHT-CET').length;
  const jeeCount = records.filter((r) => (r.target_exam || r.targetExam) === 'JEE-MAIN').length;
  const neetCount = records.filter((r) => (r.target_exam || r.targetExam) === 'NEET').length;

  // --- FILTERED & SORTED RECORDS ---
  const filteredRecords = records
    .filter((r) => {
      const name = (r.student_name || r.studentName || '').toLowerCase();
      const email = (r.email || '').toLowerCase();
      const phone = (r.phone || '').toLowerCase();
      const utr = (r.utr_number || '').toLowerCase();
      const query = searchTerm.toLowerCase();

      const matchesSearch = name.includes(query) || email.includes(query) || phone.includes(query) || utr.includes(query);
      if (!matchesSearch) return false;

      const isPaid = r.payment_status === 'paid' || r.paymentStatus === 'paid' || r.status === 'enrolled_paid';

      if (filterType === 'paid') return isPaid;
      if (filterType === 'pending') return !isPaid;
      if (filterType === 'mht-cet') return (r.target_exam || r.targetExam) === 'MHT-CET';
      if (filterType === 'jee') return (r.target_exam || r.targetExam) === 'JEE-MAIN';
      if (filterType === 'neet') return (r.target_exam || r.targetExam) === 'NEET';
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at || a.createdAt || 0).getTime();
      const dateB = new Date(b.created_at || b.createdAt || 0).getTime();
      const scoreA = Number(a.current_percentile || a.currentPercentile || 0);
      const scoreB = Number(b.current_percentile || b.currentPercentile || 0);
      const nameA = (a.student_name || a.studentName || '').toLowerCase();
      const nameB = (b.student_name || b.studentName || '').toLowerCase();

      if (sortBy === 'date_desc') return dateB - dateA;
      if (sortBy === 'date_asc') return dateA - dateB;
      if (sortBy === 'score_desc') return scoreB - scoreA;
      if (sortBy === 'name_asc') return nameA.localeCompare(nameB);
      return 0;
    });

  // --- EXPORT MASTERSHEET TO CSV ---
  const handleExportCSV = () => {
    setIsExporting(true);
    try {
      const headers = [
        'Student ID',
        'Submission Date & Time',
        'Student Full Name',
        'Phone / WhatsApp',
        'Email Address',
        'Target Exam',
        'Score / Percentile',
        'Category / Quota',
        'Target Branch',
        'Preferred Location',
        'Payment Status',
        'Amount Paid (INR)',
        'Payment Mode',
        'UTR / Transaction ID',
        'Counselling Status',
        'Student Notes'
      ];

      const rows = filteredRecords.map((r) => {
        const isPaid = r.payment_status === 'paid' || r.paymentStatus === 'paid' || r.status === 'enrolled_paid';
        return [
          `"${r.id || ''}"`,
          `"${new Date(r.created_at || r.createdAt || Date.now()).toLocaleString()}"`,
          `"${(r.student_name || r.studentName || '').replace(/"/g, '""')}"`,
          `"${r.phone || ''}"`,
          `"${r.email || ''}"`,
          `"${r.target_exam || r.targetExam || ''}"`,
          `"${r.current_percentile || r.currentPercentile || ''}%"`,
          `"${r.category || 'OPEN'}"`,
          `"${(r.target_branch || r.targetBranch || '').replace(/"/g, '""')}"`,
          `"${(r.preferred_city || r.preferredCity || '').replace(/"/g, '""')}"`,
          `"${isPaid ? 'PAID (Rs 6,000)' : 'PENDING'}"`,
          `"${isPaid ? '6000' : '0'}"`,
          `"${r.payment_method || r.paymentMethod || (isPaid ? 'UPI' : 'N/A')}"`,
          `"${r.utr_number || (isPaid ? 'VERIFIED' : 'N/A')}"`,
          `"${r.status || 'Active'}"`,
          `"${(r.notes || '').replace(/"/g, '""')}"`
        ];
      });

      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute(
        'download',
        `Saraswati_Counselling_Mastersheet_${filterType.toUpperCase()}_${new Date().toISOString().slice(0, 10)}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('CSV Export Error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // --- EXPORT MASTERSHEET TO PDF ---
  const handleExportPDF = () => {
    setIsExporting(true);
    try {
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // Header Banner
      doc.setFillColor(112, 26, 43); // Maroon
      doc.rect(0, 0, 297, 24, 'F');
      doc.setFillColor(197, 160, 40); // Gold
      doc.rect(0, 24, 297, 2, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.text('SARASWATI CAREER COUNSELLING CENTRE - EXECUTIVE MASTERSHEET', 148.5, 11, { align: 'center' });

      doc.setFontSize(9);
      doc.setTextColor(243, 229, 171);
      doc.text(`Generated on: ${new Date().toLocaleString()}  |  Total Enquiries: ${totalInquiries}  |  Paid Students: ${paidCount} (Rs. ${totalRevenue.toLocaleString()})`, 148.5, 18, { align: 'center' });

      // Table
      const tableData = filteredRecords.map((r, i) => {
        const isPaid = r.payment_status === 'paid' || r.paymentStatus === 'paid' || r.status === 'enrolled_paid';
        return [
          (i + 1).toString(),
          r.student_name || r.studentName || 'Student',
          r.phone || 'N/A',
          r.email || 'N/A',
          r.target_exam || r.targetExam || 'MHT-CET',
          `${r.current_percentile || r.currentPercentile || 0}%ile`,
          r.category || 'OPEN',
          isPaid ? 'PAID (Rs 6,000)' : 'PENDING',
          r.utr_number || (isPaid ? 'UPI / Direct' : '-'),
          new Date(r.created_at || r.createdAt || Date.now()).toLocaleDateString()
        ];
      });

      autoTable(doc, {
        head: [['#', 'Student Name', 'Phone', 'Email', 'Exam', 'Score', 'Category', 'Payment Status', 'UTR / Ref', 'Date']],
        body: tableData,
        startY: 30,
        theme: 'grid',
        headStyles: {
          fillColor: [112, 26, 43],
          textColor: [255, 255, 255],
          fontSize: 8,
          fontStyle: 'bold'
        },
        bodyStyles: {
          fontSize: 7.5,
          textColor: [30, 41, 59]
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252]
        },
        styles: {
          cellPadding: 2,
          overflow: 'linebreak'
        }
      });

      doc.save(`Saraswati_Mastersheet_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (err) {
      console.error('PDF Export Error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // --- LOGIN SCREEN ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex items-center justify-center p-4 transition-colors">
        <div className="w-full max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="relative w-14 h-14 mx-auto rounded-full overflow-hidden border border-amber-500/40 bg-white p-0.5 shadow-sm">
              <Image src="/logo.png" alt="Saraswati" fill className="object-contain" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Owner & Director Portal</span>
            </div>
            <h1 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
              Executive Management Login
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Access comprehensive financial activity, live student leads, and download the complete Mastersheet.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Owner Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                <input
                  type="email"
                  required
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-xl pl-9 pr-3 py-2.5 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">Owner Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                <input
                  type="password"
                  required
                  value={ownerPassword}
                  onChange={(e) => setOwnerPassword(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-xl pl-9 pr-3 py-2.5 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {loginError && <p className="text-rose-500 text-xs text-center">{loginError}</p>}

            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-500/20 rounded-xl p-3 text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-2">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
              <span>Owner demo key prefilled. Click enter to access the executive dashboard immediately.</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md transition-all text-xs cursor-pointer touch-manipulation"
            >
              Enter Owner Dashboard
            </button>
          </form>

          <div className="pt-1 text-center">
            <Link
              href="/"
              className="text-xs text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- LOGGED IN OWNER DASHBOARD ---
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Top Header */}
      <header className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-3 sm:px-8 py-3 sticky top-0 z-40 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-amber-500/40 bg-white p-0.5 shrink-0">
              <Image src="/logo.png" alt="Saraswati" fill className="object-contain" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-bold font-serif text-stone-900 dark:text-stone-100 uppercase tracking-wide flex items-center gap-2">
                <span>SARASWATI OWNER SUITE</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 text-[10px] font-bold">
                  Executive Admin
                </span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1.5 truncate">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-ping" />
                <span className="truncate">Active Owner: <strong>{ownerEmail}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <ThemeToggle />
            <button
              onClick={loadAllRecords}
              className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs flex items-center gap-1 transition-colors cursor-pointer"
              title="Refresh Live Activity"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <Link
              href="/counsellor"
              className="px-3 py-1.5 rounded-xl text-xs bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors hidden sm:inline"
            >
              Counsellor Portal
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl text-xs bg-red-100 dark:bg-red-950/80 hover:bg-red-200 dark:hover:bg-red-900 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-800 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-3 sm:p-6 lg:p-8 space-y-6">
        
        {/* --- KPI STAT CARDS --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {/* Card 1: Total Revenue */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Total Revenue</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <IndianRupee className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-100">
              ₹{totalRevenue.toLocaleString()}
            </div>
            <p className="text-[10px] text-stone-500">From {paidCount} verified mentorship payments</p>
          </div>

          {/* Card 2: Paid Students (Rs 6,000) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Paid Enrolments</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-3xl font-bold font-serif text-amber-700 dark:text-amber-400">
              {paidCount} Students
            </div>
            <p className="text-[10px] text-stone-500">Full Season CAP Option Form Mentorship</p>
          </div>

          {/* Card 3: Total Enquiries & Leads */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Total Leads</span>
              <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-100">
              {totalInquiries}
            </div>
            <p className="text-[10px] text-stone-500">MHT-CET: {mhtCetCount} | JEE: {jeeCount} | NEET: {neetCount}</p>
          </div>

          {/* Card 4: Conversion Rate */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Conversion Rate</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-100">
              {conversionRate}%
            </div>
            <p className="text-[10px] text-stone-500">Inquiry to ₹6,000 paid enrolment ratio</p>
          </div>
        </div>

        {/* --- MASTERSHEET CONTROLS & EXPORT ACTIONS --- */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 sm:p-6 space-y-4 shadow-sm">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-serif text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <span>Student Enquiries & Payment Mastersheet</span>
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Complete database of students who requested predictions and enrolled with ₹6,000 payment.
              </p>
            </div>

            {/* Mastersheet Download Buttons */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={handleExportCSV}
                disabled={isExporting}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-500 text-white text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Excel / CSV</span>
              </button>

              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-semibold bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Download PDF Summary</span>
              </button>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between text-xs">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search name, phone, email, UTR..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 rounded-xl pl-9 pr-3 py-2 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950 shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                All ({records.length})
              </button>
              <button
                onClick={() => setFilterType('paid')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1 cursor-pointer ${
                  filterType === 'paid'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/60'
                }`}
              >
                <CheckCircle2 className="w-3 h-3" />
                <span>Paid ₹6,000 ({paidCount})</span>
              </button>
              <button
                onClick={() => setFilterType('pending')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  filterType === 'pending'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                Pending ({records.length - paidCount})
              </button>
              <button
                onClick={() => setFilterType('mht-cet')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  filterType === 'mht-cet'
                    ? 'bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                MHT-CET
              </button>
              <button
                onClick={() => setFilterType('jee')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  filterType === 'jee'
                    ? 'bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                JEE
              </button>
              <button
                onClick={() => setFilterType('neet')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  filterType === 'neet'
                    ? 'bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                NEET
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto border border-stone-200 dark:border-stone-800 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 font-semibold border-b border-stone-200 dark:border-stone-800">
                <tr>
                  <th className="py-3 px-3.5">Student Details</th>
                  <th className="py-3 px-3">Exam & Score</th>
                  <th className="py-3 px-3">Category & Target</th>
                  <th className="py-3 px-3">Payment Status</th>
                  <th className="py-3 px-3">Transaction / UTR</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3 text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800/70">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-stone-500">
                      No student records found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((item) => {
                    const isPaid =
                      item.payment_status === 'paid' ||
                      item.paymentStatus === 'paid' ||
                      item.status === 'enrolled_paid';
                    const name = item.student_name || item.studentName || 'Student';
                    const exam = item.target_exam || item.targetExam || 'MHT-CET';
                    const percentile = item.current_percentile || item.currentPercentile || 0;
                    const date = new Date(item.created_at || item.createdAt || Date.now()).toLocaleDateString();

                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-stone-50 dark:hover:bg-stone-850 transition-colors group"
                      >
                        {/* Student Details */}
                        <td className="py-3 px-3.5">
                          <div className="font-bold text-stone-900 dark:text-stone-100 text-sm">{name}</div>
                          <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                            <a href={`tel:${item.phone}`} className="hover:text-amber-600 dark:hover:text-amber-400">
                              {item.phone}
                            </a>
                            <span>•</span>
                            <a href={`mailto:${item.email}`} className="hover:text-amber-600 dark:hover:text-amber-400 truncate max-w-[140px]">
                              {item.email}
                            </a>
                          </div>
                        </td>

                        {/* Exam & Score */}
                        <td className="py-3 px-3">
                          <span className="inline-block px-2 py-0.5 rounded-md font-semibold text-[11px] bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                            {exam}
                          </span>
                          <div className="font-bold text-amber-700 dark:text-amber-400 text-xs mt-1">
                            {percentile}%ile
                          </div>
                        </td>

                        {/* Category & Target Branch */}
                        <td className="py-3 px-3">
                          <div className="font-medium text-stone-800 dark:text-stone-200 text-xs">
                            {item.category || 'OPEN'}
                          </div>
                          <div className="text-[11px] text-stone-500 truncate max-w-[150px]">
                            {item.target_branch || item.targetBranch || 'Engineering / Medical'}
                          </div>
                        </td>

                        {/* Payment Status Switch */}
                        <td className="py-3 px-3">
                          <button
                            onClick={() => handleTogglePaymentStatus(item.email || item.id, item.payment_status || item.paymentStatus || '')}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all ${
                              isPaid
                                ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-200'
                                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-300 dark:border-stone-700 hover:bg-stone-200'
                            }`}
                            title="Click to toggle payment status"
                          >
                            {isPaid ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                <span>Paid ₹6,000</span>
                              </>
                            ) : (
                              <>
                                <Clock className="w-3 h-3 text-stone-400" />
                                <span>Unpaid (Pending)</span>
                              </>
                            )}
                          </button>
                        </td>

                        {/* Transaction Ref */}
                        <td className="py-3 px-3 font-mono text-[11px] text-stone-600 dark:text-stone-400">
                          {item.utr_number || (isPaid ? 'Verified' : '—')}
                        </td>

                        {/* Date */}
                        <td className="py-3 px-3 text-[11px] text-stone-500">{date}</td>

                        {/* Actions */}
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* WhatsApp Button */}
                            {item.phone && (
                              <a
                                href={`https://wa.me/91${item.phone}?text=Hello%20${encodeURIComponent(
                                  name
                                )},%20this%20is%20Saraswati%20Career%20Counselling%20Centre.`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 transition-colors"
                                title="Chat on WhatsApp"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                            )}

                            {/* Call Button */}
                            {item.phone && (
                              <a
                                href={`tel:${item.phone}`}
                                className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 transition-colors"
                                title="Call Student"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                            )}

                            {/* Delete Button */}
                            <button
                              onClick={() => handleDeleteRecord(item.id)}
                              className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 hover:bg-red-100 transition-colors cursor-pointer"
                              title="Delete Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] text-stone-500 pt-2 gap-2">
            <span>Showing {filteredRecords.length} of {records.length} total student entries</span>
            <span>Click on any payment badge to instantly update payment status to Paid (₹6,000) or Pending.</span>
          </div>
        </div>
      </main>
    </div>
  );
}
