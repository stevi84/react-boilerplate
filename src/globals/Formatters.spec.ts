import { describe, it, expect } from 'vitest';
import { formatDate, formatDateTime, formatNumber, parseNumber } from './Formatters';

describe('Formatters', () => {
  describe('formatDate', () => {
    it('should format timestamp to regular date', () => {
      expect(formatDate('2019-03-12T08:05:26+00:00', 'de')).toEqual('12.03.2019');
      expect(formatDate('2019-03-12T08:05:26+00:00', 'en')).toEqual('03/12/2019');
    });

    it('should return empty string for invalid timestamp', () => {
      expect(formatDate('unknown', 'de')).toEqual('');
      expect(formatDate('', 'de')).toEqual('');
    });
  });

  describe('formatDateTime', () => {
    it('should format timestamp to regular datetime', () => {
      expect(formatDateTime('2019-03-12T08:05:26+00:00', 'de')).toEqual('12.03.2019 09:05:26');
      expect(formatDateTime('2019-03-12T08:05:26+00:00', 'en')).toEqual('03/12/2019 09:05:26 AM');
    });

    it('should return empty string for invalid timestamp', () => {
      expect(formatDateTime('unknown', 'de')).toEqual('');
      expect(formatDateTime('', 'de')).toEqual('');
    });
  });

  describe('parseNumber', () => {
    it('should parse string to number', () => {
      expect(parseNumber('1234', 'de')).toEqual(1234);
      expect(parseNumber('1234,56', 'de')).toEqual(1234.56);
      expect(parseNumber('1234.56', 'en')).toEqual(1234.56);
      expect(parseNumber('+1234,56', 'de')).toEqual(1234.56);
      expect(parseNumber('-1234,56', 'de')).toEqual(-1234.56);
    });

    it('should return NaN for invalid number', () => {
      expect(parseNumber('1234.56', 'de')).toEqual(NaN);
      expect(parseNumber('1234,56', 'en')).toEqual(NaN);
      expect(parseNumber('1234,', 'de')).toEqual(NaN);
      expect(parseNumber('unknown', 'de')).toEqual(NaN);
      expect(parseNumber('', 'de')).toEqual(NaN);
    });
  });

  describe('formatNumber', () => {
    it('should return formatted number string', () => {
      expect(formatNumber(10000.1, 'de')).toEqual('10000,1');
      expect(formatNumber(10000.1, 'en')).toEqual('10000.1');
      expect(formatNumber(NaN, 'de')).toEqual('NaN');
    });
  });
});
