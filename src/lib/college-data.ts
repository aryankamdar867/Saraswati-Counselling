export interface CollegeCutoff {
  id: string;
  exam: 'MHT-CET' | 'JEE-MAIN' | 'NEET';
  collegeCode: string;
  collegeName: string;
  city: string;
  state: string;
  branch: string;
  category: string;
  closingPercentile: number;
  closingRank: number;
  roundNumber: number;
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  avgPackageLpa: number;
  highestPackageLpa?: number;
  annualFees: number;
  websiteUrl?: string;
  nirfRank?: number;
}

export interface PredictionResult {
  dream: CollegeCutoff[];
  target: CollegeCutoff[];
  safe: CollegeCutoff[];
}

export const INITIAL_COLLEGES: CollegeCutoff[] = [
  // --- MHT-CET TIER 1 ---
  {
    id: 'm1',
    exam: 'MHT-CET',
    collegeCode: '6006',
    collegeName: 'COEP Technological University',
    city: 'Pune',
    state: 'Maharashtra',
    branch: 'Computer Engineering',
    category: 'OPEN',
    closingPercentile: 99.85,
    closingRank: 120,
    roundNumber: 1,
    tier: 'Tier 1',
    avgPackageLpa: 15.5,
    highestPackageLpa: 50.5,
    annualFees: 135000,
    nirfRank: 52
  },
  {
    id: 'm2',
    exam: 'MHT-CET',
    collegeCode: '6006',
    collegeName: 'COEP Technological University',
    city: 'Pune',
    state: 'Maharashtra',
    branch: 'Artificial Intelligence & Robotics',
    category: 'OPEN',
    closingPercentile: 99.65,
    closingRank: 340,
    roundNumber: 1,
    tier: 'Tier 1',
    avgPackageLpa: 14.0,
    highestPackageLpa: 42.0,
    annualFees: 135000,
    nirfRank: 52
  },
  {
    id: 'm3',
    exam: 'MHT-CET',
    collegeCode: '6006',
    collegeName: 'COEP Technological University',
    city: 'Pune',
    state: 'Maharashtra',
    branch: 'Electronics & Telecommunication',
    category: 'OPEN',
    closingPercentile: 99.20,
    closingRank: 950,
    roundNumber: 1,
    tier: 'Tier 1',
    avgPackageLpa: 11.8,
    highestPackageLpa: 36.0,
    annualFees: 135000,
    nirfRank: 52
  },
  {
    id: 'm4',
    exam: 'MHT-CET',
    collegeCode: '6006',
    collegeName: 'COEP Technological University',
    city: 'Pune',
    state: 'Maharashtra',
    branch: 'Mechanical Engineering',
    category: 'OPEN',
    closingPercentile: 97.80,
    closingRank: 2400,
    roundNumber: 1,
    tier: 'Tier 1',
    avgPackageLpa: 9.0,
    highestPackageLpa: 28.0,
    annualFees: 135000,
    nirfRank: 52
  },
  {
    id: 'm5',
    exam: 'MHT-CET',
    collegeCode: '3012',
    collegeName: 'Veermata Jijabai Technological Institute (VJTI)',
    city: 'Mumbai',
    state: 'Maharashtra',
    branch: 'Computer Engineering',
    category: 'OPEN',
    closingPercentile: 99.90,
    closingRank: 85,
    roundNumber: 1,
    tier: 'Tier 1',
    avgPackageLpa: 16.0,
    highestPackageLpa: 62.0,
    annualFees: 88000,
    nirfRank: 78
  },
  {
    id: 'm6',
    exam: 'MHT-CET',
    collegeCode: '3012',
    collegeName: 'Veermata Jijabai Technological Institute (VJTI)',
    city: 'Mumbai',
    state: 'Maharashtra',
    branch: 'Information Technology',
    category: 'OPEN',
    closingPercentile: 99.78,
    closingRank: 210,
    roundNumber: 1,
    tier: 'Tier 1',
    avgPackageLpa: 14.8,
    highestPackageLpa: 55.0,
    annualFees: 88000,
    nirfRank: 78
  },
  {
    id: 'm7',
    exam: 'MHT-CET',
    collegeCode: '3014',
    collegeName: 'Sardar Patel Institute of Technology (SPIT)',
    city: 'Mumbai',
    state: 'Maharashtra',
    branch: 'Computer Science and Engineering',
    category: 'OPEN',
    closingPercentile: 99.60,
    closingRank: 420,
    roundNumber: 1,
    tier: 'Tier 1',
    avgPackageLpa: 14.2,
    highestPackageLpa: 45.0,
    annualFees: 175000
  },
  {
    id: 'm8',
    exam: 'MHT-CET',
    collegeCode: '6271',
    collegeName: 'Pune Institute of Computer Technology (PICT)',
    city: 'Pune',
    state: 'Maharashtra',
    branch: 'Computer Engineering',
    category: 'OPEN',
    closingPercentile: 99.55,
    closingRank: 490,
    roundNumber: 1,
    tier: 'Tier 1',
    avgPackageLpa: 13.5,
    highestPackageLpa: 44.0,
    annualFees: 110000
  },
  {
    id: 'm9',
    exam: 'MHT-CET',
    collegeCode: '6271',
    collegeName: 'Pune Institute of Computer Technology (PICT)',
    city: 'Pune',
    state: 'Maharashtra',
    branch: 'Information Technology',
    category: 'OPEN',
    closingPercentile: 99.30,
    closingRank: 820,
    roundNumber: 1,
    tier: 'Tier 1',
    avgPackageLpa: 12.8,
    highestPackageLpa: 40.0,
    annualFees: 110000
  },
  {
    id: 'm10',
    exam: 'MHT-CET',
    collegeCode: '6271',
    collegeName: 'Pune Institute of Computer Technology (PICT)',
    city: 'Pune',
    state: 'Maharashtra',
    branch: 'Artificial Intelligence & Data Science',
    category: 'OPEN',
    closingPercentile: 99.15,
    closingRank: 1050,
    roundNumber: 1,
    tier: 'Tier 1',
    avgPackageLpa: 12.2,
    highestPackageLpa: 38.0,
    annualFees: 110000
  },

  // --- MHT-CET TIER 2 ---
  {
    id: 'm11',
    exam: 'MHT-CET',
    collegeCode: '6273',
    collegeName: 'Vishwakarma Institute of Technology (VIT Pune)',
    city: 'Pune',
    state: 'Maharashtra',
    branch: 'Computer Engineering',
    category: 'OPEN',
    closingPercentile: 98.75,
    closingRank: 1600,
    roundNumber: 1,
    tier: 'Tier 2',
    avgPackageLpa: 9.5,
    highestPackageLpa: 33.0,
    annualFees: 185000
  },
  {
    id: 'm12',
    exam: 'MHT-CET',
    collegeCode: '6273',
    collegeName: 'Vishwakarma Institute of Technology (VIT Pune)',
    city: 'Pune',
    state: 'Maharashtra',
    branch: 'Information Technology',
    category: 'OPEN',
    closingPercentile: 98.20,
    closingRank: 2350,
    roundNumber: 1,
    tier: 'Tier 2',
    avgPackageLpa: 8.8,
    highestPackageLpa: 30.0,
    annualFees: 185000
  },
  {
    id: 'm13',
    exam: 'MHT-CET',
    collegeCode: '6175',
    collegeName: 'Pimpri Chinchwad College of Engineering (PCCOE)',
    city: 'Pune',
    state: 'Maharashtra',
    branch: 'Computer Engineering',
    category: 'OPEN',
    closingPercentile: 98.40,
    closingRank: 2100,
    roundNumber: 1,
    tier: 'Tier 2',
    avgPackageLpa: 7.8,
    highestPackageLpa: 32.0,
    annualFees: 140000
  },
  {
    id: 'm14',
    exam: 'MHT-CET',
    collegeCode: '6175',
    collegeName: 'Pimpri Chinchwad College of Engineering (PCCOE)',
    city: 'Pune',
    state: 'Maharashtra',
    branch: 'Information Technology',
    category: 'OPEN',
    closingPercentile: 97.90,
    closingRank: 2850,
    roundNumber: 1,
    tier: 'Tier 2',
    avgPackageLpa: 7.4,
    highestPackageLpa: 28.0,
    annualFees: 140000
  },
  {
    id: 'm15',
    exam: 'MHT-CET',
    collegeCode: '3199',
    collegeName: 'Dwarkadas J. Sanghvi College of Engineering (DJSCE)',
    city: 'Mumbai',
    state: 'Maharashtra',
    branch: 'Computer Engineering',
    category: 'OPEN',
    closingPercentile: 98.90,
    closingRank: 1450,
    roundNumber: 1,
    tier: 'Tier 2',
    avgPackageLpa: 10.8,
    highestPackageLpa: 35.0,
    annualFees: 210000
  },
  {
    id: 'm16',
    exam: 'MHT-CET',
    collegeCode: '3182',
    collegeName: 'Thadomal Shahani Engineering College (TSEC)',
    city: 'Mumbai',
    state: 'Maharashtra',
    branch: 'Computer Engineering',
    category: 'OPEN',
    closingPercentile: 97.60,
    closingRank: 3350,
    roundNumber: 1,
    tier: 'Tier 2',
    avgPackageLpa: 8.5,
    highestPackageLpa: 26.0,
    annualFees: 195000
  },
  {
    id: 'm17',
    exam: 'MHT-CET',
    collegeCode: '6146',
    collegeName: 'MIT Academy of Engineering (MITAOE)',
    city: 'Pune',
    state: 'Maharashtra',
    branch: 'Computer Engineering',
    category: 'OPEN',
    closingPercentile: 95.80,
    closingRank: 6200,
    roundNumber: 1,
    tier: 'Tier 2',
    avgPackageLpa: 7.0,
    highestPackageLpa: 24.0,
    annualFees: 175000
  },
  {
    id: 'm18',
    exam: 'MHT-CET',
    collegeCode: '6288',
    collegeName: 'Sinhgad College of Engineering (SCOE)',
    city: 'Pune',
    state: 'Maharashtra',
    branch: 'Computer Engineering',
    category: 'OPEN',
    closingPercentile: 94.20,
    closingRank: 9100,
    roundNumber: 1,
    tier: 'Tier 2',
    avgPackageLpa: 6.0,
    highestPackageLpa: 20.0,
    annualFees: 135000
  },

  // --- MHT-CET TIER 3 & SAFE CHOICES ---
  {
    id: 'm19',
    exam: 'MHT-CET',
    collegeCode: '6284',
    collegeName: 'Vidya Pratishthan Kamalnayan Bajaj Institute of Engg',
    city: 'Baramati',
    state: 'Maharashtra',
    branch: 'Computer Engineering',
    category: 'OPEN',
    closingPercentile: 92.50,
    closingRank: 12000,
    roundNumber: 1,
    tier: 'Tier 3',
    avgPackageLpa: 5.5,
    highestPackageLpa: 16.0,
    annualFees: 95000
  },
  {
    id: 'm20',
    exam: 'MHT-CET',
    collegeCode: '6298',
    collegeName: 'Zeal College of Engineering and Research',
    city: 'Pune',
    state: 'Maharashtra',
    branch: 'Computer Engineering',
    category: 'OPEN',
    closingPercentile: 88.50,
    closingRank: 19500,
    roundNumber: 1,
    tier: 'Tier 3',
    avgPackageLpa: 4.8,
    highestPackageLpa: 14.0,
    annualFees: 105000
  },
  {
    id: 'm21',
    exam: 'MHT-CET',
    collegeCode: '6325',
    collegeName: 'Alard College of Engineering and Management',
    city: 'Pune',
    state: 'Maharashtra',
    branch: 'Computer Engineering',
    category: 'OPEN',
    closingPercentile: 82.30,
    closingRank: 31000,
    roundNumber: 1,
    tier: 'Tier 3',
    avgPackageLpa: 4.2,
    highestPackageLpa: 12.0,
    annualFees: 90000
  },
  {
    id: 'm22',
    exam: 'MHT-CET',
    collegeCode: '6754',
    collegeName: 'International Institute of Information Technology (I²IT)',
    city: 'Hinjawadi, Pune',
    state: 'Maharashtra',
    branch: 'Computer Engineering',
    category: 'OPEN',
    closingPercentile: 96.10,
    closingRank: 5700,
    roundNumber: 1,
    tier: 'Tier 2',
    avgPackageLpa: 7.2,
    highestPackageLpa: 22.0,
    annualFees: 130000
  },

  // --- JEE MAIN CHOICES ---
  {
    id: 'j1',
    exam: 'JEE-MAIN',
    collegeCode: 'VNIT',
    collegeName: 'Visvesvaraya National Institute of Technology (VNIT Nagpur)',
    city: 'Nagpur',
    state: 'Maharashtra',
    branch: 'Computer Science and Engineering',
    category: 'OPEN',
    closingPercentile: 99.40,
    closingRank: 5200,
    roundNumber: 1,
    tier: 'Tier 1',
    avgPackageLpa: 15.2,
    highestPackageLpa: 52.0,
    annualFees: 145000,
    nirfRank: 41
  },
  {
    id: 'j2',
    exam: 'JEE-MAIN',
    collegeCode: 'IIITP',
    collegeName: 'Indian Institute of Information Technology (IIIT Pune)',
    city: 'Pune',
    state: 'Maharashtra',
    branch: 'Computer Science and Engineering',
    category: 'OPEN',
    closingPercentile: 98.60,
    closingRank: 14200,
    roundNumber: 1,
    tier: 'Tier 1',
    avgPackageLpa: 16.8,
    highestPackageLpa: 53.0,
    annualFees: 240000
  },
  {
    id: 'j3',
    exam: 'JEE-MAIN',
    collegeCode: 'IIITN',
    collegeName: 'Indian Institute of Information Technology (IIIT Nagpur)',
    city: 'Nagpur',
    state: 'Maharashtra',
    branch: 'Computer Science and Engineering',
    category: 'OPEN',
    closingPercentile: 97.90,
    closingRank: 22500,
    roundNumber: 1,
    tier: 'Tier 1',
    avgPackageLpa: 13.5,
    highestPackageLpa: 40.0,
    annualFees: 220000
  },

  // --- NEET MEDICAL CHOICES ---
  {
    id: 'n1',
    exam: 'NEET',
    collegeCode: 'GMC-MUM',
    collegeName: 'Grant Government Medical College & Sir J.J. Hospital',
    city: 'Mumbai',
    state: 'Maharashtra',
    branch: 'MBBS',
    category: 'OPEN',
    closingPercentile: 99.60,
    closingRank: 4800,
    roundNumber: 1,
    tier: 'Tier 1',
    avgPackageLpa: 12.0,
    annualFees: 135000
  },
  {
    id: 'n2',
    exam: 'NEET',
    collegeCode: 'KEM-MUM',
    collegeName: 'Seth G.S. Medical College & KEM Hospital',
    city: 'Mumbai',
    state: 'Maharashtra',
    branch: 'MBBS',
    category: 'OPEN',
    closingPercentile: 99.80,
    closingRank: 1200,
    roundNumber: 1,
    tier: 'Tier 1',
    avgPackageLpa: 14.0,
    annualFees: 135000
  },
  {
    id: 'n3',
    exam: 'NEET',
    collegeCode: 'BJMC-PUN',
    collegeName: 'B.J. Government Medical College (BJMC)',
    city: 'Pune',
    state: 'Maharashtra',
    branch: 'MBBS',
    category: 'OPEN',
    closingPercentile: 99.45,
    closingRank: 6500,
    roundNumber: 1,
    tier: 'Tier 1',
    avgPackageLpa: 12.0,
    annualFees: 128000
  },
  {
    id: 'n4',
    exam: 'NEET',
    collegeCode: 'GMC-NAG',
    collegeName: 'Government Medical College (GMC)',
    city: 'Nagpur',
    state: 'Maharashtra',
    branch: 'MBBS',
    category: 'OPEN',
    closingPercentile: 99.10,
    closingRank: 11200,
    roundNumber: 1,
    tier: 'Tier 1',
    avgPackageLpa: 11.5,
    annualFees: 125000
  },
  {
    id: 'n5',
    exam: 'NEET',
    collegeCode: 'DYP-PUN',
    collegeName: 'Dr. D.Y. Patil Medical College & Hospital',
    city: 'Pune',
    state: 'Maharashtra',
    branch: 'MBBS',
    category: 'OPEN',
    closingPercentile: 92.50,
    closingRank: 85000,
    roundNumber: 1,
    tier: 'Tier 2',
    avgPackageLpa: 9.0,
    annualFees: 2600000
  }
];

