import { NavLink, Link, useParams, useLocation } from 'react-router'
import { Post } from '../components/Post'

const Feed = () => {
    const { username } = useParams()
    const location = useLocation()
    
    const handleActivate = (route: string) => `/user/${username}/feed/${route}` === location.pathname

    return (
        <div className='h-13/14 w-full md:h-full md:w-11/12 md:flex md:flex-col md:items-center'>
            <header className='w-full h-1/6 md:flex md:items-center md:h-1/10'>
                <section className='flex items-center justify-between w-full h-1/2 bg-inknity-background-2 px-5 md:hidden'>
                    <div className='w-1/2 h-full bg-cover bg-center bg-[url(/src/assets/img/inline.svg)]'></div>

                    <div className='flex items-center w-1/4 h-full gap-2 mr-2'>
                        <NavLink to={`/user/${username}/notifications`}>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-8'>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0' />
                            </svg>
                        </NavLink>

                        <NavLink to={`/user/${username}/chatmenu`}>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-8'>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z' />
                            </svg>
                        </NavLink>
                    </div>
                </section>

                <section className='flex justify-center items-center w-full h-1/2'>
                    <Link 
                        to={`/user/${username}/feed/foryou`}
                        className={`mr-10 ${handleActivate('foryou') ? 'text-inknity-yellow border-b border-b-inknity-yellow' : ''}`}
                    >
                        Para você
                    </Link>

                    <Link 
                        to={`/user/${username}/feed/following`}
                        className={`${handleActivate('following') ? 'text-inknity-yellow border-b border-b-inknity-yellow' : ''}`}
                    >
                        Seguindo
                    </Link>
                </section>
            </header>

            <main className='w-full h-5/6 overflow-auto md:w-5/8 md:px-8 md:pt-5 md:bg-inknity-background md:rounded-md md:h-full'>
                <Post />
                <Post />
                <Post />

                <div className='flex justify-center items-center w-full h-1/6'>
                    <button className='bg-inknity-purple py-3 px-10 rounded font-bold hover:cursor-pointer hover:bg-inknity-purple/80 hover:text-inknity-white/80 hover:rounded-md transition-all duration-300 shadow-[0_0_8px] shadow-inknity-purple'>Ver mais</button>
                </div>
            </main>
        </div>
    )
}

export default Feed