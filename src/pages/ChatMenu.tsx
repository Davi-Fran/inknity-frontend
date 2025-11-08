import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

interface ChatPreview {
  user: string
  lastMessage: string
  time: string
  unread?: number
}

const ChatMenu = () => {
  const { username } = useParams()
  const [chats, setChats] = useState<ChatPreview[]>([])

  // simulação inicial (depois substituir pelo banco)
  useEffect(() => {
    setChats([
      { user: 'luna', lastMessage: 'amg vc viu o post novo?', time: '10:15', unread: 2 },
      { user: 'sofia', lastMessage: 'tô terminando o projeto 😭', time: '09:42' },
      { user: 'kaique', lastMessage: 'bom diaaa 💜', time: '08:30' },
    ])
  }, [])

  return (
    <div className='flex flex-col w-full h-13/14 bg-inknity-background-2 rounded-md md:w-11/12 md:h-full shadow-md'>

      <header className='flex items-center justify-between w-full h-1/10 px-5 bg-inknity-background'>
        <Link to={`/user/${username}/feed/foryou`} className='text-inknity-yellow hover:text-inknity-purple transition'>
          ←
        </Link>
        <h2 className='font-bold text-lg text-inknity-white'>Mensagens</h2>
        <div className='size-8 rounded-full bg-inknity-purple/50 flex items-center justify-center text-sm text-white font-semibold'>
          🗑️
        </div>
      </header>

      <main className='flex-1 overflow-y-auto divide-y divide-inknity-background'>
        {chats.map((chat, index) => (
          <Link
            to={`/user/${username}/chat/${chat.user}`}
            key={index}
            className='flex items-center justify-between px-5 py-4 hover:bg-inknity-background transition'
          >
            <div className='flex items-center gap-3'>
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
            <div className='flex flex-col items-end'>
              <span className='text-xs text-inknity-white/50'>{chat.time}</span>
              {chat.unread && chat.unread > 0 && (
                <span className='text-xs bg-inknity-purple text-white rounded-full px-2 mt-1'>
                  {chat.unread}
                </span>
              )}
            </div>
          </Link>
        ))}
      </main>
    </div>
  )
}

export default ChatMenu
