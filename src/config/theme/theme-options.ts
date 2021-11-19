import { PaletteMode } from '@mui/material';
import color from './_themes-vars.module.scss';

type Color = React.CSSProperties['color'];

// should be all the colors defined in ./_themes-vars.module.scss
interface IColorPalette {
  primaryLight: Color;
  // add more colors
}

export interface IThemeCustomization {
  mode: PaletteMode;
}

export interface IThemeOptions {
  customization?: IThemeCustomization;
  colors?: IColorPalette;
  divider?: Color;
  paper?: Color;
  background?: Color;
  backgroundDefault?: Color;
}

const buildThemeOptions = (customization?: IThemeCustomization): IThemeOptions => {
  return {
    customization,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    divider: color.grey200,
  };
};

export default buildThemeOptions;
