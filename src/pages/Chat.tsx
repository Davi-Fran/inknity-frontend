import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

const Chat = () => {
  const { username, userTarget } = useParams()
  const [messages, setMessages] = useState<{ sender: string; text: string; time: string }[]>([])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // substituir pelo banco
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        { sender: userTarget || 'amiga', text: 'oiii! como seria essa arte?', time: '10:32' },
        { sender: username || 'você', text: 'oii!! tudo bem?? eu gostaria de uma arte para meu novo rpg', time: '10:33' },
      ])
    }, 1000)
    return () => clearTimeout(timer)
  }, [username, userTarget])


  const handleSend = () => {
    if (!input.trim()) return

    const newMsg = {
      sender: username || 'você',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, newMsg])
    setInput('')

    // aqui entra a chamada ao banco
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className='flex flex-col w-full h-13/14 bg-inknity-background-2 rounded-md shadow-md md:w-11/12 md:h-full'>
      
      <header className='flex items-center justify-between w-full h-1/10 px-5 bg-inknity-background'>
        <Link to={`/user/${username}/chat`} className='text-inknity-yellow hover:text-inknity-purple transition'>
          ← Voltar
        </Link>

        <h2 className='font-bold text-lg text-inknity-white'>
          Chat com @{userTarget}
        </h2>

        <div className='size-8 rounded-full bg-inknity-purple/50 flex items-center justify-center text-sm text-white font-semibold'>
          💬
        </div>
      </header>

      <main className='flex-1 w-full overflow-y-auto px-4 py-3 space-y-2'>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex w-full ${msg.sender === username ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-md ${
                msg.sender === username
                  ? 'bg-inknity-purple text-white rounded-br-none'
                  : 'bg-inknity-background text-inknity-white/90 rounded-bl-none'
              }`}
            >
              <p className='text-sm'>{msg.text}</p>
              <span className='text-xs text-inknity-white/50 block text-right'>{msg.time}</span>
            </div>
          </div>
        ))}
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
