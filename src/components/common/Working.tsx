import { CircularProgress, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface WorkingProps {
  isReading?: boolean;
  isSubmitting?: boolean;
}

export const Working = (props: WorkingProps) => {
  const { isReading = false, isSubmitting = false } = props;

  const { t } = useTranslation();

  let statusText: string | null = null;
  if (isSubmitting) statusText = t('submitting');
  else if (isReading) statusText = t('reading');

  return (
    <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} style={{ height: '100%' }}>
      <CircularProgress data-testid="loading-spinner" />
      {statusText}
    </Stack>
  );
};
