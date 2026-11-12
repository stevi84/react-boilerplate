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

  it.each([
    { destination: 'dashboard', menuItem: 'Home', route: '/' },
    { destination: 'users', menuItem: 'Users', route: '/users' },
    { destination: 'todos', menuItem: 'Todos', route: '/todos' },
  ])('should navigate to $destination', ({ menuItem, route }) => {
    const { getLocation } = renderWithProviders(<Header />);
    fireEvent.click(screen.getByTestId('MenuIcon'));
    fireEvent.click(screen.getByText(menuItem));
    expect(getLocation()).toEqual(route);
  });
});
