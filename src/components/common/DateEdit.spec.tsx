import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DateEdit } from './DateEdit';

const { setValueMock } = vi.hoisted(() => ({ setValueMock: vi.fn() }));
vi.mock('formik', () => ({
  useField: () => [{ value: '2020-12-03T15:02:28+02:00' }, { error: 'error' }, { setValue: setValueMock }],
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      language: 'de',
      changeLanguage: vi.fn(),
    },
  }),
}));

describe('DateEdit', () => {
  it('should equal saved snapshot', () => {
    const tree = render(<DateEdit id="id" name="name" label="label" />).asFragment();
    expect(tree).toMatchSnapshot();
  });

  it('should format the given value', () => {
    render(<DateEdit id="id" name="name" label="label" />);
    expect(screen.getByLabelText(/Dec 3, 2020/)).toBeTruthy();
    // expect(screen.getByLabelText('label')).toHaveValue('03at5For02at');
  });
});
