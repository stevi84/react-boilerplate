import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './Store';
import { User } from '../models/User';

export const usersInitialState: User[] = [];

const usersSlice = createSlice({
  name: 'users',
  initialState: usersInitialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      return action.payload;
    },
    addUser(state, action: PayloadAction<User>) {
      return state.concat(action.payload);
    },
    changeUser(state, action: PayloadAction<User>) {
      return state.map((user) => (user.id !== action.payload.id ? user : action.payload));
    },
    removeUser(state, action: PayloadAction<number>) {
      return state.filter((user) => user.id !== action.payload);
    },
  },
});

const { actions, reducer } = usersSlice;
export const { setUsers, addUser, changeUser, removeUser } = actions;
export { reducer as usersReducer };

export const usersSelector = (state: RootState): User[] => state?.users || [];
