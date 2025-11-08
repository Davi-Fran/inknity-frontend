import type { FC } from 'react'
//migo, esse fc é pra tipar o componente, ajuda com a tipagem da props e a seguir as regras do react, um "functional component" coisa assim

interface NotificationProps {
  data: {
    id: number
    type: string
    message: string
    time: string
    read: boolean
  }
}

export const Notification: FC<NotificationProps> = ({ data }) => {
  const { message, time, read, type } = data

  // 🔣 Ícone diferente conforme o tipo
  const getIcon = () => {
    switch (type) {
      case 'like':
        return '❤️'
      case 'comment':
        return '💬'
      case 'follow':
        return '⭐'
      default:
        return '🔔'
    }
  }

  return (
    <div
      className={`flex items-center justify-between w-full px-4 py-3 rounded-lg shadow-md transition-all duration-300 ${
        read ? 'bg-inknity-background/60' : 'bg-inknity-purple/20 border-l-4 border-inknity-purple'
      } hover:bg-inknity-purple/30 hover:cursor-pointer`}
    >
      {/* Ícone + mensagem */}
      <div className='flex items-center gap-3'>
        <span className='text-xl'>{getIcon()}</span>
        <p className='text-inknity-white text-sm'>{message}</p>
      </div>

      {/* Tempo */}
      <span className='text-xs text-inknity-white/50'>{time}</span>
    </div>
  )
}
