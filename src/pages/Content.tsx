import { useParams } from "react-router-dom"
import { useState } from "react"
import { useSignUpContext } from "../contexts/SignUpContext"

const Content = () => {
  const { username } = useParams()

  const { data: savedData } = useSignUpContext()
  console.log(savedData?.styles)

  const selectedTags = savedData?.styles || []
  const [showNSFW, setShowNSFW] = useState(false)

  return (
    <div className="w-full h-full md:w-11/12">

      <header className="relative w-full h-1/12 flex items-center px-5 bg-inknity-background border-b border-inknity-purple/30">
        <h2 className="w-full text-center font-bold text-lg text-inknity-white">
          Preferências de Conteúdo
        </h2>
      </header>

      <main className="w-full h-full overflow-auto p-4 space-y-6">

        {/* Mostrar tags selecionadas no cadastro */}
        <div>
          <p className="text-sm text-inknity-white/60 mb-2">
            Seus estilos favoritos:
          </p>

          {selectedTags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedTags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-inknity-purple/40 
                  border border-inknity-purple/60 
                  rounded-full text-xs text-inknity-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-inknity-white/40 text-sm">
              Nenhum estilo selecionado ainda.
            </p>
          )}
        </div>

        {/* Checkbox personalizado */}
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={showNSFW}
            onChange={() => setShowNSFW(!showNSFW)}
            className="peer hidden"
          />

          <span
            className="w-5 h-5 rounded border border-inknity-purple/60 flex items-center justify-center 
            peer-checked:bg-inknity-purple peer-checked:border-inknity-purple transition"
          >
            <svg
              className="hidden peer-checked:block"
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>

          <span className="text-sm text-inknity-white/90">
            Permitir conteúdo sensível
          </span>
        </label>

      </main>
    </div>
  )
}

export default Content
