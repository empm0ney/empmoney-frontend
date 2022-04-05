//Your theme for the new stuff using material UI has been copied here so it doesn't conflict
import {createTheme} from '@material-ui/core/styles';

const newTheme = createTheme({
  palette: {
    type: 'light',
    text: {
      primary: '#dddfee',
      secondary: 'white',
      yellow: '#1d48b6',
    },
    background: {
      default: '#08090d',
      paper: 'rgb(8, 9, 13, 0.9)',
    },
    primary: {
      light: '#51a1ed',
      main: '#1d48b6',
      dark: '#10308a',
      contrastText: '#000',
    },
    secondary: {
      light: '#51a1ed',
      main: '#1d48b6',
      dark: '#10308a',
      contrastText: '#000',
    },
    action: {
      disabledBackground: '#CDCDCD',
      active: '#000',
      hover: '#2c3454',
    },
  },
  typography: {
    color: '#2c2560',
    fontFamily: ['"Poppins"', 'sans-serif'].join(','),
  },
});

export default newTheme;
