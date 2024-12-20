import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { AuthContextProvider } from './context/Authcontext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
<AuthContextProvider>
  <BrowserRouter>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </BrowserRouter>  
</AuthContextProvider>
);

