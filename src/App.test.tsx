import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock useReactToPrint
vi.mock('react-to-print', () => ({
  useReactToPrint: vi.fn(() => vi.fn()),
}));

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders the application title', () => {
    render(<App />);
    expect(screen.getByText('CV Creator')).toBeInTheDocument();
  });

  it('renders Editor and Preview sections', () => {
    render(<App />);
    expect(screen.getByText('Editor')).toBeInTheDocument();
    expect(screen.getByText('Preview')).toBeInTheDocument();
  });

  it('toggles auto-save', () => {
    render(<App />);
    // There might be multiple checkboxes if CVForm has some, but currently only one in Navbar
    // But safely we can look for the label "Auto-save"
    // const autoSaveLabel = screen.getByText('Auto-save');
    // const autoSaveCheckbox = autoSaveLabel.nextElementSibling?.querySelector('input[type="checkbox"]');
     
    
    // or better usage of RTL
    // The label wraps the checkbox in some way or uses htmlFor? 
    // In App.tsx: <label ...><span>Auto-save</span>...<input ...></label>
    // so getByLabelText functionality might work if accessible, but here `Auto-save` is inside span.
    
    // Let's use getByRole('checkbox') assuming it's the only one inside the nav or easiest to find.
    // Or more specifically:
    const checkbox = screen.getAllByRole('checkbox')[0]; 
    
    // Initial state: logic is saved !== 'false' => defaults to true
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    // React state update is async usually but in tests wrapped in act (RTL does it).
    // Effect runs after render.
    expect(localStorage.getItem('cv_auto_save')).toBe('false');

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(localStorage.getItem('cv_auto_save')).toBe('true');
  });
});
