import { Box } from '@mui/material';
import { BoxProps } from '@mui/system';

export const Test = ({ ...other }: BoxProps) => (
  <Box {...other}>
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="100%" height="100%">
      <image
        width="100%"
        height="100%"
      />
    </svg>
  </Box>
);