import { useParams } from "react-router-dom"

const OrderSettings = () => {
  const { username } = useParams()

  const orders = [
    { id: 1, title: "Comissão - Avatar chibi", status: "Pago" },
    { id: 2, title: "Background ilustrado", status: "Pendente" },
  ]

  return (
    <div className="w-full h-full md:w-11/12">

      <header className="relative w-full h-1/12 flex items-center px-5 bg-inknity-background border-b border-inknity-purple/30">
        <h2 className="w-full text-center font-bold text-lg text-inknity-white">
          Pedidos e Pagamentos
        </h2>
      </header>

      <main className="w-full h-full overflow-auto p-4 space-y-4">

        {orders.length === 0 ? (
          <div className="w-full flex flex-col items-center mt-10 text-center text-inknity-white/80">
            Você ainda não fez nenhum pedido.
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {orders.map(order => (
              <li
                key={order.id}
                className="p-4 rounded-md bg-inknity-background-2 border border-inknity-purple/20"
              >
                <strong>{order.title}</strong>
                <p className="text-sm text-inknity-white/60">
                  Status: {order.status}
                </p>
              </li>
            ))}
          </ul>
        )}

      </main>
    </div>
  )
}

export default OrderSettings