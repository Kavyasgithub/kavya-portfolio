// Single source of truth for portfolio content. Keep in sync with the resume.

export const profile = {
  name: 'Kavya Sharma',
  role: 'Full Stack Developer',
  location: 'Gurugram, Haryana, India',
  email: 'sharmakavya.tech@gmail.com',
  resumeUrl: '/Kavya_Sharma_Resume.pdf',
  resumeFileName: 'Kavya_Sharma_Resume.pdf',
  githubUsername: 'Kavyasgithub',
  summary:
    'Full stack developer with 1+ year of industry experience building web applications with React, Node.js, Express.js and PostgreSQL. I work across the stack: REST APIs, authentication, data modelling and the interfaces on top of them, and I care about correctness at the database level.',
  bio: [
    'I build web applications end-to-end, from schema design and API contracts through to the React interfaces people actually use. Most of my work sits where correctness matters: financial ledgers, role-based platforms and live production systems where a broken edge case is a real incident.',
    'Today I build dynamic survey systems at Acuity Analytics and take on freelance full stack work. Before that I spent nine months at Qlimber Consulting shipping REST APIs, OData services and auth middleware for logistics and client platforms.',
    'I prefer pushing invariants into the database, keeping APIs boring and predictable, and debugging from logs and data rather than guesses.',
  ],
}

export const socials = [
  { platform: 'github', label: 'GitHub', handle: '@Kavyasgithub', url: 'https://github.com/Kavyasgithub' },
  { platform: 'linkedin', label: 'LinkedIn', handle: 'in/kavya-sharma', url: 'https://linkedin.com/in/kavya-sharma' },
  { platform: 'email', label: 'Email', handle: profile.email, url: `mailto:${profile.email}` },
] as const

export const animatedTexts = [
  'Full Stack Developer',
  'Backend & API Engineer',
  'Freelance Product Builder',
]

export interface SkillGroup {
  category: string
  icon: 'Code2' | 'Layout' | 'Server' | 'Database' | 'Wrench' | 'Sparkles'
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  { category: 'Languages', icon: 'Code2', items: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'SQL', 'HTML5', 'CSS3'] },
  { category: 'Frontend', icon: 'Layout', items: ['React.js', 'Next.js', 'Redux', 'Tailwind CSS', 'Vite'] },
  { category: 'Backend', icon: 'Server', items: ['Node.js', 'Express.js', 'REST APIs', 'OData', 'JWT / OAuth2', 'WebSockets'] },
  { category: 'Databases', icon: 'Database', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
  { category: 'DevOps & Tools', icon: 'Wrench', items: ['Docker', 'CI/CD Pipelines', 'Git & GitHub', 'Postman', 'Workato'] },
  { category: 'AI & Data', icon: 'Sparkles', items: ['RAG', 'Generative AI', 'Pandas', 'NumPy'] },
]

export const engineeringPractices = [
  'Database-enforced invariants',
  'Idempotent APIs',
  'Role-based access control',
  'Production debugging',
  'Monolithic architecture',
  'Agile delivery',
  'OOP & DBMS fundamentals',
]

export interface ExperienceEntry {
  title: string
  company: string
  employmentType: string
  location: string
  period: string
  current?: boolean
  bullets: string[]
  stack: string[]
}

