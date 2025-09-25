import { Outlet, useNavigate, Link, useParams, useSearchParams } from 'react-router'
import standard from '../assets/img/standard.svg'

const Profile = () => {
    const navigation = useNavigate()
    const { username } = useParams()
    const [searchParams] = useSearchParams()

    const handleGoBack = () => navigation(-1)
    const handleActivate = (param: string) => param === searchParams.get('show')

    return (
        <div className='w-full h-full md:w-11/12'>
            <header className='relative w-full h-4/10'>
                <div className='absolute top-5 left-2 bottom-0 right-0'>
                    <button onClick={handleGoBack} className='hover:cursor-pointer'>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' className='size-6'>
                            <path stroke-linecap='round' stroke-linejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                        </svg>
                    </button>
                </div>

                <div className='w-full h-9/20 flex justify-center items-center bg-inknity-banner/87'>
                    <img src={standard} alt='Logo padrão da Inknity' className='h-4/5 opacity-45' />
                </div>

                <div className='flex justify-between px-5 mt-[-40px]'>
                    <div>
                        <div className='size-25 bg-center bg-cover rounded-full border-4 border-inknity-dark-purple bg-[url(/src/assets/img/userPhoto.png)]'></div>

                        <p className='leading-tight mt-3 text-2xl font-bold'>John Doe</p>
                        <p className='leading-tight text-sm m-0'>@johndoe</p>
                    </div>

                    <div className='flex items-center gap-3'>
                        <button 
                            className='p-2 profileButton'
                        >Editar Perfil</button>
                        
                        <button className='p-2 profileButton'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-6'>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z' />
                                <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className='w-full flex gap-2 px-5 border-b border-inknity-white/65'>
                    <Link 
                        to={`/user/${username}/profile?show=posts`}
                        className={`w-1/2 text-center font-bold ${handleActivate('posts') ? 'text-inknity-yellow border-b border-b-inknity-yellow' : ''}`}
                    >Posts</Link>

                    <Link 
                        to={`/user/${username}/profile?show=comissions`}
                        className='w-1/2 text-center'
                    >Comissions</Link>
                </div>
            </header>

            <main></main>
        </div>
    )
}

export default Profile