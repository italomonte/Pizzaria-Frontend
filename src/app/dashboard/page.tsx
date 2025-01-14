import { Orders } from "./components/orders";
import { api } from "@/services/app";
import { getCookiesServer } from "@/lib/cookieServer";
import { OrderProps } from "@/lib/order.type";

async function getOrders(): Promise<OrderProps[] | []> {
    try {

        const token = await getCookiesServer()

        const response = await api.get("/orders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }) 
        
        console.log( response.data)

        return response.data || []

    } catch (error) {
        console.log(error)
        return []
    }
}

export default async function Dashboard() {

    const orders = await getOrders();
    return (
        <>
            <Orders
                orders={orders}
            />
        </>
    )
}

