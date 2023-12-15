import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { todosReducer } from './TodosReducer';
import { apiCallsReducer } from './ApiCallsReducer';
import { snackbarsReducer } from './SnackbarsReducer';
import { usersReducer } from './UsersReducer';
import { currentUserReducer } from './CurrentUserReducer';

export const store = configureStore({
  reducer: {
    snackbar: snackbarsReducer,
    todos: todosReducer,
    users: usersReducer,
    apiCalls: apiCallsReducer,
    currentUser: currentUserReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
