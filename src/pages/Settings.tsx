import { Link, Outlet, useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Settings = () => {
  const { username } = useParams()
  const navigation = useNavigate()
  const { logout } = useAuth()

  const settingsItems = [
    {
      title: 'Itens Salvos',
      icon: '💾',
      link: `/user/${username}/settings/saved`,
    },
    {
      title: 'Preferências de Conteúdo',
      icon: '🎭',
      link: `/user/${username}/settings/content`,
    },
    {
      title: 'Atualizar Senha',
      icon: '🔐',
      link: `/user/${username}/settings/password`,
    },
    {
      title: 'Pedidos e Pagamentos',
      icon: '💳',
      link: `/user/${username}/settings/orders`,
    },
  ]

  const handleLogout = () => {
    logout()
    navigation('/login')
  }

  return (
    <div className="w-full h-screen flex bg-inknity-background text-white md:w-11/12" >

      {/* SIDEBAR DESKTOP */}
      <aside className="hidden md:flex flex-col w-72 border-r border-inknity-purple/20 p-6 gap-4">
        <h2 className="text-lg font-semibold text-inknity-yellow mb-4">
          Configurações
        </h2>

        <nav className="flex flex-col gap-2">
          {settingsItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="flex items-center gap-3 p-3 rounded-md hover:bg-inknity-purple/20 transition cursor-pointer"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm">{item.title}</span>
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto text-xs text-inknity-white/60 hover:text-inknity-yellow transition"
        >
          Sair da conta
        </button>
      </aside>

      {/* MOBILE HEADER */}
      <header className="md:hidden w-full h-16 bg-inknity-background-2 flex items-center justify-center border-b border-inknity-purple/20">
        <h2 className="text-inknity-yellow font-semibold text-lg">Configurações</h2>
      </header>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 overflow-auto p-6 md:p-10">
        <Outlet />

        {/* Mobile lista */}
        <div className="md:hidden flex flex-col gap-4">
          {settingsItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="flex items-center justify-between p-4 rounded-md bg-inknity-background-2 hover:bg-inknity-purple/20 transition-all duration-300 cursor-pointer border border-transparent hover:border-inknity-purple/30"
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-base">{item.title}</h3>
                </div>
              </div>
              <div className="text-inknity-yellow text-lg">›</div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Settings
