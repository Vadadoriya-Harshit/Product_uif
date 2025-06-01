import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { SnackbarProvider } from "notistack"; // For notifications

// Create an instance of QueryClient
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const theme = createTheme({
  palette: {
    mode: "light", 
    primary: { main: "#1976d2" }, 
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

root.render(
  <React.StrictMode>
     
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
       <CssBaseline >
         <SnackbarProvider maxSnack={3}> 
              <App />
         </SnackbarProvider>
        </CssBaseline>
      </ThemeProvider>
      </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
