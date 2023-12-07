import { describe, it, expect, vi } from 'vitest';
import { createRenderer, ShallowRenderer } from 'react-test-renderer/shallow';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { LanguageSwitch } from './LanguageSwitch';

const { changeLanguageMock } = vi.hoisted(() => ({
  changeLanguageMock: vi.fn(),
}));
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      language: 'de',
      changeLanguage: changeLanguageMock,
    },
  }),
}));

describe('LanguageSwitch', () => {
  it('should equal saved snapshot', () => {
    const renderer: ShallowRenderer = createRenderer();
    renderer.render(<LanguageSwitch />);
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });

  it('should change the language', () => {
    render(<LanguageSwitch />);
    expect(changeLanguageMock.mock.calls.length).toEqual(0);
    fireEvent.mouseDown(screen.getByText('de'));
    const listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText('en'));
    expect(changeLanguageMock.mock.calls.length).toEqual(1);
    expect(changeLanguageMock.mock.calls[0][0]).toEqual('en');
  });
});
