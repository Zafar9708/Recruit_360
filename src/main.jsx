import { StrictMode } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="797710478568-1kdbsrh3k3ihk0nl0e92riivm7t2muv0.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>

)
