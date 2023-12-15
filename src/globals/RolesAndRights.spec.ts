import { describe, it, expect } from 'vitest';
import { isAuthorized } from './RolesAndRights';

describe('RolesAndRights', () => {
  describe('isAuthorized', () => {
    it('should return true if authorized, false if not', () => {
      expect(isAuthorized(['TODO_READ'], [])).toEqual(false);
      expect(isAuthorized(['USER_READ'], [])).toEqual(false);
      expect(isAuthorized(['TODO_EDIT'], [])).toEqual(false);
      expect(isAuthorized(['USER_EDIT'], [])).toEqual(false);
      expect(isAuthorized(['ADMIN'], [])).toEqual(false);
      expect(isAuthorized(['UNRESTRICTED'], [])).toEqual(true);

      expect(isAuthorized(['TODO_READ'], ['READER'])).toEqual(true);
      expect(isAuthorized(['USER_READ'], ['READER'])).toEqual(true);
      expect(isAuthorized(['TODO_EDIT'], ['READER'])).toEqual(false);
      expect(isAuthorized(['USER_EDIT'], ['READER'])).toEqual(false);
      expect(isAuthorized(['ADMIN'], ['READER'])).toEqual(false);
      expect(isAuthorized(['UNRESTRICTED'], ['READER'])).toEqual(true);

      expect(isAuthorized(['TODO_READ'], ['READER', 'EDITOR'])).toEqual(true);
      expect(isAuthorized(['USER_READ'], ['READER', 'EDITOR'])).toEqual(true);
      expect(isAuthorized(['TODO_EDIT'], ['READER', 'EDITOR'])).toEqual(true);
      expect(isAuthorized(['USER_EDIT'], ['READER', 'EDITOR'])).toEqual(true);
      expect(isAuthorized(['ADMIN'], ['READER', 'EDITOR'])).toEqual(false);
      expect(isAuthorized(['UNRESTRICTED'], ['READER', 'EDITOR'])).toEqual(true);

      expect(isAuthorized(['TODO_READ'], ['READER', 'EDITOR', 'ADMIN'])).toEqual(true);
      expect(isAuthorized(['USER_READ'], ['READER', 'EDITOR', 'ADMIN'])).toEqual(true);
      expect(isAuthorized(['TODO_EDIT'], ['READER', 'EDITOR', 'ADMIN'])).toEqual(true);
      expect(isAuthorized(['USER_EDIT'], ['READER', 'EDITOR', 'ADMIN'])).toEqual(true);
      expect(isAuthorized(['ADMIN'], ['READER', 'EDITOR', 'ADMIN'])).toEqual(true);
      expect(isAuthorized(['UNRESTRICTED'], ['READER', 'EDITOR', 'ADMIN'])).toEqual(true);
    });
  });
});
