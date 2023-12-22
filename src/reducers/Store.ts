import { combineReducers, configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { todosReducer } from './TodosReducer';
import { apiCallsReducer } from './ApiCallsReducer';
import { snackbarsReducer } from './SnackbarsReducer';
import { usersReducer } from './UsersReducer';
import { currentUserReducer } from './CurrentUserReducer';

const rootReducer = combineReducers({
  snackbar: snackbarsReducer,
  todos: todosReducer,
  users: usersReducer,
  apiCalls: apiCallsReducer,
  currentUser: currentUserReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
