import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { Bookmark, BookmarkCheck, Trash2 } from "lucide-react"
import { api } from '../services/api'
import type { Post as TypePost } from '../types/Post'
import { useError } from '../contexts/ErrorContext'

interface PostProps {
    data: TypePost,
    onLike: () => void,
    onSave: () => void,
    onDelete?: () => void,
    onOpenComments: () => void,
    isOwner: boolean
}

export const Post = ({ data, onLike, onSave, onDelete, onOpenComments, isOwner }: PostProps) => {
    const [profile, setProfile] = useState<any>(null)
    const [isLoadingProfile, setIsLoadingProfile] = useState(true)
    const { triggerError } = useError()

    const { username } = useParams()

    useEffect(() => {
        let isMounted = true

        const fetchAuthorProfile = async () => {
            if (!data.authorId) return

            try {
                const response = await api.get(`/users?id=${data.authorId}`)

                if (isMounted) {
                    setProfile(response.data)
                }
            } catch (error) {
                console.error('Não foi possível carregar os dados do autor do post: ', error);
                triggerError('Não foi possível carregar os dados do autor do post!')
            } finally {
                if (isMounted) setIsLoadingProfile(false)
            }
        }

        fetchAuthorProfile()

        return () => { isMounted = false }
    }, [data.authorId])

    if (isLoadingProfile && !profile) {
        return (
            <article className='w-full p-5 bg-inknity-dark-purple border-t border-t-inknity-white/20 md:mb-2 md:rounded animate-pulse'>
                <div className='flex items-center gap-3'>
                    <div className='size-12 rounded-full bg-inknity-white/30'></div>
                    <div className='flex flex-col gap-1'>
                        <div className='w-32 h-4 bg-inknity-white/30 rounded'></div>
                        <div className='w-20 h-3 bg-inknity-white/20 rounded'></div>
                    </div>
                </div>
                <div className='mt-3 h-64 w-full bg-inknity-white/10 rounded'></div>
            </article>
        )
    }

    return (
        <article className='w-full h-fit bg-inknity-dark-purple border-t border-t-inknity-white/20 md:mb-2 md:h-155 md:rounded pb-150'>
            
            {/* Dados do autor */}
            <section className='flex items-center justify-between w-full p-5'>
                <div className='flex items-center gap-3'>
                    <div
                        className='size-12 bg-center bg-cover rounded-full border border-inknity-white/10'
                        style={{ backgroundImage: `url('${profile.user?.avatarUrl || ''}')` }}
                    ></div>

                    <div>
                        <Link 
                            to={`/user/${username}/profile/posts`}
                            className='leading-tight text-lg font-bold hover:text-inknity-purple hover:cursor-pointer'
                        >
                            {profile.user.displayName || 'Usuário'}
                        </Link>
                        <p className='leading-tight text-sm text-inknity-white/50 m-0'>
                            @{profile.user.username || 'user'}
                        </p>
                    </div>
                </div>

                {/* Botão de deletar */}
                {
                    isOwner && onDelete && (
                        <button
                            onClick={onDelete}
                            className='text-inknity-white/40 cursor-pointer hover:text-red-500 transition-colors p-2'
                            title='Deletar post'
                        >
                            <Trash2 size={20} />
                        </button>
                    )
                }
            </section>

            {/* Imagem */}
            <section className='flex items-center justify-center w-full bg-black/20 min-h-[300px]'>
                <img 
                    src={data.imageUrl} 
                    alt='Imagem do post' 
                    className='w-full max-h-[600px] object-contain' 
                    loading='lazy'
                />
            </section>

            {/* Ações */}
            <section className='w-full p-4 bg-inknity-dark-purple'>
                
                <div className='flex justify-between items-center mb-2'>

                    <div className="flex items-center gap-4">
                        {/* Botão de Like */}
                        <div className='flex items-center gap-1.5'>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                onClick={onLike}
                                className={`size-7 hover:scale-110 cursor-pointer transition-all duration-200 
                                    ${data.isLiked ? "text-red-500 fill-red-500" : "text-gray-400 fill-none"}`}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                />
                            </svg>
                            <span className="text-sm font-medium">{data.likeCount}</span>
                        </div>

                        {/* Botão de Comentários */}
                        <div className='flex items-center gap-1.5'>
                            <svg 
                                xmlns='http://www.w3.org/2000/svg' 
                                fill='none' 
                                viewBox='0 0 24 24' 
                                strokeWidth={1.5} 
                                stroke="currentColor"
                                onClick={onOpenComments}
                                className='size-7 hover:text-inknity-purple cursor-pointer transition-colors duration-200 text-gray-400'
                            >
                                <path 
                                    strokeLinecap='round' 
                                    strokeLinejoin='round' 
                                    d='M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z' 
                                />
                            </svg>
                            <span className="text-sm font-medium">{data.commentCount}</span>
                        </div>
                    </div>

                    {/* Botão de Salvar */}
                    <button
                        onClick={onSave}
                        className={`transition-all duration-200 hover:scale-110 ${
                            data.isSaved ? "text-inknity-purple" : "text-gray-400 hover:text-inknity-purple"
                        }`}
                    >
                        {data.isSaved ? (
                            <BookmarkCheck className="size-7" />
                        ) : (
                            <Bookmark className="size-7" />
                        )}
                    </button>

                </div>

                <p className='text-sm text-inknity-white/90 leading-relaxed'>
                    <span className="font-bold mr-2">{profile.user?.username}</span>
                    {data.caption}
                </p>
                
                {/* Exibição de Tags (opcional, se quiser adicionar) */}
                {data.tags && data.tags.length > 0 && (
                     <div className="flex gap-2 mt-2 flex-wrap">
                        {data.tags.map(tag => (
                            <span key={tag} className="text-xs text-inknity-purple">#{tag}</span>
                        ))}
                     </div>
                )}
            </section>
        </article>
    )
}