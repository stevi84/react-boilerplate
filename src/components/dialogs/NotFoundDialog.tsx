import Typography from '@mui/material/Typography';
import { MainLayout } from '../common/MainLayout';
import { Paper, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const NotFoundDialog = () => {
  const { t } = useTranslation();

  return (
    <MainLayout allowedAccessRights={['UNRESTRICTED']}>
      <Paper sx={{ margin: 1 }}>
        <Stack direction={'column'} alignItems={'center'} justifyContent={'center'}>
          <Typography variant="h1" color="primary">
            404
          </Typography>
          <Typography variant="h4" color="textSecondary">
            Not Found
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {t('404')}
          </Typography>
        </Stack>
      </Paper>
    </MainLayout>
  );
};
