import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './reducers/Store';
import { TodoDialog } from './components/dialogs/TodoDialog';
//import { UserDialog } from './components/dialogs/UserDialog';
import './i18n';
import './globals/global.css';
import { Dashboard } from './components/dialogs/Dashboard';
import { EditTodoDialog } from './components/dialogs/EditTodoDialog';
import { createTheme, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { UserDialog } from './components/dialogs/UserDialog';
import { EditUserDialog } from './components/dialogs/EditUserDialog';
import { NotFound } from './components/dialogs/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/todos',
    element: <TodoDialog />,
  },
  {
    path: '/todos/:id',
    element: <EditTodoDialog />,
  },
  {
    path: '/users',
    element: <UserDialog />,
  },
  {
    path: '/users/:id',
    element: <EditUserDialog />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const theme = createTheme({
  spacing: 8,
});

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
