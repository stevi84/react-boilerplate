import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ModalConfirmCancel } from './ModalConfirmCancel';

describe('ModalConfirmCancel', () => {
  it('should equal saved snapshot', () => {
    const tree = render(
      <ModalConfirmCancel
        isOpen={true}
        headerText={'header'}
        bodyText={'body'}
        confirmButtonText={'confirm'}
        cancelButtonText={'cancel'}
        confirmAction={() => {}}
        cancelAction={() => {}}
      />
    ).asFragment();
    expect(tree).toMatchSnapshot();
  });

  it('should execute confirm when confirmButton is pressed', () => {
    const confirmAction = vi.fn();
    const cancelAction = vi.fn();
    render(
      <ModalConfirmCancel
        isOpen={true}
        headerText={'header'}
        bodyText={'body'}
        confirmButtonText={'confirm'}
        cancelButtonText={'cancel'}
        confirmAction={confirmAction}
        cancelAction={cancelAction}
      />
    );
    fireEvent.click(screen.getByText('confirm'));
    expect(confirmAction.mock.calls.length).toEqual(1);
    expect(cancelAction.mock.calls.length).toEqual(0);
  });

  it('should execute cancel when cancelButton is pressed', () => {
    const confirmAction = vi.fn();
    const cancelAction = vi.fn();
    render(
      <ModalConfirmCancel
        isOpen={true}
        headerText={'header'}
        bodyText={'body'}
        confirmButtonText={'confirm'}
        cancelButtonText={'cancel'}
        confirmAction={confirmAction}
        cancelAction={cancelAction}
      />
    );
    fireEvent.click(screen.getByText('cancel'));
    expect(confirmAction.mock.calls.length).toEqual(0);
    expect(cancelAction.mock.calls.length).toEqual(1);
  });
});
