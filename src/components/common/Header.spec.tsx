import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from './Header';

const { navigateMock } = vi.hoisted(() => ({ navigateMock: vi.fn() }));
vi.mock('react-router-dom', () => ({ useNavigate: () => navigateMock }));

vi.mock('../../globals/Environments', () => ({ getEnv: () => 'testenv' }));

describe('Header', () => {
  it('should equal saved snapshot', () => {
    const tree = render(<Header />).asFragment();
    expect(tree).toMatchSnapshot();
  });

  it('should show the environment', () => {
    render(<Header />);
    expect(screen.getByText(/testenv/)).toBeTruthy();
  });

  it('should navigate to dashboard', () => {
    render(<Header />);
    expect(navigateMock.mock.calls.length).toEqual(0);
    fireEvent.click(screen.getByTestId('MenuIcon'));
    fireEvent.click(screen.getByText('Home'));
    expect(navigateMock.mock.calls.length).toEqual(1);
    expect(navigateMock.mock.calls[0][0]).toEqual('/');
  });

  it('should navigate to users', () => {
    render(<Header />);
    expect(navigateMock.mock.calls.length).toEqual(0);
    fireEvent.click(screen.getByTestId('MenuIcon'));
    fireEvent.click(screen.getByText('Users'));
    expect(navigateMock.mock.calls.length).toEqual(1);
    expect(navigateMock.mock.calls[0][0]).toEqual('/users');
  });

  it('should navigate to todos', () => {
    render(<Header />);
    expect(navigateMock.mock.calls.length).toEqual(0);
    fireEvent.click(screen.getByTestId('MenuIcon'));
    fireEvent.click(screen.getByText('Todos'));
    expect(navigateMock.mock.calls.length).toEqual(1);
    expect(navigateMock.mock.calls[0][0]).toEqual('/todos');
  });
});
