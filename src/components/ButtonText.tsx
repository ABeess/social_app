import { Button, ButtonProps } from '@mui/material';

export default function ButtonText({ children, sx, ...other }: ButtonProps) {
  return (
    <Button
      sx={{
        bgcolor: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 300 : 600],
        ...sx,
      }}
      {...other}
    >
      {children}
    </Button>
  );
}
