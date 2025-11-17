import { useEffect, useState } from 'react'

export const CommentsModal = ({ open, onClose, comments = [], onAddComment }) => {
    
    const [commentText, setCommentText] = useState("")

    // Fechar com ESC
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [onClose])

    if (!open) return null

    const handleSendComment = () => {
        if (!commentText.trim()) return
        onAddComment(commentText)
        setCommentText("")
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

                <div className="flex-1 overflow-auto pr-2 space-y-4">

                    {comments.length === 0 && (
                        <p className="text-sm text-inknity-white/60 text-center mt-4">
                            Ainda não há comentários.
                        </p>
                    )}

                    {comments.map((c, i) => (
                        <div key={i} className="flex gap-3">
                            <div className="size-10 rounded-full bg-cover bg-center bg-[url(/src/assets/img/userPhoto.png)]"></div>

                            <div>
                                <p className="font-bold text-sm">{c.user}</p>
                                <p className="text-sm text-inknity-white/80">{c.text}</p>
                            </div>
                        </div>
                    ))}

                </div>

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
