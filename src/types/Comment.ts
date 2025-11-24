import type { Timestamp } from "firebase/firestore";

export interface Comment {
    userId: string,
    username: string,
    avatarUrl: string
    text: string,
    createdAt: Timestamp
}