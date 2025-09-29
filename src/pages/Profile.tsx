import { useAuthentication } from '../contexts/AuthContext'
import { Link, useParams, useLocation, useNavigate } from 'react-router'
import { Post } from '../components/Post'
import standard from '../assets/img/standard.svg'
import { ProfileTag } from '../components/ProfileTag'

const Profile = () => {
    const { loggedUser, loggout } = useAuthentication()

    const { username } = useParams()
    const location = useLocation()
    const navigation = useNavigate()

    const handleActive = (route: string) => `/user/${username}/profile/${route}` === location.pathname

    const handleLoggout = async () => {
        let success = await loggout()

        if (success) {
            navigation('/login')
        } else {

        }
    }

    return (
        <div className='w-full h-full md:w-11/12'>
            <header className='relative w-full h-3/12 flex justify-center items-center bg-inknity-banner/87'>
                <Link to={`/user/${username}/feed/foryou`} className='absolute inset-0 left-3 top-6'>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='size-6'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                    </svg>
                </Link>

                <img src={standard} alt='Logo padrão da Inknity' className='w-1/2 opacity-50 md:w-1/6' />
            </header>

            <section className='w-full -mt-10'>
                <div className='relative flex w-full h-1/2 px-5'>
                    <div className='w-1/2'>
                        <div className='size-25 rounded-full border-4 border-inknity-dark-purple bg-cover bg-center bg-[url(/src/assets/img/userPhoto.png)]'></div>

                        <p className='mt-2 text-2xl font-bold'>John Doe</p>  
                        <p className='text-sm'>{loggedUser?.email}</p>
                    </div>

                    <div className='flex gap-3 items-center w-1/2 justify-end'>
                        <button
                            onClick={handleLoggout}
                            className='profileButton p-3 transition-all duration-200'
                        >Deslogar</button>
                    </div>
                </div>
            </section>

            <section className='w-full h-2/12 my-5 md:overflow-auto md:h-6/12'>
                <div className='w-full h-1/3 flex text-center items-center text-lg'>
                    <Link 
                        to={`/user/${username}/profile/posts`}
                        className={`w-1/2 border-b-2 border-inknity-white ${handleActive('posts') ? 'border-inknity-yellow text-inknity-yellow font-bold' : ''}`}
                    >Posts</Link>

                    <Link 
                        to={`/user/${username}/profile/comissions`}
                        className={`w-1/2 border-b-2 border-inknity-white ${handleActive('comissions') ? 'border-inknity-yellow text-inknity-yellow font-bold' : ''}`}
                    >Comissões</Link>
                </div>

                <div className='w-full h-2/3 flex justify-center gap-2 flex-wrap py-2 mb-14 md:h-1/4 md:mb-0'>
                    <ProfileTag label='Medieval' active={true} />
                    <ProfileTag label='Steampunk' active={false} />
                    <ProfileTag label='Cyberpunk' active={false} />
                    <ProfileTag label='Pintura' active={false} />
                    <ProfileTag label='Cubismo' active={false} />
                    <ProfileTag label='Cartoon' active={true} />
                </div>

                <main className='w-full'>
                    <Post />
                    <Post />
                </main>
            </section>
        </div>
    )
}

export default Profile