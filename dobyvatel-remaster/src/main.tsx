import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, } from "react-router-dom";

const baseUrl = "/"; // kořen routování
//const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href'); // lze ho nastavit v HTML přes atribut href značky base
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <BrowserRouter basename={baseUrl}>
    <App />
  </BrowserRouter>
);

//serviceWorkerRegistration.unregister();
//reportWebVitals();