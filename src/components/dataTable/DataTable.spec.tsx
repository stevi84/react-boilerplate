import { describe, it, expect, vi } from 'vitest';
import { ShallowRenderer, createRenderer } from 'react-test-renderer/shallow';
import { fireEvent, render, screen } from '@testing-library/react';
import { EntityManager } from './DataTableInterfaces';
import { BaseEntity } from '../../models/BaseEntity';
import { DataTable } from './DataTable';

const createMock = vi.fn();
const readMock = vi.fn();
const managerMock = { create: createMock, read: readMock } as unknown as EntityManager<BaseEntity>;

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      language: 'de',
      changeLanguage: vi.fn(),
    },
  }),
}));

const { useAppSelectorMock } = vi.hoisted(() => ({
  useAppSelectorMock: vi.fn(),
}));
vi.mock('../../reducers/Store', () => ({
  useAppSelector: useAppSelectorMock,
}));

describe('DataTable', () => {
  it('should equal saved snapshot', () => {
    useAppSelectorMock.mockReturnValue(false);
    const renderer: ShallowRenderer = createRenderer();
    renderer.render(<DataTable id="id" columns={[]} rowsData={[]} manager={managerMock} />);
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });

  it('should trigger read on button click', () => {
    useAppSelectorMock.mockReturnValue(false);
    render(<DataTable id="id" columns={[]} rowsData={[]} manager={managerMock} />);
    expect(readMock.mock.calls.length).toEqual(0);
    fireEvent.click(screen.getByTestId('ReplayIcon'));
    expect(readMock.mock.calls.length).toEqual(1);
  });

  it('should trigger create on button click', () => {
    useAppSelectorMock.mockReturnValue(false);
    render(<DataTable id="id" columns={[]} rowsData={[]} manager={managerMock} />);
    expect(createMock.mock.calls.length).toEqual(0);
    fireEvent.click(screen.getByTestId('AddIcon'));
    expect(createMock.mock.calls.length).toEqual(1);
  });

  it('should show grid if not reading or submitting', () => {
    useAppSelectorMock.mockReturnValue(false);
    render(<DataTable id="id" columns={[]} rowsData={[]} manager={managerMock} />);
    expect(screen.getByRole('treegrid')).toBeTruthy();
    expect(screen.queryByRole('progressbar')).toBeFalsy();
  });

  it('should show working if reading', () => {
    useAppSelectorMock.mockReturnValueOnce(true).mockReturnValue(false);
    render(<DataTable id="id" columns={[]} rowsData={[]} manager={managerMock} />);
    expect(screen.queryByRole('treegrid')).toBeFalsy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });

  it('should show working if submitting', () => {
    useAppSelectorMock.mockReturnValueOnce(false).mockReturnValue(true);
    render(<DataTable id="id" columns={[]} rowsData={[]} manager={managerMock} />);
    expect(screen.queryByRole('treegrid')).toBeFalsy();
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });
});
