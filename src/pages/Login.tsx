import { Art } from '../components/Art'
import { Link, useNavigate } from 'react-router'
import { useAuthentication } from '../contexts/AuthContext'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

const schema = z.object({
    email: z.string().email({ message: 'Informe um e-mail válido!' }),
    password: z.string().min(6, { message: 'A senha deve conter pelo menos 6 caracteres!' })
})

type FormValues = z.infer<typeof schema>

const Login = () => {
    const [show, setShow] = useState(false)

    const { authUser } = useAuthentication()

    const navigation = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema)
    })

    const handleLogin = async (data: FormValues) => {
        let success = await authUser(data.email, data.password)

        if (success) {
            navigation('/user/johndoe/feed/foryou')
        } else {
            setShow(true)
        }
    }

    return (
        <div className='h-screen w-screen md:flex'>
            <Art />

            <form onSubmit={handleSubmit(handleLogin)} className='flex flex-col h-3/4 pt-24 items-center gap-14 md:w-3/5 md:h-full md:p-0 md:justify-center'>
                <header className='w-5/6 text-center border-r-4 border-l-4 border-l-inknity-purple border-r-inknity-yellow md:w-1/2'>
                    <h1 className='text-5xl font-bold'>Login</h1>
                </header>

                <main className='w-full flex flex-col items-center'>
                    <input 
                        type='email'
                        placeholder='Email'
                        {...register('email')}
                        className={`input w-5/6 py-2.5 px-2 transtion-all duration-200 ${errors?.email ? 'border-red-600' : 'mb-4'} md:w-1/2`}
                    />

                    {
                        errors?.email && (
                            <div className='w-5/6 mb-4 mt-2 md:w-1/2'>
                                <p className='text-sm text-red-600'>{errors.email.message}</p>
                            </div>
                        )
                    }

                    <input 
                        type='password'
                        placeholder='Senha'
                        {...register('password')}
                        className={`input w-5/6 py-2.5 px-2 ${errors?.password ? 'border-red-600' : 'mb-14 md:mb-4'} transition-all duration-200 md:w-1/2`}
                    />

                    {
                        errors?.password && (
                            <div className='w-5/6 mb-14 mt-2 md:w-1/2 md:mb-4'>
                                <p className='text-sm text-red-600'>{errors.password.message}</p>
                            </div>
                        )
                    }
                    
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

                    {
                        show && <p className='mt-10 text-sm text-red-600'>Ocorreu um erro na autenticação!</p>
                    }
                </main>
            </form>

           
        </div>
    )
}

export default Login