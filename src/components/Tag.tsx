import { type TagType } from '../types/Tag'

interface TagProps extends TagType {
    onClick?: () => void
}

export const Tag = ({ label, active, onClick }: TagProps) => {


    return (
        <div 
            className={`flex justify-between items-center w-full h-full py-2 px-2 m-2 rounded ${active ? 'bg-inknity-purple' : 'bg-inknity-white/20'} cursor-pointer transition-all duration-300`}
            onClick={onClick}
        >
            <p className='font-bold truncate'>{label}</p>

            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className={`size-5 transition-all duration-300 ${active ? 'rotate-0' : 'rotate-45'}`}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
            </svg>
        </div>
    )
}