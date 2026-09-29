export const EVENTS = [
  {
    id: 1,
    slug: 'cyber-summit-2025',
    badge: 'FEATURED EVENT',
    category: 'Summit',
    title: 'IT GATE Cyber Summit 2025',
    subtitle: 'A full-day summit for the next generation of defenders.',
    description:
      'Join 500+ security professionals, ethical hackers, and industry leaders for a day of hands-on workshops, live demonstrations, and networking.',
    date: 'December 15, 2025',
    time: '9:00 AM — 6:00 PM',
    location: 'Cairo International Conference Center',
    seats: 500,
    registered: 342,
    speakers: 12,
    workshops: 8,
    media: [
      {
        type: 'video',
        // Pexels video — مختبر وشغال
        src: 'https://videos.pexels.com/video-files/3130284/3130284-uhd_2560_1440_30fps.mp4',
        poster:
          'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
    ],
    ctaText: 'Register Now',
    ctaLink: '/events/cyber-summit-2025',
  },
  {
    id: 2,
    slug: 'red-team-workshop',
    badge: 'WORKSHOP',
    category: 'Workshop',
    title: 'Red Team Advanced Tactics',
    subtitle: 'Hands-on offensive security operations.',
    description:
      'A deep-dive workshop covering modern red team operations: C2 infrastructure, lateral movement, and evasion techniques.',
    date: 'January 10, 2026',
    time: '10:00 AM — 4:00 PM',
    location: 'IT GATE HQ · Cairo',
    seats: 80,
    registered: 67,
    speakers: 4,
    workshops: 3,
    media: [
      {
        type: 'video',
        // Pexels — مصور بيلعب على الكمبيوتر (ينفع للسايبر)
        src: 'https://videos.pexels.com/video-files/5377684/5377684-uhd_2560_1440_25fps.mp4',
        poster:
          'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
    ],
    ctaText: 'Reserve Seat',
    ctaLink: '/events/red-team-workshop',
  },
  {
    id: 3,
    slug: 'blue-team-defense',
    badge: 'WORKSHOP',
    category: 'Workshop',
    title: 'Blue Team Defense Tactics',
    subtitle: 'Detection engineering & incident response.',
    description:
      'Learn how to build effective detection rules, hunt threats, and run incident response playbooks like a senior SOC analyst.',
    date: 'January 24, 2026',
    time: '10:00 AM — 5:00 PM',
    location: 'IT GATE HQ · Cairo',
    seats: 100,
    registered: 82,
    speakers: 5,
    workshops: 4,
    media: [
      {
        type: 'video',
        // Pexels — Server room / data center
        src: 'https://videos.pexels.com/video-files/3141210/3141210-uhd_2560_1440_25fps.mp4',
        poster:
          'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
    ],
    ctaText: 'Reserve Seat',
    ctaLink: '/events/blue-team-defense',
  },
  {
    id: 4,
    slug: 'cloud-security-masterclass',
    badge: 'MASTERCLASS',
    category: 'Masterclass',
    title: 'Cloud Security Masterclass',
    subtitle: 'AWS · Azure · GCP security in production.',
    description:
      'A masterclass on securing cloud infrastructure at scale — IAM, network isolation, encryption, and compliance.',
    date: 'February 7, 2026',
    time: '9:00 AM — 3:00 PM',
    location: 'Online · Live',
    seats: 300,
    registered: 189,
    speakers: 6,
    workshops: 5,
    media: [
      {
        type: 'video',
        // Pexels — abstract tech
        src: 'https://videos.pexels.com/video-files/3130284/3130284-uhd_2560_1440_30fps.mp4',
        poster:
          'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
    ],
    ctaText: 'Join Online',
    ctaLink: '/events/cloud-security-masterclass',
  },
  {
    id: 5,
    slug: 'ai-security-forum',
    badge: 'FORUM',
    category: 'Forum',
    title: 'AI & Security Forum',
    subtitle: 'Where ML meets threat detection.',
    description:
      'An exclusive forum on AI-powered security — LLM security, adversarial ML, and next-gen threat hunting.',
    date: 'February 22, 2026',
    time: '10:00 AM — 4:00 PM',
    location: 'Cairo · The Nile Tower',
    seats: 200,
    registered: 112,
    speakers: 8,
    workshops: 2,
    media: [
      {
        type: 'video',
        // Pexels — tech / neon
        src: 'https://videos.pexels.com/video-files/5377684/5377684-uhd_2560_1440_25fps.mp4',
        poster:
          'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
    ],
    ctaText: 'Reserve Seat',
    ctaLink: '/events/ai-security-forum',
  },
  {
    id: 6,
    slug: 'hackathon-2026',
    badge: 'HACKATHON',
    category: 'Hackathon',
    title: 'IT GATE Hackathon 2026',
    subtitle: '48 hours. Real threats. Real prizes.',
    description:
      "A 48-hour capture-the-flag hackathon bringing together the region's best defensive and offensive talent. $50K in prizes.",
    date: 'March 5, 2026',
    time: 'Starts at 6:00 PM',
    location: 'Smart Village · Cairo',
    seats: 400,
    registered: 236,
    speakers: 15,
    workshops: 6,
    media: [
      {
        type: 'video',
        // Pexels — coding / hacker
        src: 'https://videos.pexels.com/video-files/3141210/3141210-uhd_2560_1440_25fps.mp4',
        poster:
          'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1600',
      },
    ],
    ctaText: 'Register Team',
    ctaLink: '/events/hackathon-2026',
  },
];