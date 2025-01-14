"use client"

import { OrderDetailProps } from "@/lib/orderDetail.type";
// provide a order context globally to the application

import { createContext, ReactNode, useState } from "react";
import { api } from "@/services/app";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


type OrderContextData = {
    isOpen: boolean
    onRequestOpen: (order_id: string) => Promise<void>;
    onRequestClose: () => void;
    order: OrderDetailProps[];
    finishOrder: (oder_id: string) => Promise<void>
}

type OrderProviderProps = {
    children: ReactNode;
}

export const OrderContext = createContext({} as OrderContextData)

export function OrderProvider({children}: OrderProviderProps){

    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [order, setOrder] = useState<OrderDetailProps[]>([])

    async function onRequestOpen(order_id: string) {

        const token = await getCookieClient()

        const response = await api.get("/order/detail", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                order_id
            }
        })

        setOrder(response.data)
        setIsOpen(true)
    }

    function onRequestClose() {
        setIsOpen(false)
    }

    async function finishOrder(order_id: string) {
        const token = await getCookieClient()

        const data = {
            order_id: order_id
        }

        try {
            await api.put('/order/finish', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (err) {
            console.log(err)
            toast.error("Falha ao finalizar esse pedido")
            return
        }

        toast.success("Pedido finalizado com sucesso")
        router.refresh()
        setIsOpen(false)
    }

  return(
   <OrderContext.Provider 
   value={{
    isOpen,
    onRequestOpen,
    onRequestClose,
    order,
    finishOrder
   }}
   >
    {children}
   </OrderContext.Provider>
  )
}
