import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Notification } from '../components/Notification'

const Notifications = () => {
  const { username } = useParams()

  const [notifications, setNotifications] = useState<
    { id: string; type: string; message: string; time: string; read: boolean }[]
  >([])

  const [selectionMode, setSelectionMode] = useState(false)
  const [selected, setSelected] = useState<number[]>([])

  // carregar dados fake
  useEffect(() => {
    setNotifications([
      { id: '3', type: 'like', message: 'gaby curtiu sua publicação!', time: '2m atrás', read: false },
      { id: '2', type: 'comment', message: 'luna comentou: “amei seu estilo!! 😍”', time: '10m atrás', read: true },
      { id: '1', type: 'follow', message: 'kai começou a te seguir!', time: '1h atrás', read: true },
    ])
  }, [])

  // entrar no modo seleção
  const startSelection = (id: number) => {
    setSelectionMode(true)
    setSelected([id])
  }

  // selecionar/deselecionar
  const toggleSelection = (id: number) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(n => n !== id)
        : [...prev, id]
    )
  }

  // deletar selecionados
  const deleteSelected = () => {
    setNotifications(prev => prev.filter(n => !selected.includes(n.id)))
    setSelected([])
    setSelectionMode(false)
  }

  return (
    <div className='flex flex-col w-full h-13/14 bg-inknity-background-2 rounded-md shadow-md md:w-11/12 md:h-full'>
      
      <header className='flex items-center justify-between w-full h-1/10 px-5 bg-inknity-background'>
        
        {!selectionMode ? (
          <>
            <Link to={`/user/${username}/feed/foryou`} className='text-inknity-yellow hover:text-inknity-purple transition'>
              ←
            </Link>
            <h2 className='font-bold text-lg text-inknity-white'>Notificações</h2>
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
              {selected.length} selecionada{selected.length > 1 ? 's' : ''}
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

      <main className='flex-1 w-full overflow-y-auto px-4 py-3 space-y-3'>
        {notifications.length > 0 ? (
          notifications.map((notif) => {
            const isSelected = selected.includes(notif.id)

            return (
              <div
                key={notif.id}
                className={`
                  transition rounded-lg
                  ${isSelected ? 'bg-inknity-purple/30 border border-inknity-purple' : ''}
                `}
                onClick={() => {
                  if (selectionMode) toggleSelection(notif.id)
                }}
                onContextMenu={(e) => {
                  e.preventDefault()
                  if (!selectionMode) startSelection(notif.id)
                }}
                onMouseDown={(e) => {
                  let timer = setTimeout(() => {
                    if (!selectionMode) startSelection(notif.id)
                  }, 600)

                  const clear = () => clearTimeout(timer)
                  e.target.addEventListener("mouseup", clear, { once: true })
                  e.target.addEventListener("mouseleave", clear, { once: true })
                }}
              >
                <Notification
                  data={notif}
                  selected={isSelected}
                  onSelect={() => toggleSelection(notif.id)}
                />
              </div>
            )
          })
        ) : (
          <div className='flex items-center justify-center h-full text-inknity-white/60 italic'>
            Nenhuma notificação 💭
          </div>
        )}
      </main>
    </div>
  )
}

export default Notifications
