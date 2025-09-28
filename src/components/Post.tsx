import standard from '../assets/img/standard.svg'
import { useState } from 'react'
import { Link, useParams } from 'react-router'

export const Post = () => {
    const [wasLiked, setWasLiked] = useState(false)
    const { username } = useParams()

    const handleLike = () => setWasLiked(!wasLiked)

    return (
        <article className='w-full h-full bg-inknity-dark-purple border-t border-t-inknity-white/20 md:mb-2 md:h-155 md:rounded'>
            <section className='flex items-center w-full h-1/8 pl-5 gap-3'>
                <div className='size-12 bg-center bg-cover rounded-full bg-[url(/src/assets/img/userPhoto.png)]'></div>

                <div>
                    <Link to={`/user/${username}/profile/posts`} className='leading-tight text-lg font-bold hover:text-inknity-purple hover:cursor-pointer'>John Doe</Link>
                    <p className='leading-tight text-sm text-inknity-white/50 m-0'>@johndoe</p>
                </div>
            </section>

            <section className='flex items-center justify-center w-full h-6/8 bg-gray-700/40'>
                <img src={standard} alt='Logo da Inknity' className='opacity-30' />
            </section>

            <section className='w-full h-2/8 p-3'>
                <div className='flex gap-3 mb-2'>
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

                    <svg 
                        xmlns='http://www.w3.org/2000/svg' 
                        fill='none' 
                        viewBox='0 0 24 24' 
                        strokeWidth={1.5} 
                        stroke='currentColor' 
                        className='size-7 hover:text-inknity-purple hover:cursor-pointer md:transition-all md:duration-300'
                    >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z' />
                    </svg>

                    <svg 
                        xmlns='http://www.w3.org/2000/svg' 
                        fill='none' 
                        viewBox='0 0 24 24' 
                        strokeWidth={1.5} 
                        stroke='currentColor' 
                        className='size-7 hover:text-inknity-purple hover:cursor-pointer md:transition-all md:duration-300'
                    >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5' />
                    </svg>
                </div>

                <p className='text-sm'>Lorem ipsum dolor sit, amet.</p>
            </section>
        </article>
    )
}