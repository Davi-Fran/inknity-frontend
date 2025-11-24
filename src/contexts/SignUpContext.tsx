import { createContext, useContext, useState, type ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router'

interface SignUpData {
    email?: string;
    password?: string;
    displayName?: string;
    username?: string;
    pronouns?: string;
    bio?: string;
    tags?: string[];
}

interface SignUpContextType {
    data: SignUpData,
    updateData: (newData: Partial<SignUpData>) => void,
    resetData: () => void
}

const SignUpContext = createContext<SignUpContextType>({} as SignUpContextType)

export const SignUpProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<SignUpData>({})

    const updateData = (newData: Partial<SignUpData>) => {
        setData(prev => ({ ...prev, ...newData }))
    }

    const resetData = () => setData({})

    return (
        <SignUpContext.Provider value={{ data, updateData, resetData }}>
            {children}
        </SignUpContext.Provider>
    )
}

export const useSignUpContext = () => useContext(SignUpContext)

export const RequireStep = ({ step }: { step: 'profile' | 'styles' }) => {
    const { data } = useSignUpContext()

    if (step === 'profile') {
        if (!data.email || !data.password) {
            return <Navigate to='/register' replace />
        }
    }

    if (step === 'styles') {
        if (!data.username) {
            return <Navigate to='/createProfile' replace />
        }
    }

    return <Outlet />
}