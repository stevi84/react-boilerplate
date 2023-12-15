import { describe, it, expect, vi } from 'vitest';
import { BooleanEdit } from './BooleanEdit';
import { fireEvent, render, screen } from '@testing-library/react';

const { onChangeMock } = vi.hoisted(() => ({ onChangeMock: vi.fn() }));
vi.mock('formik', () => ({ useField: () => [{ onChange: onChangeMock, checked: true }] }));

describe('BooleanEdit', () => {
  it('should equal saved snapshot', () => {
    const tree = render(<BooleanEdit id="id" name="name" label="label" />).asFragment();
    expect(tree).toMatchSnapshot();
  });

  it('should trigger onChange', () => {
    render(<BooleanEdit id="id" name="name" label="label" />);
    expect(onChangeMock.mock.calls.length).toEqual(0);
    fireEvent.click(screen.getByTestId('CheckBoxIcon'));
    expect(onChangeMock.mock.calls.length).toEqual(1);
  });
});
