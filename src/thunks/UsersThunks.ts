import { api } from '../apis/OpenApiClient';
import { Client } from '../apis/api';
import { createMessage, Locale } from '../globals/Translations';
import { User } from '../models/User';
import { decreaseReads, decreaseSubmits, increaseReads, increaseSubmits } from '../reducers/ApiCallsReducer';
import { enqueueSnackbar } from '../reducers/SnackbarsReducer';
import { AppDispatch, AppThunk } from '../reducers/Store';
import { addUser, changeUser, removeUser, setUsers } from '../reducers/UsersReducer';
import { createErrorLog } from '../apis/ErrorApi';

export const createUser =
  (user: User, lang: Locale): AppThunk<Promise<User>> =>
  async (dispatch) => {
    dispatch(increaseSubmits());
    try {
      const client = await api.getClient<Client>();
      const response = await client.createUser({}, user);
      dispatch(addUser(response.data));
      dispatch(
        enqueueSnackbar(createMessage('create', 'user', true, lang), { variant: 'success', autoHideDuration: 2000 })
      );
      return response.data;
    } catch (error) {
      createErrorLog(error);
      dispatch(
        enqueueSnackbar(createMessage('create', 'user', false, lang), { variant: 'error', autoHideDuration: null })
      );
      throw error;
    } finally {
      dispatch(decreaseSubmits());
    }
  };

export const readUsers =
  (lang: Locale): AppThunk<Promise<User[]>> =>
  async (dispatch) => {
    dispatch(increaseReads());
    try {
      const client = await api.getClient<Client>();
      const response = await client.readUsers();
      dispatch(setUsers(response.data));
      return response.data;
    } catch (error) {
      createErrorLog(error);
      dispatch(
        enqueueSnackbar(createMessage('read', 'user', false, lang), { variant: 'error', autoHideDuration: null })
      );
      throw error;
    } finally {
      dispatch(decreaseReads());
    }
  };

export const updateUser =
  (user: User, lang: Locale): AppThunk<Promise<User>> =>
  async (dispatch) => {
    dispatch(increaseSubmits());
    try {
      const client = await api.getClient<Client>();
      const response = await client.updateUser({ id: user.id }, user);
      dispatch(changeUser(response.data));
      dispatch(
        enqueueSnackbar(createMessage('update', 'user', true, lang), { variant: 'success', autoHideDuration: 2000 })
      );
      return response.data;
    } catch (error) {
      createErrorLog(error);
      dispatch(
        enqueueSnackbar(createMessage('update', 'user', false, lang), { variant: 'error', autoHideDuration: null })
      );
      throw error;
    } finally {
      dispatch(decreaseSubmits());
    }
  };

export const deleteUser =
  (userId: number, lang: Locale): AppThunk<Promise<void>> =>
  async (dispatch) => {
    dispatch(increaseSubmits());
    try {
      const client = await api.getClient<Client>();
      await client.deleteUser({ id: userId });
      dispatch(removeUser(userId));
      dispatch(
        enqueueSnackbar(createMessage('delete', 'user', true, lang), { variant: 'success', autoHideDuration: 2000 })
      );
    } catch (error) {
      createErrorLog(error);
      dispatch(
        enqueueSnackbar(createMessage('delete', 'user', false, lang), { variant: 'error', autoHideDuration: null })
      );
      throw error;
    } finally {
      dispatch(decreaseSubmits());
    }
  };

export const readUser = async (userId: number, lang: Locale, dispatch: AppDispatch): Promise<User> => {
  dispatch(increaseReads());
  try {
    const client = await api.getClient<Client>();
    const response = await client.readUser({ id: userId });
    return response.data;
  } catch (error) {
    createErrorLog(error);
    dispatch(enqueueSnackbar(createMessage('read', 'user', false, lang), { variant: 'error', autoHideDuration: null }));
    throw error;
  } finally {
    dispatch(decreaseReads());
  }
};
