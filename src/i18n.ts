import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { defaultLocale, translations } from './globals/Translations';

i18n.use(initReactI18next).init({
  resources: translations,
  lng: defaultLocale,
  fallbackLng: defaultLocale,
});

export { i18n };
