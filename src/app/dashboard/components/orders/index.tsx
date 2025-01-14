"use client"

import styles from "./sytles.module.scss"
import { RefreshCcw } from "lucide-react"
import { OrderProps } from "@/lib/order.type"
import { ModalOrder } from "../modal"
import {use} from "react"
import { OrderContext } from "@/providers/order" // para consumir o pcontext

interface Props {
    orders: OrderProps[] 
}

export function Orders({orders} : Props){

    const {isOpen, onRequestOpen} = use(OrderContext)
    
    async function handleDetailOrder(order_id: string) {
        await onRequestOpen(order_id)
    }

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
                        className={styles.orderItem}
                        onClick={() => handleDetailOrder(order.id)}
                        >
                            <div className={styles.tag}></div>
                            <span>{order.table} - {order.name}</span>
                        </button>
                    ))}
                </section>
            </main>
            
            {isOpen && <ModalOrder/> }

        </>
    )
}