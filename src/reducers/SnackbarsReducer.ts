import { Action, createReducer } from '@reduxjs/toolkit';
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

// Actions

const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR';
const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';

interface EnqueueSnackbarAction extends Action<string> {
  notification: Snackbar;
}

export const enqueueSnackbar = (message: SnackbarMessage, options?: OptionsObject): EnqueueSnackbarAction => {
  return {
    type: ENQUEUE_SNACKBAR,
    notification: {
      message,
      options,
      key: (options && options.key) || new Date().getTime() + Math.random(),
      dismissed: false,
    },
  };
};

interface CloseSnackbarAction extends Action<string> {
  key: SnackbarKey | undefined;
  dismissAll: boolean;
}

export const closeSnackbar = (key?: SnackbarKey): CloseSnackbarAction => ({
  type: CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key,
});

interface RemoveSnackbarAction extends Action<string> {
  key: SnackbarKey;
}

export const removeSnackbar = (key: SnackbarKey): RemoveSnackbarAction => ({
  type: REMOVE_SNACKBAR,
  key,
});

// Reducer

interface SnackbarState {
  notifications: Snackbar[];
}

export const snackbarsInitialState: SnackbarState = {
  notifications: [],
};

export const snackbarsReducer = createReducer(snackbarsInitialState, {
  [ENQUEUE_SNACKBAR]: (state, action: EnqueueSnackbarAction) => {
    return {
      notifications: [...state.notifications, { ...action.notification }],
    };
  },
  [CLOSE_SNACKBAR]: (state, action: CloseSnackbarAction) => {
    return {
      notifications: state.notifications.map((notification) =>
        action.dismissAll || notification.key === action.key
          ? { ...notification, dismissed: true }
          : { ...notification }
      ),
    };
  },
  [REMOVE_SNACKBAR]: (state, action: RemoveSnackbarAction) => {
    return {
      notifications: state.notifications.filter((n) => n.key !== action.key),
    };
  },
});

// Selektoren

export const notificationsSelector = (state: RootState): Snackbar[] => state.snackbar.notifications;
