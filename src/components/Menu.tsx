import { Outlet, NavLink, useParams, useLocation } from 'react-router'
import { useEffect, useState } from 'react'
import standard from '../assets/img/standard.svg'

export const Menu = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

    const { username } = useParams()
    const location = useLocation()

    useEffect(() => {
        window.addEventListener('resize', () => setIsMobile(window.innerWidth < 768))
        return () => window.removeEventListener('resize', () => setIsMobile(window.innerWidth < 768))
    }, [])

    const handleNavActivate = (route: string) => route === location.pathname
    const isProfilePage = () => location.pathname === `/user/${username}/profile/posts` || location.pathname === `/user/${username}/profile/comissions`

    return (
        <section className='h-screen w-screen md:flex md:flex-row-reverse'>
            <Outlet />

            {
                isMobile && (
                    <nav className={`h-1/14 w-full bg-inknity-background md:w-1/12 md:h-full ${isProfilePage() ? 'hidden' : ''}`}>
                        <div className='flex justify-around items-center w-full h-full p-1'>
                            <NavLink to={`/user/${username}/feed/foryou`}>
                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className={`size-8 ${ handleNavActivate(`/user/${username}/feed/foryou`) || handleNavActivate(`/user/${username}/feed/following`) ? 'text-inknity-purple' : '' }`}>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25' />
                                </svg>
                            </NavLink>

                            <NavLink to={`/user/${username}/search`}>
                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className={`size-8 ${ handleNavActivate(`/user/${username}/search`) ? 'text-inknity-purple' : '' }`}>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z' />
                                </svg>
                            </NavLink>

                            <NavLink to={`/user/${username}/writePost`}>
                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className={`size-8 ${ handleNavActivate(`/user/${username}/writePost`) ? 'text-inknity-purple' : '' }`}>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10' />
                                </svg>
                            </NavLink>

                            <NavLink to={`/user/${username}/profile/posts`}>
                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className={`size-8 ${ handleNavActivate(`/user/${username}/profile`) ? 'text-inknity-purple' : '' }`}>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
                                </svg>
                            </NavLink>
                        </div>
                    </nav>
                )
            }
            {
                !isMobile && (
                    <nav className='w-1/12 h-full bg-inknity-background'>
                        <div className='flex flex-col justify-between items-center w-full h-full'>
                            <NavLink 
                                to={`/user/${username}/feed/foryou`}
                                className='h-1/7'
                            >
                                <img src={standard} alt='Logo da Inknity' />
                            </NavLink>

                            <div className='flex flex-col items-center justify-center w-full gap-10 h-4/7'>
                                <NavLink to={`/user/${username}/feed/foryou`}>
                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className={`size-8 ${ handleNavActivate(`/user/${username}/feed`) ? 'text-inknity-purple' : '' }`}>
                                        <path strokeLinecap='round' strokeLinejoin='round' d='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25' />
                                    </svg>
                                </NavLink>

                                <NavLink to={`/user/${username}/search`}>
                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className={`size-8 ${ handleNavActivate(`/user/${username}/search`) ? 'text-inknity-purple' : '' }`}>
                                        <path strokeLinecap='round' strokeLinejoin='round' d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z' />
                                    </svg>
                                </NavLink>

                                <NavLink to={`/user/${username}/chat`}>
                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className={`size-8 ${ handleNavActivate(`/user/${username}/chat`) ? 'text-inknity-purple' : '' }`}>
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z' />
                                    </svg>
                                </NavLink>

                                <NavLink to={`/user/${username}/notifications`}>
                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className={`size-8 ${ handleNavActivate(`/user/${username}/notifications`) ? 'text-inknity-purple' : '' }`}>
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0' />
                                    </svg>
                                </NavLink>
                            </div>

                            <div className='flex flex-col justify-center w-full h-2/7 gap-10'>
                                <NavLink to={`/user/${username}/profile/posts`} className='flex justify-center'>
                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className={`size-8 ${ handleNavActivate(`/user/${username}/profile`) ? 'text-inknity-purple' : '' }`}>
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
                                    </svg>
                                </NavLink>
                                
                                <NavLink to={`/user/${username}/settings`} className='flex justify-center'>
                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className={`size-8 ${ handleNavActivate(`/user/${username}/settings`) ? 'text-inknity-purple' : '' }`}>
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z' />
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
                                    </svg>
                                </NavLink>
                            </div>
                        </div>
                    </nav>
                )
            }
        </section>
    )
}