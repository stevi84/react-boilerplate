import { describe, it, expect, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { ActionsRenderer } from './ActionsRenderer';
import { EntityManager } from './DataTableInterfaces';
import { BaseEntity } from '../../models/BaseEntity';
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

const updateMock = vi.fn();
const deleteMock = vi.fn();
const managerMock = {
  update: updateMock,
  delete: deleteMock,
  editRight: 'TODO_EDIT',
} as unknown as EntityManager<BaseEntity>;

describe('ActionsRenderer', () => {
  it('should equal saved snapshot', () => {
    const tree = renderWithProviders(
      // @ts-ignore
      <ActionsRenderer id="id" manager={managerMock} data={{ id: 1 } as any} />,
      { preloadedState: initialState }
    ).asFragment();
    expect(tree).toMatchSnapshot();
  });

  it('should trigger update on button click', () => {
    renderWithProviders(
      // @ts-ignore
      <ActionsRenderer id="id" manager={managerMock} data={{ id: 1 } as any} />,
      { preloadedState: initialState }
    );
    expect(updateMock.mock.calls.length).toEqual(0);
    fireEvent.click(screen.getByTestId('EditIcon'));
    expect(updateMock.mock.calls.length).toEqual(1);
  });

  it('should trigger delete on button click', () => {
    renderWithProviders(
      // @ts-ignore
      <ActionsRenderer id="id" manager={managerMock} data={{ id: 1 } as any} />,
      { preloadedState: initialState }
    );
    expect(deleteMock.mock.calls.length).toEqual(0);
    fireEvent.click(screen.getByTestId('DeleteIcon'));
    expect(deleteMock.mock.calls.length).toEqual(1);
  });

  it('should hide buttons if not authorized', () => {
    renderWithProviders(
      // @ts-ignore
      <ActionsRenderer id="id" manager={managerMock} data={{ id: 1 } as any} />,
      { preloadedState: { ...initialState, currentUser: currentUserReader } }
    );
    expect(screen.queryByTestId('DeleteIcon')).toBeFalsy();
    expect(screen.queryByTestId('EditIcon')).toBeFalsy();
  });
});
