import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // ✅ Add this line for matchers like toBeInTheDocument
import ConfigureCard from './ConfigureCard';

// Mock CSS to avoid import issues
jest.mock('../styles/ConfigureCard.css', () => ({}));

describe('ConfigureCard Component', () => {
  test('renders Configure header', () => {
    render(<ConfigureCard />);
    const header = screen.getByText(/Configure/i);
    expect(header).toBeInTheDocument();
  });

  test('renders dropdowns with default values', () => {
    render(<ConfigureCard />);
    const connectionSelect = screen.getByDisplayValue('WIRELESS');
    const timeFilterSelect = screen.getByDisplayValue('Today');

    expect(connectionSelect).toBeInTheDocument();
    expect(timeFilterSelect).toBeInTheDocument();
  });

  test('changes connection dropdown value', () => {
    render(<ConfigureCard />);
    const connectionSelect = screen.getByDisplayValue('WIRELESS');

    fireEvent.change(connectionSelect, { target: { value: 'WIRED' } });
    expect(connectionSelect.value).toBe('WIRED');
  });

  test('changes time filter dropdown value', () => {
    render(<ConfigureCard />);
    const timeFilterSelect = screen.getByDisplayValue('Today');

    fireEvent.change(timeFilterSelect, { target: { value: 'Yesterday' } });
    expect(timeFilterSelect.value).toBe('Yesterday');
  });

  test('renders SHOW and close buttons', () => {
    render(<ConfigureCard />);
    const showButton = screen.getByText('SHOW');
    const closeButton = screen.getByText('×');

    expect(showButton).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });

  test('clicking SHOW button works (no crash)', () => {
    render(<ConfigureCard />);
    const showButton = screen.getByText('SHOW');
    fireEvent.click(showButton);
    expect(showButton).toBeEnabled();
  });
});
