import { Link, useParams } from "react-router-dom"
import { BookmarkCheck } from "lucide-react"
import { Post } from "../components/Post"

const Saved = () => {
  const { username } = useParams()

  return (
    <div className="w-full h-full md:w-11/12">

      <header className="relative w-full h-1/12 flex items-center px-5 bg-inknity-background border-b border-inknity-purple/30">
        <Link
          to={`/user/${username}/settings`}
          className="text-inknity-yellow hover:text-inknity-purple transition"
        >
          ←
        </Link>

        <h2 className="w-full text-center font-bold text-lg text-inknity-white">
          Salvos
        </h2>
      </header>

      <main className="w-full h-full overflow-auto p-4 space-y-4">

        {/* Caso não tenha salvos: */}
        <div className="w-full flex flex-col items-center mt-10 text-center">
          <BookmarkCheck size={50} className="text-inknity-purple/70" />
          <p className="mt-3 text-inknity-white/80">
            Você ainda não salvou nenhum post.
          </p>
        </div>

        {/* Quando tiver posts salvos: 
            (depois puxa o banco) */}

      </main>
    </div>
  )
}

export default Saved
