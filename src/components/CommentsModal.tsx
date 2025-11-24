import { useEffect, useState } from 'react'
import { postService } from '../services/api'
import { type Comment as Comm } from '../types/Comment'
import { useError } from '../contexts/ErrorContext'
import { Timestamp } from 'firebase/firestore'

interface CommentModalProps {
    open: boolean,
    onClose: () => void,
    postId: string | null
}

export const CommentsModal = ({ open, onClose, postId }: CommentModalProps) => {
    const [comments, setComments] = useState<Comm[]>([])
    const [commentText, setCommentText] = useState('')
    const [loading, setLoading] = useState(true)
    const { triggerError } = useError()

    useEffect(() => {
        if (open && postId) {
            fetchComments()
        } else {
            setComments([])
        }
    }, [open, postId])

    const fetchComments = async () => {
        if (!postId) return
        setLoading(true)

        try {
            const data = await postService.getComments(postId)
            setComments(data)
        } catch (error) {
            console.error('Erro ao carregar os comentários: ', error)
            triggerError('Erro ao carregar os posts!')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [onClose])

    if (!open) return null
    
    const handleSendComment = async () => {
        if (!commentText.trim() || !postId) return

        try {
            await postService.addComment(postId, commentText)

            const newCommentMock: Comm = {
                userId: 'me',
                username: 'Você',
                text: commentText,
                avatarUrl: 'https://res.cloudinary.com/dvgg5opdp/image/upload/v1762456809/inknity-storage/avatars/MYjJ0pcJuzUUgleLpvvN.png',
                createdAt: Timestamp.now()
            }
            setComments([ ...comments, newCommentMock ])
            setCommentText('')
        } catch (error) {
            console.error('Erro ao enviar comentário', error)
            triggerError('Erro ao enviar comentário!')
        }
    }

    return (
        <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-end md:items-center transition-all duration-300"
            onClick={onClose}
        >

            <div 
                className="w-full md:w-2/5 h-3/5 md:h-3/4 bg-inknity-background rounded-t-2xl md:rounded-xl p-4 flex flex-col shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                
                <div className="flex justify-between items-center mb-3">
                    <p className="text-lg font-bold">Comentários</p>

                    <button 
                        onClick={onClose}
                        className="text-inknity-white/70 hover:text-inknity-purple transition"
                    >
                        ✕
                    </button>
                </div>

                {/* Lista de comentários */}
                <div className="flex-1 overflow-auto pr-2 space-y-4">
                    {
                        loading && <p className='text-center text-sm opacity-50'>Carregando...</p>
                    }

                    {
                        !loading && comments.length === 0 && (
                            <p className='text-sm text-inknity-white/60 text-center mt-4'>Ainda não há comentários</p>
                        )
                    }

                    {
                        comments.map((c, i) => (
                            <div key={i} className='flex gap-3'>
                                <div
                                    className='size-10 flex-shrink-0 bg-center bg-cover rounded-full border border-inknity-white/10'
                                    style={{ backgroundImage: `url('${c.avatarUrl || ''}')` }}
                                ></div>
                                <div>
                                    <p className='font-bold text-sm'>{c.username}</p>
                                    <p className='text-sm text-inknity-white/80'>{c.text}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {/* Input */}
                <div className="mt-4 flex gap-2">
                    <input 
                        type="text"
                        placeholder="Escreva um comentário..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendComment()}
                        className="flex-1 bg-inknity-background-2 rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-inknity-purple/50 transition"
                    />

                    <button
                        onClick={handleSendComment} 
                        className="bg-inknity-purple px-4 rounded-md font-bold hover:bg-inknity-purple/80 transition"
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    )
}
