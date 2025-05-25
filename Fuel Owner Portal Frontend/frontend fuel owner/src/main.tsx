import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// ✅ Opt-in to React Router v7 features early to silence warnings
;(window as any).ReactRouter = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
