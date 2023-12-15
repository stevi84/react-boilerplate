import { ReactElement } from 'react';
import { isAuthorized, Right, Role } from '../../globals/RolesAndRights';
import { useAppSelector } from '../../reducers/Store';
import { currentUserSelector } from '../../reducers/CurrentUserReducer';

interface AuthorizationProps {
  readonly allowedAccessRights: Right[];
  readonly WrappedElement: ReactElement;
  readonly NotAuthorizedElement?: ReactElement;
}

/**
 * Examples for usage:
 * - hide not authorized component:
 *   <Authorization
 *     allowedAccessRights={['TODO_EDIT']}
 *     WrappedElement={<Button id={'button-create'} ...>Create</Button>}
 *   />
 * - show different component instead of not authorized component:
 *   <Authorization
 *     allowedAccessRights={['TODO_EDIT']}
 *     WrappedElement={<Button id={'button-create'} ...>Create</Button>}
 *     NotAuthorizedElement={<NotAuthorized />}
 *   />
 */
export const Authorization = (props: AuthorizationProps) => {
  const { allowedAccessRights, WrappedElement, NotAuthorizedElement = null } = props;

  const userRoles: Role[] = useAppSelector(currentUserSelector).roles;

  return isAuthorized(allowedAccessRights, userRoles) ? WrappedElement : NotAuthorizedElement;
};
