import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { register as registerServiceWorker } from './serviceWorkerRegistration';

/**
 * PUBLIC_INTERFACE
 * React application entrypoint. Mounts the Tic Tac Toe App into #root.
 */
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// We keep this a no-op in development; it does nothing, but having the call
// can reduce CRA warnings around service worker hooks.
if (process.env.NODE_ENV === 'production') {
  // No-op in our setup; included for compatibility.
  registerServiceWorker();
}
