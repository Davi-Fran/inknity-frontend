import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Notification } from '../components/Notification'
import { useError } from '../contexts/ErrorContext'
import { api } from '../services/api'

export interface NotificationData {
  id: string,
  type: 'new_follower' | 'post_like' | 'new_order' | 'new_comment' | 'new_message',
  createdAt: string,
  read: boolean
}

const Notifications = () => {
  const { username } = useParams()
  const { triggerError } = useError()

  const [notifications, setNotifications] = useState<NotificationData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAndMarkAll = async () => {
      try {
        const response = await api.get('/notifications')
        const data = response.data.notifications
        setNotifications(data)

        if (data.length > 0) {
          api.put('/notifications/read').catch(err => console.error('Falha ao marcar como lido: ', err))
        }
      } catch (error) {
        console.error('Erro ao buscar notificações: ', error)
        triggerError('Não foi possível carregar as notificações!')
      } finally {
        setLoading(false)
      }
    }

    fetchAndMarkAll()
  }, [])

  const handleDeleteAll = async () => {
    if (notifications.length === 0) return

    const confirmDelete = window.confirm('Tem certeza que deseja apagar as notificações?')
    if (!confirmDelete) return

    try {
      await api.delete('/notifications/delete')
      setNotifications([])
    } catch (error) {
      console.error(error)
      triggerError('Erro ao deletar notificações')
    }
  }

  if (loading) return <div className='p-10 text-white text-center'>Carregando...</div>

  return (
    <div className='flex flex-col w-full h-13/14 bg-inknity-background-2 rounded-md shadow-md md:w-11/12 md:h-full'>

      <header className='flex items-center justify-between w-full h-1/10 px-5 bg-inknity-background'>
        <Link to={`/user/${username}/feed/foryou`} className='text-inknity-yellow hover:text-inknity-purple transition'>
          ←
        </Link>

        <h2 className='font-bold text-lg text-inknity-white'>Notificações</h2>

        {/* Botão de lixeira sempre vísivel se tiver notificações */}
        {
          notifications.length > 0 ? (
            <button
              onClick={handleDeleteAll}
              className='text-red-400 hover:text-red-300 transition text-xl cursor-pointer'
              title='Excluir todas as notificações'
            >
              🗑️
            </button>
          ) : (
            <div className='size-6'></div>
          )
        }
      </header>

      <main className='flex-1 w-full overflow-y-auto px-4 py-3 space-y-3'>
        {
          notifications.length > 0 ? (
            notifications.map((notif) => (
              <div key={notif.id} className='transition rounded-lg'>
                <Notification data={notif} />
              </div>
            ))
          ) : (
            <div className='flex items-center justify-center h-full text-inknity-white/60 italic'>
              Nenhuma notificação 💭
            </div>
          )
        }
      </main>
    </div>
  )
}

export default Notifications
