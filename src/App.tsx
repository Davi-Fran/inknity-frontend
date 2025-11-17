import { Router } from './routes/Router'
import { ErrorProvider } from './contexts/ErrorContext'
import { AuthProvider } from './contexts/AuthContext'

const App = () => {
  return (
    <ErrorProvider>
      <AuthProvider>
      <Router />
    </ErrorProvider>
    </AuthProvider>
  )
}

export default App
