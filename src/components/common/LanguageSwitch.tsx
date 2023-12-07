import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const LanguageSwitch = () => {
  const { t, i18n } = useTranslation();

  const onChange = (event: SelectChangeEvent) => i18n.changeLanguage(event.target.value);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>{t('language')}</InputLabel>
        <Select value={i18n.language} label={t('language')} onChange={onChange}>
          <MenuItem value={'de'}>{t('de')}</MenuItem>
          <MenuItem value={'en'}>{t('en')}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
