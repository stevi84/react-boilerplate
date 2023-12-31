import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Locale } from '../../globals/Translations';
import { User, getEmptyUser } from '../../models/User';
import { useAppDispatch, useAppSelector } from '../../reducers/Store';
import { usersSelector } from '../../reducers/UsersReducer';
import { deleteUser, readUsers } from '../../thunks/UsersThunks';
import { ModalConfirmCancel } from '../common/ModalConfirmCancel';
import { DataTable } from '../dataTable/DataTable';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import { formatDate, formatNumber } from '../../globals/Formatters';
import { MainLayout } from '../common/MainLayout';

export const UserDialog = () => {
  const users: User[] = useAppSelector(usersSelector);
  const [deleteModalState, setDeleteModalState] = useState({ visible: false, entityId: -1 });
  const { t, i18n } = useTranslation();
  const lang: Locale = i18n.language as Locale;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (users.length === 0) {
      dispatch(readUsers(lang));
    }
  }, []);

  return (
    <MainLayout allowedAccessRights={['USER_READ']}>
      <Paper sx={{ margin: 1 }}>
        <DataTable<User>
          id={'user-table'}
          columns={[
            {
              field: 'name',
              headerName: t('name'),
              cellDataType: 'text',
            },
            {
              field: 'dateOfBirth',
              headerName: t('dateOfBirth'),
              cellDataType: 'text',
              valueFormatter: (params) => formatDate(params.value, lang),
            },
            {
              field: 'size',
              headerName: t('size'),
              cellDataType: 'number',
              valueFormatter: (params) => formatNumber(params.value, lang),
            },
            {
              field: 'weight',
              headerName: t('weight'),
              cellDataType: 'number',
              valueFormatter: (params) => formatNumber(params.value, lang),
            },
            {
              field: 'email',
              headerName: t('email'),
              cellDataType: 'text',
            },
            {
              field: 'phone',
              headerName: t('phone'),
              cellDataType: 'text',
            },
          ]}
          rowsData={users}
          manager={{
            create: () => navigate('/users/new'),
            read: () => dispatch(readUsers(lang)),
            update: (entity: User) => navigate(`/users/${entity.id}`),
            delete: (entity: User) => setDeleteModalState({ visible: true, entityId: entity.id }),
            getEmpty: getEmptyUser,
            editRight: 'USER_EDIT',
          }}
        />
        <ModalConfirmCancel
          isOpen={deleteModalState.visible}
          headerText={t('delete')}
          bodyText={t('dialog_delete_text')}
          confirmButtonText={t('delete')}
          cancelButtonText={t('cancel')}
          confirmAction={() => {
            dispatch(deleteUser(deleteModalState.entityId, lang));
            setDeleteModalState({ visible: false, entityId: -1 });
          }}
          cancelAction={() => setDeleteModalState({ visible: false, entityId: -1 })}
        />
      </Paper>
    </MainLayout>
  );
};
