import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ProfileTag } from '../components/ProfileTag'
import { CommentsModal } from '../components/CommentsModal'
import { CreatePostModal } from '../components/CreatePostModal'
import { CreateCommissionModal } from '../components/CreateCommissionModal'

import standard from '../assets/img/standard.svg'
import userPhotoImg from '../assets/img/userPhoto.png'

const ContentCard = ({ title, body, imageUrl, onOpenComments }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [wasLiked, setWasLiked] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  const handleLike = () => {
    setWasLiked(!wasLiked);
    setLikeCount(prev => wasLiked ? prev - 1 : prev + 1);
  };


  return (

    <div className='p-4 mb-4 bg-inknity-background-2 rounded-xl shadow-lg'>
      <div className='flex items-start'>
        
        {/* Mini banner */}
        <div className='w-1/3 h-auto mr-4 flex items-center justify-center bg-inknity-banner/50 rounded-lg p-4'>
          <img 
            src={imageUrl || standard} 
            alt="Imagem de Conteúdo" 
            className='w-full h-auto object-cover opacity-80' 
          />
        </div>

        {/* Texto + Ícones */}
        <div className='w-2/3'>
          <p className='text-white text-base font-medium'>
            {title}
          </p>

          <p className='text-sm text-gray-400 mt-1'>
            {body}
          </p>

          <div className='flex justify-end items-center mt-3 text-gray-400 gap-4'>

            {/* Like */}
            <div className='flex items-center gap-1.5'>
              <svg 
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5} 
                stroke='currentColor' 
                onClick={handleLike}
                className={`size-7 hover:text-inknity-purple hover:cursor-pointer ${
                  wasLiked ? 'fill-red-700 stroke-red-700' : ''
                } transition-all duration-200`}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z' />
              </svg>
              <p>{likeCount}</p>
            </div>

            {/* Comments */}
            <div className='flex items-center gap-1.5'>
              <svg 
                xmlns='http://www.w3.org/2000/svg' 
                fill='none' 
                viewBox='0 0 24 24' 
                strokeWidth={1.5} 
                stroke='currentColor'
                onClick={() => onOpenComments && onOpenComments()}
                className='size-7 hover:text-inknity-purple hover:cursor-pointer transition-all duration-300'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z' />
              </svg>
              <p>{commentCount}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const { username } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const [selectedComments, setSelectedComments] = useState([])
  const [addCommentFn, setAddCommentFn] = useState(() => () => {})
  const [openComments, setOpenComments] = useState(false)
  const [openCreatePost, setOpenCreatePost] = useState(false)
  const [openCreateCommission, setOpenCreateCommission] = useState(false)

  const handleSubmitCommission = (data) => {
  console.log("Nova comissão enviada:", data)
  setOpenCreateCommission(false)
}

  const handleActive = (route) => location.pathname.endsWith(route)

  const handlePublishPost = (data) => {
    console.log("PUBLICANDO POST:", data)
    setOpenCreatePost(false)
  }

  const [displayName, setDisplayName] = useState("John Doe");
  const [bio, setBio] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...");

  const [userPhoto, setUserPhoto] = useState(userPhotoImg);

  const [isFollowing, setIsFollowing] = useState(false)

  const [bannerImage, setBannerImage] = useState(null)

  const [tags, setTags] = useState([
    { label: 'Medieval', active: true },
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
    <div className='min-h-screen bg-inknity-dark-purple text-white overflow-auto md:w-11/12'>
      <header className='relative w-full h-60 bg-[#2a2040] overflow-hidden'>

          <img 
            src={bannerImage || standard} 
            alt="Banner"
            className="w-70 h-60 object-cover opacity-70 mx-auto"
          />

          <div className="absolute inset-0 bg-black/20"></div>

          <input 
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer z-20"
            onChange={(e) => {
              const file = e.target.files[0]
              if (file) setBannerImage(URL.createObjectURL(file))
            }}
          />

          <Link to={`/user/${username}/feed/foryou`} className='absolute left-5 top-5 z-30'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='size-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
            </svg>
          </Link>
      </header>

      <div className='md:w-11/12 mx-auto p-6'>
        <section className='w-full flex flex-col md:flex-row mt-6 gap-6'>

          {/*COLUNA ESQUERDA*/}
          <div className='md:w-1/3 p-4'>

            {/* Foto + nome */}
            <div 
              className='size-24 rounded-full border-4 border-[#281b3d] bg-cover bg-center cursor-pointer'
              style={{ backgroundImage: `url(${userPhoto})` }}
              onClick={() => document.getElementById("profilePhotoUpload").click()}
            />

            <input 
              id="profilePhotoUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0]
                if (file) setUserPhoto(URL.createObjectURL(file))
              }}
            />

              <div>
                <p className='text-xl font-bold outline-none cursor-text'
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => setDisplayName(e.target.textContent)}
                >
                  {displayName}
                </p>

                <p className='text-sm text-gray-400'>@johndoe</p>
              </div>

            {/* Botões */}
            <div className='flex items-center space-x-3 my-4'>

              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`
                  w-full
                  py-2
                  rounded-lg
                  font-semibold
                  text-sm
                  border
                  transition-all
                  duration-200
                  cursor-pointer

                  ${
                    isFollowing
                      ? 'bg-inknity-purple border-inknity-purple text-white'
                      : 'border-inknity-purple/50 text-white hover:bg-inknity-purple/20'
                  }
                `}
              >
                {isFollowing ? "Seguindo" : "Seguir"}
              </button>

            </div>

            {/* descrição */}
            <p
              className='text-sm text-gray-300 pr-4 leading-relaxed outline-none cursor-text'
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => setBio(e.target.textContent)}
            >
              {bio}
            </p>

          </div>

          {/*COLUNA DIREITA*/}
          <div className='md:w-2/3 p-4'>

            {/* Abas */}

            <div className='w-full flex text-center text-lg mb-4 border-b border-[#2d1e44]'>

              <Link
                to={`/user/${username}/profile/posts`}
                className={`w-1/2 py-2 ${
                  handleActive('posts') 
                    ? 'border-b-2 border-inknity-yellow text-inknity-yellow' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Posts
              </Link>

              <Link
                to={`/user/${username}/profile/comissions`}
                className={`w-1/2 py-2 ${
                  handleActive('comissions')
                    ? 'border-b-2 border-inknity-yellow text-inknity-yellow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Comissões
              </Link>
            </div>


            {/* TAGS */}
            <div className='w-full flex gap-2 flex-wrap py-2 mb-4 overflow-x-auto'>
              {tags.map(tag => (
                <ProfileTag
                  key={tag.label}
                  label={tag.label}
                  active={tag.active}
                  onClick={() => toggleTag(tag.label)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    tag.active
                      ? 'bg-inknity-yellow text-[#1c132a] font-semibold'
                      : 'bg-[#281b3d] text-gray-300 border border-[#3e3158] hover:bg-[#3e3158]'
                  }`}
                />
              ))}
            </div>

            {/* LISTA DE POSTS */}
            <main className='w-full space-y-4'>
              <ContentCard 
                title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                imageUrl={standard}
                onOpenComments={() => setOpenComments(true)}
              />
              <ContentCard 
                title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                imageUrl={standard}
                onOpenComments={() => setOpenComments(true)}
              />
              <ContentCard 
                title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                imageUrl={standard}
                onOpenComments={() => setOpenComments(true)}
              />
            </main>
          </div>
        </section>
      </div>

      {/* BOTÃO FLUTUANTE DE CRIAR POST */}
      <button
        onClick={() =>
    handleActive("posts")
      ? setOpenCreatePost(true)
      : setOpenCreateCommission(true)}
        className="
          fixed bottom-9 right-9 
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


      {/* MODAIS */}
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


      <CreateCommissionModal
        open={openCreateCommission}
        onClose={() => setOpenCreateCommission(false)}
        onSubmit={handleSubmitCommission}
      />

    </div>
  )
}

export default Profile
