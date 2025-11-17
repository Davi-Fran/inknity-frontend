import { Timestamp } from 'firebase/firestore'

export interface User {
    id?: string,
    username: string,
    displayName: string,
    email: string,
    hashedPassword: string,
    bannerUrl: string,
    avatarUrl: string,
    bio: string,
    followersCount: number,
    followingCount: number,
    memberSince: Timestamp,
    pronouns: string,
    tags: string[],
    stripeAccountId?: string
}