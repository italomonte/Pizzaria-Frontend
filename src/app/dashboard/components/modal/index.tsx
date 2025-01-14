import styles from "./styles.module.scss"
import { X } from "lucide-react"

export function ModalOrder(){
  return(
   <dialog className={styles.dialogContainer}>
        <section className={styles.dialogContent}>
            <button className={styles.dialogBack}>
                <X size={30} color="#FF3f4b" />
            </button>

            <article className={styles.container}>
                <h2>Detalhes do pedido</h2>

                <span className={styles.table}>
                    Mesa <b>36</b>
                </span>

                <section className={styles.item}>
                    <span>1 - <b>Pizza fango com catupiry</b></span>
                    <span className={styles.description}>Pizza fango com catupiry, borda recheada</span>
                </section>

                <section className={styles.item}>
                    <span>1 - <b>Pizza fango com catupiry</b></span>
                    <span className={styles.description}>Pizza fango com catupiry, borda recheada</span>
                </section>
                
            </article>

            <button className={styles.buttonOrder}>
                Concluir Pedido
            </button>
        </section>
   </dialog>
  )
}
