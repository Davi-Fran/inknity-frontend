import { Art } from '../components/Art'
import { Link, useNavigate } from 'react-router'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
    email: z.string().email({ message: 'Informe um e-mail válido!' }),
    password: z.string().min(6, { message: 'A senha deve conter pelo menos 6 caracteres!' }),
    confirmPassword: z.string().min(6, { message: 'A senha deve ser a mesma digitada anteriormente!' })
})

type FormValues = z.infer<typeof schema>

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema)
    })

    const navigation = useNavigate()

    const handleSignUp = (data: FormValues) => {
        if (data.password === data.confirmPassword) {
            navigation('/createProfile')
        } else {
            console.log(errors?.confirmPassword)
        }
    }

    return (
        <div className='h-screen w-screen md:flex'>
            <Art />

            <form onSubmit={handleSubmit(handleSignUp)} className='flex flex-col h-3/4 pt-24 items-center gap-14 md:w-3/5 md:h-full md:p-0 md:justify-center'>
                <header className='w-5/6 text-center border-r-4 border-l-4 border-l-inknity-purple border-r-inknity-yellow md:w-1/2'>
                    <h1 className='text-5xl font-bold'>Cadastro</h1>
                </header>

                <main className='w-full flex flex-col items-center'>
                    <input 
                        type='email'
                        placeholder='Email'
                        {...register('email')}
                        className={`input w-5/6 py-2.5 px-2 ${errors.email ? 'border-red-600' : 'mb-4'} transtion-all duration-200 md:w-1/2`}
                    />

                    {
                        errors?.email && <p className='text-sm text-red-600 w-5/6 mb-4 mt-2 md:w-1/2'>{errors.email.message}</p>
                    }

                    <input 
                        type='password'
                        placeholder='Senha'
                        {...register('password')}
                        className={`input w-5/6 py-2.5 px-2 ${errors.password ? 'border-red-600' : 'mb-4'} transtion-all duration-200 md:w-1/2`}
                    />

                    {
                        errors?.password && <p className='text-sm text-red-600 w-5/6 mt-2 mb-4 md:w-1/2'>{errors.password.message}</p>
                    }

                    <input 
                        type='password'
                        placeholder='Confirmar senha'
                        {...register('confirmPassword')}
                        className={`input w-5/6 py-2.5 px-2 ${errors.confirmPassword ? 'border-red-600' : 'mb-14 md:mb-4'} transtion-all duration-200 md:w-1/2`}
                    />

                    {
                        errors?.confirmPassword && <p className='text-sm text-red-600 w-5/6 mb-10 mt-2 md:w-1/2 md:mb-4'>{errors.confirmPassword.message}</p>
                    }
                    
                    <button 
                        type='submit'
                        className='formButton w-5/6 py-3 px-2 mb-3 transtion-all duration-200 md:w-1/2'
                    >Cadastrar</button>

                    <p>
                        Já tem uma conta?
                        <Link 
                            to='/login' 
                            className='ml-1 text-inknity-purple hover:underline'
                        >Faça login!</Link>
                    </p>
                </main>
            </form>
        </div>
    )
}

export default SignUp