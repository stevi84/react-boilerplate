import { ButtonBase, Card, CardContent, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import People from '@mui/icons-material/People';
import EditNote from '@mui/icons-material/EditNote';
import Settings from '@mui/icons-material/Settings';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../reducers/Store';
import { todosSelector } from '../../reducers/TodosReducer';
import { readTodos } from '../../thunks/TodosThunks';
import { isReadingSelector, isSubmittingSelector } from '../../reducers/ApiCallsReducer';
import { Todo } from '../../models/Todo';
import { Working } from '../common/Working';
import { MainLayout } from '../common/MainLayout';
import { User } from '../../models/User';
import { usersSelector } from '../../reducers/UsersReducer';
import { readUsers } from '../../thunks/UsersThunks';
import { useTranslation } from 'react-i18next';
import { Locale } from '../../globals/Translations';
import { Authorization } from '../common/Authorization';

export const Dashboard = () => {
  const todos: Todo[] = useAppSelector(todosSelector);
  const users: User[] = useAppSelector(usersSelector);
  const isReading: boolean = useAppSelector(isReadingSelector);
  const isSubmitting: boolean = useAppSelector(isSubmittingSelector);
  const { t, i18n } = useTranslation();
  const lang: Locale = i18n.language as Locale;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (todos.length === 0) {
      dispatch(readTodos(lang));
    }
    if (users.length === 0) {
      dispatch(readUsers(lang));
    }
  }, []);

  return (
    <MainLayout allowedAccessRights={['UNRESTRICTED']}>
      <Paper sx={{ margin: 1 }}>
        {!isReading && !isSubmitting && (
          <Grid container columnSpacing={2} sx={{ padding: 1 }}>
            <Grid item>
              <Card>
                <ButtonBase onClick={() => navigate('/todos')}>
                  <CardContent>
                    <EditNote fontSize="large" />
                    <Typography variant="h5" component="div">
                      {t('todo')}
                    </Typography>
                  </CardContent>
                </ButtonBase>
              </Card>
            </Grid>
            <Grid item>
              <Card>
                <ButtonBase onClick={() => navigate('/users')}>
                  <CardContent>
                    <People fontSize="large" />
                    <Typography variant="h5" component="div">
                      {t('user')}
                    </Typography>
                  </CardContent>
                </ButtonBase>
              </Card>
            </Grid>
            <Authorization
              allowedAccessRights={['ADMIN']}
              WrappedElement={
                <Grid item>
                  <Card>
                    <ButtonBase onClick={() => navigate('/admin')}>
                      <CardContent>
                        <Settings fontSize="large" />
                        <Typography variant="h5" component="div">
                          {t('settings')}
                        </Typography>
                      </CardContent>
                    </ButtonBase>
                  </Card>
                </Grid>
              }
            />
          </Grid>
        )}
        {(isReading || isSubmitting) && <Working isReading={isReading} isSubmitting={isSubmitting} />}
      </Paper>
    </MainLayout>
  );
};
