import { Router } from './routes/Router'
import { ErrorProvider } from './contexts/ErrorContext'
import { AuthProvider } from './contexts/AuthContext'
import { SignUpProvider } from './contexts/SignUpContext'

const App = () => {
  return (
    <ErrorProvider>
      <AuthProvider>
        <SignUpProvider>
          <Router />
        </SignUpProvider>
      </AuthProvider>
    </ErrorProvider>
  )
}

export default App
