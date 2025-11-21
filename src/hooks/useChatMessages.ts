import { useEffect, useState } from 'react'
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore'
import { db } from '../services/firebase'

export interface Message {
    id: string,
    text: string,
    senderId: string,
    createdAt: Timestamp
}

export const useChatMessages = (chatId: string | undefined) => {
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!chatId) {
            console.warn(`useChatMessages: chatId é undefined ou vazio`)
            setLoading(false)
            return
        }

        console.log(`Iniciando listener para: /chats/${chatId}/messages`)

        try {
            const messageRef = collection(db, 'chats', chatId, 'messages')
            const q = query(messageRef, orderBy('createdAt', 'asc'))

            const unsubscribe = onSnapshot(q, (snapshot) => {
                console.log(`Snapshot recebido! Documentos encontrados: ${snapshot.size}`)

                if (snapshot.empty) {
                    console.log('A coleção está vazia (ou não existe nesse caminho)')
                }

                const msgs = snapshot.docs.map(doc => {
                    const data = doc.data()

                    return {
                        id: doc.id,
                        ...data
                    }
                }) as Message[]
    
                setMessages(msgs)
                setLoading(false)
            }, (error) => {
                console.error(`Erro no onSnapshot: ${error}`)
                setLoading(false)
            })

            return () => unsubscribe()
        } catch (error) {
            console.error(`Erro ao configurar query: ${error}`)
            setLoading(false)
        }
    }, [chatId])

    return { messages, loading }
}