export const experience: ExperienceEntry[] = [
  {
    title: 'Analyst Trainee',
    company: 'Acuity Analytics',
    employmentType: 'Full-time',
    location: 'Gurugram, Haryana',
    period: 'May 2026 – Present',
    current: true,
    bullets: [
      'Build dynamic survey interfaces in React and JavaScript with conditional branching, skip logic and real-time input validation for live client research projects.',
      'Integrate survey frontends with backend REST APIs to load questionnaire configurations, submit responses and enforce quotas, troubleshooting API failures and data mismatches.',
      'Debug production issues in live surveys end-to-end, tracing logs, API responses and response data to find and fix root causes of broken logic, validation errors and data inconsistencies.',
    ],
    stack: ['React', 'JavaScript', 'REST APIs'],
  },
  {
    title: 'Freelance Full Stack Developer',
    company: 'Self-employed',
    employmentType: 'Freelance',
    location: 'Remote',
    period: 'Apr 2026 – Present',
    current: true,
    bullets: [
      'Design, build and ship production web applications end-to-end, from requirements and data modelling to deployment and post-launch support.',
      'Delivered RGC System, a health membership platform with 4 role-based portals, 37 version-controlled PostgreSQL migrations, signed-QR digital cards and Razorpay payments.',
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Razorpay'],
  },
  {
    title: 'Full Stack Developer Intern',
    company: 'Qlimber Consulting Pvt. Ltd.',
    employmentType: 'Internship',
    location: 'Faridabad, Haryana',
    period: 'Jul 2025 – Apr 2026',
    bullets: [
      'Logistics Platform: built and tested 10+ REST API endpoints with React, Node.js, Express.js and PostgreSQL; wrote Express middleware for JWT / OAuth2 authentication, role-based access control and request validation.',
      'OData API Platform: developed OData services that unify multiple database engines behind a single query API, letting users connect any supported database without custom integration code.',
      "Client Performance Project: improved a client application's page load speed by optimizing SQL queries, trimming API payloads and reducing front-end re-renders.",
      'Integrated CRM systems and automated cross-system business workflows using Workato.',
    ],
    stack: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'OData', 'Workato'],
  },
]

export const education = [
  {
    institution: 'Deenbandhu Chhotu Ram University of Science & Technology (DCRUST)',
    degree: 'B.Tech, Electronics & Communication Engineering',
    detail: 'CGPA: 8.26 / 10',
    location: 'Murthal, Haryana',
    period: 'Sep 2022 – May 2026',
  },
  {
    institution: 'Modern Vidya Niketan (CBSE)',
    degree: 'Class XII',
    detail: '93.2%',
    location: 'Faridabad, Haryana',
    period: '2022',
  },
]

export const certifications = [
  { name: 'OCI Generative AI Professional', issuer: 'Oracle Cloud Infrastructure' },
  { name: 'OCI AI Foundations Associate', issuer: 'Oracle Cloud Infrastructure' },
]

export const achievements = [
  {
    title: 'General Secretary, E-Cell DCRUST',
    description: 'Led a 25-member team, organized entrepreneurship events for 100+ students and coordinated startup sponsorships.',
  },
  {
    title: 'Member, DCRUSTODC',
    description: "Part of DCRUST's first developer community: competitive programming contests, DSA discussions, collaborative projects and open-source contributions.",
  },
]

export type ProjectType = 'Personal' | 'Freelance'

export interface StaticProject {
  slug: string
  title: string
  tagline: string
  type: ProjectType
  featured?: boolean
  coverImage: { alt: string; imageUrl: string }
  description: string
  highlights: string[]
  technologies: string[]
  projectUrl?: string
}

