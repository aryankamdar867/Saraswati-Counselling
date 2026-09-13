import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CollegeCutoff, PredictionResult } from './college-data';

export interface StudentDossierData {
  studentName: string;
  studentPhone: string;
  studentEmail: string;
  exam: string;
  percentile: number;
  rank?: number;
  category: string;
  homeUniversity?: string;
  preferredBranches: string[];
  counsellorName: string;
  counsellorRemarks?: string;
  predictions: PredictionResult;
}

export async function generateCounsellingDossierPDF(data: StudentDossierData): Promise<{ doc: jsPDF; base64: string }> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryColor = [123, 17, 36]; // Maroon #7B1124
  const goldColor = [197, 160, 40]; // Gold #C5A028
  const darkNavy = [15, 23, 42]; // Slate #0F172A

  // --- HEADER SECTION ---
  // Top Maroon Banner
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 36, 'F');

  // Gold accent line
  doc.setFillColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.rect(0, 36, 210, 2, 'F');

  // Institute Name
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text('SARASWATI CAREER COUNSELLING CENTRE', 105, 14, { align: 'center' });

  // Tagline
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(243, 229, 171); // Soft Gold
  doc.text('RIGHT GUIDANCE • BRIGHTER TOMORROW', 105, 20, { align: 'center' });
  doc.text('JEE • MHT-CET • NEET • ENGINEERING & MEDICAL ADMISSIONS', 105, 25, { align: 'center' });

  // Contacts
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('Helpline: +91 7387773164  |  Email: khotarearyan@gmail.com', 105, 31, { align: 'center' });

  // Report Title
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('OFFICIAL COLLEGE PREDICTION & STRATEGY REPORT', 105, 46, { align: 'center' });
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 116, 139);
  doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} | Ref ID: SCCC-${Math.floor(100000 + Math.random() * 900000)}`, 105, 51, { align: 'center' });

  // --- CANDIDATE DETAILS CARD ---
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, 55, 182, 34, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('STUDENT PROFILE & ACADEMIC SCORECARD', 18, 62);

  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);

  // Left Column
  doc.setFont('helvetica', 'bold');
  doc.text('Student Name:', 18, 69);
  doc.setFont('helvetica', 'normal');
  doc.text(data.studentName, 46, 69);

  doc.setFont('helvetica', 'bold');
  doc.text('Target Exam:', 18, 75);
  doc.setFont('helvetica', 'normal');
  doc.text(data.exam, 46, 75);

  doc.setFont('helvetica', 'bold');
  doc.text('Category / Quota:', 18, 81);
  doc.setFont('helvetica', 'normal');
  doc.text(data.category, 46, 81);

  // Right Column
  doc.setFont('helvetica', 'bold');
  doc.text('Percentile / Score:', 110, 69);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(`${data.percentile} %ile`, 146, 69);
  doc.setTextColor(51, 65, 85);

  doc.setFont('helvetica', 'bold');
  doc.text('Predicted/State Rank:', 110, 75);
  doc.setFont('helvetica', 'normal');
  doc.text(data.rank ? `#${data.rank}` : 'Calculated in CAP', 146, 75);

  doc.setFont('helvetica', 'bold');
  doc.text('Counsellor in Charge:', 110, 81);
  doc.setFont('helvetica', 'normal');
  doc.text(data.counsellorName || 'Senior Admission Strategist', 146, 81);

  let currentY = 94;

  // --- HELPER FUNCTION FOR TABLE GENERATION ---
  const renderTableSection = (title: string, colleges: CollegeCutoff[], badgeColor: [number, number, number], note: string) => {
    if (colleges.length === 0) return;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(badgeColor[0], badgeColor[1], badgeColor[2]);
    doc.text(title, 14, currentY);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(note, 14, currentY + 4);

    const tableRows = colleges.map((c, index) => [
      index + 1,
      c.collegeCode || '-',
      c.collegeName,
      c.branch,
      c.city,
      `${c.closingPercentile}%`,
      c.avgPackageLpa ? `₹${c.avgPackageLpa} LPA` : 'N/A',
      c.annualFees ? `₹${(c.annualFees / 1000).toFixed(0)}k/yr` : 'Govt'
    ]);

    autoTable(doc, {
      startY: currentY + 6,
      head: [['#', 'Code', 'Institute Name', 'Branch / Specialization', 'City', 'Cutoff %ile', 'Avg CTC', 'Fees']],
      body: tableRows,
      theme: 'grid',
      headStyles: {
        fillColor: badgeColor,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 8,
        halign: 'center'
      },
      styles: {
        fontSize: 7.5,
        cellPadding: 2,
        valign: 'middle'
      },
      columnStyles: {
        0: { cellWidth: 8, halign: 'center' },
        1: { cellWidth: 14, halign: 'center' },
        2: { cellWidth: 62 },
        3: { cellWidth: 46 },
        4: { cellWidth: 18, halign: 'center' },
        5: { cellWidth: 18, halign: 'center', fontStyle: 'bold' },
        6: { cellWidth: 14, halign: 'center' },
        7: { cellWidth: 14, halign: 'center' }
      },
      margin: { left: 14, right: 14 }
    });

    // @ts-ignore
    currentY = doc.lastAutoTable.finalY + 8;
  };

  // Section 1: TARGET / BEST FIT COLLEGES
  renderTableSection(
    '1. TARGET / HIGH-CHANCE COLLEGES (Recommended Primary Options)',
    data.predictions.target,
    [30, 90, 170],
    'Colleges closely matching your percentile and category cutoff based on past 3 years CAP rounds.'
  );

  // Section 2: DREAM / AMBITIOUS COLLEGES
  if (currentY > 230) {
    doc.addPage();
    currentY = 20;
  }
  renderTableSection(
    '2. DREAM / AMBITIOUS COLLEGES (Apply in Top CAP Option Form Preferences)',
    data.predictions.dream,
    [150, 40, 60],
    'Higher tier institutes where spot/round-3 vacancy movement could favor you.'
  );

  // Section 3: SAFE / BACKUP COLLEGES
  if (currentY > 230) {
    doc.addPage();
    currentY = 20;
  }
  renderTableSection(
    '3. SAFE / BACKUP COLLEGES (Guaranteed Admission Confidence)',
    data.predictions.safe,
    [22, 101, 52],
    'Colleges with historical cutoffs comfortably below your percentile score.'
  );

  // Check if we need a new page for remarks & verification
  if (currentY > 210) {
    doc.addPage();
    currentY = 20;
  }

  // --- COUNSELLOR REMARKS & STRATEGY BOX ---
  doc.setDrawColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.setFillColor(254, 252, 232);
  doc.roundedRect(14, currentY, 182, 38, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(146, 64, 14);
  doc.text('EXPERT COUNSELLOR ADVISORY & OPTION FORM STRATEGY', 18, currentY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);

  const remarks = data.counsellorRemarks || 
    '1. Ensure you fill Dream options in choices 1-10, Target options in 11-25, and Safe options from 26 onwards to avoid freezing out in CAP Round 1.\n' +
    '2. Keep Domicile Certificate, Caste Validity (if applicable), Income Certificate, and Non-Creamy Layer ready for immediate document verification.\n' +
    '3. Reach out to our dedicated helpline for personalized Option Form Lock review prior to final submission.';
  
  const splitRemarks = doc.splitTextToSize(remarks, 174);
  doc.text(splitRemarks, 18, currentY + 12);

  currentY += 46;

  // --- SIGNATURE & CONTACT FOOTER ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('SARASWATI CAREER COUNSELLING CENTRE', 14, currentY + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('Authorized Seal & Signature', 14, currentY + 10);
  doc.text('Direct Support: +91 7387773164 | khotarearyan@gmail.com', 14, currentY + 15);

  doc.setFont('helvetica', 'italic');
  doc.text('Page generated automatically via Saraswati Digital Predictor Suite.', 200, currentY + 15, { align: 'right' });

  // Save the PDF locally in browser
  const filename = `Saraswati_Prediction_${data.studentName.replace(/\s+/g, '_')}_${data.exam}.pdf`;
  doc.save(filename);

  // Extract base64 representation for direct backend email attachment
  const base64 = doc.output('datauristring').split(',')[1];

  return { doc, base64 };
}
