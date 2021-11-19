import { PaletteOptions } from '@mui/material/styles';
import { IThemeOptions } from './theme-options';

const buildPalette = (theme: IThemeOptions): PaletteOptions => ({
  mode: theme.customization?.mode,
  background: {
    paper: theme.paper,
    default: theme.backgroundDefault,
  },
});

export default buildPalette;
