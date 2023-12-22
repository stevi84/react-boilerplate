import { CurrentUser } from '../../models/CurrentUser';

export const currentUserReader: CurrentUser = {
  loginName: 'MAXREADER',
  firstName: 'Max',
  surName: 'Musterreader',
  mail: 'max.musterreader@test.de',
  roles: ['READER'],
};

export const currentUserEditor: CurrentUser = {
  loginName: 'MAXEDITOR',
  firstName: 'Max',
  surName: 'Mustereditor',
  mail: 'max.mustereditor@test.de',
  roles: ['READER', 'EDITOR'],
};

export const currentUserAdmin: CurrentUser = {
  loginName: 'MAXADMIN',
  firstName: 'Max',
  surName: 'Musteradmin',
  mail: 'max.musteradmin@test.de',
  roles: ['READER', 'EDITOR', 'ADMIN'],
};
