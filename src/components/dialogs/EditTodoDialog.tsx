import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../reducers/Store';
import { useEffect, useState } from 'react';
import { Todo, getEmptyTodo } from '../../models/Todo';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { isIsoDate } from '../../globals/Validations';
import { StringEdit } from '../common/StringEdit';
import { useTranslation } from 'react-i18next';
import { DateEdit } from '../common/DateEdit';
import { BooleanEdit } from '../common/BooleanEdit';
import { createTodo, readTodo, updateTodo } from '../../reducers/TodosReducer';
import { CrudMode } from '../dataTable/DataTableInterfaces';
import { Button, Paper, Stack, Tooltip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { isReadingSelector, isSubmittingSelector } from '../../reducers/ApiCallsReducer';
import { Working } from '../common/Working';
import { MainLayout } from '../common/MainLayout';

export const EditTodoDialog = () => {
  const isReading: boolean = useAppSelector(isReadingSelector);
  const isSubmitting: boolean = useAppSelector(isSubmittingSelector);
  const [todo, setTodo] = useState<Todo>(getEmptyTodo());
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const mode: CrudMode | undefined = id === 'new' ? CrudMode.CREATE : /^\d+$/.test(id!) ? CrudMode.UPDATE : undefined;
  useEffect(() => {
    (async () => {
      if (mode === CrudMode.UPDATE) {
        setTodo(await readTodo(Number(id), dispatch));
      }
    })();
  }, [dispatch, id, mode]);

  const save = (values: Todo, form: FormikHelpers<Todo>) => {
    switch (mode) {
      case CrudMode.CREATE:
        dispatch(createTodo(values));
        break;
      case CrudMode.UPDATE:
        dispatch(updateTodo(values));
    }
    doCancel(form)();
  };

  const doCancel = (form: FormikHelpers<Todo>) => () => {
    form.resetForm({ values: getEmptyTodo() });
    navigate('/todos');
  };

  return (
    <MainLayout>
      <Paper sx={{ margin: 1 }}>
        {!isReading && !isSubmitting && (
          <Formik<Todo>
            initialValues={todo}
            enableReinitialize={true}
            validationSchema={Yup.object({
              owner: Yup.string().required(t('error_empty')),
              dueDate: Yup.string().required(t('error_empty')).test('isIsoDate', t('error_date'), isIsoDate),
              description: Yup.string().required(t('error_empty')),
              completed: Yup.boolean().required(t('error_empty')),
            })}
            onSubmit={save}
          >
            {(form) => (
              <Form>
                <Stack direction={'column'}>
                  <StringEdit id="owner" name="owner" label={t('owner')} />
                  <DateEdit id="dueDate" name="dueDate" label={t('dueDate')} />
                  <StringEdit id="description" name="description" label={t('description')} />
                  <BooleanEdit id="completed" name="completed" label={t('completed')} />
                  <Stack direction={'row'}>
                    <Tooltip
                      title={
                        !form.dirty
                          ? t('tooltip_no_changes')
                          : !form.isValid
                          ? t('tooltip_invalid')
                          : isSubmitting
                          ? t('tooltip_submitting')
                          : t('save')
                      }
                    >
                      <span>
                        <Button
                          id="button-save"
                          variant="contained"
                          color="primary"
                          onClick={form.submitForm}
                          disabled={!form.dirty || !form.isValid || isSubmitting}
                          startIcon={<CheckIcon />}
                          autoFocus={true}
                          sx={{ margin: 1 }}
                        >
                          {t('save')}
                        </Button>
                      </span>
                    </Tooltip>
                    <Tooltip title={t('cancel')}>
                      <span>
                        <Button
                          id="button-cancel"
                          variant="outlined"
                          color="primary"
                          onClick={doCancel(form)}
                          startIcon={<CloseIcon />}
                          sx={{ margin: 1 }}
                        >
                          {t('cancel')}
                        </Button>
                      </span>
                    </Tooltip>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        )}
        {(isReading || isSubmitting) && <Working isReading isSubmitting />}
      </Paper>
    </MainLayout>
  );
};
