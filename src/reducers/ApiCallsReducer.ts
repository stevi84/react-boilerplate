import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './Store';

export const apiCallsInitialState = {
  runningReads: 0,
  runningSubmits: 0,
};

const apiCallsSlice = createSlice({
  name: 'apiCalls',
  initialState: apiCallsInitialState,
  reducers: {
    increaseReads(state, _action: PayloadAction) {
      return {
        ...state,
        runningReads: state.runningReads + 1,
      };
    },
    decreaseReads(state, _action: PayloadAction) {
      return {
        ...state,
        runningReads: Math.max(0, state.runningReads - 1),
      };
    },
    increaseSubmits(state, _action: PayloadAction) {
      return {
        ...state,
        runningSubmits: state.runningSubmits + 1,
      };
    },
    decreaseSubmits(state, _action: PayloadAction) {
      return {
        ...state,
        runningSubmits: Math.max(0, state.runningSubmits - 1),
      };
    },
  },
});

const { actions, reducer } = apiCallsSlice;
export const { increaseReads, decreaseReads, increaseSubmits, decreaseSubmits } = actions;
export { reducer as apiCallsReducer };

export const isReadingSelector = (state: RootState): boolean => state.apiCalls.runningReads > 0;
export const isSubmittingSelector = (state: RootState): boolean => state.apiCalls.runningSubmits > 0;
