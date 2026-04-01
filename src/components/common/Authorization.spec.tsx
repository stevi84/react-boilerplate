import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { Authorization } from './Authorization';
import { renderWithProviders } from '../../test/Utils';
import { currentUserReader } from '../../test/data/CurrentUser';
import { RootState } from '../../reducers/Store';

vi.mock('../../thunks/CurrentUserThunks', () => ({
  readCurrentUser: () => ({ type: 'readCurrentUser' }),
}));

describe('Authorization', () => {
  const WrappedComponent = () => <div data-testid="wrapped-component" />;
  const NotAuthorizedComponent = () => <div data-testid="not-authorized-component" />;

  it('should render if authorized', () => {
    const state: Partial<RootState> = { currentUser: currentUserReader };
    renderWithProviders(
      <Authorization
        allowedAccessRights={['TODO_READ']}
        WrappedElement={<WrappedComponent />}
        NotAuthorizedElement={<NotAuthorizedComponent />}
      />,
      { preloadedState: state }
    );
    expect(screen.getByTestId('wrapped-component')).toBeTruthy();
    expect(screen.queryByTestId('not-authorized-component')).toBeFalsy();
  });

  it("shouldn't render if not authorized", () => {
    const state: Partial<RootState> = { currentUser: currentUserReader };
    renderWithProviders(
      <Authorization
        allowedAccessRights={['TODO_EDIT']}
        WrappedElement={<WrappedComponent />}
        NotAuthorizedElement={<NotAuthorizedComponent />}
      />,
      { preloadedState: state }
    );
    expect(screen.queryByTestId('wrapped-component')).toBeFalsy();
    expect(screen.getByTestId('not-authorized-component')).toBeTruthy();
  });
});
