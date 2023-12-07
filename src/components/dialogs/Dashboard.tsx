import { ButtonBase, Card, CardContent, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import People from '@mui/icons-material/People';
import EditNote from '@mui/icons-material/EditNote';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../reducers/Store';
import { readTodos, todosSelector } from '../../reducers/TodosReducer';
import { isReadingSelector, isSubmittingSelector } from '../../reducers/ApiCallsReducer';
import { Todo } from '../../models/Todo';
import { Working } from '../common/Working';
import { MainLayout } from '../common/MainLayout';
import { User } from '../../models/User';
import { readUsers, usersSelector } from '../../reducers/UsersReducer';
import { useTranslation } from 'react-i18next';
import { Locale } from '../../globals/Translations';

export const Dashboard = () => {
  const todos: Todo[] = useAppSelector(todosSelector);
  const users: User[] = useAppSelector(usersSelector);
  const isReading: boolean = useAppSelector(isReadingSelector);
  const isSubmitting: boolean = useAppSelector(isSubmittingSelector);
  const { i18n } = useTranslation();
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
    <MainLayout>
      <Paper sx={{ margin: 1 }}>
        {!isReading && !isSubmitting && (
          <Grid container columnSpacing={2} sx={{ padding: 1 }}>
            <Grid item>
              <Card>
                <ButtonBase onClick={(e) => navigate('/todos')}>
                  <CardContent>
                    <EditNote fontSize="large" />
                    <Typography variant="h5" component="div">
                      Todos
                    </Typography>
                  </CardContent>
                </ButtonBase>
              </Card>
            </Grid>
            <Grid item>
              <Card>
                <ButtonBase onClick={(e) => navigate('/users')}>
                  <CardContent>
                    <People fontSize="large" />
                    <Typography variant="h5" component="div">
                      Users
                    </Typography>
                  </CardContent>
                </ButtonBase>
              </Card>
            </Grid>
          </Grid>
        )}
        {(isReading || isSubmitting) && <Working isReading={isReading} isSubmitting={isSubmitting} />}
      </Paper>
    </MainLayout>
  );
};
