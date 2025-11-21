import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useError } from '../contexts/ErrorContext'
import { api } from '../services/api'

interface ChatPreview {
  id: string,
  user: string,
  avatarUrl: string,
  lastMessage: string,
  time: string,
  unread?: number
}

const ChatMenu = () => {
  const { username } = useParams()
  const navigate = useNavigate()

  const [chats, setChats] = useState<ChatPreview[]>([])
  const [selectionMode, setSelectionMode] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const { triggerError } = useError()

  // simulação inicial
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await api.get('/chats')
        const result = response.data.chats!;

        const formattetChats = result.map((c: any) => ({
          id: c.id,
          user: c.otherUser.username,
          avatarUrl: c.otherUser.avatarUrl,
          lastMessage: c.lastMessage || 'Iniciar conversa',
          time: c.lastMessageTimestamp ? new Date(c.lastMessageTimestamp._seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
          unread: 0
        }))

        setChats(formattetChats)
      } catch (error) {
        console.error(error)
        triggerError('Erro ao carregar suas conversas!')
      } finally {
        setLoading(false)
      }
    }

    fetchChats()
  }, [])

  // entrar em modo seleção
  const startSelection = (id: string) => {
    setSelectionMode(true)
    setSelected([id])
  }

  // selecionar/deselecionar
  const toggleSelection = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id])
  }

  // apagar só os selecionados
  const deleteSelected = () => {
    setChats(prev => prev.filter(c => !selected.includes(c.id)))
    setSelected([])
    setSelectionMode(false)
  }

  if (loading) return <div className='p-5 text-white'>Carregando conversas...</div>

  return (
    <div className='Sflex flex-col w-full h-13/14 bg-inknity-background-2 rounded-md md:w-11/12 md:h-full shadow-md'>

      <header className='flex items-center justify-between w-full h-1/10 px-5 bg-inknity-background'>
        {!selectionMode ? (
          <>
            <Link to={`/user/${username}/feed/foryou`} className='text-inknity-yellow hover:text-inknity-purple transition'>
              ←
            </Link>
            <h2 className='font-bold text-lg text-inknity-white'>Mensagens</h2>
            <div className='size-8'></div>
          </>
        ) : (
          <>
            <button
              onClick={() => { setSelectionMode(false); setSelected([]) }}
              className='text-inknity-yellow hover:text-inknity-purple transition'
            >
              Cancelar
            </button>

            <h2 className='font-bold text-lg text-inknity-white'>
              {selected.length} selecionado{selected.length > 1 ? 's' : ''}
            </h2>

            <button
              onClick={deleteSelected}
              className='text-red-400 hover:text-red-300 transition text-xl'
            >
              🗑️
            </button>
          </>
        )}
      </header>

      {/* ---------- LISTA ---------- */}
      <main className='flex-1 overflow-y-auto divide-y divide-inknity-background'>
        {chats.length === 0 && (
          <p className='text-center text-inknity-white/40 py-6'>Nenhuma conversa 😔</p>
        )}

        {chats.map((chat) => {
          const isSelected = selected.includes(chat.id)

          return (
            <div
              key={chat.id}
              className={`flex items-center justify-between px-5 py-4 transition
                ${isSelected ? 'bg-inknity-purple/30' : 'hover:bg-inknity-background'}
                cursor-pointer
              `}
              onClick={() => {
                if (selectionMode) {
                  toggleSelection(chat.id)
                } else {
                  navigate(`/user/${username}/chat/${chat.id}`, {
                    state: { targetUser: chat.user }
                  })
                }
              }}
              onContextMenu={(e) => {
                e.preventDefault()
                if (!selectionMode) startSelection(chat.id)
              }}
            >
              {/* Seleção */}
              {selectionMode && (
                <div className='mr-3'>
                  {isSelected ? (
                    <div className='size-5 rounded-full bg-inknity-purple text-white flex items-center justify-center text-xs'>
                      ✓
                    </div>
                  ) : (
                    <div className='size-5 rounded-full border border-white/40'></div>
                  )}
                </div>
              )}

              {/* Avatar + conteúdo */}
              <div className='flex items-center gap-3 flex-1'>
                {
                  <img src={chat.avatarUrl} alt={chat.user} className='size-10 rounded-full object-cover' />
                }

                <div className='flex flex-col'>
                  <span className='text-inknity-white font-semibold'>@{chat.user}</span>
                  <span className='text-inknity-white/60 text-sm truncate w-40'>
                    {chat.lastMessage}
                  </span>
                </div>
              </div>

              {/* Hora + unread */}
              {!selectionMode && (
                <div className='flex flex-col items-end'>
                  <span className='text-xs text-inknity-white/50'>{chat.time}</span>
                  {chat.unread && chat.unread > 0 ? (
                    <span className='text-xs bg-inknity-purple text-white rounded-full px-2 mt-1'>
                      {chat.unread}
                    </span>
                  ) : null}
                </div>
              )}
            </div>
          )
        })}
      </main>
    </div>
  )
}

export default ChatMenu