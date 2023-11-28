import { Components } from '../apis/api';

export type User = Components.Schemas.User;

export const getEmptyUser = (): User => ({
  id: 0,
  tsCreate: '',
  tsUpdate: '',
  name: '',
  dateOfBirth: '',
  size: 0,
  weight: 0,
  email: '',
  phone: '',
});
