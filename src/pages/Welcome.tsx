import standard from '../assets/img/standard.svg'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

const Welcome = () => {
    const navigation = useNavigate()

    const { isAuthenticated, user } = useAuth()

    if (isAuthenticated) {
        navigation(`/user/${user?.username}/feed/foryou`)
    }

    useEffect(() => {
        const handleKeyPress = () => {
            navigation('/login');
        }

        window.addEventListener('keydown', handleKeyPress);

        return () => {
        window.removeEventListener('keydown', handleKeyPress);
        }
    }, [navigation])

    return (
        <div className='h-screen w-screen flex flex-col'>
            <section className='flex-1 flex justify-center items-center'>
                <img src={standard} alt='Logo padrão da Inknity' className='h-4/5' />
            </section>

            <section className='h-2/12 flex justify-center'>
                <p className='text-inknity-white/60 text-sm animate-pulse'>Pressione qualquer tecla para iniciar</p>
            </section>
        </div>
    )
}

export default Welcome