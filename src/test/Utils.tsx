import { PropsWithChildren, ReactElement } from 'react';
import { RenderOptions, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { setupStore, AppStore, RootState } from '../reducers/Store';

// https://redux.js.org/usage/writing-tests

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
  initialEntries?: string[];
  path?: string;
}

export function renderWithProviders(ui: ReactElement, extendedRenderOptions: ExtendedRenderOptions = {}) {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    initialEntries,
    path,
    ...renderOptions
  } = extendedRenderOptions;
  const locationRef = { current: '/' };
  const LocationCapture = () => {
    locationRef.current = useLocation().pathname;
    return null;
  };
  const content = path ? (
    <Routes>
      <Route path={path} element={ui} />
    </Routes>
  ) : (
    ui
  );
  const Wrapper = ({ children }: Readonly<PropsWithChildren<{}>>): ReactElement => (
    <MemoryRouter initialEntries={initialEntries}>
      <Provider store={store}>
        {children}
        <LocationCapture />
      </Provider>
    </MemoryRouter>
  );
  return { store, getLocation: () => locationRef.current, ...render(content, { wrapper: Wrapper, ...renderOptions }) };
}
