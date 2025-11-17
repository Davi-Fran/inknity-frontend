import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { Art } from '../components/Art'
import { Tag } from '../components/Tag'
import { type TagType } from '../types/Tag'
import { useAuth } from '../contexts/AuthContext'

const SelectStyles = () => {
    const [addStyle, setAddStyle] = useState('')
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const [tags, setTags] = useState<TagType[]>([
        { label: 'Cyberpunk', active: true },
        { label: 'Realista', active: true },
        { label: 'Semirealismo', active: false },
        { label: 'Aquarela', active: true },
        { label: 'Tradicional', active: true },
        { label: 'Steampunk', active: false },
        { label: 'PixelArt', active: false },
        { label: 'Cartoon', active: true },
        { label: 'Anime', active: false },
        { label: 'Pintura', active: true },
    ])

    const navigation = useNavigate()

    const { isAuthenticated, user } = useAuth()

    if (isAuthenticated) {
        navigation(`/user/${user?.username}/feed/foryou`)
    }

    useEffect(() => {
        window.addEventListener('resize', () => setIsMobile(window.innerWidth < 768))
        return () => window.removeEventListener('resize', () => setIsMobile(window.innerWidth < 768))
    }, [])

    const handleAddStyle = (label: string) => {
        if (label.trim() === '') {
            return false
        }

        setTags([ ...tags, { label, active: true } ])
        setAddStyle('')
    }

    return (
        <div className='h-screen w-screen md:flex'>
            { !isMobile && <Art /> }

            <form className='flex flex-col justify-center items-center h-full pt-12 gap-8 md:w-3/5 md:h-full md:pt-12 md:justify-center'>
                <header className='flex flex-col items-center w-5/6 gap-8 md:w-3/4'>
                    <div className='w-full'>
                        <Link to='/createProfile' className=''>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' className='size-6'>
                                <path stroke-linecap='round' stroke-linejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                            </svg>
                        </Link>
                    </div>

                    <h1 className='text-3xl md:text-4xl'>Selecione seus estilos!</h1>
                </header>

                <main className='flex flex-wrap justify-around flex-1 pt-2 w-5/6 h-1/2 rounded overflow-auto bg-inknity-background/40 md:w-3/4 md:h-4/5 md:py-5'>
                    {
                        tags.map((item, index) => <Tag key={index} label={item.label} active={item.active} />)
                    }
                </main>

                <section className='w-full flex px-5 md:w-3/5'>
                    <input 
                        type='text'
                        placeholder='Outros'
                        value={addStyle}
                        onChange={e => setAddStyle(e.target.value)}
                        className='input w-3/4 p-3 mr-5 transtion-all duration-200'
                    />
                    
                    <button
                        className='flex items-center justify-center w-1/4 p-3 rounded border border-inknity-purple bg-inknity-purple/50 transtion-all duration-200 hover:cursor-pointer'
                        onClick={e => {
                            e.preventDefault()
                            handleAddStyle(addStyle)
                        }}
                    >
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' className='size-5'>
                            <path stroke-linecap='round' stroke-linejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                        </svg>
                    </button>
                </section>

                <button 
                    type='submit'
                    onClick={() => navigation('/user/idk/feed/foryou')}
                    className='formButton py-3 w-2/3 mb-20 md:w-1/3'
                >Finalizar</button>
            </form>
        </div>
    )
}

export default SelectStyles