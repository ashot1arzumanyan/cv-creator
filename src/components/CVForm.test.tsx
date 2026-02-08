import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CVForm } from './CVForm';
import type { CVData } from '../types';

const mockData: CVData = {
  personalInfo: {
    fullName: 'John Doe',
    title: 'Developer',
    email: 'john@example.com',
    phone: '123-456-7890',
    address: '123 Main St',
  },
  experience: [
    {
      id: '1',
      company: 'Tech Corp',
      role: 'Engineer',
      startDate: '2020',
      endDate: 'Present',
      description: 'Worked on cool stuff',
    },
  ],
  education: [],
  skills: [],
  languages: [],
};

describe('CVForm', () => {
  it('renders personal information fields', () => {
    render(<CVForm data={mockData} onChange={() => {}} />);
    
    expect(screen.getByPlaceholderText('Full Name')).toHaveValue('John Doe');
    expect(screen.getByPlaceholderText('Job Title')).toHaveValue('Developer');
    expect(screen.getByPlaceholderText('Email')).toHaveValue('john@example.com');
  });

  it('calls onChange when personal info is updated', () => {
    const handleChange = vi.fn();
    render(<CVForm data={mockData} onChange={handleChange} />);

    const nameInput = screen.getByPlaceholderText('Full Name');
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });

    expect(handleChange).toHaveBeenCalledWith({
      ...mockData,
      personalInfo: { ...mockData.personalInfo, fullName: 'Jane Doe' },
    });
  });

  it('adds new experience entry', () => {
    const handleChange = vi.fn();
    render(<CVForm data={mockData} onChange={handleChange} />);

    const addButtons = screen.getAllByText('Add');
    const addExperienceButton = addButtons[0]; // Assuming order based on render
    fireEvent.click(addExperienceButton);

    expect(handleChange).toHaveBeenCalled();
    const callArg = handleChange.mock.calls[0][0] as CVData;
    expect(callArg.experience).toHaveLength(2);
  });
});
