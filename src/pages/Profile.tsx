import { Link, useParams, useLocation, useNavigate } from 'react-router'
import { useState } from 'react'
import { Post } from '../components/Post'
import standard from '../assets/img/standard.svg'
import { ProfileTag } from '../components/ProfileTag'
import { CommentsModal } from '../components/CommentsModal'
import { CreatePostModal } from '../components/CreatePostModal'

const Profile = () => {
  const { username } = useParams()
  const location = useLocation()
  const navigation = useNavigate()

  const [selectedComments, setSelectedComments] = useState([])
  const [addCommentFn, setAddCommentFn] = useState(() => () => {})
  const [openComments, setOpenComments] = useState(false)

  const [openCreatePost, setOpenCreatePost] = useState(false)

  const handleActive = (route) => `/user/${username}/profile/${route}` === location.pathname

  const handleEditProfile = () => {
    navigation(`/user/${username}/edit-profile`)
  }

  const handlePublishPost = (data) => {
    console.log("PUBLICAR POST:", data)
    // aqui depois integra ao firebase
    setOpenCreatePost(false)
  }

  const [tags, setTags] = useState([
    { label: 'Medieval', active: false },
    { label: 'Steampunk', active: false },
    { label: 'Cyberpunk', active: false },
    { label: 'Pintura', active: false },
    { label: 'Cubismo', active: false },
    { label: 'Cartoon', active: false },
  ])

  const toggleTag = (label) => {
    setTags(tags.map(tag =>
      tag.label === label ? { ...tag, active: !tag.active } : tag
    ))
  }

  return (
    <div className='w-full h-full md:w-11/12'>
      <header className='relative w-full h-3/12 flex justify-center items-center bg-inknity-banner/87'>
        <Link to={`/user/${username}/feed/foryou`} className='absolute inset-0 left-3 top-6'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='size-6'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
          </svg>
        </Link>

        <img src={standard} alt='Logo padrão da Inknity' className='w-1/2 opacity-50 md:w-1/6' />
      </header>

      <section className='w-full -mt-10'>
        <div className='relative flex w-full h-1/2 px-5'>
          <div className='w-1/2'>
            <div className='size-25 rounded-full border-4 border-inknity-dark-purple bg-cover bg-center bg-[url(/src/assets/img/userPhoto.png)]'></div>

            <p className='mt-2 text-2xl font-bold'>John Doe</p>
            <p className='text-sm'>@johndoe</p>
          </div>

          <div className='flex gap-3 items-center w-1/2 justify-end'>
            <button
              onClick={handleEditProfile}
              className='profileButton p-3 transition-all duration-200'
            >
              Editar Perfil
            </button>

            <button
              onClick={() => setOpenCreatePost(true)}
              className="
                fixed bottom-9 right-15
                bg-inknity-purple 
                text-white 
                size-14
                rounded-full 
                flex items-center justify-center
                text-4xl
                shadow-lg shadow-inknity-purple/40
                hover:bg-inknity-purple/80
                transition
                z-50"
            >
              +
            </button>

          </div>
        </div>
      </section>

      <section className='w-full h-2/12 my-5 md:overflow-auto md:h-6/12'>
        <div className='w-full h-1/3 flex text-center items-center text-lg'>
          <Link
            to={`/user/${username}/profile/posts`}
            className={`w-1/2 border-b-2 border-inknity-white ${handleActive('posts') ? 'border-inknity-yellow text-inknity-yellow font-bold' : ''}`}
          >
            Posts
          </Link>

          <Link
            to={`/user/${username}/profile/comissions`}
            className={`w-1/2 border-b-2 border-inknity-white ${handleActive('comissions') ? 'border-inknity-yellow text-inknity-yellow font-bold' : ''}`}
          >
            Comissões
          </Link>
        </div>

        <div className='w-full h-2/3 flex justify-center gap-2 flex-wrap py-2 mb-14 md:h-1/4 md:mb-0'>
          {tags.map(tag => (
            <ProfileTag
              key={tag.label}
              label={tag.label}
              active={tag.active}
              onClick={() => toggleTag(tag.label)}
            />
          ))}
        </div>

        <main className='w-full'>
          {/* <Post 
            onOpenComments={(postComments, addCommentFn) => {
              setSelectedComments(postComments)
              setAddCommentFn(() => addCommentFn)
              setOpenComments(true)
              data={
            }}
          />

          <Post 
            onOpenComments={(postComments, addCommentFn) => {
              setSelectedComments(postComments)
              setAddCommentFn(() => addCommentFn)
              setOpenComments(true)
            }}
          /> */}

          <CommentsModal
            open={openComments}
            onClose={() => setOpenComments(false)}
            comments={selectedComments}
            onAddComment={(text) => addCommentFn(text)}
          />

          <CreatePostModal
            open={openCreatePost}
            onClose={() => setOpenCreatePost(false)}
            onSubmit={(data) => handlePublishPost(data)}
          />

        </main>
      </section>
    </div>
  )
}

export default Profile