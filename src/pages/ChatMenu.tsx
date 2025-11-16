import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

interface ChatPreview {
  user: string
  lastMessage: string
  time: string
  unread?: number
}

const ChatMenu = () => {
  const { username } = useParams()
  const navigate = useNavigate()

  const [chats, setChats] = useState<ChatPreview[]>([])
  const [selectionMode, setSelectionMode] = useState(false)
  const [selected, setSelected] = useState<string[]>([])

  // simulação inicial
  useEffect(() => {
    setChats([
      { user: 'luna', lastMessage: 'amg vc viu o post novo?', time: '10:15', unread: 2 },
      { user: 'sofia', lastMessage: 'tô terminando o projeto 😭', time: '09:42' },
      { user: 'kaique', lastMessage: 'bom diaaa 💜', time: '08:30' },
    ])
  }, [])

  // entrar em modo seleção
  const startSelection = (user: string) => {
    setSelectionMode(true)
    setSelected([user])
  }

  // selecionar/deselecionar
  const toggleSelection = (user: string) => {
    setSelected(prev =>
      prev.includes(user)
        ? prev.filter(u => u !== user)
        : [...prev, user]
    )
  }

  // apagar só os selecionados
  const deleteSelected = () => {
    setChats(prev => prev.filter(c => !selected.includes(c.user)))
    setSelected([])
    setSelectionMode(false)
  }

  return (
    <div className='flex flex-col w-full h-13/14 bg-inknity-background-2 rounded-md md:w-11/12 md:h-full shadow-md'>

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
          const isSelected = selected.includes(chat.user)

          return (
            <div
              key={chat.user}
              className={`flex items-center justify-between px-5 py-4 transition
                ${isSelected ? 'bg-inknity-purple/30' : 'hover:bg-inknity-background'}
                cursor-pointer
              `}
              onClick={() => {
                if (selectionMode) {
                  toggleSelection(chat.user)
                } else {
                  navigate(`/user/${username}/chat/${chat.user}`)
                }
              }}
              onContextMenu={(e) => {
                e.preventDefault()
                if (!selectionMode) startSelection(chat.user)
              }}
              onMouseDown={(e) => {
                // clique longo (600ms)
                let timer = setTimeout(() => {
                  if (!selectionMode) startSelection(chat.user)
                }, 600)

                const clear = () => clearTimeout(timer)
                e.target.addEventListener("mouseup", clear, { once: true })
                e.target.addEventListener("mouseleave", clear, { once: true })
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
                <div className='size-10 rounded-full bg-inknity-purple/40 flex items-center justify-center text-white font-bold'>
                  {chat.user[0].toUpperCase()}
                </div>
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
                  {chat.unread && chat.unread > 0 && (
                    <span className='text-xs bg-inknity-purple text-white rounded-full px-2 mt-1'>
                      {chat.unread}
                    </span>
                  )}
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