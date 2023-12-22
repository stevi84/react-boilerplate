import { describe, it, expect, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { EntityManager } from './DataTableInterfaces';
import { BaseEntity } from '../../models/BaseEntity';
import { DataTable } from './DataTable';
import { currentUserEditor, currentUserReader } from '../../test/data/CurrentUser';
import { renderWithProviders } from '../../test/Utils';
import { todo1 } from '../../test/data/Todo';
import { user1 } from '../../test/data/User';
import { RootState } from '../../reducers/Store';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      language: 'de',
      changeLanguage: vi.fn(),
    },
  }),
}));

vi.mock('../../thunks/CurrentUserThunks', () => ({
  readCurrentUser: () => ({ type: 'readCurrentUser' }),
}));

const initialState: Partial<RootState> = {
  todos: [todo1],
  users: [user1],
  apiCalls: { runningReads: 0, runningSubmits: 0 },
  currentUser: currentUserEditor,
};

const createMock = vi.fn();
const readMock = vi.fn();
const managerMock = {
  create: createMock,
  read: readMock,
  editRight: 'TODO_EDIT',
} as unknown as EntityManager<BaseEntity>;

describe('DataTable', () => {
  it('should equal saved snapshot', () => {
    const tree = renderWithProviders(<DataTable id="id" columns={[]} rowsData={[]} manager={managerMock} />, {
      preloadedState: initialState,
    }).asFragment();
    expect(tree).toMatchSnapshot();
  });

  it('should trigger read on button click', () => {
    renderWithProviders(<DataTable id="id" columns={[]} rowsData={[]} manager={managerMock} />, {
      preloadedState: initialState,
    });
    expect(readMock.mock.calls.length).toEqual(0);
    fireEvent.click(screen.getByTestId('ReplayIcon'));
    expect(readMock.mock.calls.length).toEqual(1);
  });

  it('should trigger create on button click', () => {
    renderWithProviders(<DataTable id="id" columns={[]} rowsData={[]} manager={managerMock} />, {
      preloadedState: initialState,
    });
    expect(createMock.mock.calls.length).toEqual(0);
    fireEvent.click(screen.getByTestId('AddIcon'));
    expect(createMock.mock.calls.length).toEqual(1);
  });

  it('should show grid if not reading or submitting', () => {
    renderWithProviders(<DataTable id="id" columns={[]} rowsData={[]} manager={managerMock} />, {
      preloadedState: initialState,
    });
    expect(screen.getByRole('treegrid')).toBeTruthy();
    expect(screen.queryByRole('progressbar')).toBeFalsy();
  });

  it('should show working if reading', () => {
    renderWithProviders(<DataTable id="id" columns={[]} rowsData={[]} manager={managerMock} />, {
      preloadedState: { ...initialState, apiCalls: { runningReads: 1, runningSubmits: 0 } },
    });
    expect(screen.queryByRole('treegrid')).toBeFalsy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });

  it('should show working if submitting', () => {
    renderWithProviders(<DataTable id="id" columns={[]} rowsData={[]} manager={managerMock} />, {
      preloadedState: { ...initialState, apiCalls: { runningReads: 0, runningSubmits: 1 } },
    });
    expect(screen.queryByRole('treegrid')).toBeFalsy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });

  it('should hide create button if not authorized', () => {
    renderWithProviders(<DataTable id="id" columns={[]} rowsData={[]} manager={managerMock} />, {
      preloadedState: { ...initialState, currentUser: currentUserReader },
    });
    expect(screen.queryByTestId('AddIcon')).toBeFalsy();
  });
});
