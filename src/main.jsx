import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Support GitHub Pages SPA redirect fallback
const redirect = sessionStorage.getItem('redirect');
if (redirect) {
  sessionStorage.removeItem('redirect');
  const url = new URL(redirect, window.location.origin);
  window.history.replaceState(null, '', url);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);