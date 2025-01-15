import styles from "./styles.module.scss"
import { X } from "lucide-react"
import {use} from "react"
import { OrderContext } from "@/providers/order" // para consumir o pcontext
import { calculateTotalOrder } from "@/lib/helper"

export function ModalOrder(){

  const {onRequestClose, order, finishOrder} = use(OrderContext)

    async function handleFinishOrder() {
        finishOrder(order[0].order_id)
    }

  return(
   <dialog className={styles.dialogContainer}>
        <section className={styles.dialogContent}>
            <button 
            className={styles.dialogBack}
            onClick={onRequestClose}
            >
                <X size={30} color="#FF3f4b" />
            </button>

            <article className={styles.container}>
                <h2>Detalhes do pedido</h2>

                <span className={styles.table}>
                    Mesa <b>{order[0].order.table}</b>
                </span>

                {order[0].order?.name && (
                    <span className={styles.nameOrder}>
                        <b>{order[0].order.name}</b>
                    </span>
                )}

                {order.map((item) => (
                    <section key={item.id} className={styles.item}>
                        {/* <Image width={120} height={120} src={item.product.banner} alt="imagem do produto" /> */}
                        <span>Qtd: {item.amount} - <b>{item.product.name} R${item.product.price}</b></span>
                        <span className={styles.description}>{item.product.description}</span>
                    </section>
                ))}
                
            </article>

            <span className={styles.totalOrder}>Total: R$:  {calculateTotalOrder(order)}</span>

            <button 
                className={styles.buttonOrder}
                onClick={handleFinishOrder}
                >
                Concluir Pedido
            </button>
        </section>
   </dialog>
  )
}
