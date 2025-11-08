import { NavLink, Link, useParams } from 'react-router-dom'

const settingsItems = [
  {
    title: 'Itens Salvos',
    icon: '💾',
    link: 'saved',
    desc: 'Veja e gerencie o conteúdo que você salvou',
  },
  {
    title: 'Preferências de Conteúdo',
    icon: '🎭',
    link: 'content',
    desc: 'Ajuste o tipo de conteúdo que aparece pra você',
  },
  {
    title: 'Atualizar Senha',
    icon: '🔐',
    link: 'password',
    desc: 'Altere sua senha de forma segura',
  },
  {
    title: 'Insights',
    icon: '📊',
    link: 'insights',
    desc: 'Acompanhe o desempenho das suas postagens',
  },
  {
    title: 'Favoritos',
    icon: '⭐',
    link: 'favorites',
    desc: 'Veja suas postagens favoritas',
  },
  {
    title: 'Pedidos e Pagamentos',
    icon: '💳',
    link: 'orders',
    desc: 'Gerencie compras e transações',
  },
]

const Settings = () => {
  const { username } = useParams()

  return (
    <div className='h-13/14 w-full md:h-full md:w-11/12 md:flex md:flex-col md:items-center'>

      <header className='w-full h-1/6 md:flex md:items-center md:h-1/10'>
  
        <section className='flex items-center justify-between w-full h-1/2 bg-inknity-background-2 px-5 md:hidden'>
          <div className='w-1/2 h-full bg-cover bg-center bg-[url(/src/assets/img/inline.svg)]'></div>

          <div className='flex items-center w-1/4 h-full gap-2 mr-2'>
            <NavLink to={`/user/${username}/notifications`}>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-8'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0' />
              </svg>
            </NavLink>

            <NavLink to={`/user/${username}/chat`}>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-8'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z' />
              </svg>
            </NavLink>
          </div>
        </section>

        <section className='flex justify-center items-center w-full h-1/2'>
          <h2 className='text-inknity-yellow text-lg font-semibold'>Configurações</h2>
        </section>
      </header>

      <main className='w-full h-5/6 overflow-auto md:w-5/8 md:px-8 md:pt-5 md:bg-inknity-background md:rounded-md md:h-full text-white'>
        <div className='flex flex-col gap-4 py-6'>
          {settingsItems.map((item, i) => (
            <Link
              key={i}
              to={`/user/${username}/settings/${item.link}`}
              className='flex items-center justify-between p-4 rounded-md bg-inknity-background-2 hover:bg-inknity-purple/20 transition-all duration-300 cursor-pointer border border-transparent hover:border-inknity-purple/30'
            >
              <div className='flex items-center gap-4'>
                <div className='text-2xl'>{item.icon}</div>
                <div>
                  <h3 className='font-semibold text-base'>{item.title}</h3>
                  <p className='text-sm text-inknity-white/60'>{item.desc}</p>
                </div>
              </div>
              <div className='text-inknity-yellow text-lg'>›</div>
            </Link>
          ))}
        </div>

        <div className='flex justify-center py-6'>
          <button className='text-sm text-inknity-white/60 hover:text-inknity-yellow transition'>
            Sair da conta
          </button>
        </div>
      </main>
    </div>
  )
}

export default Settings