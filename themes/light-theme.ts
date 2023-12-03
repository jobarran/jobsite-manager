import { createTheme } from '@mui/material/styles';
import { palette } from '@mui/system';


export const lightTheme = createTheme({

  palette: {
    mode: 'light',
    primary: {
      main: '#2c4674',
    },
    secondary: {
      main: '#fa7266',
    },
    warning: {
      main: '#ffd264',
    },
    background: {
      default: '#f7f9fa',
    },
    error: {
      main: '#ee4238',
    },
    success: {
      main: '#61ba61',
    },
    info: {
      main: '#2c4674',
      light: '#ffffff',
    },
  },

  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    // MuiAppBar: {
    //   defaultProps: {
    //     position: 'fixed',
    //   },
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: '#2C4674',
    //       height: 45,
    //       boxShadow: '0px 1px 5px #d8d8d8'
    //     },
    //   }
    // },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 30,
          fontWeight: 600
        },
        h2: {
          fontSize: 20,
          fontWeight: 400
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 600
        }
      }
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'small',
        disableElevation: true,
        color: 'info',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: 10,
          ":hover": {
            backgroundColor: 'rgba(0,0,0,0.05)',
            transition: 'all 0.3s ease-in-out'
          }
        }
      }
    },
    MuiCard: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
          borderRadius: '10px',
        },
      }
    },    
  }
  
});