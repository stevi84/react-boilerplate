import { api } from '../apis/OpenApiClient';
import { Client } from '../apis/api';
import { createMessage, Locale } from '../globals/Translations';
import { CurrentUser } from '../models/CurrentUser';
import { decreaseReads, increaseReads } from '../reducers/ApiCallsReducer';
import { setCurrentUser } from '../reducers/CurrentUserReducer';
import { enqueueSnackbar } from '../reducers/SnackbarsReducer';
import { AppThunk } from '../reducers/Store';

export const readCurrentUser =
  (lang: Locale): AppThunk<Promise<CurrentUser>> =>
  async (dispatch) => {
    dispatch(increaseReads());
    try {
      const client = await api.getClient<Client>();
      const response = await client.readCurrentUser();
      dispatch(setCurrentUser(response.data));
      return response.data;
    } catch (error) {
      dispatch(
        enqueueSnackbar(createMessage('read', 'currentUser', false, lang), {
          variant: 'error',
          autoHideDuration: null,
        })
      );
      throw error;
    } finally {
      dispatch(decreaseReads());
    }
  };
