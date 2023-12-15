import { describe, it, expect } from 'vitest';
import { Action } from 'redux';
import {
  setUsers,
  addUser,
  changeUser,
  removeUser,
  usersReducer,
  usersInitialState,
  usersSelector,
} from './UsersReducer';
import { User } from '../models/User';
import { user1, user2, user3 } from '../../test/data/User';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './Store';

describe('UsersReducer', () => {
  const usersState: User[] = [user1, user2, user3];

  describe('usersReducer', () => {
    it('should set users', () => {
      const oldState: User[] = usersInitialState;
      const newState: User[] = usersState;
      const action: PayloadAction<User[]> = setUsers(usersState);
      expect(usersReducer(oldState, action)).toEqual(newState);
    });

    it('should create user', () => {
      const oldState: User[] = [user1, user2];
      const newState: User[] = usersState;
      const action: PayloadAction<User> = addUser(user3);
      expect(usersReducer(oldState, action)).toEqual(newState);
    });

    it('should update user', () => {
      const updatedUser: User = { ...user2, name: 'Susan Baer' };
      const oldState: User[] = usersState;
      const newState: User[] = [user1, updatedUser, user3];
      const action: PayloadAction<User> = changeUser(updatedUser);
      expect(usersReducer(oldState, action)).toEqual(newState);
    });

    it('should delete user', () => {
      const oldState: User[] = usersState;
      const newState: User[] = [user1, user3];
      const action: PayloadAction<number> = removeUser(2);
      expect(usersReducer(oldState, action)).toEqual(newState);
    });

    it('should set initial state', () => {
      const oldState: User[] = undefined as unknown as User[];
      const newState: User[] = usersInitialState;
      const action: Action<string> = { type: '@@INIT' };
      expect(usersReducer(oldState, action)).toEqual(newState);
    });

    it('should return state on default', () => {
      const oldState: User[] = usersState;
      const newState: User[] = usersState;
      const action: Action<string> = { type: 'unknown' };
      expect(usersReducer(oldState, action)).toEqual(newState);
    });
  });

  const state: RootState = {
    users: [user1, user2, user3],
  } as RootState;

  describe('usersSelector', () => {
    it('should return users from state', () => {
      expect(usersSelector(state)).toEqual([user1, user2, user3]);
      expect(usersSelector(undefined as unknown as RootState)).toEqual([]);
      expect(usersSelector({} as RootState)).toEqual([]);
    });
  });
});
