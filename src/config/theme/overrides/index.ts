import { Components } from '@mui/material/styles';
import { IThemeOptions } from '../theme-options';
import muiButton from './mui-button';
import muiDivider from './mui-divider';

const buildOverrides = (theme: IThemeOptions): Components => ({
  MuiButton: muiButton(theme),
  MuiDivider: muiDivider(theme),
});

export default buildOverrides;
