import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CVPreview } from './CVPreview';
import type { CVData } from '../types';

const mockData: CVData = {
  personalInfo: {
    fullName: 'Jane Doe',
    title: 'Senior Developer',
    email: 'jane@example.com',
    phone: '987-654-3210',
    address: '456 Elm St',
    linkedin: 'janedoe',
    linkedinUrl: 'https://linkedin.com/in/janedoe',
    github: 'janedoe',
    githubUrl: 'https://github.com/janedoe',
  },
  experience: [
    {
      id: '1',
      company: 'Future Tech',
      role: 'Lead',
      startDate: '2021',
      endDate: 'Present',
      description: 'Leading the team.',
    },
     {
      id: '2',
      company: 'Past Tech',
      role: 'Junior',
      startDate: '2019',
      endDate: '2021',
      description: 'Learning stuff.',
    },
  ],
  education: [
      {
          id: '1',
          school: 'University of Code',
          degree: 'BS CS',
          startDate: '2015',
          endDate: '2019',
      }
  ],
  skills: ['React', 'TypeScript'],
  languages: [
      { id: '1', name: 'English', level: 'Native' }
  ],
};

describe('CVPreview', () => {
  it('renders personal info', () => {
    render(<CVPreview data={mockData} />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Senior Developer')).toBeInTheDocument();
  });

  it('renders experience items', () => {
    render(<CVPreview data={mockData} />);
    expect(screen.getByText('Future Tech')).toBeInTheDocument();
    expect(screen.getByText('Past Tech')).toBeInTheDocument();
  });

   it('renders education', () => {
    render(<CVPreview data={mockData} />);
    expect(screen.getByText('University of Code')).toBeInTheDocument();
  });
});
