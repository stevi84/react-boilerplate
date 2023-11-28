import { Checkbox, FormControlLabel } from '@mui/material';
import { useField } from 'formik';

interface BooleanEditProps {
  id: string;
  name: string;
  label: string;
}

export const BooleanEdit = (props: BooleanEditProps) => {
  const { id, name, label } = props;

  const [field] = useField({ name, type: 'checkbox' });

  return (
    <FormControlLabel
      control={<Checkbox id={id} checked={field.checked} onChange={field.onChange} sx={{ margin: 1 }} />}
      label={label}
    />
  );
};
