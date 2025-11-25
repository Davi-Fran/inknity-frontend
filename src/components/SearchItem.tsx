import type { FC } from "react";
import { Link } from "react-router-dom";

interface SearchItemProps {
  data: {
    id: string,
    imageUrl: string,
    tags: string[],
    authorId?: string
  }
}

export const SearchItem: FC<SearchItemProps> = ({ data }) => {
  return (
    <Link to='' className='relative aspect-square overflow-hidden rounded-md group cursor-pointer'>
      <img
        src={data.imageUrl}
        alt={`Post ${data.id}`}
        className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
        loading="lazy"
      />
      <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center'>
        <p className='text-xs text-white font-semibold text-center'>
          {data.tags && data.tags.map((tag) => `#${tag}`).join(' ')}
        </p>
      </div>
    </Link>
  )
}
