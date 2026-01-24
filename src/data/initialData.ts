import type { CVData } from '../types';
import avatarImg from '../assets/avatar.png';

export const initialData: CVData = {
  personalInfo: {
    fullName: 'John Doe',
    title: 'Senior Software Engineer',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    address: 'New York, USA',
    linkedin: 'linkedin.com/in/johndoe',
    linkedinUrl: 'https://linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    githubUrl: 'https://github.com/johndoe',
  },
  experience: [
    {
      id: '1',
      company: 'Tech Corp',
      role: 'Senior Frontend Developer',
      type: 'Full time',
      startDate: 'Jan 2022',
      endDate: 'Present',
      image: avatarImg, 
      description: `Led the development of a high-traffic e-commerce platform using Next.js and Tailwind CSS.\nImplemented comprehensive testing strategies which reduced bug reports by 40%.\nMentored junior developers and established code quality standards across the team.\n\nTech stack: React, TypeScript, Next.js, GraphQL, AWS`,
    },
    {
      id: '2',
      company: 'Startup Inc',
      role: 'Full Stack Developer',
      type: 'Full time',
      startDate: 'Jun 2019',
      endDate: 'Dec 2021',
      image: avatarImg,
      description: `Built a SaaS product from scratch, handling both frontend and backend development.\nDesigned and implemented RESTful APIs using Node.js and Express.\nOptimized database queries in PostgreSQL to improve response times by 50%.\n\nTech stack: Node.js, Express, PostgreSQL, React, Docker`,
    },
    {
      id: '3',
      company: 'Creative Agency',
      role: 'Web Developer',
      type: 'Contract',
      startDate: 'Jan 2018',
      endDate: 'May 2019',
      image: avatarImg,
      description: `Collaborated with designers to create pixel-perfect responsive websites for various clients.\nDeveloped custom WordPress themes and plugins.\n\nTech stack: HTML, CSS, JavaScript, PHP, WordPress`,
    },
  ],
  education: [
    {
      id: '1',
      school: 'University of Technology',
      degree: 'Bachelor of Science in Computer Science',
      startDate: '2014',
      endDate: '2018',
    },
  ],
  skills: [
    'JavaScript (ES6+)',
    'TypeScript',
    'React & React Native',
    'Node.js',
    'HTML5 & CSS3',
    'SQL & NoSQL Databases',
    'Git & CI/CD',
    'AWS Cloud Services',
  ],
  languages: [
    { id: '1', name: 'English', level: 'Native' },
    { id: '2', name: 'Spanish', level: 'Intermediate' },
  ]
};
