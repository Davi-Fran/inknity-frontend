import { useAuthentication } from '../contexts/AuthContext'
import { Navigate } from 'react-router'

type Props = { children: React.ReactNode }
export const RouteProtection = ({ children }: Props) => {
    const { loggedUser } = useAuthentication()

    if (!loggedUser) {
        return <Navigate to='/login' replace />
    }

    return children;
}