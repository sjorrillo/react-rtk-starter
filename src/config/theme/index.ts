import { createTheme, Theme } from '@mui/material/styles';
import buildOverrides from './overrides';
import buildPalette from './palette';
import buildTypography from './typography';
import buildThemeOptions, { IThemeCustomization } from './theme-options';
export type { IThemeCustomization } from './theme-options';

const buildTheme = (customization?: IThemeCustomization): Theme => {
  const themeOptions = buildThemeOptions(customization);

  const theme = createTheme({
    palette: buildPalette(themeOptions),
    typography: buildTypography(themeOptions),
    components: buildOverrides(themeOptions),
  });

  return theme;
};

export default buildTheme;
