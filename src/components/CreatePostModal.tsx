import { useEffect, useState, type KeyboardEvent } from 'react'

// Definição simples de props para TypeScript (opcional, mas ajuda)
interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { imageFile: File; title: string; caption: string; tags: string[] }) => void;
}

export const CreatePostModal = ({ open, onClose, onSubmit }: CreatePostModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  // Dados do post
  const [title, setTitle] = useState("")
  const [text, setText] = useState("") // Caption/Descrição
  
  // Lógica das Tags
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")

  useEffect(() => {
    // Fecha com ESC
    const handleKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  // Limpa estados ao fechar ou abrir
  useEffect(() => {
    if (!open) {
      setImageFile(null)
      setImagePreview(null)
      setTitle("")
      setText("")
      setTags([])
      setCurrentTag("")
    }
  }, [open])

  if (!open) return null

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
  }

  // --- Funções de Tag ---

  const handleAddTag = () => {
    const trimmedTag = currentTag.trim()
    
    // Validações: não vazio e não duplicado
    if (!trimmedTag) return
    if (tags.includes(trimmedTag)) {
      setCurrentTag("") // Opcional: só limpa se for duplicado
      return
    }

    setTags([...tags, trimmedTag])
    setCurrentTag("")
  }

  const handleKeyDownTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault() // Impede submit do form se houver
      handleAddTag()
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  // --- Envio ---

  const handleSubmit = () => {
    // Validação básica
    if (!imageFile || !title.trim()) return

    onSubmit({ 
      imageFile, 
      caption: text, // Renomeado para caption para bater com o Profile.tsx
      title, 
      tags 
    })
    
    onClose()
  }

  // Estilos comuns
  const inputStyle = "bg-inknity-background-2 p-3 rounded-md outline-none focus:ring-2 focus:ring-inknity-purple/50 text-white placeholder-gray-500 w-full"

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-inknity-background rounded-xl p-5 shadow-2xl flex flex-col gap-4 border border-white/10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Criar novo post</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-inknity-purple transition text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* IMAGE PREVIEW AREA */}
        <div className="w-full">
          {imagePreview ? (
            <div className="relative group">
              <img
                src={imagePreview}
                alt="preview"
                className="w-full h-48 object-cover rounded-lg border border-white/10"
              />
              <button
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition shadow-lg opacity-0 group-hover:opacity-100"
                onClick={removeImage}
              >
                &times;
              </button>
            </div>
          ) : (
            <label className="w-full h-32 border-2 border-dashed border-gray-600 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:bg-white/5 transition hover:border-inknity-purple text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 mb-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <span className="text-sm">Clique para enviar imagem</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
            </label>
          )}
        </div>

        {/* TÍTULO */}
        <input
          className={inputStyle}
          placeholder="Dê um título para sua arte"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* ÁREA DE TAGS */}
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <input 
                    className={inputStyle}
                    placeholder="Adicione tags (ex: Cyberpunk, Aquarela)..."
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleKeyDownTag}
                />
                <button 
                    onClick={handleAddTag}
                    className="bg-inknity-purple/20 border border-inknity-purple text-inknity-purple px-4 rounded-md hover:bg-inknity-purple hover:text-white transition"
                >
                    +
                </button>
            </div>
            
            {/* Lista de Tags Selecionadas */}
            <div className="flex flex-wrap gap-2 mt-1 min-h-[2rem]">
                {tags.length === 0 && <span className="text-xs text-gray-500 italic">Nenhuma tag adicionada.</span>}
                {tags.map((tag, index) => (
                    <span key={index} className="flex items-center gap-1 bg-inknity-purple text-white px-2 py-1 rounded-full text-xs animate-fadeIn">
                        #{tag}
                        <button 
                            onClick={() => removeTag(tag)}
                            className="hover:text-red-300 ml-1 font-bold"
                        >
                            &times;
                        </button>
                    </span>
                ))}
            </div>
        </div>

        {/* DESCRIÇÃO (MANTIDA MAS MENOR, POIS TAGS OCUPAM ESPAÇO) */}
        <textarea
          placeholder="Descreva sua obra (opcional)..."
          className={`${inputStyle} h-20 resize-none`}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* FOOTER ACTION */}
        <button
          onClick={handleSubmit}
          className="bg-inknity-purple w-full py-3 rounded-md font-bold text-white hover:bg-inknity-purple/80 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          disabled={!imageFile || !title.trim()}
        >
          Publicar Arte
        </button>
      </div>
    </div>
  )
}