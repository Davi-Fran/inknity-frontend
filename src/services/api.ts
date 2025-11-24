import axios from 'axios'
import type { Post } from '../types/Post';

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

export const postService = {
    getPosts: async (type: 'feed' | 'following' = 'feed') => {
        const response = await api.get<{ posts: Post[] }>(`/posts/?type=${type}`)
        return response.data.posts
    },

    create: async (formData: FormData) => {
        return await api.post('/posts', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },

    delete: async (postId: string) => {
        return await api.delete(`/posts/${postId}`)
    },

    toggleLike: async (postId: string) => {
        return await api.post(`/posts/${postId}/like`)
    },

    toggleSave: async (postId: string) => {
        return await api.post(`/users/me/save/${postId}`)
    },

    getComments: async (postId: string) => {
        const response = await api.get(`/posts/${postId}/comments`)
        return response.data.comments
    },

    addComment: async (postId: string, text: string) => {
        return await api.post(`/posts/${postId}/comment`, { text })
    },
}