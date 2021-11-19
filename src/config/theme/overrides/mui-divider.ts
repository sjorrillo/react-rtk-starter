import { Components } from '@mui/material/styles';
import { IThemeOptions } from '../theme-options';

const muiDivider = (theme: IThemeOptions): Components['MuiDivider'] => ({
  styleOverrides: {
    root: {
      borderColor: theme.divider,
      opacity: 1,
    },
  },
});

export default muiDivider;
