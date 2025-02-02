import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create an instance of QueryClient
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
         <App />
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