export function predictColleges(params: {
  exam: 'MHT-CET' | 'JEE-MAIN' | 'NEET';
  percentile: number;
  category: string;
  branches?: string[];
  city?: string;
  customData?: CollegeCutoff[];
}): PredictionResult {
  const allColleges = params.customData && params.customData.length > 0 ? params.customData : INITIAL_COLLEGES;
  
  // Filter by Exam
  let filtered = allColleges.filter((c) => c.exam === params.exam);

  // Filter by Category (if not OPEN, adjust cutoff percentile factor slightly for OBC/SC/ST/EWS if category data isn't specific)
  // General category factor:
  let categoryAdjustment = 0;
  if (params.category === 'OBC') categoryAdjustment = 1.2;
  else if (params.category === 'EWS') categoryAdjustment = 0.8;
  else if (params.category === 'TFWS') categoryAdjustment = -0.5;
  else if (params.category === 'SC') categoryAdjustment = 4.5;
  else if (params.category === 'ST') categoryAdjustment = 8.0;
  else if (params.category === 'VJ/NT') categoryAdjustment = 3.0;

  // Filter by Branch if specified
  if (params.branches && params.branches.length > 0 && !params.branches.includes('ALL')) {
    filtered = filtered.filter((c) =>
      params.branches!.some((b) => c.branch.toLowerCase().includes(b.toLowerCase()) || b.toLowerCase().includes(c.branch.toLowerCase()))
    );
  }

  // Filter by City if specified
  if (params.city && params.city !== 'ALL') {
    filtered = filtered.filter((c) => c.city.toLowerCase() === params.city!.toLowerCase());
  }

  const effectivePercentile = params.percentile + categoryAdjustment;

  const dream: CollegeCutoff[] = [];
  const target: CollegeCutoff[] = [];
  const safe: CollegeCutoff[] = [];

  filtered.forEach((college) => {
    const diff = college.closingPercentile - effectivePercentile;

    // If closing percentile is higher by up to 2.5% -> Dream / Ambitious
    if (diff > 0 && diff <= 2.5) {
      dream.push(college);
    } 
    // If closing percentile is close (-1.5% to +0.2%) -> Target / Realistic
    else if (diff <= 0.2 && diff >= -2.0) {
      target.push(college);
    } 
    // If student percentile is comfortably higher -> Safe
    else if (diff < -2.0 && diff > -15.0) {
      safe.push(college);
    }
  });

  // Sort each tier by closing percentile descending
  dream.sort((a, b) => b.closingPercentile - a.closingPercentile);
  target.sort((a, b) => b.closingPercentile - a.closingPercentile);
  safe.sort((a, b) => b.closingPercentile - a.closingPercentile);

  return { dream, target, safe };
}
