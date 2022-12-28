import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './sass/main.scss';
import { ContextProvider } from './Context';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <Router>
      <App />
    </Router>
  </ContextProvider>
);
