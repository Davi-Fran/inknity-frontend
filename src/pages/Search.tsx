import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { SearchItem } from '../components/SearchItem'

const Search = () => {
  const { username } = useParams()
  const [query, setQuery] = useState('')
  const [filterTag, setFilterTag] = useState<string | null>(null)
  const [results, setResults] = useState<
    { id: number; img: string; tags: string[] }[]
  >([])

  // substituir pelo banco
  useEffect(() => {
    const mockResults = [
      { id: 1, img: '/src/assets/mock/post1.jpg', tags: ['aquarela', 'inspiração'] },
      { id: 2, img: '/src/assets/mock/post2.jpg', tags: ['tech', 'cyberpunk'] },
      { id: 3, img: '/src/assets/mock/post3.jpg', tags: ['desenho', 'fanart'] },
      { id: 4, img: '/src/assets/mock/post4.jpg', tags: ['armadura', 'medieval'] },
      { id: 5, img: '/src/assets/mock/post5.jpg', tags: ['pintura', 'natureza morta'] },
      { id: 6, img: '/src/assets/mock/post6.jpg', tags: ['lineart', 'minimalismo'] },
    ]
    setResults(mockResults)
  }, [])

  // filtragem por texto ou tag
  const filteredResults = results.filter((item) => {
    const inText = query
      ? item.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
      : true
    const inTag = filterTag ? item.tags.includes(filterTag) : true
    return inText && inTag
  })

  const popularTags = ['desenho', 'pintura', 'cyberpuk', 'rpg', 'fanart']

  return (
    <div className='flex flex-col w-full h-13/14 bg-inknity-background-2 rounded-md shadow-md md:w-11/12 md:h-full'>
      
      <header className='flex items-center justify-between w-full h-1/10 px-5 bg-inknity-background'>
        <Link to={`/user/${username}/feed/foryou`} className='text-inknity-yellow hover:text-inknity-purple transition'>
          ←
        </Link>
        <h2 className='font-bold text-lg text-inknity-white'>Buscar</h2>
        <div className='size-8 rounded-full bg-inknity-purple/50 flex items-center justify-center text-sm text-white font-semibold'>
          🔎
        </div>
      </header>

      <section className='w-full px-5 py-3 flex flex-col gap-3 bg-inknity-background'>
        <input
          type='text'
          placeholder='Buscar por tags...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='w-full px-4 py-2 rounded-md bg-inknity-background-2 text-white placeholder-inknity-white/50 outline-none'
        />

        {/* filtro de tags */}
        <div className='flex flex-wrap gap-2 mt-1'>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(filterTag === tag ? null : tag)}
              className={`px-3 py-1 rounded-full border transition-all duration-200 text-sm ${
                filterTag === tag
                  ? 'bg-inknity-purple border-inknity-purple text-white'
                  : 'border-inknity-purple/50 text-inknity-white/70 hover:bg-inknity-purple/20'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </section>

      {/* resultado de busca */}
      <main className='flex-1 overflow-y-auto p-4'>
        {filteredResults.length > 0 ? (
          <div className='grid grid-cols-3 gap-2 md:gap-4'>
            {filteredResults.map((item) => (
              <SearchItem key={item.id} data={item} />
            ))}
          </div>
        ) : (
          <div className='flex justify-center items-center h-full text-inknity-white/60 italic'>
            Nenhum resultado encontrado 💭
          </div>
        )}
      </main>
    </div>
  )
}

export default Search
