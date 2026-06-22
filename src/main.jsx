import { createRoot } from 'react-dom/client'
import { AuthProvider } from './AuthContext'
import { I18nProvider } from './i18n'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <I18nProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </I18nProvider>
)
