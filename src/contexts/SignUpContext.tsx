import { createContext, useState, useContext, useCallback, useMemo } from 'react'
import { api } from '../services/api'
import { type SignUpData, type SignUpContextType } from '../types/SignUpTypes'

const initialData: SignUpData = {
    avatarUrl: '',
    bio: '',
    displayName: '',
    username: '',
    email: '',
    password: '',
    pronouns: '',
    tags: []
}

const SignUpContext = createContext<SignUpContextType | undefined>(undefined)

export const useSignUp = () => {
    const context = useContext(SignUpContext)

    if (context === undefined) {
        throw new Error('useSignUp deve ser usado dentro de um provider')
    }

    return context
}

export const SignUpProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<SignUpData>(initialData)
    const [isLoading, setIsLoading] = useState(false)

    const updateSignUpData = useCallback((newData: Partial<SignUpData>) => {
        setData(prevData => ({ ...prevData, ...newData }))
    }, [])

    const verifyEmail = useCallback(async (email: string): Promise<boolean> => {
        setIsLoading(true)
        try {
            const response = await api.post(`/auth/verify?email=${email}`)
            return response.data.success
        } catch (error) {
            console.error('Erro ao verificar email: ', error)
            return false
        } finally {
            setIsLoading(false)
        }
    }, [])

    const verifyUsername = useCallback(async (username: string): Promise<boolean> => {
        setIsLoading(true)
        try {
            const response = await api.post(`/auth/verify?username=${username}`)
            return response.data.success
        } catch (error) {
            console.error('Erro ao verificar username: ', error)
            return false
        } finally {
            setIsLoading(false)
        }
    }, [])

    const submitRegistration = useCallback(async () => {
        setIsLoading(true)
        try {
            const response = await api.post(`/auth/register`, data)

            if (response.status === 201) {
                console.log('Registro realizado com sucesso!')
            } else {
                throw new Error('Falha no registro geral')
            }
        } catch (error) {
            console.error('Erro ao submeter o registro: ', error);
            throw new Error('Erro ao submiter o registro')
        } finally {
            setIsLoading(false)
        }
    }, [data])

    const contextValue = useMemo(() => ({
        data,
        updateSignUpData,
        verifyEmail,
        verifyUsername,
        submitRegistration,
        isLoading
    }), [data, updateSignUpData, verifyEmail, verifyUsername, submitRegistration, isLoading])

    return (
        <SignUpContext.Provider value={contextValue}>
            {children}
        </SignUpContext.Provider>
    )
}