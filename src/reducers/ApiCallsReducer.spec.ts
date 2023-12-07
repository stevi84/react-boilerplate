import { describe, it, expect } from 'vitest';
import { Action } from 'redux';
import {
  decreaseReads,
  decreaseSubmits,
  increaseReads,
  increaseSubmits,
  apiCallsInitialState,
  apiCallsReducer,
  isReadingSelector,
  isSubmittingSelector,
} from './ApiCallsReducer';
import { RootState } from './Store';
import { PayloadAction } from '@reduxjs/toolkit';

describe('ApiCallsReducer', () => {
  const apiCallsState = {
    runningReads: 1,
    runningSubmits: 1,
  };

  describe('apiCallsReducer', () => {
    it('should increase running reads', () => {
      const oldState = apiCallsInitialState;
      const newState = {
        runningReads: 1,
        runningSubmits: 0,
      };
      const action: PayloadAction = increaseReads();
      expect(apiCallsReducer(oldState, action)).toEqual(newState);
    });

    it('should decrease running reads', () => {
      const oldState = apiCallsState;
      const newState = {
        runningReads: 0,
        runningSubmits: 1,
      };
      const action: PayloadAction = decreaseReads();
      expect(apiCallsReducer(oldState, action)).toEqual(newState);
    });

    it('should increase running submits', () => {
      const oldState = apiCallsInitialState;
      const newState = {
        runningReads: 0,
        runningSubmits: 1,
      };
      const action: PayloadAction = increaseSubmits();
      expect(apiCallsReducer(oldState, action)).toEqual(newState);
    });

    it('should decrease running submits', () => {
      const oldState = apiCallsState;
      const newState = {
        runningReads: 1,
        runningSubmits: 0,
      };
      const action: PayloadAction = decreaseSubmits();
      expect(apiCallsReducer(oldState, action)).toEqual(newState);
    });

    it('should set initial state', () => {
      const oldState = undefined;
      const newState = apiCallsInitialState;
      const action: Action<string> = { type: '@@INIT' };
      expect(apiCallsReducer(oldState, action)).toEqual(newState);
    });

    it('should return state on default', () => {
      const oldState = apiCallsState;
      const newState = apiCallsState;
      const action: Action<string> = { type: 'unknown' };
      expect(apiCallsReducer(oldState, action)).toEqual(newState);
    });
  });

  const emptyState: RootState = {
    apiCalls: {
      runningReads: 0,
      runningSubmits: 0,
    },
  } as RootState;

  const state: RootState = {
    apiCalls: apiCallsState,
  } as RootState;

  describe('isReadingSelector', () => {
    it('should return isReading from state', () => {
      expect(isReadingSelector(state)).toEqual(true);
      expect(isReadingSelector(emptyState)).toEqual(false);
    });
  });

  describe('isSubmittingSelector', () => {
    it('should return isSubmitting from state', () => {
      expect(isSubmittingSelector(state)).toEqual(true);
      expect(isSubmittingSelector(emptyState)).toEqual(false);
    });
  });
});
