import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { Art } from '../components/Art'

const SelectStyles = () => {
    const [addStyle, setAddStyle] = useState('')
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

    const navigation = useNavigate()

    useEffect(() => {
        window.addEventListener('resize', () => setIsMobile(window.innerWidth < 768))
        return () => window.removeEventListener('resize', () => setIsMobile(window.innerWidth < 768))
    }, [])

    const handleAddStyle = (tag: string) => {
        
    }

    return (
        <div className='h-screen w-screen md:flex'>
            { !isMobile && <Art /> }

            <form className='flex flex-col h-3/4 pt-12 items-center gap-14 md:w-3/5 md:h-full md:p-0 md:justify-center md:gap-4'>
                <header className='flex flex-col items-center w-5/6 md:w-3/4'>
                    <div className='w-full'>
                        <Link to='/createProfile' className='mb-5 justify-self-start'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' className='size-6'>
                                <path stroke-linecap='round' stroke-linejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                            </svg>
                        </Link>
                    </div>
                </header>

                <main>

                </main>

                <section className='w-full flex p-5'>
                    <input 
                        type='text'
                        placeholder='Outros'
                        value={addStyle}
                        onChange={e => setAddStyle(e.target.value)}
                        className='input w-3/4 p-3 mr-5 transtion-all duration-200'
                    />
                    
                    <button
                        className='flex items-center justify-center w-1/4 p-3 rounded border border-inknity-purple bg-inknity-purple/50 transtion-all duration-200'
                        onClick={e => {
                            e.preventDefault()
                            handleAddStyle(addStyle)
                        }}
                    >
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' className='size-5 font-bold'>
                            <path stroke-linecap='round' stroke-linejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                        </svg>
                    </button>
                </section>

                <button 
                    type='submit'
                    onClick={() => navigation('')}
                    className='formButton p-3 w-2/3'
                >Finalizar</button>
            </form>
        </div>
    )
}

export default SelectStyles