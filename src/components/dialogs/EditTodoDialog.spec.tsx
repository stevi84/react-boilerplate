import { describe, it, expect, vi } from 'vitest';
import { ShallowRenderer, createRenderer } from 'react-test-renderer/shallow';
import { fireEvent, render, screen } from '@testing-library/react';
import { EditTodoDialog } from './EditTodoDialog';
import { todo1 } from '../../../test/data/Todo';
// import { createTodo, updateTodo } from '../../reducers/TodosReducer';
// import { getEmptyTodo } from '../../models/Todo';

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

const { readTodoMock } = vi.hoisted(() => ({ readTodoMock: vi.fn() }));
readTodoMock.mockResolvedValue(todo1);
vi.mock('../../reducers/TodosReducer', async () => {
  const mod = await vi.importActual<typeof import('../../reducers/TodosReducer')>('../../reducers/TodosReducer');
  return {
    ...mod,
    readTodo: readTodoMock,
  };
});

describe('EditTodoDialog', () => {
  it('should equal saved snapshot', () => {
    useAppSelectorMock.mockReturnValue(false);
    useParamsMock.mockReturnValue({ id: 1 });
    const renderer: ShallowRenderer = createRenderer();
    renderer.render(<EditTodoDialog />);
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });

  it('should load todo if updating', () => {
    useAppSelectorMock.mockReturnValue(false);
    useParamsMock.mockReturnValue({ id: '1' });
    expect(readTodoMock.mock.calls.length).toEqual(0);
    render(<EditTodoDialog />);
    expect(readTodoMock.mock.calls.length).toEqual(1);
    expect(readTodoMock.mock.calls[0][0]).toEqual(1);
    expect(readTodoMock.mock.calls[0][1]).toEqual('de');
    expect(readTodoMock.mock.calls[0][2]).toEqual(dispatchMock);
  });

  it('should not load todo if creating', () => {
    useAppSelectorMock.mockReturnValue(false);
    useParamsMock.mockReturnValue({ id: 'new' });
    render(<EditTodoDialog />);
    expect(readTodoMock.mock.calls.length).toEqual(0);
  });

  // it('should dispatch createTodo on saving new todo', () => {
  //   useAppSelectorMock.mockReturnValue(false);
  //   useParamsMock.mockReturnValue({ id: 'new' });
  //   expect(dispatchMock.mock.calls.length).toEqual(0);
  //   render(<EditTodoDialog />);
  //   fireEvent.change(screen.getByLabelText('owner'), { target: { value: 'owner' } });
  //   fireEvent.change(screen.getByLabelText('dueDate'), { target: { value: '06.12.2023' } });
  //   fireEvent.change(screen.getByLabelText('description'), { target: { value: 'description' } });
  //   fireEvent.click(screen.getByText('save'));
  //   expect(dispatchMock.mock.calls.length).toEqual(1);
  //   expect(dispatchMock.mock.calls[0][0]).toEqual(createTodo(getEmptyTodo(), 'de'));
  // });

  // it('should dispatch updateTodo on saving existing todo', () => {
  //   useAppSelectorMock.mockReturnValue(false);
  //   useParamsMock.mockReturnValue({ id: '1' });
  //   expect(dispatchMock.mock.calls.length).toEqual(0);
  //   render(<EditTodoDialog />);
  //   fireEvent.change(screen.getByLabelText('owner'), { target: { value: 'change' } });
  //   fireEvent.click(screen.getByText('save'));
  //   expect(dispatchMock.mock.calls.length).toEqual(1);
  //   expect(dispatchMock.mock.calls[0][0]).toEqual(updateTodo(getEmptyTodo(), 'de'));
  // });

  it('should navigate to todos on cancel', () => {
    useAppSelectorMock.mockReturnValue(false);
    useParamsMock.mockReturnValue({ id: '1' });
    expect(navigateMock.mock.calls.length).toEqual(0);
    render(<EditTodoDialog />);
    fireEvent.click(screen.getByText('cancel'));
    expect(navigateMock.mock.calls.length).toEqual(1);
    expect(navigateMock.mock.calls[0][0]).toEqual('/todos');
  });

  it('should show dialog if not reading or submitting', () => {
    useAppSelectorMock.mockReturnValue(false);
    useParamsMock.mockReturnValue({ id: 1 });
    render(<EditTodoDialog />);
    expect(screen.getByLabelText('owner')).toBeTruthy();
    expect(screen.queryByRole('progressbar')).toBeFalsy();
  });

  it('should show working if reading', () => {
    useAppSelectorMock.mockReturnValueOnce(true).mockReturnValue(false);
    useParamsMock.mockReturnValue({ id: 1 });
    render(<EditTodoDialog />);
    expect(screen.queryByLabelText('owner')).toBeFalsy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });

  it('should show working if submitting', () => {
    useAppSelectorMock.mockReturnValueOnce(false).mockReturnValue(true);
    useParamsMock.mockReturnValue({ id: 1 });
    render(<EditTodoDialog />);
    expect(screen.queryByLabelText('owner')).toBeFalsy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });
});
