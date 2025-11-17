import { createContext, useState, useEffect, useContext } from 'react'
import { type User } from '../types/User'
import { api, setAuthToken } from '../services/api'

interface AuthContextData {
    user: User | null,
    token: string | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    login: (email: string, password: string) => Promise<void>,
    logout: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface props {
    children: React.ReactNode
}

export const AuthProvider: React.FC<props> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadStoredAuth = () => {
            const storedToken = localStorage.getItem('@inknity:token')
            const storedUser = localStorage.getItem('@inknity:user')

            if (storedToken && storedUser) {
                const parsedUser = JSON.parse(storedUser)

                setToken(storedToken)
                setUser(parsedUser)
                setAuthToken(storedToken)
            }
            setIsLoading(false)
        }

        loadStoredAuth()
    }, [])

    const login = async (email: string, password: string) => {
        try {
            const responseOne = await api.post('/auth/login', { email, password })
            const { token, user } = responseOne.data;

            localStorage.setItem('@inknity:token', token)
            localStorage.setItem('@inknity:user', JSON.stringify(user))

            setAuthToken(token)
            setToken(token)
            setUser(user)
        } catch (error) {
            console.error(error)
            throw new Error('Email ou senha inválidos!')
        }
    }

    const logout = () => {
        localStorage.removeItem('@inknity:token')
        localStorage.removeItem('@inknity:user')

        setAuthToken(null)
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isAuthenticated: !!user,
            isLoading,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextData => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um provider')
    }

    return context
}