import React from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
// import reportWebVitals from './reportWebVitals';

const container = document.getElementById("root")
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
)

// Webサイト改善のレポート機能
// reportWebVitals(console.log);