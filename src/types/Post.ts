import type { Timestamp } from "firebase/firestore";

export interface Post {
    id?: string,
    authorId?: string,
    caption: string,
    imageUrl?: string | undefined,
    imagePublicId?: string,
    commentCount: number,
    likeCount: number,
    savedCount: number,
    createdAt?: Timestamp,
    tags: string[],
    isLiked?: boolean,
    isSaved?: boolean,
    author?: {
        displayName: string,
        username: string,
        avatarUrl: string,
    }
}