export const projects: StaticProject[] = [
  {
    slug: 'ledgerx',
    title: 'LedgerX',
    tagline: 'Double-entry financial ledger',
    type: 'Personal',
    featured: true,
    coverImage: {
      alt: 'LedgerX landing page showing a live double-entry ledger log',
      imageUrl: '/projects/ledgerx.png',
    },
    description:
      'A working double-entry financial ledger where every movement of money is recorded twice and must cancel exactly. Balances, constraints and concurrency are enforced at the database level, not in application code.',
    highlights: [
      '16 REST API endpoints across 6 resource groups covering 7 transaction flows: top-ups, payments with fee splits, holds, captures, full and partial refunds, and reversals.',
      'All amounts stored as integer minor units to avoid floating-point errors.',
      '3 financial invariants enforced in PostgreSQL triggers (zero-sum transactions, immutable postings, currency matching), plus idempotency keys for exactly-once writes and ordered row locking to prevent deadlocks.',
      'React + Vite dashboard with a live journal, an interactive API explorer, analytics charts, a 7-point reconciliation audit and workspace-based multi-tenancy.',
    ],
    technologies: ['React', 'Vite', 'Node.js', 'Express.js', 'PostgreSQL'],
    projectUrl: 'https://ledger-x-frontend-xi.vercel.app',
  },
  {
    slug: 'rgc-system',
    title: 'RGC System',
    tagline: 'Health membership platform',
    type: 'Freelance',
    featured: true,
    coverImage: {
      alt: 'RGC System architecture overview: four role-based portals on PostgreSQL',
      imageUrl: '/projects/rgc-system.png',
    },
    description:
      'A full-stack health membership platform built as a freelance client engagement, with separate portals for administrators, consultants, hospitals and members on a single PostgreSQL backend.',
    highlights: [
      '4 role-based portals (Admin, Consultant, Hospital, Member) on a PostgreSQL database with 37 version-controlled migrations.',
      'Forgery-proof digital membership cards using signed QR codes, with automatic PDF card generation and email delivery on enrollment.',
      'Role-based auth across 9 API groups, online and offline payments via Razorpay, and automated plan expiry.',
      'Admin revenue dashboards for tracking enrollments and payments.',
    ],
    technologies: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Razorpay'],
  },
  {
    slug: 'edemy-lms-platform',
    title: 'Edemy',
    tagline: 'Learning management system',
    type: 'Personal',
    coverImage: {
      alt: 'Edemy LMS Platform',
      imageUrl: '/edemy.png',
    },
    description:
      'A full-stack Learning Management System supporting course discovery, enrollment and progress tracking.',
    highlights: [
      'Integrated Stripe payments and Clerk authentication for secure transactions and user management.',
      'Designed REST APIs for courses, enrollments and progress, with a responsive UI on top.',
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'Stripe', 'Clerk'],
    projectUrl: 'https://edemy-kohl.vercel.app/',
  },
  {
    slug: 'tether-chat-application',
    title: 'Tether',
    tagline: 'Real-time chat and video',
    type: 'Personal',
    coverImage: {
      alt: 'Tether Chat & Video Messaging Application',
      imageUrl: '/tether.png',
    },
    description:
      'A real-time communication platform supporting direct messages, group chats and video calls.',
    highlights: [
      'Video calls with screen sharing and call recording via the Stream API.',
      'Channel creation and private user invitations.',
    ],
    technologies: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Clerk', 'Stream API'],
    projectUrl: 'https://tether-together-frontend.vercel.app/auth',
  },
  {
    slug: 'chess-game-multiplayer',
    title: 'Chess Game',
    tagline: 'Real-time multiplayer chess',
    type: 'Personal',
    coverImage: {
      alt: 'Real-time Multiplayer Chess Game',
      imageUrl: '/chessGame.png',
    },
    description:
      'A real-time multiplayer chess application using Socket.io for low-latency gameplay.',
    highlights: [
      'Server-side game state and move validation with Chess.js, so clients cannot submit illegal moves.',
      'Event-driven architecture handling rooms, player roles and concurrent sessions.',
    ],
    technologies: ['Node.js', 'Socket.io', 'Chess.js', 'Express.js', 'JavaScript'],
    projectUrl: 'https://chessgame-po24.onrender.com',
  },
  {
    slug: 'wanderstay-property-listing',
    title: 'WanderStay',
    tagline: 'Property listings and reviews',
    type: 'Personal',
    coverImage: {
      alt: 'WanderStay Property Listing Application',
      imageUrl: '/wanderstay.png',
    },
    description:
      'A full-stack property listing platform with bookings and reviews.',
    highlights: [
      'Search filters, authentication and secure CRUD operations.',
      'Deployed on Render.',
    ],
    technologies: ['JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'HTML', 'CSS'],
    projectUrl: 'https://delta-project-v2ag.onrender.com/listings',
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const otherProjects = projects.filter((p) => !p.featured)
