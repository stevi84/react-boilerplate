import { Components } from '../apis/api';

export type CurrentUser = Components.Schemas.CurrentUser;
export type Role = Components.Schemas.Role;
export const getEmptyCurrentUser = (): CurrentUser => ({
  loginName: '',
  firstName: '',
  surName: '',
  mail: '',
  roles: [],
});
