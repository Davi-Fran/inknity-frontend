import { useState, useEffect } from "react"

export const CreateCommissionModal = ({ open, onClose, onSubmit }) => {
const [imageFile, setImageFile] = useState(null)
const [imagePreview, setImagePreview] = useState(null)

const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [price, setPrice] = useState("")
const [backgroundType, setBackgroundType] = useState("Simples")
const [deliveryTime, setDeliveryTime] = useState("")

useEffect(() => {
const keyHandler = (e) => e.key === "Escape" && onClose()
window.addEventListener("keydown", keyHandler)
return () => window.removeEventListener("keydown", keyHandler)
}, [])

if (!open) return null

const handleImage = (e) => {
const file = e.target.files[0]
setImageFile(file)
setImagePreview(URL.createObjectURL(file))
}

const handleSubmit = () => {
if (!name.trim() || !imageFile) return


onSubmit({
  name,
  description,
  price,
  imageFile,
  backgroundType,
  deliveryTime
})

setName("")
setDescription("")
setPrice("")
setDeliveryTime("")
setImagePreview(null)
setImageFile(null)
onClose()


}

const inputStyle =
"bg-inknity-background-2 p-3 rounded-md outline-none focus:ring-2 focus:ring-inknity-purple/50"

return ( <div
   className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center"
   onClick={onClose}
 >
<div
className="w-11/12 md:w-2/4 bg-inknity-background rounded-xl p-5 shadow-xl flex flex-col gap-4 max-h-[90vh] overflow-auto"
onClick={(e) => e.stopPropagation()}
> <div className="flex justify-between items-center"> <h2 className="text-xl font-bold">Criar comissão</h2> <button
         onClick={onClose}
         className="text-inknity-white/70 hover:text-inknity-purple transition"
       >
✕ </button> </div>


    {imagePreview ? (
      <img src={imagePreview} className="w-full h-48 object-cover rounded-md" />
    ) : (
      <label className="w-full h-40 border border-dashed rounded-md flex items-center justify-center cursor-pointer hover:bg-white/5">
        <p className="opacity-70">Clique para enviar uma imagem</p>
        <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
      </label>
    )}

    <input
      className={inputStyle}
      placeholder="Nome da Comissão"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />

    <textarea
      className={`${inputStyle} h-24 resize-none`}
      placeholder="Descrição"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />

    <input
      type="number"
      className={inputStyle}
      placeholder="Preço Base (R$)"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
    />

    <div className="flex flex-col gap-2">
      <p className="text-sm text-gray-300">Tipo de Fundo</p>
      <select
        className={inputStyle}
        value={backgroundType}
        onChange={(e) => setBackgroundType(e.target.value)}
      >
        <option>Simples</option>
        <option>Detalhado</option>
        <option>Sem Fundo</option>
      </select>
    </div>

    <input
      type="text"
      className={inputStyle}
      placeholder="Prazo de entrega (ex: 7 dias)"
      value={deliveryTime}
      onChange={(e) => setDeliveryTime(e.target.value)}
    />


    <button
      onClick={handleSubmit}
      className="bg-inknity-purple w-full py-2 rounded-md font-bold hover:bg-inknity-purple/80 transition"
      disabled={!imageFile || !name.trim()}
    >
      Publicar
    </button>
  </div>
</div>

)
}
