import { Components } from '../apis/api';

export type Right = 'TODO_READ' | 'TODO_EDIT' | 'USER_READ' | 'USER_EDIT' | 'ADMIN' | 'UNRESTRICTED';
export type Role = Components.Schemas.Role;

const rightsMap: { [key in Role]: Right[] } = {
  READER: ['TODO_READ', 'USER_READ'],
  EDITOR: ['TODO_EDIT', 'USER_EDIT'],
  ADMIN: ['ADMIN'],
};

export const isAuthorized = (allowedAccessRights: Right[], userRoles: Role[]): boolean => {
  if (allowedAccessRights.includes('UNRESTRICTED')) return true;

  let authorized = false;
  for (let userRole of userRoles) {
    if (rightsMap[userRole].filter((r) => allowedAccessRights.includes(r)).length > 0) authorized = true;
  }
  return authorized;
};
