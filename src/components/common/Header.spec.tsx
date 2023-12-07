import { describe, it, expect, vi } from 'vitest';
import { createRenderer, ShallowRenderer } from 'react-test-renderer/shallow';
import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from './Header';

const { navigateMock } = vi.hoisted(() => ({
  navigateMock: vi.fn(),
}));
vi.mock('react-router-dom', () => ({ useNavigate: () => navigateMock }));

vi.mock('../../globals/Environments', () => ({ getEnv: () => 'testenv' }));

describe('Header', () => {
  it('should equal saved snapshot', () => {
    const renderer: ShallowRenderer = createRenderer();
    renderer.render(<Header />);
    const tree = renderer.getRenderOutput();
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
});
