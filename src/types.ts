export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  linkedin?: string;
  linkedinUrl?: string;
  github?: string;
  githubUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  type?: string; 
  startDate: string;
  endDate: string;
  description: string;
  image?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[]; 
  languages: Language[];
}
