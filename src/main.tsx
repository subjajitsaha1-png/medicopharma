import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Modern feature: offline-capable PWA via a minimal service worker.
// Lets the app (and everything already reviewed) keep working without a
// connection, which matters for students studying with patchy hospital wifi.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Non-fatal: app still works fully online without the service worker.
    })
  })
}
