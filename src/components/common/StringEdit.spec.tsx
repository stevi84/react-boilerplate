import { describe, it, expect, vi } from 'vitest';
import { createRenderer, ShallowRenderer } from 'react-test-renderer/shallow';
import { StringEdit } from './StringEdit';
import { fireEvent, render, screen } from '@testing-library/react';

const { onChangeMock } = vi.hoisted(() => ({
  onChangeMock: vi.fn(),
}));
vi.mock('formik', () => ({
  useField: () => [{ onChange: onChangeMock, value: 'value' }, { error: 'error' }],
}));

describe('StringEdit', () => {
  it('should equal saved snapshot', () => {
    const renderer: ShallowRenderer = createRenderer();
    renderer.render(<StringEdit id="id" name="name" label="label" />);
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });

  it('should trigger onChange', () => {
    render(<StringEdit id="id" name="name" label="label" />);
    expect(onChangeMock.mock.calls.length).toEqual(0);
    fireEvent.change(screen.getByLabelText('label'), { target: { value: 'test' } });
    expect(onChangeMock.mock.calls.length).toEqual(1);
  });
});
