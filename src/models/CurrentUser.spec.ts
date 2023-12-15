import { describe, it, expect } from 'vitest';
import { CurrentUser, getEmptyCurrentUser } from './CurrentUser';

describe('CurrentUser', () => {
  describe('getEmptyCurrentUser', () => {
    it('should return empty currentUser', () => {
      const emptyCurrentUser: CurrentUser = {
        loginName: '',
        firstName: '',
        surName: '',
        mail: '',
        roles: [],
      };
      expect(getEmptyCurrentUser()).toEqual(emptyCurrentUser);
    });
  });
});
