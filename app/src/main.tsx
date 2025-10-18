import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './appv1'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
