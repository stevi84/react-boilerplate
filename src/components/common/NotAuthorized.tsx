import Typography from '@mui/material/Typography';
import { IconButton, Paper, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export const NotAuthorized = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Paper sx={{ margin: 1 }}>
      <Stack direction={'column'} alignItems={'center'} justifyContent={'center'}>
        <Typography variant="h1" color="primary">
          403
        </Typography>
        <Typography variant="h4" color="textSecondary">
          Not Authorized
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {t('403')}
        </Typography>
        <IconButton color="primary" onClick={() => navigate('/')}>
          <ArrowBack />
        </IconButton>
      </Stack>
    </Paper>
  );
};
