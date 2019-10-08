import { colors } from '@material-ui/core';
import {
  PaletteOptions as MuiPaletteOptions,
  TypeText as MuiTypeText,
  PaletteColorOptions,
  TypeBackground
} from '@material-ui/core/styles/createPalette';

export interface TypeText extends MuiTypeText {
  primary: string;
  secondary: string;
  disabled: string;
  hint: string;
  link: string;
}

interface PaletteOptions extends MuiPaletteOptions {
  text: Partial<TypeText>;
  success?: PaletteColorOptions;
  info?: PaletteColorOptions;
  warning?: PaletteColorOptions;
  background: Partial<TypeBackground>;
  icon?: string;
  white: string;
  black: string;
}

const white = '#FFFFFF';
const black = '#000000';
const palletOptions: PaletteOptions = {
  white,
  black,
  primary: {
    contrastText: white,
    dark: colors.indigo[900],
    main: colors.indigo[500],
    light: colors.indigo[100]
  },
  secondary: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue['A400'],
    light: colors.blue['A400']
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400]
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600]
  },
  background: {
    default: "#fafafa",
    paper: white
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200]
};

export default palletOptions;
