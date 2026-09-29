export const COURSE_DETAIL = {
  id: 'ccna-cyber-ops',
  category: 'Cyber Security',
  badge: 'BESTSELLER',
  title: 'CCNA Cyber Ops',
  subtitle: 'Security Operations & Incident Response',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',

  // Hero
  heroVideo: 'https://cdn.coverr.co/videos/coverr-typing-on-a-laptop-4062/1080p.mp4',
  heroPoster: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1600',

  // Meta
  rating: 4.9,
  reviews: 2547,
  students: 12480,
  duration: '12 weeks',
  lessons: 84,
  labs: 42,
  level: 'Intermediate',
  language: 'English',
  lastUpdated: 'November 2025',
  certLogos: ['Cisco', 'CompTIA'],

  // Price
  price: 12500,
  oldPrice: 18000,
  currency: 'EGP',

  // Instructor
  instructor: {
    name: 'Ahmed Khalil',
    headline: 'Senior Security Engineer · 15+ Years',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent auctor, arcu et pretium tempor, neque leo finibus eros, nec faucibus justo purus sit amet ligula. Sed at consequat arcu. Nam ut nulla ac mauris efficitur venenatis.',
    avatar: 'https://i.pravatar.cc/300?img=12',
    rating: 4.9,
    courses: 12,
    students: 45280,
    reviews: 8420,
    socials: {
      linkedin: '#',
      twitter: '#',
      website: '#',
    },
  },

  // Learning outcomes
  whatYouLearn: [
    'Understand security operations fundamentals and frameworks',
    'Analyze network traffic for threats and anomalies',
    'Perform incident response using industry-standard playbooks',
    'Configure and monitor SIEM tools in production environments',
    'Apply MITRE ATT&CK framework for threat detection',
    'Build detection rules and threat-hunting hypotheses',
    'Conduct forensic analysis on compromised systems',
    'Document and communicate incident findings clearly',
  ],

  // Requirements
  requirements: [
    'Basic understanding of networking (CCNA level recommended)',
    'Familiarity with Linux command line',
    'A computer with 8GB RAM minimum (for labs)',
    'Willingness to learn and practice daily',
  ],

  // Includes
  includes: [
    { icon: 'video',    label: '84 video lessons', sublabel: '32 hours total' },
    { icon: 'file',     label: '42 hands-on labs', sublabel: 'Real scenarios' },
    { icon: 'download', label: 'Downloadable resources', sublabel: 'PDFs, playbooks' },
    { icon: 'award',    label: 'Certificate of completion', sublabel: 'Industry recognized' },
    { icon: 'users',    label: 'Community access', sublabel: 'Lifetime' },
    { icon: 'clock',    label: 'Lifetime access', sublabel: 'Learn at your pace' },
  ],

  // Curriculum
  curriculum: [
    {
      id: 1,
      title: 'Introduction to Security Operations',
      duration: '2h 15m',
      lessons: 8,
      items: [
        { id: 1, title: 'Welcome & Course Overview', duration: '8:24', type: 'video', preview: true },
        { id: 2, title: 'What is Security Operations?', duration: '14:32', type: 'video' },
        { id: 3, title: 'SOC Structure & Roles', duration: '18:45', type: 'video' },
        { id: 4, title: 'Frameworks (NIST, MITRE)', duration: '22:10', type: 'video' },
        { id: 5, title: 'Lab: Setting Up Your Environment', duration: '35:20', type: 'lab' },
        { id: 6, title: 'Quiz: Foundations', duration: '10 questions', type: 'quiz' },
        { id: 7, title: 'Reading: SOC Best Practices', duration: '12 pages', type: 'reading' },
        { id: 8, title: 'Section Summary', duration: '5:40', type: 'video' },
      ],
    },
    {
      id: 2,
      title: 'Network Traffic Analysis',
      duration: '4h 30m',
      lessons: 12,
      items: [
        { id: 1, title: 'Packet Capture Fundamentals', duration: '22:15', type: 'video' },
        { id: 2, title: 'Wireshark Deep Dive', duration: '35:40', type: 'video' },
        { id: 3, title: 'Detecting Suspicious Traffic', duration: '28:50', type: 'video' },
        { id: 4, title: 'Lab: Analyzing a Real Attack', duration: '45:20', type: 'lab' },
        { id: 5, title: 'Protocols & Anomalies', duration: '19:15', type: 'video' },
        { id: 6, title: 'Lab: Build a Detection Rule', duration: '38:10', type: 'lab' },
      ],
    },
    {
      id: 3,
      title: 'Threat Detection & Response',
      duration: '5h 45m',
      lessons: 14,
      items: [],
    },
    {
      id: 4,
      title: 'Incident Response Playbooks',
      duration: '4h 20m',
      lessons: 10,
      items: [],
    },
    {
      id: 5,
      title: 'Final Project & Certification Prep',
      duration: '3h 30m',
      lessons: 8,
      items: [],
    },
  ],

  // Reviews
  reviewsBreakdown: { 5: 2100, 4: 380, 3: 50, 2: 10, 1: 7 },
  reviewsList: [
    {
      id: 1,
      name: 'Mohammed Salah',
      role: 'Security Analyst at Etisalat',
      avatar: 'https://i.pravatar.cc/150?img=68',
      rating: 5,
      date: '3 weeks ago',
      title: 'Best investment I made this year',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. The hands-on labs are incredible — I actually built and deployed detection rules in my company\'s SIEM after module 3.',
      helpful: 128,
    },
    {
      id: 2,
      name: 'Nora Hassan',
      role: 'SOC Analyst',
      avatar: 'https://i.pravatar.cc/150?img=45',
      rating: 5,
      date: '1 month ago',
      title: 'Instructor explains everything clearly',
      text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. The pacing is perfect — not too fast, not too slow. Worth every penny.',
      helpful: 94,
    },
    {
      id: 3,
      name: 'Youssef Tarek',
      role: 'IT Support Engineer',
      avatar: 'https://i.pravatar.cc/150?img=33',
      rating: 4,
      date: '2 months ago',
      title: 'Great content, but wish it was longer',
      text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. The content is solid — I\'d love more advanced modules on cloud security.',
      helpful: 47,
    },
  ],

  // Q&A
  questionsList: [
    {
      id: 1,
      user: { name: 'Ahmed M.', avatar: 'https://i.pravatar.cc/150?img=15' },
      question: 'Do I need prior cybersecurity experience to take this course?',
      timestamp: '2 weeks ago',
      answers: [
        {
          id: 1,
          user: { name: 'Ahmed Khalil', avatar: 'https://i.pravatar.cc/150?img=12', isInstructor: true },
          text: 'Basic networking knowledge helps, but we cover foundations in module 1. If you completed CCNA or have IT support background, you\'ll be fine.',
          timestamp: '2 weeks ago',
          helpful: 42,
        },
      ],
    },
    {
      id: 2,
      user: { name: 'Sara K.', avatar: 'https://i.pravatar.cc/150?img=29' },
      question: 'Are the labs accessible after I complete the course?',
      timestamp: '1 month ago',
      answers: [
        {
          id: 1,
          user: { name: 'Ahmed Khalil', avatar: 'https://i.pravatar.cc/150?img=12', isInstructor: true },
          text: 'Yes! Lifetime access to all labs and materials. You can revisit them anytime.',
          timestamp: '1 month ago',
          helpful: 28,
        },
      ],
    },
  ],

  // FAQ
  faq: [
    {
      q: 'How long do I have access to the course?',
      a: 'Lifetime access — once you enroll, all content, labs, and updates are yours forever.',
    },
    {
      q: 'Is there a certificate after completion?',
      a: 'Yes. Upon completing 100% of the lessons and passing the final assessment, you\'ll receive an industry-recognized certificate.',
    },
    {
      q: 'What if I\'m not satisfied with the course?',
      a: 'We offer a 30-day money-back guarantee. If the course isn\'t right for you, request a refund — no questions asked.',
    },
    {
      q: 'Can I pay in installments?',
      a: 'Yes, we offer 3-month and 6-month installment plans. Contact our team for details.',
    },
    {
      q: 'Do I need special equipment?',
      a: 'A modern computer (8GB RAM min) with internet connection. All lab tools are cloud-based — nothing to install locally.',
    },
  ],
};