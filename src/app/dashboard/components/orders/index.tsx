"use client"

import styles from "./sytles.module.scss"
import { RefreshCcw } from "lucide-react"
import { OrderProps } from "@/lib/order.type"
import { ModalOrder } from "../modal"
import {use} from "react"
import { OrderContext } from "@/providers/order" // para consumir o pcontext
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Props {
    orders: OrderProps[] 
}

export function Orders({orders} : Props){

    const {isOpen, onRequestOpen} = use(OrderContext)
    const router = useRouter()

    async function handleDetailOrder(order_id: string) {
        await onRequestOpen(order_id)
    }

    function handleRefresh() {
        router.refresh()
        toast.success("Orders updated successfully.")
    }

    return(
        <>
            <main className={styles.container}>
                <section className={styles.containerHeader}>
                    <h1>Last Orders</h1>
                    <button onClick={handleRefresh}>
                        <RefreshCcw size={24} color="#3fffa3"/>
                    </button>
                </section>



                <section className={styles.listOrders}>

                    {orders.length === 0 && (
                        <span className={styles.emptyList}>No open orders at the moment.</span>
                    )}
                    {orders.map((order) => (
                        <button
                        key={order.id}
                        className={styles.orderItem}
                        onClick={() => handleDetailOrder(order.id)}
                        >
                            <div className={styles.tag}></div>
                            <span>{order.table}</span>
                        </button>
                    ))}
                </section>
            </main>
            
            {isOpen && <ModalOrder/> }

        </>
    )
}