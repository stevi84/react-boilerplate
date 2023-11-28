import { format, isValid, parseISO } from 'date-fns';
import { Locale, numberStringConvert, numberStringValidate, t } from './Translations';

// konvertiert zwischen ISO8601-String (für Store) und DD.MM.YYYY-String (für Input)
export const formatDate = (str: string, lang: Locale): string => {
  const date: Date = parseISO(str);
  return isValid(date) ? format(date, t('dateFormat', lang)) : '';
};

export const formatDateTime = (str: string, lang: Locale): string => {
  const date: Date = parseISO(str);
  return isValid(date) ? format(date, t('dateTimeFormat', lang)) : '';
};

export const parseNumber = (value: string, lang: Locale): number =>
  numberStringValidate(value, lang) ? Number.parseFloat(numberStringConvert(value, lang)) : NaN;

export const formatNumber = (value: number, lang: Locale): string => value.toLocaleString(lang, { useGrouping: false });
