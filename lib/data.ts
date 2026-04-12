import { Code2, Database, GitBranch, Globe, Layers, Server } from 'lucide-react'
import { createElement } from 'react'

export interface TechItem {
  name: string
  icon: string // lucide icon name
  category: string
}

export const techStack: TechItem[] = [
  { name: 'React.js', icon: 'Code2', category: 'Frontend' },
  { name: 'Next.js', icon: 'Globe', category: 'Frontend' },
  { name: 'JavaScript', icon: 'Code2', category: 'Language' },
  { name: 'TypeScript', icon: 'Code2', category: 'Language' },
  { name: 'Java', icon: 'Code2', category: 'Language' },
  { name: 'Python', icon: 'Code2', category: 'Language' },
  { name: 'Node.js', icon: 'Server', category: 'Backend' },
  { name: 'Express.js', icon: 'Server', category: 'Backend' },
  { name: 'MySQL', icon: 'Database', category: 'Database' },
  { name: 'MongoDB', icon: 'Database', category: 'Database' },
  { name: 'Docker', icon: 'Layers', category: 'DevOps' },
  {name: 'RAG', icon: 'Layers', category: 'AI'},
  { name: 'Azure', icon: 'Globe', category: 'Cloud' },
  { name: 'Git', icon: 'GitBranch', category: 'Tools' },
]

export interface ExperienceEntry {
  title: string
  company: string
  location: string
  period: string
  bullets: string[]
}

export const experience: ExperienceEntry[] = [
  {
    title: 'Software Development Intern',
    company: 'Maruti Suzuki India Ltd.',
    location: 'Gurugram, Haryana',
    period: 'Jan 2026 - Present',
    bullets: [
      'Engineering an Intern Management System to automate onboarding workflows, eliminating manual processes and improving operational efficiency.',
      'Developed end-to-end lifecycle including approvals, offer letter generation, notifications, and real-time tracking, ensuring seamless intern experience.',
      'Designed and optimized ServiceNow-based interfaces using HTML, CSS, JavaScript, enhancing usability and streamlining internal coordination',
    ],
  },
  {
    title: 'Full Stack Development Intern',
    company: 'Qlimber Consulting Pvt. Ltd.',
    location: 'Faridabad, Haryana',
    period: 'Jul 2025 - Nov 2025',
    bullets: [
      'Led the design and development of supply chain & logistics product modules, improving efficiency in order tracking and route management.',
      'Worked on MVC framework to create modular, scalable, and maintainable solutions.',
      'Collaborated with the product and technical teams to analyze logistics workflows and implement automation features to reduce manual dependencies.',
    ],
  },
  {
    title: 'Java Development Intern',
    company: 'FIVEPS Digital Pvt. Ltd.',
    location: 'Delhi, NCR',
    period: 'Jul 2024 - Aug 2024',
    bullets: [
      'Developed a desktop-based Airline Management System using Java Swing for flight bookings, passenger records, and scheduling.',
      'Integrated MySQL database for secure and persistent data storage with CRUD functionality.',
      'Developed a user-friendly reporting tool for booking data, enhancing analytics and operational efficiency.',
    ],
  },
]

export const skills = [
  'Full Stack Development',
  'System Architecture',
  'API Integration',
  'Database Management',
  'Front-end Development',
  'Back-end Development',
  'Problem Solving',
  'Collaboration',
]

export const highlights = [
  {
    icon: '💼',
    title: 'Professional',
    description: 'Dedicated to delivering high-quality solutions',
  },
  {
    icon: '🚀',
    title: 'Innovative',
    description: 'Continuously learning and adapting to new technologies',
  },
  {
    icon: '🎯',
    title: 'Results-Driven',
    description: 'Focus on creating impactful digital experiences',
  },
]

export const animatedTexts = [
  'Full-Stack Developer',
  'AI Solutions',
  'Open Source Contributor',
  'Problem Solver',
]

export interface StaticProject {
  slug: string
  title: string
  coverImage: { alt: string; imageUrl: string }
  description: string
  technologies: string[]
  projectUrl: string
}

export const projects: StaticProject[] = [
  {
    slug: 'edemy-lms-platform',
    title: 'Edemy',
    coverImage: {
      alt: 'Edemy LMS Platform',
      imageUrl: '/edemy.png',
    },
    description:
      'A full-stack Learning Management System supporting course discovery, enrollment, and progress tracking with optimized data flow. Integrated Stripe payments and Clerk authentication for secure transactions and user management. Designed scalable REST APIs and built a responsive UI for seamless user experience.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'Stripe', 'Clerk', 'REST API'],
    projectUrl: 'https://edemy-kohl.vercel.app/',
  },
  {
    slug: 'chess-game-multiplayer',
    title: 'Chess Game',
    coverImage: {
      alt: 'Real-time Multiplayer Chess Game',
      imageUrl: '/chessGame.png',
    },
    description:
      'A real-time multiplayer chess application using Socket.io for low-latency gameplay. Implemented server-side state management and move validation using Chess.js. Designed an event-driven architecture handling rooms, player roles, and concurrent sessions.',
    technologies: ['Node.js', 'Socket.io', 'Chess.js', 'Express.js', 'JavaScript'],
    projectUrl: 'https://chessgame-po24.onrender.com',
  },
  {
    slug: 'tether-chat-application',
    title: 'Tether',
    coverImage: {
      alt: 'Tether Chat & Video Messaging Application',
      imageUrl: '/tether.png',
    },
    description:
      'A real-time communication platform supporting chat and video calls. Features direct messaging, group chats, video calls, screen sharing, and call recording. Enabled channel creation and private user invitations.',
    technologies: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Clerk', 'Stream API'],
    projectUrl: 'https://tether-together-frontend.vercel.app/auth',
  },
  {
    slug: 'wanderstay-property-listing',
    title: 'WanderStay',
    coverImage: {
      alt: 'WanderStay Property Listing Application',
      imageUrl: '/wanderstay.png',
    },
    description:
      'A full-stack property listing platform with bookings and reviews. Implemented search filters, authentication, and secure CRUD operations. Deployed on Render.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB'],
    projectUrl: 'https://delta-project-v2ag.onrender.com/listings',
  },
]
