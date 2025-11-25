import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { Art } from '../components/Art'
import { useAuth } from '../contexts/AuthContext'
import { useSignUpContext } from '../contexts/SignUpContext'
import { authService } from '../services/api'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useError } from '../contexts/ErrorContext'

const profileSchema = z.object({
    displayName: z.string().min(2, 'Nome muito curto'),
    username: z.string().min(3, 'Username deve ter no mínimo 3 caracteres')
        .regex(/^[a-zA-Z0-9_]+$/, "Apenas letras, números e underline"),
    pronouns: z.string().optional(),
    bio: z.string().max(300, 'Bio muito longa').optional()
})

type ProfileFormValues = z.infer<typeof profileSchema>

const CreateProfile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const navigation = useNavigate()
    const { isAuthenticated, user } = useAuth()
    const { updateData, data: savedData } = useSignUpContext()
    const { triggerError } = useError()

    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            displayName: savedData.displayName || '',
            username: savedData.username || '',
            pronouns: savedData.pronouns || '',
            bio: savedData.bio || ''
        }
    })

    if (isAuthenticated) {
        navigation(`/user/${user?.username}/feed/foryou`)
    }

    useEffect(() => {
        window.addEventListener('resize', () => setIsMobile(window.innerWidth < 768))
        return () => window.removeEventListener('resize', () => setIsMobile(window.innerWidth < 768))
    }, [])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            setAvatarFile(file)
            setAvatarPreview(URL.createObjectURL(file))
        }
    }

    const handleNextStep = async (formData: ProfileFormValues) => {
        try {
            const isAvailable = await authService.verifyUsername(formData.username)

            if (!isAvailable) {
                setError('username', { type: 'manual', message: 'Este nome de usuário já está em uso!' })
                triggerError('Este nome de usuário já está em uso!')
                return
            }

            updateData({
                ...formData,
                imageFile: avatarFile
            })
            navigation('/selectStyles')
        } catch (error) {
            console.error('Erro ao validar username: ', error)
            triggerError('Erro ao validar username!')
        }
    }

    return (
        <div className='h-screen w-screen md:flex'>
            {!isMobile && <Art />}

            <form onSubmit={handleSubmit(handleNextStep)} className='flex flex-col h-3/4 pt-12 items-center gap-14 md:w-3/5 md:h-full md:p-0 md:justify-center md:gap-4'>
                <header className='flex flex-col items-center w-5/6 md:w-3/4'>
                    <div className='w-full'>
                        <Link to='/register' className='mb-5 justify-self-start'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='size-6'>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                            </svg>
                        </Link>
                    </div>

                    <label className='group relative flex justify-center items-center size-40 md:size-45 bg-gray-700/40 rounded-full hover:bg-gray-700/60 cursor-pointer overflow-hidden transition-all border-2 border-transparent hover:border-inknity-purple'>

                        {/* Input Invisível */}
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />

                        {avatarPreview ? (
                            // Se tiver preview, mostra a imagem
                            <img
                                src={avatarPreview}
                                alt="Avatar Preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            // Se não tiver, mostra o ícone SVG original
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='1.5' className='size-12 stroke-inknity-white/60 group-hover:stroke-inknity-white/80'>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z' />
                                <path strokeLinecap='round' strokeLinejoin='round' d='M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z' />
                            </svg>
                        )}

                        {/* Overlay opcional para indicar que pode editar quando já tem imagem */}
                        {avatarPreview && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white text-xs font-bold">Alterar</span>
                            </div>
                        )}
                    </label>
                </header>

                <main className='w-full flex flex-col items-center'>
                    <input
                        type='text'
                        placeholder='Nome de exibição'
                        {...register('displayName')}
                        className={`input w-5/6 py-2.5 px-2 mb-4 transtion-all duration-200 md:w-1/2 ${errors.displayName ? 'border-red-600' : ''}`}
                    />
                    {errors.displayName && <span className='text-red-500 text-sm mb-2'>{errors.displayName.message}</span>}

                    <input
                        type='text'
                        placeholder='Nome de usuário'
                        {...register('username')}
                        className={`input w-5/6 py-2.5 px-2 mb-4 transtion-all duration-200 md:w-1/2 ${errors.username ? 'border-red-600' : ''}`}
                    />
                    {errors.username && <span className='text-red-500 text-sm mb-2'>{errors.username.message}</span>}

                    <input
                        type='text'
                        placeholder='Pronomes'
                        {...register('pronouns')}
                        className='input w-5/6 py-2.5 px-2 mb-4 transtion-all duration-200 md:w-1/2'
                    />

                    <textarea
                        placeholder='Bio'
                        {...register('bio')}
                        className='input w-5/6 h-34 py-2.5 px-2 mb-14 resize-none transtion-all duration-200 md:w-1/2 md:mb-4 md:h-28'
                    ></textarea>

                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className='formButton w-5/6 py-3 px-2 mb-3 transtion-all duration-200 md:w-1/2'
                    >
                        {isSubmitting ? 'Verificando' : 'Avançar'}
                    </button>
                </main>
            </form>
        </div>
    )
}

export default CreateProfile