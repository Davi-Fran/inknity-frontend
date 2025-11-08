import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Notification } from '../components/Notification'

const Notifications = () => {
  const { username } = useParams()
  const [notifications, setNotifications] = useState<
    { id: number; type: string; message: string; time: string; read: boolean }[]
  >([])

  // aqui entra o banco
  useEffect(() => {
    const fakeData = [
      { id: 1, type: 'like', message: 'gaby curtiu sua publicação!', time: '2m atrás', read: false },
      { id: 2, type: 'comment', message: 'luna comentou: “amei seu estilo!! 😍”', time: '10m atrás', read: true },
      { id: 3, type: 'follow', message: 'kai começou a te seguir!', time: '1h atrás', read: true },
    ]
    setNotifications(fakeData)
  }, [])

  return (
    <div className='flex flex-col w-full h-13/14 bg-inknity-background-2 rounded-md shadow-md md:w-11/12 md:h-full'>
      
      <header className='flex items-center justify-between w-full h-1/10 px-5 bg-inknity-background'>
        <Link to={`/user/${username}/feed/foryou`} className='text-inknity-yellow hover:text-inknity-purple transition'>
          ←
        </Link>
        <h2 className='font-bold text-lg text-inknity-white'>Notificações</h2>
        <div className='size-8 rounded-full bg-inknity-purple/50 flex items-center justify-center text-sm text-white font-semibold'>
          🗑️
        </div>
      </header>

      <main className='flex-1 w-full overflow-y-auto px-4 py-3 space-y-3'>
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <Notification key={notif.id} data={notif} />
          ))
        ) : (
          <div className='flex items-center justify-center h-full text-inknity-white/60 italic'>
            Nenhuma notificação por aqui 💭
          </div>
        )}
      </main>
    </div>
  )
}

export default Notifications