import { createTheme } from '@mui/material/styles'

const theme = {
  typography: {
    allVariants: {
      fontFamily: 'Inter',
    },
  },
  colors: {
    brandPrimary: '#28BFB2',
    red: '#ff897d',
    white: '#fff',
    lightGreen: '#e5faf8',
    background: '#f5f5f5',
  },
}

export const MuiTheme = createTheme({
  palette: {
    primary: {
      main: '#28BFB2', //this overide blue color
    },
    error: {
      main: '#ff897d',
    },
  },
  typography: {
    allVariants: {
      fontFamily: 'Inter',
    },
  },

  components: {
    MuiInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#e9eaea',
          outline: 'none',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#e6e7e7',
            borderRadius: '5px',
          },
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          '& .MuiGrid-grid-md-3': {
            marginBottom: '20px',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '10px 16px',
        },
      },
    },
  },
})

export default theme
