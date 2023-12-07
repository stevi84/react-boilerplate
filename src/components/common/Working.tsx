import { CircularProgress, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface WorkingProps {
  isReading: boolean;
  isSubmitting: boolean;
}

export const Working = (props: WorkingProps) => {
  const { isReading, isSubmitting } = props;

  const { t } = useTranslation();

  return (
    <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} style={{ height: '100%' }}>
      <CircularProgress id="loading-spinner" />
      {isSubmitting ? t('submitting') : isReading ? t('reading') : null}
    </Stack>
  );
};
