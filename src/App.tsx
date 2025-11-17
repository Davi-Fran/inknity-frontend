import { Router } from './routes/Router'
import { ErrorProvider } from './contexts/ErrorContext'

const App = () => {
  return (
    <ErrorProvider>
      <Router />
    </ErrorProvider>
  )
}

export default App
