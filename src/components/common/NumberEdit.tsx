import { TextField } from '@mui/material';
import { useState } from 'react';
import { useField } from 'formik';
import { formatNumber, parseNumber } from '../../globals/Formatters';
import { Locale } from '../../globals/Translations';
import { useTranslation } from 'react-i18next';

interface NumberEditProps {
  id: string;
  name: string;
  label: string;
}

export const NumberEdit = (props: NumberEditProps) => {
  const { id, name, label } = props;

  const [field, meta, helper] = useField(name);
  const { i18n } = useTranslation();
  const lang: Locale = i18n.language as Locale;
  const [stateValue, setStateValue] = useState<string>(formatNumber(field.value, lang));

  // konvertiert zwischen number (für Store) und string (für Komponente)
  const format = (value: number): string =>
    typeof value === 'string' ? value : isNaN(value) ? stateValue : formatNumber(value, lang);
  const parse = (value: string): number => parseNumber(value, lang);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStateValue(event.target.value);
    helper.setValue(parse(event.target.value));
  };

  return (
    <TextField
      id={id}
      value={format(field.value)}
      onChange={onChange}
      label={label}
      error={!!meta.error}
      helperText={meta.error}
      sx={{ margin: 1 }}
    />
  );
};
