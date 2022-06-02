import React from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
import { store } from './redux/store'
// import reportWebVitals from './reportWebVitals';

const container = document.getElementById("root")
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </React.StrictMode>
)

// Webサイト改善のレポート機能
// reportWebVitals(console.log);
