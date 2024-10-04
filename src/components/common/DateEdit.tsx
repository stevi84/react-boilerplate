import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { formatISO, isValid, parseISO } from 'date-fns';

interface DateEditProps {
  id: string;
  name: string;
  label: string;
}

export const DateEdit = (props: DateEditProps) => {
  const { id, name, label } = props;

  const [field, meta, helper] = useField(name);
  const { t } = useTranslation();
  const dateFormat = t('dateFormat');

  // konvertiert zwischen ISO8601-String (für Store) und Date (für Picker)
  const formatStore = (date: Date | null): string => (isValid(date) ? formatISO(date as Date) : '');
  const parseStore = (str: string): Date | null => {
    const date: Date = parseISO(str);
    return isValid(date) ? date : null;
  };
  const onChange = (newValue: Date | null) => helper.setValue(formatStore(newValue));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        value={parseStore(field.value)}
        format={dateFormat}
        onChange={onChange}
        label={label}
        slotProps={{
          textField: {
            id,
            variant: 'outlined',
            error: !!meta.error,
            helperText: meta.error,
          },
        }}
        sx={{ margin: 1 }}
      />
    </LocalizationProvider>
  );
};
