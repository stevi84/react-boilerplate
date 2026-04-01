import { isValid, parseISO } from 'date-fns';

/**
 * Quelle: https://emailregex.com/
 */
const emailRegexp: RegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // NOSONAR

export const isEmptyString = (value: string): boolean => !value?.trim();

export const isIsoDate = (value: string = ''): boolean => isValid(parseISO(value));

export const isEmail = (value: string): boolean => emailRegexp.test(value);

export const isInteger = (value: number): boolean => Number.isInteger(value);

export const isNumber = (value: number): boolean => !Number.isNaN(value);
