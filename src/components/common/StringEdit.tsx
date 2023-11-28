import { TextField } from '@mui/material';
import { useField } from 'formik';

interface StringEditProps {
  id: string;
  name: string;
  label: string;
}

export const StringEdit = (props: StringEditProps) => {
  const { id, name, label } = props;

  const [field, meta] = useField(name);

  return (
    <TextField
      id={id}
      value={field.value}
      onChange={field.onChange}
      label={label}
      error={!!meta.error}
      helperText={meta.error}
      sx={{ margin: 1 }}
    />
  );
};
