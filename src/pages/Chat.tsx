import { useState, useEffect, useRef } from 'react'
import { useLocation, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useChatMessages } from '../hooks/useChatMessages'
import { useError } from '../contexts/ErrorContext'
import { api } from '../services/api'

const Chat = () => {
  const { username, chatId } = useParams()
  const location = useLocation()

  const targetUsername = location.state?.targetUser || 'Usuário'

  const { user } = useAuth()
  const { messages, loading } = useChatMessages(chatId)

  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { triggerError } = useError()

  const handleSend = async () => {
    if (!input.trim()) return

    const textToSend = input
    setInput('')
    
    try {
      await api.post(`/chats/${chatId}/messages`, { text: textToSend })
    } catch (error) {
      console.error(`Erro ao enviar a mensagem: ${error}`);
      triggerError('Erro ao enviar a mensagem!');
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className='flex flex-col w-full h-13/14 bg-inknity-background-2 rounded-md shadow-md md:w-11/12 md:h-full'>
      
      <header className='flex items-center justify-between w-full h-1/10 px-5 bg-inknity-background'>
        <Link
          to={`/user/${username}/feed/foryou`}
          className='text-inknity-yellow hover:text-inknity-purple transition'
        >
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

        <h2 className='font-bold text-lg text-inknity-white'>
          Chat com @{targetUsername}
        </h2>

        <div className="size-8" />
      </header>

      <main className='flex-1 w-full overflow-y-auto px-4 py-3 space-y-2'>
        {
          loading && <p className='text-center text-white/50'>Carregando mensagens...</p>
        }

        {
          messages.map(msg => {
            const isMe = msg.senderId === user?.id

            return (
              <div key={msg.id} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-md ${
                    isMe 
                    ? 'bg-inknity-purple text-white rounded-br-none' 
                    : 'bg-inknity-background text-inknity-white/90 rounded-bl-none'
                  }`}
                >
                  <p className='text-sm break-words'>{msg.text}</p>
                  <span className='text-xs text-inknity-white/50 block text-right'>
                    {msg.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            )
          })
        }
        <div ref={messagesEndRef}></div>
      </main>

      <footer className='flex items-center w-full h-1/10 px-4 py-2 bg-inknity-background border-t border-inknity-purple/30'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Digite sua mensagem...'
          className='flex-1 px-4 py-2 bg-inknity-background-2 rounded-md text-white outline-none placeholder-inknity-white/50'
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className='ml-3 px-4 py-2 bg-inknity-purple rounded-md font-bold hover:bg-inknity-purple/80 transition-all duration-200'
        >
          Enviar
        </button>
      </footer>
    </div>
  )
}

export default Chat
