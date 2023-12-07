import { describe, it, expect } from 'vitest';
import { createMessage, Locale, numberStringConvert, numberStringValidate, t, translations } from './Translations';

describe('Translations', () => {
  describe('translations', () => {
    it('should export at least one language', () => {
      expect(translations).not.toBeNull();
      expect(translations).not.toBe({});
      expect(Object.keys(translations).length).toBeGreaterThan(1);
    });

    it('should contain the same labels for all languages', () => {
      const locales: Locale[] = ['de', 'en'];
      const localeCount: number = locales.length;

      const firstLanguageKey: Locale = locales[0];
      const firstLanguageLabels = Object.keys(translations[firstLanguageKey].translation);

      for (let i = 1; i < localeCount; i++) {
        const languageKey = locales[i];
        const languageLabels = Object.keys(translations[languageKey].translation);
        expect(languageLabels).toEqual(firstLanguageLabels);
      }
    });
  });

  describe('t', () => {
    it('should return the translated key according to lang', () => {
      expect(t('create', 'de')).toEqual('Neu');
      expect(t('create', 'en')).toEqual('Create');
    });

    // it('should replace placeholders', () => {
    //   expect(t('USER_NOTIFICATION_ORDER_CANCELED', 'de', { ordertype: 'Auftrag', orderdetails: '1234567890' })).toEqual(
    //     'Auftrag1234567890 wurde storniert.',
    //   );
    // });

    it("should return the key if lang doesn't exist", () => {
      expect(t('create', 'unknown' as Locale)).toEqual('create');
    });

    it("should return the key if it doesn't exist", () => {
      expect(t('unknown', 'de')).toEqual('unknown');
    });

    it("should return the default lang if lang isn't specified", () => {
      expect(t('create')).toEqual('Neu');
    });
  });

  describe('createMessage', () => {
    it('should create the correct message', () => {
      expect(createMessage('create', 'user', true, 'de')).toEqual('Nutzer wurde neu erstellt.');
      expect(createMessage('create', 'user', false, 'de')).toEqual('Nutzer wurde nicht erfolgreich neu erstellt.');
    });
  });

  describe('NumberString', () => {
    describe('validate', () => {
      it('should return true for valid number', () => {
        expect(numberStringValidate('1234', 'de')).toEqual(true);
        expect(numberStringValidate('1234,56', 'de')).toEqual(true);
        expect(numberStringValidate('+1234,56', 'de')).toEqual(true);
        expect(numberStringValidate('-1234,56', 'de')).toEqual(true);

        expect(numberStringValidate('1234', 'en')).toEqual(true);
        expect(numberStringValidate('1234.56', 'en')).toEqual(true);
        expect(numberStringValidate('+1234.56', 'en')).toEqual(true);
        expect(numberStringValidate('-1234.56', 'en')).toEqual(true);
      });

      it('should return false for invalid number', () => {
        expect(numberStringValidate('1234.56', 'de')).toEqual(false);
        expect(numberStringValidate('1234,', 'de')).toEqual(false);
        expect(numberStringValidate('unknown', 'de')).toEqual(false);
        expect(numberStringValidate('', 'de')).toEqual(false);

        expect(numberStringValidate('1234,56', 'en')).toEqual(false);
        expect(numberStringValidate('1234.', 'en')).toEqual(false);
        expect(numberStringValidate('unknown', 'en')).toEqual(false);
        expect(numberStringValidate('', 'en')).toEqual(false);
      });
    });

    describe('convert', () => {
      it('should replace comma separator depending on locale', () => {
        expect(numberStringConvert('1234,56', 'de')).toEqual('1234.56');
        expect(numberStringConvert('1234.56', 'en')).toEqual('1234.56');
      });
    });
  });
});
