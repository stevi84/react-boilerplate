import { describe, it, expect } from 'vitest';
import { Action } from 'redux';
import { currentUserReader } from '../../test/data/CurrentUser';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './Store';
import { currentUserInitialState, currentUserReducer, currentUserSelector, setCurrentUser } from './CurrentUserReducer';
import { CurrentUser } from '../models/CurrentUser';

describe('CurrentUserReducer', () => {
  const usersState: CurrentUser = currentUserReader;

  describe('currentUserReducer', () => {
    it('should set currentUser', () => {
      const oldState: CurrentUser = currentUserInitialState;
      const newState: CurrentUser = usersState;
      const action: PayloadAction<CurrentUser> = setCurrentUser(usersState);
      expect(currentUserReducer(oldState, action)).toEqual(newState);
    });

    it('should set initial state', () => {
      const oldState: CurrentUser = undefined as unknown as CurrentUser;
      const newState: CurrentUser = currentUserInitialState;
      const action: Action<string> = { type: '@@INIT' };
      expect(currentUserReducer(oldState, action)).toEqual(newState);
    });

    it('should return state on default', () => {
      const oldState: CurrentUser = usersState;
      const newState: CurrentUser = usersState;
      const action: Action<string> = { type: 'unknown' };
      expect(currentUserReducer(oldState, action)).toEqual(newState);
    });
  });

  const state: RootState = {
    currentUser: currentUserReader,
  } as RootState;

  describe('currentUserSelector', () => {
    it('should return currentUser from state', () => {
      expect(currentUserSelector(state)).toEqual(currentUserReader);
      expect(currentUserSelector(undefined as unknown as RootState)).toEqual(currentUserInitialState);
      expect(currentUserSelector({} as RootState)).toEqual(currentUserInitialState);
    });
  });
});
