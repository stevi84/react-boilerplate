import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Locale } from '../../globals/Translations';
import { getEmptyTodo, Todo } from '../../models/Todo';
import { useAppDispatch, useAppSelector } from '../../reducers/Store';
import { deleteTodo, readTodos, todosSelector } from '../../reducers/TodosReducer';
import { ModalConfirmCancel } from '../common/ModalConfirmCancel';
import { DataTable } from '../dataTable/DataTable';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import { formatDate } from '../../globals/Formatters';
import { MainLayout } from '../common/MainLayout';

export const TodoDialog = () => {
  const todos: Todo[] = useAppSelector(todosSelector);
  const [deleteModalState, setDeleteModalState] = useState({ visible: false, entityId: -1 });
  const { t, i18n } = useTranslation();
  const lang: Locale = i18n.language as Locale;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (todos.length === 0) {
      dispatch(readTodos());
    }
  }, [dispatch, todos]);

  return (
    <MainLayout>
      <Paper sx={{ margin: 1 }}>
        <DataTable<Todo>
          id={'todo-table'}
          columns={[
            {
              field: 'owner',
              headerName: t('owner'),
              cellDataType: 'text',
            },
            {
              field: 'dueDate',
              headerName: t('dueDate'),
              cellDataType: 'text',
              valueFormatter: (params) => formatDate(params.value, lang),
            },
            {
              field: 'description',
              headerName: t('description'),
              cellDataType: 'text',
            },
            { field: 'completed', headerName: t('completed'), cellDataType: 'boolean' },
          ]}
          rowsData={todos}
          manager={{
            create: () => navigate('/todos/new'),
            read: () => dispatch(readTodos()),
            update: (entity: Todo) => navigate(`/todos/${entity.id}`),
            delete: (entity: Todo) => setDeleteModalState({ visible: true, entityId: entity.id }),
            getEmpty: getEmptyTodo,
          }}
        />
        <ModalConfirmCancel
          isOpen={deleteModalState.visible}
          headerText={t('delete')}
          bodyText={t('dialog_delete_text')}
          confirmButtonText={t('delete')}
          cancelButtonText={t('cancel')}
          confirmAction={() => {
            dispatch(deleteTodo(deleteModalState.entityId));
            setDeleteModalState({ visible: false, entityId: -1 });
          }}
          cancelAction={() => setDeleteModalState({ visible: false, entityId: -1 })}
        />
      </Paper>
    </MainLayout>
  );
};
