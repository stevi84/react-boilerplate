import { describe, it, expect, vi } from 'vitest';
import { ShallowRenderer, createRenderer } from 'react-test-renderer/shallow';
import { fireEvent, render, screen } from '@testing-library/react';
import { Dashboard } from './Dashboard';
import { todo1 } from '../../../test/data/Todo';
import { user1 } from '../../../test/data/User';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      language: 'de',
      changeLanguage: vi.fn(),
    },
  }),
}));

const { navigateMock } = vi.hoisted(() => ({ navigateMock: vi.fn() }));
vi.mock('react-router-dom', () => ({ useNavigate: () => navigateMock }));

vi.mock('../../hooks/UseNotifier', () => ({ useNotifier: vi.fn() }));

const { useAppSelectorMock, dispatchMock } = vi.hoisted(() => ({
  useAppSelectorMock: vi.fn(),
  dispatchMock: vi.fn(),
}));
vi.mock('../../reducers/Store', () => ({
  useAppSelector: useAppSelectorMock,
  useAppDispatch: () => dispatchMock,
}));

// ist nötig bei Verwendung der generierten Api
const { readUsersMock } = vi.hoisted(() => ({ readUsersMock: vi.fn() }));
vi.mock('../../reducers/UsersReducer', () => ({
  readUsers: readUsersMock,
  usersSelector: vi.fn(),
}));

describe('Dashboard', () => {
  beforeEach(() => {
    readUsersMock.mockReturnValue('readUsers');
  });

  it('should equal saved snapshot', () => {
    useAppSelectorMock
      .mockReturnValueOnce([todo1])
      .mockReturnValueOnce([user1])
      .mockReturnValueOnce(false)
      .mockReturnValue(false);
    const renderer: ShallowRenderer = createRenderer();
    renderer.render(<Dashboard />);
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });

  it('should load todos if not present', () => {
    useAppSelectorMock
      .mockReturnValueOnce([])
      .mockReturnValueOnce([user1])
      .mockReturnValueOnce(false)
      .mockReturnValue(false);
    expect(dispatchMock.mock.calls.length).toEqual(0);
    render(<Dashboard />);
    expect(dispatchMock.mock.calls.length).toEqual(1);
    //expect(dispatchMock.mock.calls[0][0]).toEqual(readTodos('de'));
  });

  it('should load users if not present', () => {
    useAppSelectorMock
      .mockReturnValueOnce([todo1])
      .mockReturnValueOnce([])
      .mockReturnValueOnce(false)
      .mockReturnValue(false);
    expect(dispatchMock.mock.calls.length).toEqual(0);
    render(<Dashboard />);
    expect(dispatchMock.mock.calls.length).toEqual(1);
    expect(dispatchMock.mock.calls[0][0]).toEqual('readUsers');
  });

  it('should navigate to todos on button click', () => {
    useAppSelectorMock
      .mockReturnValueOnce([todo1])
      .mockReturnValueOnce([user1])
      .mockReturnValueOnce(false)
      .mockReturnValue(false);
    render(<Dashboard />);
    expect(navigateMock.mock.calls.length).toEqual(0);
    fireEvent.click(screen.getByTestId('EditNoteIcon'));
    expect(navigateMock.mock.calls.length).toEqual(1);
    expect(navigateMock.mock.calls[0][0]).toEqual('/todos');
  });

  it('should navigate to users on button click', () => {
    useAppSelectorMock
      .mockReturnValueOnce([todo1])
      .mockReturnValueOnce([user1])
      .mockReturnValueOnce(false)
      .mockReturnValue(false);
    render(<Dashboard />);
    expect(navigateMock.mock.calls.length).toEqual(0);
    fireEvent.click(screen.getByTestId('PeopleIcon'));
    expect(navigateMock.mock.calls.length).toEqual(1);
    expect(navigateMock.mock.calls[0][0]).toEqual('/users');
  });

  it('should show dashboard if not reading or submitting', () => {
    useAppSelectorMock
      .mockReturnValueOnce([todo1])
      .mockReturnValueOnce([user1])
      .mockReturnValueOnce(false)
      .mockReturnValue(false);
    render(<Dashboard />);
    expect(screen.getByText('Todos')).toBeTruthy();
    expect(screen.queryByRole('progressbar')).toBeFalsy();
  });

  it('should show working if reading', () => {
    useAppSelectorMock
      .mockReturnValueOnce([todo1])
      .mockReturnValueOnce([user1])
      .mockReturnValueOnce(true)
      .mockReturnValue(false);
    render(<Dashboard />);
    expect(screen.queryByText('Todos')).toBeFalsy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });

  it('should show working if submitting', () => {
    useAppSelectorMock
      .mockReturnValueOnce([todo1])
      .mockReturnValueOnce([user1])
      .mockReturnValueOnce(false)
      .mockReturnValue(true);
    render(<Dashboard />);
    expect(screen.queryByText('Todos')).toBeFalsy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });
});
