/// <reference types="vitest/globals" />
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      language: 'de',
      changeLanguage: vi.fn(),
    },
  }),
}));

vi.mock('./hooks/UseNotifier', () => ({ useNotifier: vi.fn() }));
