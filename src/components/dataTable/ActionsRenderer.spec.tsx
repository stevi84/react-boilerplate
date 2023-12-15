import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ActionsRenderer } from './ActionsRenderer';
import { EntityManager } from './DataTableInterfaces';
import { BaseEntity } from '../../models/BaseEntity';
import { currentUserEditor, currentUserReader } from '../../../test/data/CurrentUser';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { todo1 } from '../../../test/data/Todo';
import { user1 } from '../../../test/data/User';
import { RootState } from '../../reducers/Store';
import { Provider } from 'react-redux';

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

const mockStore = configureStore([thunk]);
const initialState = {
  todos: [todo1],
  users: [user1],
  apiCalls: { runningReads: 0, runningSubmits: 0 },
  currentUser: currentUserEditor,
} as RootState;

const updateMock = vi.fn();
const deleteMock = vi.fn();
const managerMock = {
  update: updateMock,
  delete: deleteMock,
  editRight: 'TODO_EDIT',
} as unknown as EntityManager<BaseEntity>;

describe('ActionsRenderer', () => {
  it('should equal saved snapshot', () => {
    const store = mockStore(initialState);
    const tree = render(
      <Provider store={store}>
        {/* @ts-ignore */}
        <ActionsRenderer id="id" manager={managerMock} data={{ id: 1 } as any} />
      </Provider>
    ).asFragment();
    expect(tree).toMatchSnapshot();
  });

  it('should trigger update on button click', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        {/* @ts-ignore */}
        <ActionsRenderer id="id" manager={managerMock} data={{ id: 1 } as any} />
      </Provider>
    );
    expect(updateMock.mock.calls.length).toEqual(0);
    fireEvent.click(screen.getByTestId('EditIcon'));
    expect(updateMock.mock.calls.length).toEqual(1);
  });

  it('should trigger delete on button click', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        {/* @ts-ignore */}
        <ActionsRenderer id="id" manager={managerMock} data={{ id: 1 } as any} />
      </Provider>
    );
    expect(deleteMock.mock.calls.length).toEqual(0);
    fireEvent.click(screen.getByTestId('DeleteIcon'));
    expect(deleteMock.mock.calls.length).toEqual(1);
  });

  it('should hide buttons if not authorized', () => {
    const store = mockStore({ ...initialState, currentUser: currentUserReader } as RootState);
    render(
      <Provider store={store}>
        {/* @ts-ignore */}
        <ActionsRenderer id="id" manager={managerMock} data={{ id: 1 } as any} />
      </Provider>
    );
    expect(screen.queryByTestId('DeleteIcon')).toBeFalsy();
    expect(screen.queryByTestId('EditIcon')).toBeFalsy();
  });
});
