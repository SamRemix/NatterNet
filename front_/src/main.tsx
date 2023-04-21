// dependencies
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// app
import App from './App'

// styles
import './styles/globals.scss'

// contexts providers
import AuthProvider from './contexts/AuthContext'
import ToastsProvider from './contexts/ToastsContext'
import { BrowserRouter } from 'react-router-dom'

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
