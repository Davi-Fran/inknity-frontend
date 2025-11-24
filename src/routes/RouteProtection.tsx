import { Navigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

interface Props { children: React.ReactNode }
export const RouteProtection = ({ children }: Props) => {
    const { isAuthenticated } = useAuth()

    if (isAuthenticated) {
        return children
    } else {
        return <Navigate to='/login' replace />
    }
}