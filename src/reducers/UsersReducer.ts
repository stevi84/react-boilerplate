import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createMessage } from '../globals/Translations';
import { AppDispatch, AppThunk, RootState } from './Store';
import { decreaseReads, decreaseSubmits, increaseReads, increaseSubmits } from './ApiCallsReducer';
import { enqueueSnackbar } from './SnackbarsReducer';
import { User } from '../models/User';
import { api } from '../apis/OpenApiClient';
import { Client } from '../apis/api';

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

export const usersSelector = (state: RootState): User[] => state.users;

export const createUser =
  (user: User): AppThunk<Promise<User>> =>
  async (dispatch) => {
    dispatch(increaseSubmits());
    try {
      const client = await api.getClient<Client>();
      const response = await client.createUser({}, user);
      dispatch(addUser(response.data));
      dispatch(enqueueSnackbar(createMessage('create', 'user', true), { variant: 'success', autoHideDuration: 2000 }));
      return response.data;
    } catch (error) {
      dispatch(enqueueSnackbar(createMessage('create', 'user', false), { variant: 'error', autoHideDuration: null }));
      throw error;
    } finally {
      dispatch(decreaseSubmits());
    }
  };

export const readUsers = (): AppThunk<Promise<User[]>> => async (dispatch) => {
  dispatch(increaseReads());
  try {
    const client = await api.getClient<Client>();
    const response = await client.readUsers();
    dispatch(setUsers(response.data));
    return response.data;
  } catch (error) {
    dispatch(enqueueSnackbar(createMessage('read', 'user', false), { variant: 'error', autoHideDuration: null }));
    throw error;
  } finally {
    dispatch(decreaseReads());
  }
};

export const updateUser =
  (user: User): AppThunk<Promise<User>> =>
  async (dispatch) => {
    dispatch(increaseSubmits());
    try {
      const client = await api.getClient<Client>();
      const response = await client.updateUser({ id: user.id }, user);
      dispatch(changeUser(response.data));
      dispatch(enqueueSnackbar(createMessage('update', 'user', true), { variant: 'success', autoHideDuration: 2000 }));
      return response.data;
    } catch (error) {
      dispatch(enqueueSnackbar(createMessage('update', 'user', false), { variant: 'error', autoHideDuration: null }));
      throw error;
    } finally {
      dispatch(decreaseSubmits());
    }
  };

export const deleteUser =
  (userId: number): AppThunk<Promise<void>> =>
  async (dispatch) => {
    dispatch(increaseSubmits());
    try {
      const client = await api.getClient<Client>();
      await client.deleteUser({ id: userId });
      dispatch(removeUser(userId));
      dispatch(enqueueSnackbar(createMessage('delete', 'user', true), { variant: 'success', autoHideDuration: 2000 }));
    } catch (error) {
      dispatch(enqueueSnackbar(createMessage('delete', 'user', false), { variant: 'error', autoHideDuration: null }));
      throw error;
    } finally {
      dispatch(decreaseSubmits());
    }
  };

export const readUser = async (userId: number, dispatch: AppDispatch): Promise<User> => {
  dispatch(increaseReads());
  try {
    const client = await api.getClient<Client>();
    const response = await client.readUser({ id: userId });
    dispatch(enqueueSnackbar(createMessage('read', 'user', true), { variant: 'success', autoHideDuration: 2000 }));
    return response.data;
  } catch (error) {
    dispatch(enqueueSnackbar(createMessage('read', 'user', false), { variant: 'error', autoHideDuration: null }));
    throw error;
  } finally {
    dispatch(decreaseReads());
  }
};
