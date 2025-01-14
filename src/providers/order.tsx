"use client"

import { OrderDetailProps } from "@/lib/orderDetail.type";
// provide a order context globally to the application

import { createContext, ReactNode, useState } from "react";
import { api } from "@/services/app";
import { headers } from "next/headers";
import { getCookieClient } from "@/lib/cookieClient";


type OrderContextData = {
    isOpen: boolean
    onRequestOpen: (order_id: string) => void;
    onRequestClose: () => void;
}

type OrderProviderProps = {
    children: ReactNode;
}

export const OrderContext = createContext({} as OrderContextData)

export function OrderProvider({children}: OrderProviderProps){

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

        console.log(response.data)

        setIsOpen(true)
    }

    function onRequestClose() {
        setIsOpen(false)
    }

  return(
   <OrderContext.Provider 
   value={{
    isOpen,
    onRequestOpen,
    onRequestClose,
   }}
   >
    {children}
   </OrderContext.Provider>
  )
}
