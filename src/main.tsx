import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { NutripointApp } from './NutripointApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NutripointApp />
  </StrictMode>,
)
