import { describe, expect, it } from 'vitest';
import { getEnv } from './Environments';

describe('Environments', () => {
  describe('getEnv', () => {
    it('should return import.meta.env.VITE_ENV', () => {
      import.meta.env.VITE_ENV = 'unknown';
      expect(getEnv()).toEqual('unknown');
    });
  });
});
