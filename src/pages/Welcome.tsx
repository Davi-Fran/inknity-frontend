import standard from '../assets/img/standard.svg'

const Welcome = () => {
    return (
        <div className='h-screen w-screen flex flex-col'>
            <section className='flex-1 flex justify-center items-center'>
                <img src={standard} alt='Logo padrão da Inknity' className='h-4/5' />
            </section>

            <section className='h-2/12 flex justify-center'>
            </section>
        </div>
    )
}

export default Welcome