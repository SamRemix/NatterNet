import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import './styles/globals.scss'
import AuthProvider from './contexts/AuthContext'
import ToastsProvider from './contexts/ToastsContext'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <AuthProvider>
      <ToastsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToastsProvider>
    </AuthProvider>
  </StrictMode>
)
