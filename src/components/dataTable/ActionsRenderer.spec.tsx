import { describe, it, expect, vi } from 'vitest';
import { createRenderer, ShallowRenderer } from 'react-test-renderer/shallow';
import { fireEvent, render, screen } from '@testing-library/react';
import { ActionsRenderer } from './ActionsRenderer';
import { EntityManager } from './DataTableInterfaces';
import { BaseEntity } from '../../models/BaseEntity';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      language: 'de',
      changeLanguage: vi.fn(),
    },
  }),
}));

const updateMock = vi.fn();
const deleteMock = vi.fn();
const managerMock = { update: updateMock, delete: deleteMock } as unknown as EntityManager<BaseEntity>;

describe('ActionsRenderer', () => {
  it('should equal saved snapshot', () => {
    const renderer: ShallowRenderer = createRenderer();
    // @ts-ignore
    renderer.render(<ActionsRenderer id="id" manager={managerMock} data={{ id: 1 } as any} />);
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });

  it('should trigger update on button click', () => {
    // @ts-ignore
    render(<ActionsRenderer id="id" manager={managerMock} data={{ id: 1 } as any} />);
    expect(updateMock.mock.calls.length).toEqual(0);
    fireEvent.click(screen.getByTestId('EditIcon'));
    expect(updateMock.mock.calls.length).toEqual(1);
  });

  it('should trigger delete on button click', () => {
    // @ts-ignore
    render(<ActionsRenderer id="id" manager={managerMock} data={{ id: 1 } as any} />);
    expect(deleteMock.mock.calls.length).toEqual(0);
    fireEvent.click(screen.getByTestId('DeleteIcon'));
    expect(deleteMock.mock.calls.length).toEqual(1);
  });
});
