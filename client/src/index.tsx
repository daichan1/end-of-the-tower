import React from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App'
import Error404 from './error/404'
import { store } from './redux/store'
// import reportWebVitals from './reportWebVitals';

const container = document.getElementById("root")
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="*" element={<Error404 />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

// Webサイト改善のレポート機能
// reportWebVitals(console.log);
