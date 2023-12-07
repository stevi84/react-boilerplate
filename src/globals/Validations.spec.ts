import { describe, it, expect } from 'vitest';
import { isEmail, isEmptyString, isInteger, isIsoDate, isNumber } from './Validations';

describe('Validations', () => {
  describe('isEmptyString', () => {
    it('should return false if the value is not empty', () => {
      expect(isEmptyString('a')).toEqual(false);
    });

    it('should return true if the value is empty or whitespace only', () => {
      expect(isEmptyString('')).toEqual(true);
      expect(isEmptyString(' ')).toEqual(true);
    });
  });

  describe('isIsoDate', () => {
    it('should return true if the value is an ISO date', () => {
      expect(isIsoDate('2020-12-03T15:02:28+02:00')).toEqual(true);
      expect(isIsoDate('2018-04-04T16:00:00.000Z')).toEqual(true);
    });

    it('should return false if the value is not an ISO date or empty', () => {
      expect(isEmail('a')).toEqual(false);
      expect(isEmail('')).toEqual(false);
    });
  });

  describe('isEmail', () => {
    it('should return true if the value is an email', () => {
      expect(isEmail('test@test.test')).toEqual(true);
    });

    it('should return false if the value is not an email or empty', () => {
      expect(isEmail('a')).toEqual(false);
      expect(isEmail('')).toEqual(false);
    });
  });

  describe('isInteger', () => {
    it('should return true if the value is an integer', () => {
      expect(isInteger(15)).toEqual(true);
    });

    it('should return false if the value is not an integer', () => {
      expect(isInteger(15.5)).toEqual(false);
      expect(isInteger(NaN)).toEqual(false);
    });
  });

  describe('isNumber', () => {
    it('should return true if the value is a number', () => {
      expect(isNumber(15.5)).toEqual(true);
      expect(isNumber(15)).toEqual(true);
    });

    it('should return false if the value is not a number', () => {
      expect(isNumber(NaN)).toEqual(false);
    });
  });
});
