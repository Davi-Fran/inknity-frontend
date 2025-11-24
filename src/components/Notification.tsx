import type { FC } from 'react'
import { type NotificationData } from '../pages/Notifications'

interface NotificationProps {
  data: NotificationData & {
    senderUsername?: string
  }
}

export const Notification: FC<NotificationProps> = ({ data }) => {
  const { type, createdAt, read, senderUsername } = data

  const user = senderUsername ? `@${senderUsername}` : 'Alguém'

  const getMessage = () => {
    switch (type) {
      case 'post_like': return (
        <span>
          <strong className='font-bold'>{user}</strong> curtiu sua publicação
        </span>
      )

      case 'new_comment': return (
        <span>
          <strong className='font-bold'>{user}</strong> comentou em seu post
        </span>
      )

      case 'new_follower': return (
        <span>
          <strong className='font-bold'>{user}</strong> começou a te seguir
        </span>
      )

      case 'new_order': return (
        <span>
          <strong className='font-bold'>{user}</strong> comprou uma comissão
        </span>
      )

      case 'new_message': return (
        <span>
          <strong className='font-bold'>{user}</strong> enviou uma mensagem
        </span>
      )

      default: return <span>Nova notificação</span>
    }
  }

  const formatTime = (timestamp: string | { _seconds: number } | undefined) => {
    if (!timestamp) return ''

    let date: Date

    if (typeof timestamp === 'object' && '_seconds' in timestamp) {
      date = new Date(timestamp._seconds * 1000)
    } else {
      date = new Date(timestamp as string)
    }

    return date.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
  }

  const timeString = formatTime(createdAt)

  // 🔣 Ícone diferente conforme o tipo
  const getIcon = () => {
    switch (type) {
      case 'post_like': return '❤️'
      case 'new_comment': return '💬'
      case 'new_follower': return '⭐'
      case 'new_order': return '💰'
      case 'new_message': return '📩'
      default: return '🔔'
    }
  }

  return (
    <div
      className={`flex items-center justify-between w-full px-4 py-3 rounded-lg shadow-md transition-all duration-300 ${
        read 
          ? 'bg-inknity-background/60' 
          : 'bg-inknity-purple/20 border-l-4 border-inknity-purple'
      } hover:bg-inknity-purple/30 hover:cursor-pointer`}
    >
      <div className='flex items-center gap-3 overflow-hidden'>
        {/* Ícone e mensagem*/}
        <span className='text-xl flex-shrink-0'>{getIcon()}</span>

        <p className='text-inknity-white text-sm truncate'>{getMessage()}</p>
      </div>

      {/* Tempo */}
      <span className='text-xs text-inknity-white/50'>{timeString}</span>
    </div>
  )
}
