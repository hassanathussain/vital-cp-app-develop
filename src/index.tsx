import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider as StyledComponentsProvider } from 'styled-components'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from 'react-query'

import GlobalStyle from 'styles/globalStyle'
import theme, { MuiTheme } from 'styles/themes'
import './internationalization/i18n'
import { pdfjs } from 'react-pdf'

import App from './App'
const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString()

root.render(
  <React.StrictMode>
    <StyledComponentsProvider theme={theme}>
      <ThemeProvider theme={MuiTheme}>
        <GlobalStyle />{' '}
        <QueryClientProvider client={queryClient}>
          <Suspense fallback="loading">
            <App />
          </Suspense>
        </QueryClientProvider>
      </ThemeProvider>
    </StyledComponentsProvider>
  </React.StrictMode>,
)
