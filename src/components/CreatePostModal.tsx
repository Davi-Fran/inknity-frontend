import { useEffect, useState } from 'react'

export const CreatePostModal = ({ open, onClose, onSubmit }) => {
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  if (!open) return null

  const handleImage = (e) => {
    const file = e.target.files[0]
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
  }

  const handleSubmit = () => {
    if (!imageFile || !text.trim() || !title.trim()) return

    onSubmit({ imageFile, text, title })
    setImageFile(null)
    setImagePreview(null)
    setTitle("")
    setText("")
    onClose()
  }

  const inputStyle =
    "bg-inknity-background-2 p-3 rounded-md outline-none focus:ring-2 focus:ring-inknity-purple/50"

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="w-11/12 md:w-1/3 bg-inknity-background rounded-xl p-5 shadow-xl flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Criar novo post</h2>
          <button
            onClick={onClose}
            className="text-inknity-white/70 hover:text-inknity-purple transition"
          >
            ✕
          </button>
        </div>

        {/* IMAGE PREVIEW */}
        {imagePreview ? (
          <div className="relative">
            <img
              src={imagePreview}
              alt="preview"
              className="w-full h-52 object-cover rounded-md"
            />

            <button
              className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
              onClick={removeImage}
            >
              ×
            </button>
          </div>
        ) : (
          <label className="w-full h-40 border border-dashed rounded-md flex justify-center items-center cursor-pointer hover:bg-white/5">
            <p className="opacity-70">Clique para enviar uma imagem</p>
            <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
          </label>
        )}

        {/* TITLE */}
        <input
          className={inputStyle}
          placeholder="Título do post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Escreva uma descrição..."
          className={`${inputStyle} h-28 resize-none`}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-inknity-purple w-full py-2 rounded-md font-bold hover:bg-inknity-purple/80 transition"
          disabled={!imageFile || !text.trim() || !title.trim()}
        >
          Publicar
        </button>
      </div>
    </div>
  )
}
