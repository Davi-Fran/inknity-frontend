import type { FC } from "react";

interface SearchItemProps {
  data: {
    id: number
    img: string
    tags: string[]
  }
}

export const SearchItem: FC<SearchItemProps> = ({ data }) => {
  return (
    <div className='relative aspect-square overflow-hidden rounded-md group cursor-pointer'>
      <img
        src={data.img}
        alt={`Post ${data.id}`}
        className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
      />
      <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center'>
        <p className='text-xs text-white font-semibold'>
          {data.tags.map((tag) => `#${tag}`).join(' ')}
        </p>
      </div>
    </div>
  )
}
