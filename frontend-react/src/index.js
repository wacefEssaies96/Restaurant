import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <link rel="apple-touch-icon" sizes="180x180" href="assets/img/favicons/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicons/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="assets/img/favicons/favicon-16x16.png"/>
        <link rel="shortcut icon" type="image/x-icon" href="assets/img/favicons/favicon.ico"/>
        <link rel="manifest" href="assets/img/favicons/manifest.json"/>
        <meta name="msapplication-TileImage" content="assets/img/favicons/mstile-150x150.png"/>
        <meta name="theme-color" content="#ffffff"/>
        <link href="assets/css/theme.css" rel="stylesheet" />
      <App />
      <script src="vendors/@popperjs/popper.min.js"></script>
      <script src="vendors/bootstrap/bootstrap.min.js"></script>
      <script src="vendors/is/is.min.js"></script>
      <script src="https://polyfill.io/v3/polyfill.min.js?features=window.scroll"></script>
      <script src="vendors/fontawesome/all.min.js"></script>
      <script src="assets/js/theme.js"></script>
      <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600;700;900&amp;display=swap" rel="stylesheet"/>
    </BrowserRouter>
  </React.StrictMode>
);