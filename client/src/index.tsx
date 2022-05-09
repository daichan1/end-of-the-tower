import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import GameTitle from './components/gameTitle';
// import reportWebVitals from './reportWebVitals';

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <GameTitle />
  </React.StrictMode>
)

// Webサイト改善のレポート機能
// reportWebVitals(console.log);
