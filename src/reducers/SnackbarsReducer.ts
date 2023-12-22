import { PrepareAction, createAction, createReducer } from '@reduxjs/toolkit';
import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';
import { RootState } from './Store';

// https://stackoverflow.com/questions/62754584/how-can-i-use-notistick-any-snackbar-with-redux-toolkit-and-react
// https://codesandbox.io/s/github/iamhosseindhv/notistack/tree/master/examples/redux-example?file=/redux/actions.js:0-150

interface Snackbar {
  message: SnackbarMessage;
  options?: OptionsObject;
  key: SnackbarKey;
  dismissed: boolean;
}

interface SnackbarState {
  notifications: Snackbar[];
}

export const enqueueSnackbar = createAction<PrepareAction<{ notification: Snackbar }>>(
  'ENQUEUE_SNACKBAR',
  (message: SnackbarMessage, options?: OptionsObject) => ({
    payload: {
      notification: {
        message,
        options,
        key: (options && options.key) || new Date().getTime() + Math.random(),
        dismissed: false,
      },
    },
  })
);

export const closeSnackbar = createAction<PrepareAction<{ key?: SnackbarKey; dismissAll: boolean }>>(
  'CLOSE_SNACKBAR',
  (key?: SnackbarKey) => ({
    payload: {
      dismissAll: !key, // dismiss all if no key has been defined
      key,
    },
  })
);

export const removeSnackbar = createAction<PrepareAction<{ key: SnackbarKey }>>(
  'REMOVE_SNACKBAR',
  (key: SnackbarKey) => ({
    payload: {
      key,
    },
  })
);

export const snackbarsInitialState: SnackbarState = {
  notifications: [],
};

export const snackbarsReducer = createReducer(snackbarsInitialState, (builder) =>
  builder
    .addCase(enqueueSnackbar, (state, action) => ({
      notifications: [...state.notifications, { ...action.payload.notification }],
    }))
    .addCase(closeSnackbar, (state, action) => ({
      notifications: state.notifications.map((notification) =>
        action.payload.dismissAll || notification.key === action.payload.key
          ? { ...notification, dismissed: true }
          : { ...notification }
      ),
    }))
    .addCase(removeSnackbar, (state, action) => ({
      notifications: state.notifications.filter((n) => n.key !== action.payload.key),
    }))
);

export const notificationsSelector = (state: RootState): Snackbar[] => state?.snackbar?.notifications || [];
