import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {AppProvider} from "./AppContext.tsx";
import {ThemeProvider} from "@mui/material/styles";
import theme from "./theme.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
      <AppProvider>
    <App />
      </AppProvider></ThemeProvider>
  </React.StrictMode>,
)
