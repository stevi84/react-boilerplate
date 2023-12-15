import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { NumberEdit } from './NumberEdit';

const { setValueMock } = vi.hoisted(() => ({ setValueMock: vi.fn() }));
vi.mock('formik', () => ({ useField: () => [{ value: 1.01 }, { error: 'error' }, { setValue: setValueMock }] }));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      language: 'de',
      changeLanguage: vi.fn(),
    },
  }),
}));

describe('NumberEdit', () => {
  it('should equal saved snapshot', () => {
    const tree = render(<NumberEdit id="id" name="name" label="label" />).asFragment();
    expect(tree).toMatchSnapshot();
  });

  it('should format the given value', () => {
    render(<NumberEdit id="id" name="name" label="label" />);
    expect(screen.getByLabelText('label')).toHaveValue('1,01');
  });

  it('should parse the input', () => {
    render(<NumberEdit id="id" name="name" label="label" />);
    expect(setValueMock.mock.calls.length).toEqual(0);
    fireEvent.change(screen.getByLabelText('label'), { target: { value: '1,02' } });
    expect(setValueMock.mock.calls.length).toEqual(1);
    expect(setValueMock.mock.calls[0][0]).toEqual(1.02);
  });
});
