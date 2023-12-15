import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './Store';
import { CurrentUser, getEmptyCurrentUser } from '../models/CurrentUser';

export const currentUserInitialState: CurrentUser = getEmptyCurrentUser();

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: currentUserInitialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<CurrentUser>) {
      return action.payload;
    },
  },
});

const { actions, reducer } = currentUserSlice;
export const { setCurrentUser } = actions;
export { reducer as currentUserReducer };

export const currentUserSelector = (state: RootState): CurrentUser => state?.currentUser || currentUserInitialState;
