import { Art } from '../components/Art'
import { useState } from 'react'
import { Link } from 'react-router'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className='h-screen w-screen md:flex'>
            <Art />

            <form className='flex flex-col h-3/4 pt-24 items-center gap-14 md:w-3/5 md:h-full md:p-0 md:justify-center'>
                <header className='w-5/6 text-center border-r-4 border-l-4 border-l-inknity-purple border-r-inknity-yellow md:w-1/2'>
                    <h1 className='text-5xl font-bold'>Login</h1>
                </header>

                <main className='w-full flex flex-col items-center'>
                    <input 
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className='input w-5/6 py-2.5 px-2 transtion-all duration-200 mb-4 md:w-1/2'
                    />

                    <input 
                        type='password'
                        placeholder='Senha'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className='input w-5/6 py-2.5 px-2 mb-14  md:w-1/2 md:mb-4'
                    />
                    
                    <button 
                        type='submit'
                        className='formButton w-5/6 py-3 px-2 mb-3 transtion-all duration-200 md:w-1/2'
                    >Entrar</button>

                    <p>
                        Não tem conta?
                        <Link 
                            to='/register' 
                            className='ml-1 text-inknity-purple hover:underline'
                        >Cadastre-se!</Link>
                    </p>
                </main>
            </form>
        </div>
    )
}

export default Login