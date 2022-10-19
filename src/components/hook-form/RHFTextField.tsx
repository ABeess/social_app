import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface IRHFTextField {
  name: string;
}

export default function RHFTextField({ name, ...other }: IRHFTextField & TextFieldProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field} fullWidth helperText={error && error.message} error={!!error} {...other} />
      )}
    />
  );
}
