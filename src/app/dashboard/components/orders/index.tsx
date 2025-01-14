import styles from "./sytles.module.scss"
import { RefreshCcw } from "lucide-react"
import { OrderProps } from "@/lib/order.type"
import { ModalOrder } from "../modal"

interface Props {
    orders: OrderProps[] 
}

export function Orders({orders} : Props){
    return(
        <>
            <main className={styles.container}>
                <section className={styles.containerHeader}>
                    <h1>Últimos Pedidos</h1>
                    <button>
                        <RefreshCcw size={24} color="#3fffa3"/>
                    </button>
                </section>

                <section className={styles.listOrders}>
                    {orders.map((order) => (
                        <button
                        key={order.id}
                        className={styles.orderItem}>
                            <div className={styles.tag}></div>
                            <span>{order.table} - {order.name}</span>
                        </button>
                    ))}
                </section>
            </main>

            <ModalOrder/>
        </>
    )
}