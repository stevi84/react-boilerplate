import Typography from '@mui/material/Typography';
import { MainLayout } from '../common/MainLayout';
import { Paper, Stack } from '@mui/material';

export const AdminDialog = () => {
  return (
    <MainLayout allowedAccessRights={['ADMIN']}>
      <Paper sx={{ margin: 1 }}>
        <Stack direction={'column'} alignItems={'center'} justifyContent={'center'}>
          <Typography variant="h4" color="primary">
            This is some very secret dialog with admin functions.
          </Typography>
        </Stack>
      </Paper>
    </MainLayout>
  );
};
