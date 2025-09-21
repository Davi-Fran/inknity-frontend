import { useState } from 'react'
import { type TagType } from '../types/Tag'

export const Tag = ({ label, active }: TagType) => {
    const [isActive, setIsActive] = useState(active)

    const handleChangeActive = () => setIsActive(!isActive)

    return (
        <div 
            className={`flex justify-between items-center w-2/5 h-1/10 py-2 px-2 m-2 rounded ${isActive ? 'bg-inknity-purple' : 'bg-inknity-white/20'} cursor-pointer transition-all duration-300 md:h-1/7`}
            onClick={handleChangeActive}
        >
            <p className='font-bold truncate'>{label}</p>

            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' className={`size-5 transition-all duration-300 ${isActive ? 'rotate-0' : 'rotate-45'}`}>
                <path stroke-linecap='round' stroke-linejoin='round' d='M6 18 18 6M6 6l12 12' />
            </svg>
        </div>
    )
}