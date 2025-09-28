import { createContext, useState, useEffect, useContext } from 'react'
import { authentication } from '../firebase/FirebaseConnection'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { type User } from '../types/User'

type AuthContextType = {
    loggedUser: User | null;
    loading: boolean;
    createUserAuth: (email: string, password: string) => Promise<boolean>;
    authUser: (email: string, password: string) => Promise<boolean>;
    loggout: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType>({
    loggedUser: null,
    loading: true,
    createUserAuth: async () => false,
    authUser: async () => false,
    loggout: async () => false,
})

type Props = { children: React.ReactNode }
export const AuthProvider = ({ children }: Props) => {
    const [loggedUser, setLoggedUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authentication, async (firebaseUser) => {
            if (firebaseUser) {
                setLoggedUser({ uid: firebaseUser.uid, email: firebaseUser.email })
                setLoading(false)
            }
        })

        return () => unsubscribe()
    }, [])

    const createUserAuth = async (email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(authentication, email, password)
            return true
        } catch (e) {
            console.error(`Erro na criação do usuário! (${e})`)
            return false
        }
    }

    const authUser = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(authentication, email, password)
            return true
        } catch (e) {
            console.error(`Erro na autenticação do usuário! (${e})`)
            return false
        }
    }

    const loggout = async () => {
        try {
            await signOut(authentication)
            return true
        } catch (e) {
            console.error(`Erro ao deslogar o usuário! (${e})`)
            return false
        }
    }

    return (
        <AuthContext.Provider value={{ loggedUser, loading, createUserAuth, authUser, loggout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthentication = (): AuthContextType => useContext(AuthContext)