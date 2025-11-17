import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { Bookmark, BookmarkCheck } from "lucide-react"
import { api } from '../services/api'

export const Post = ({ onOpenComments, data }) => {
    const [likeCount, setLikeCount] = useState(data.likeCount)
    const [wasLiked, setWasLiked] = useState(false)
    const [savedCount, setSavedCount] = useState(data.savedCount)
    const [wasSaved, setWasSaved] = useState(false)
    const [commentCount, setCommentCount] = useState(data.commentCount)
    const [profile, setProfile] = useState<any>()
    const [isLoading, setIsLoading] = useState(true)

    const { username } = useParams()

    const handleLike = async () => {
        setWasLiked(!wasLiked)
    }
    const handleSave = () => setWasSaved(!wasSaved)

    useEffect(() => {
        const req = async () => {
            try {
                const response = await api.get(`/users?id=${data.authorId}`)
                const reqData = response.data
                
                setProfile(reqData)
            } catch (error) {
                throw new Error('Não foi possível carregar os posts')
            } finally {
                setIsLoading(false)
            }
        }

        req()
    }, [data.authorId])

    if (isLoading && !profile) {
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
        <article className=' w-full h-fit bg-inknity-dark-purple border-t border-t-inknity-white/20 md:mb-2 md:h-155 md:rounded pb-150'>
            
            <section className='flex items-center w-full p-5 gap-3'>
                <div className={`size-12 bg-center bg-cover rounded-full bg-[url('${profile.user.avatarUrl}')]`}></div>

                <div>
                    <Link 
                        to={`/user/${username}/profile/posts`} 
                        className='leading-tight text-lg font-bold hover:text-inknity-purple hover:cursor-pointer'
                    >
                        {profile.user.displayName}
                    </Link>
                    <p className='leading-tight text-sm text-inknity-white/50 m-0'>@{profile.user.username}</p>
                </div>
            </section>

            <section className='flex items-center justify-center w-full bg-gray-700/40'>
                <img src={data.imageUrl} alt='Imagem do post' className='w-full h-auto object-contain' />
            </section>

            <section className='w-full p-3 bg-inknity-dark-purple'>
              
                <div className='flex gap-3 mb-2'>
                    
                    <div className='flex items-center gap-1.5'>
                        <svg 
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5} 
                            stroke='currentColor' 
                            onClick={handleLike}
                            className={`size-7 hover:text-inknity-purple hover:cursor-pointer ${wasLiked ? 'fill-red-700 stroke-red-700' : ''} transition-all duration-200`}
                        >
                            <path strokeLinecap='round' strokeLinejoin='round' d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z' />
                        </svg>
                        <p>{likeCount}</p>
                    </div>

                    <div className='flex items-center gap-1.5'>
                        <svg 
                            xmlns='http://www.w3.org/2000/svg' 
                            fill='none' 
                            viewBox='0 0 24 24' 
                            strokeWidth={1.5} 
                            stroke='currentColor' 
                            onClick={() => onOpenComments()}
                            className='size-7 hover:text-inknity-purple hover:cursor-pointer md:transition-all md:duration-300'
                        >
                            <path strokeLinecap='round' strokeLinejoin='round' d='M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z' />
                        </svg>
                        <p>{commentCount}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleSave}
                            className={`transition cursor-pointer hover:cursor-pointer hover:text-inknity-purple ${
                                wasSaved ? "text-inknity-purple" : "text-inknity-white/90"
                            }`}
                        >
                            {wasSaved ? (
                                <BookmarkCheck className="size-6.5" />
                            ) : (
                                <Bookmark className="size-6.5" />
                            )}
                        </button>
                        <p>{savedCount}</p>
                    </div>

                </div>
                <p className='text-sm'>{data.caption}</p>
            </section>
        </article>
    )
}