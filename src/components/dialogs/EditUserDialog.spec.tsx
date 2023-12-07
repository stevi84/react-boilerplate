import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ShallowRenderer, createRenderer } from 'react-test-renderer/shallow';
import { fireEvent, render, screen } from '@testing-library/react';
import { user1 } from '../../../test/data/User';
import { EditUserDialog } from './EditUserDialog';
// import { createUser, updateUser } from '../../reducers/UsersReducer';
// import { getEmptyUser } from '../../models/User';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      language: 'de',
      changeLanguage: vi.fn(),
    },
  }),
}));

const { navigateMock, useParamsMock } = vi.hoisted(() => ({
  navigateMock: vi.fn(),
  useParamsMock: vi.fn(),
}));
vi.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock,
  useParams: useParamsMock,
}));

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
const { readUserMock } = vi.hoisted(() => ({ readUserMock: vi.fn() }));
vi.mock('../../reducers/UsersReducer', async () => {
  return {
    createUser: vi.fn(),
    readUser: readUserMock,
    updateUser: vi.fn(),
  };
});

describe('EditUserDialog', () => {
  beforeEach(() => {
    readUserMock.mockResolvedValue(user1);
  });

  it('should equal saved snapshot', () => {
    useAppSelectorMock.mockReturnValue(false);
    useParamsMock.mockReturnValue({ id: 1 });
    const renderer: ShallowRenderer = createRenderer();
    renderer.render(<EditUserDialog />);
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });

  it('should load user if updating', () => {
    useAppSelectorMock.mockReturnValue(false);
    useParamsMock.mockReturnValue({ id: '1' });
    expect(readUserMock.mock.calls.length).toEqual(0);
    render(<EditUserDialog />);
    expect(readUserMock.mock.calls.length).toEqual(1);
    expect(readUserMock.mock.calls[0][0]).toEqual(1);
    expect(readUserMock.mock.calls[0][1]).toEqual('de');
    expect(readUserMock.mock.calls[0][2]).toEqual(dispatchMock);
  });

  it('should not load user if creating', () => {
    useAppSelectorMock.mockReturnValue(false);
    useParamsMock.mockReturnValue({ id: 'new' });
    render(<EditUserDialog />);
    expect(readUserMock.mock.calls.length).toEqual(0);
  });

  // it('should dispatch createUser on saving new user', () => {
  //   useAppSelectorMock.mockReturnValue(false);
  //   useParamsMock.mockReturnValue({ id: 'new' });
  //   expect(dispatchMock.mock.calls.length).toEqual(0);
  //   render(<EditUserDialog />);
  //   fireEvent.change(screen.getByLabelText('name'), { target: { value: 'name' } });
  //   fireEvent.change(screen.getByLabelText('dateOfBirth'), { target: { value: '06.12.2023' } });
  //   fireEvent.change(screen.getByLabelText('size'), { target: { value: '123' } });
  //   fireEvent.change(screen.getByLabelText('weight'), { target: { value: '50.5' } });
  //   fireEvent.change(screen.getByLabelText('email'), { target: { value: 'test@test.de' } });
  //   fireEvent.change(screen.getByLabelText('phone'), { target: { value: '0123/4567890' } });
  //   fireEvent.click(screen.getByText('save'));
  //   expect(dispatchMock.mock.calls.length).toEqual(1);
  //   expect(dispatchMock.mock.calls[0][0]).toEqual(createUser(getEmptyUser(), 'de'));
  // });

  // it('should dispatch updateUser on saving existing user', () => {
  //   useAppSelectorMock.mockReturnValue(false);
  //   useParamsMock.mockReturnValue({ id: '1' });
  //   expect(dispatchMock.mock.calls.length).toEqual(0);
  //   render(<EditUserDialog />);
  //   fireEvent.change(screen.getByLabelText('name'), { target: { value: 'change' } });
  //   fireEvent.click(screen.getByText('save'));
  //   expect(dispatchMock.mock.calls.length).toEqual(1);
  //   expect(dispatchMock.mock.calls[0][0]).toEqual(updateUser(getEmptyUser(), 'de'));
  // });

  it('should navigate to users on cancel', () => {
    useAppSelectorMock.mockReturnValue(false);
    useParamsMock.mockReturnValue({ id: '1' });
    expect(navigateMock.mock.calls.length).toEqual(0);
    render(<EditUserDialog />);
    fireEvent.click(screen.getByText('cancel'));
    expect(navigateMock.mock.calls.length).toEqual(1);
    expect(navigateMock.mock.calls[0][0]).toEqual('/users');
  });

  it('should show dialog if not reading or submitting', () => {
    useAppSelectorMock.mockReturnValue(false);
    useParamsMock.mockReturnValue({ id: 1 });
    render(<EditUserDialog />);
    expect(screen.getByLabelText('name')).toBeTruthy();
    expect(screen.queryByRole('progressbar')).toBeFalsy();
  });

  it('should show working if reading', () => {
    useAppSelectorMock.mockReturnValueOnce(true).mockReturnValue(false);
    useParamsMock.mockReturnValue({ id: 1 });
    render(<EditUserDialog />);
    expect(screen.queryByLabelText('name')).toBeFalsy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });

  it('should show working if submitting', () => {
    useAppSelectorMock.mockReturnValueOnce(false).mockReturnValue(true);
    useParamsMock.mockReturnValue({ id: 1 });
    render(<EditUserDialog />);
    expect(screen.queryByLabelText('name')).toBeFalsy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });
});
