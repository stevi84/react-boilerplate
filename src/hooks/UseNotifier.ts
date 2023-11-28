import { useEffect } from 'react';
import { SnackbarKey, useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../reducers/Store';
import { notificationsSelector, removeSnackbar } from '../reducers/SnackbarsReducer';

// https://stackoverflow.com/questions/62754584/how-can-i-use-notistick-any-snackbar-with-redux-toolkit-and-react
// https://codesandbox.io/s/github/iamhosseindhv/notistack/tree/master/examples/redux-example?file=/redux/actions.js:0-150

let displayed: SnackbarKey[] = [];

const useNotifier = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(notificationsSelector);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id: SnackbarKey) => displayed.push(id);

  const removeDisplayed = (id: SnackbarKey) => {
    displayed = displayed.filter((key) => id !== key);
  };

  useEffect(() => {
    notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
      if (dismissed) {
        // dismiss snackbar using notistack
        closeSnackbar(key);
        return;
      }

      // do nothing if snackbar is already displayed
      if (displayed.includes(key)) return;

      // display snackbar using notistack
      enqueueSnackbar(message, {
        key,
        ...options,
        onClose: (event, reason, myKey) => {
          if (options.onClose) {
            options.onClose(event, reason, myKey);
          }
        },
        onExited: (event, myKey) => {
          // remove this snackbar from redux store
          dispatch(removeSnackbar(myKey));
          removeDisplayed(myKey);
        },
      });

      // keep track of snackbars that we've displayed
      storeDisplayed(key);
    });
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);
};

export default useNotifier;
