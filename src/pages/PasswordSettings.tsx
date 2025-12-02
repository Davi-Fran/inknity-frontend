import { useParams } from "react-router-dom"
import { useState } from "react"

const PasswordSettings = () => {
  const { username } = useParams()

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Senha alterada com sucesso!")
  }

  return (
    <div className="w-full h-full md:w-11/12">

      <header className="relative w-full h-1/12 flex items-center px-5 bg-inknity-background border-b border-inknity-purple/30">
        <h2 className="w-full text-center font-bold text-lg text-inknity-white">
          Atualizar Senha
        </h2>
      </header>

      <main className="w-full h-full overflow-auto p-4 space-y-4" >

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto mt-9">
          <input
            type="password"
            placeholder="Senha atual"
            className="p-3 rounded-md bg-inknity-background-2"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Nova senha"
            className="p-3 rounded-md bg-inknity-background-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button
            className="bg-inknity-purple hover:bg-inknity-yellow hover:text-black transition rounded-md p-3"
          >
            Atualizar Senha
          </button>
        </form>

      </main>
    </div>
  )
}

export default PasswordSettings
