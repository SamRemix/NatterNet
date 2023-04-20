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

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <AuthProvider>
      <ToastsProvider>
        <App />
      </ToastsProvider>
    </AuthProvider>
  </StrictMode>
)
