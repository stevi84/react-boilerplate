import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { setupStore } from './reducers/Store';
import { TodoDialog } from './components/dialogs/TodoDialog';
import './i18n';
import './globals/global.css';
import { Dashboard } from './components/dialogs/Dashboard';
import { EditTodoDialog } from './components/dialogs/EditTodoDialog';
import { createTheme, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { UserDialog } from './components/dialogs/UserDialog';
import { EditUserDialog } from './components/dialogs/EditUserDialog';
import { NotFoundDialog } from './components/dialogs/NotFoundDialog';
import { NotAuthorizedDialog } from './components/dialogs/NotAuthorizedDialog';
import { AdminDialog } from './components/dialogs/AdminDialog';
import { ErrorBoundary } from './components/common/ErrorBoundary';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <Dashboard />
      </ErrorBoundary>
    ),
  },
  {
    path: '/todos',
    element: (
      <ErrorBoundary>
        <TodoDialog />
      </ErrorBoundary>
    ),
  },
  {
    path: '/todos/:id',
    element: (
      <ErrorBoundary>
        <EditTodoDialog />
      </ErrorBoundary>
    ),
  },
  {
    path: '/users',
    element: (
      <ErrorBoundary>
        <UserDialog />
      </ErrorBoundary>
    ),
  },
  {
    path: '/users/:id',
    element: (
      <ErrorBoundary>
        <EditUserDialog />
      </ErrorBoundary>
    ),
  },
  {
    path: '/admin',
    element: (
      <ErrorBoundary>
        <AdminDialog />
      </ErrorBoundary>
    ),
  },
  {
    path: '/notauthorized',
    element: (
      <ErrorBoundary>
        <NotAuthorizedDialog />
      </ErrorBoundary>
    ),
  },
  {
    path: '*',
    element: (
      <ErrorBoundary>
        <NotFoundDialog />
      </ErrorBoundary>
    ),
  },
]);

const theme = createTheme({
  spacing: 8,
});

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
const store = setupStore();

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
