import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Authorization } from './Authorization';

const { useAppSelectorMock } = vi.hoisted(() => ({ useAppSelectorMock: vi.fn() }));
vi.mock('../../reducers/Store', () => ({ useAppSelector: useAppSelectorMock }));

vi.mock('../../thunks/CurrentUserThunks', () => ({
  readCurrentUser: () => ({ type: 'readCurrentUser' }),
}));

describe('Authorization', () => {
  describe('Authorization', () => {
    const WrappedComponent = () => <div data-testid="wrapped-component" />;
    const NotAuthorizedComponent = () => <div data-testid="not-authorized-component" />;

    it('should render if authorized', () => {
      useAppSelectorMock.mockReturnValue({ roles: ['READER'] });
      render(
        <Authorization
          allowedAccessRights={['TODO_READ']}
          WrappedElement={<WrappedComponent />}
          NotAuthorizedElement={<NotAuthorizedComponent />}
        />
      );
      expect(screen.getByTestId('wrapped-component')).toBeTruthy();
      expect(screen.queryByTestId('not-authorized-component')).toBeFalsy();
    });

    it("shouldn't render if not authorized", () => {
      useAppSelectorMock.mockReturnValue({ roles: ['READER'] });
      render(
        <Authorization
          allowedAccessRights={['TODO_EDIT']}
          WrappedElement={<WrappedComponent />}
          NotAuthorizedElement={<NotAuthorizedComponent />}
        />
      );
      expect(screen.queryByTestId('wrapped-component')).toBeFalsy();
      expect(screen.getByTestId('not-authorized-component')).toBeTruthy();
    });
  });
});
