import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { EntityManager } from './DataTableInterfaces';
import { BaseEntity } from '../../models/BaseEntity';
import { DataTable } from './DataTable';
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

const createMock = vi.fn();
const readMock = vi.fn();
const managerMock = {
  create: createMock,
  read: readMock,
  editRight: 'TODO_EDIT',
} as unknown as EntityManager<BaseEntity>;

describe('DataTable', () => {
  it('should equal saved snapshot', () => {
    const store = mockStore(initialState);
    const tree = render(
      <Provider store={store}>
        <DataTable id="id" columns={[]} rowsData={[]} manager={managerMock} />
      </Provider>
    ).asFragment();
    expect(tree).toMatchSnapshot();
  });

  it('should trigger read on button click', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <DataTable id="id" columns={[]} rowsData={[]} manager={managerMock} />
      </Provider>
    );
    expect(readMock.mock.calls.length).toEqual(0);
    fireEvent.click(screen.getByTestId('ReplayIcon'));
    expect(readMock.mock.calls.length).toEqual(1);
  });

  it('should trigger create on button click', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <DataTable id="id" columns={[]} rowsData={[]} manager={managerMock} />
      </Provider>
    );
    expect(createMock.mock.calls.length).toEqual(0);
    fireEvent.click(screen.getByTestId('AddIcon'));
    expect(createMock.mock.calls.length).toEqual(1);
  });

  it('should show grid if not reading or submitting', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <DataTable id="id" columns={[]} rowsData={[]} manager={managerMock} />
      </Provider>
    );
    expect(screen.getByRole('treegrid')).toBeTruthy();
    expect(screen.queryByRole('progressbar')).toBeFalsy();
  });

  it('should show working if reading', () => {
    const store = mockStore({ ...initialState, apiCalls: { runningReads: 1, runningSubmits: 0 } } as RootState);
    render(
      <Provider store={store}>
        <DataTable id="id" columns={[]} rowsData={[]} manager={managerMock} />
      </Provider>
    );
    expect(screen.queryByRole('treegrid')).toBeFalsy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });

  it('should show working if submitting', () => {
    const store = mockStore({ ...initialState, apiCalls: { runningReads: 0, runningSubmits: 1 } } as RootState);
    render(
      <Provider store={store}>
        <DataTable id="id" columns={[]} rowsData={[]} manager={managerMock} />
      </Provider>
    );
    expect(screen.queryByRole('treegrid')).toBeFalsy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });

  it('should hide create button if not authorized', () => {
    const store = mockStore({ ...initialState, currentUser: currentUserReader } as RootState);
    render(
      <Provider store={store}>
        <DataTable id="id" columns={[]} rowsData={[]} manager={managerMock} />
      </Provider>
    );
    expect(screen.queryByTestId('AddIcon')).toBeFalsy();
  });
});
