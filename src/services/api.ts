import axios from 'axios'

const API_URL = 'http://localhost:3000';

export const api = axios.create({
    baseURL: API_URL
})

export const authService = {
    verifyEmail: async (email: string) => {
        try {
            const response = await api.post(`/auth/verify?email=${email}`)
            return response.data.success
        } catch (error) {
            return false
        }
    },
    verifyUsername: async (username: string) => {
        try {
            const response = await api.post(`/auth/verify?username=${username}`)
            return response.data.success
        } catch (error) {
            return false
        }
    },
    register: async (userData: any) => {
        return await api.post('/auth/register', userData)
    }
}

export const setAuthToken = (token: string | null) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete api.defaults.headers.common['Authorization']
    }
}