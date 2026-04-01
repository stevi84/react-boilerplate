import { describe, it, expect, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { Header } from './Header';
import { renderWithProviders } from '../../test/Utils';

vi.mock('../../globals/Environments', () => ({ getEnv: () => 'testenv' }));

describe('Header', () => {
  it('should show the environment', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText(/testenv/)).toBeTruthy();
  });

  it('should navigate to dashboard', () => {
    const { getLocation } = renderWithProviders(<Header />);
    fireEvent.click(screen.getByTestId('MenuIcon'));
    fireEvent.click(screen.getByText('Home'));
    expect(getLocation()).toEqual('/');
  });

  it('should navigate to users', () => {
    const { getLocation } = renderWithProviders(<Header />);
    fireEvent.click(screen.getByTestId('MenuIcon'));
    fireEvent.click(screen.getByText('Users'));
    expect(getLocation()).toEqual('/users');
  });

  it('should navigate to todos', () => {
    const { getLocation } = renderWithProviders(<Header />);
    fireEvent.click(screen.getByTestId('MenuIcon'));
    fireEvent.click(screen.getByText('Todos'));
    expect(getLocation()).toEqual('/todos');
  });
});
