export type SignUpData = {
    email: string,
    password: string,

    displayName: string,
    username: string,
    pronouns: string,
    bio: string,
    avatarUrl: string,

    tags: string[]
}

export type SignUpContextType = {
    data: SignUpData,
    updateSignUpData: (data: Partial<SignUpData>) => void,
    verifyEmail: (email: string) => Promise<boolean>
    verifyUsername: (username: string) => Promise<boolean>,
    submitRegistration: () => Promise<void>,
    isLoading: boolean
}