import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../reducers/Store';
import { useEffect, useState } from 'react';
import { User, getEmptyUser } from '../../models/User';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { isIsoDate } from '../../globals/Validations';
import { StringEdit } from '../common/StringEdit';
import { useTranslation } from 'react-i18next';
import { DateEdit } from '../common/DateEdit';
import { createUser, readUser, updateUser } from '../../thunks/UsersThunks';
import { CrudMode } from '../dataTable/DataTableInterfaces';
import { Button, Paper, Stack, Tooltip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { isReadingSelector, isSubmittingSelector } from '../../reducers/ApiCallsReducer';
import { Working } from '../common/Working';
import { MainLayout } from '../common/MainLayout';
import { NumberEdit } from '../common/NumberEdit';
import { Locale } from '../../globals/Translations';

export const EditUserDialog = () => {
  const isReading: boolean = useAppSelector(isReadingSelector);
  const isSubmitting: boolean = useAppSelector(isSubmittingSelector);
  const [user, setUser] = useState<User>(getEmptyUser());
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const lang: Locale = i18n.language as Locale;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const mode: CrudMode | undefined = id === 'new' ? CrudMode.CREATE : /^\d+$/.test(id!) ? CrudMode.UPDATE : undefined;
  useEffect(() => {
    (async () => {
      if (mode === CrudMode.UPDATE) {
        setUser(await readUser(Number(id), lang, dispatch));
      }
    })();
  }, []);

  const save = (values: User, form: FormikHelpers<User>) => {
    switch (mode) {
      case CrudMode.CREATE:
        dispatch(createUser(values, lang));
        break;
      case CrudMode.UPDATE:
        dispatch(updateUser(values, lang));
    }
    doCancel(form)();
  };

  const doCancel = (form: FormikHelpers<User>) => () => {
    form.resetForm({ values: getEmptyUser() });
    navigate('/users');
  };

  return (
    <MainLayout allowedAccessRights={['USER_EDIT']}>
      <Paper sx={{ margin: 1 }}>
        {!isReading && !isSubmitting && (
          <Formik<User>
            initialValues={user}
            enableReinitialize={true}
            validationSchema={Yup.object({
              name: Yup.string().required(t('error_empty')),
              dateOfBirth: Yup.string().required(t('error_empty')).test('isIsoDate', t('error_date'), isIsoDate),
              size: Yup.number().required(t('error_empty')).integer(t('error_integer')).typeError(t('error_integer')),
              weight: Yup.number().required(t('error_empty')).typeError(t('error_number')),
              email: Yup.string().required(t('error_empty')).email(t('error_mail')),
              phone: Yup.string().required(t('error_empty')),
            })}
            onSubmit={save}
          >
            {(form) => (
              <Form>
                <Stack direction={'column'}>
                  <StringEdit id="name" name="name" label={t('name')} />
                  <DateEdit id="dateOfBirth" name="dateOfBirth" label={t('dateOfBirth')} />
                  <NumberEdit id="size" name="size" label={t('size')} />
                  <NumberEdit id="weight" name="weight" label={t('weight')} />
                  <StringEdit id="email" name="email" label={t('email')} />
                  <StringEdit id="phone" name="phone" label={t('phone')} />
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
        {(isReading || isSubmitting) && <Working isReading={isReading} isSubmitting={isSubmitting} />}
      </Paper>
    </MainLayout>
  );
};
