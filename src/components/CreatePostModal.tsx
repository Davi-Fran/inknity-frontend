import { useEffect, useState } from 'react'

export const CreatePostModal = ({ open, onClose, onSubmit }) => {
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [text, setText] = useState("")

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  if (!open) return null

  const handleImage = (e) => {
    const file = e.target.files[0]
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = () => {
    if (!imageFile || !text.trim()) return
    onSubmit({ imageFile, text })
    setImageFile(null)
    setImagePreview(null)
    setText("")
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="w-11/12 md:w-1/3 bg-inknity-background rounded-xl p-5 shadow-xl flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Criar novo post</h2>
          <button
            onClick={onClose}
            className="text-inknity-white/70 hover:text-inknity-purple transition"
          >
            ✕
          </button>
        </div>

        {imagePreview ? (
          <img
            src={imagePreview}
            alt="preview"
            className="w-full h-52 object-cover rounded-md"
          />
        ) : (
          <label className="w-full h-40 border border-dashed rounded-md flex justify-center items-center cursor-pointer hover:bg-white/5">
            <p className="opacity-70">Clique para enviar uma imagem</p>
            <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
          </label>
        )}

        <textarea
          placeholder="Escreva uma descrição..."
          className="w-full h-28 bg-inknity-background-2 p-3 rounded-md outline-none focus:ring-2 focus:ring-inknity-purple/50"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-inknity-purple w-full py-2 rounded-md font-bold hover:bg-inknity-purple/80 transition disabled:opacity-40"
          disabled={!imageFile || !text.trim()}
        >
          Publicar
        </button>
      </div>
    </div>
  )
}