import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { SearchItem } from '../components/SearchItem'
import { api } from '../services/api'
import { ChevronLeft, Search as SearchIcon, Loader2 } from 'lucide-react'
import { useError } from '../contexts/ErrorContext'

interface PostResult {
  id: string;
  imageUrl: string;
  tags: string[];
  [key: string]: any
}

const Search = () => {
  const { username } = useParams()
  const [query, setQuery] = useState('')
  const [filterTag, setFilterTag] = useState<string | null>(null)
  const [results, setResults] = useState<PostResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { triggerError } = useError()

  const popularTags = [
    'desenho',
    'pintura',
    'cyberpunk',
    'rpg',
    'fanart',
    'realista',
    'medieval'
  ]

  useEffect(() => {
    const searchTerm = filterTag || query

    if (!searchTerm.trim()) {
      setResults([])
      return
    }

    const fetchResults = async () => {
      setIsLoading(true)
      try {
        const response = await api.get(`/posts?type=search&q=${searchTerm}`)

        if (response.data.success) {
          setResults(response.data.posts)
        }
      } catch (error) {
        console.error('Erro ao buscar posts: ', error)
        setResults([])
        triggerError('Erro ao buscar posts!')
      } finally {
        setIsLoading(false)
      }
    }

    const timeoutId = setTimeout(() => {
      fetchResults()
    }, 600)

    return () => clearTimeout(timeoutId)
  }, [query, filterTag])

  const handleTagClick = (tag: string) => {
    if (filterTag === tag) {
      setFilterTag(null)
    } else {
      setFilterTag(tag)
      setQuery('')
    }
  }

  return (
    <div className='flex flex-col w-full h-13/14 bg-inknity-background-2 rounded-md shadow-md md:w-11/12 md:h-full'>
      <header className='flex items-center justify-between w-full h-1/10 px-5 bg-inknity-background'>
        <Link to={`/user/${username}/feed/foryou`} className='text-inknity-yellow hover:text-inknity-purple transition'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </Link>

        <h2 className='font-bold text-lg text-inknity-white'>Buscar</h2>

        <div className="size-8" />
      </header>

      <section className='w-full px-5 py-3 flex flex-col gap-3 bg-inknity-background'>
        <div className='relative'>
          <input
            type='text'
            placeholder='Buscar por tags...'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setFilterTag(null)
            }}
            className='w-full pl-10 pr-4 py-3 rounded-xl bg-inknity-background-2 text-white placeholder-inknity-white/50 outline-none focus:ring-2 focus:ring-inknity-purple transition-all'
          />
          <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 text-inknity-white/30 size-5' />
        </div>

        {/* filtro de tags */}
        <div className='flex flex-wrap gap-2 mt-1'>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1 rounded-full border transition-all duration-200 text-sm ${filterTag === tag
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
        {
          isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-inknity-white/50 gap-2">
              <Loader2 className="animate-spin size-8 text-inknity-purple" />
              <p>Buscando inspiração...</p>
            </div>
          ) : results.length > 0 ? (
            <div className='grid grid-cols-3 gap-1 md:gap-4 auto-rows-fr'>
              {results.map((item) => (
                <SearchItem key={item.id} data={item} />
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center h-full text-inknity-white/40 italic gap-2'>
              <SearchIcon className="size-12 opacity-20" />
              <p>{query || filterTag ? "Nenhum resultado encontrado para esta tag." : "Digite ou selecione uma tag para começar."}</p>
            </div>
          )
        }
      </main>
    </div>
  )
}

export default Search
