import { describe, it, expect } from 'vitest';
import { getEmptyUser, User } from './User';

describe('User', () => {
  describe('getEmptyUser', () => {
    it('should return empty user', () => {
      const emptyUser: User = {
        id: 0,
        tsCreate: '',
        tsUpdate: '',
        name: '',
        dateOfBirth: '',
        size: 0,
        weight: 0,
        email: '',
        phone: '',
      };
      expect(getEmptyUser()).toEqual(emptyUser);
    });
  });
});
