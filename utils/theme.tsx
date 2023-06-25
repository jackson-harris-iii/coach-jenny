import { Raleway } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const raleway = Raleway({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#6050DC',
    },
    secondary: {
      main: '#9B9B9B',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: raleway.style.fontFamily,
  },
});
export default theme;
