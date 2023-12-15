import { describe, it, expect, vi } from 'vitest';
import { StringEdit } from './StringEdit';
import { fireEvent, render, screen } from '@testing-library/react';

const { onChangeMock } = vi.hoisted(() => ({ onChangeMock: vi.fn() }));
vi.mock('formik', () => ({ useField: () => [{ onChange: onChangeMock, value: 'value' }, { error: 'error' }] }));

describe('StringEdit', () => {
  it('should equal saved snapshot', () => {
    const tree = render(<StringEdit id="id" name="name" label="label" />).asFragment();
    expect(tree).toMatchSnapshot();
  });

  it('should trigger onChange', () => {
    render(<StringEdit id="id" name="name" label="label" />);
    expect(onChangeMock.mock.calls.length).toEqual(0);
    fireEvent.change(screen.getByLabelText('label'), { target: { value: 'test' } });
    expect(onChangeMock.mock.calls.length).toEqual(1);
  });
});
