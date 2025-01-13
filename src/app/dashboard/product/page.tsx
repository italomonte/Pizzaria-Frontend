// import styles from "./styles.module.scss"
import { Form } from "./components/form"
import { api } from "@/services/app"
import { getCookiesServer } from "@/lib/cookieServer"

export default async function Product() {
    
    const token = await getCookiesServer() 

    const response = await api.get("/category", {
        headers: {
            Authorization: `Bearer ${token}`

        }
    })

    console.log(response.data)

    // buscar os dados da cotegorias pelo servidor e mandar pro componente via props
    return (
        <Form 
            categories={response.data}
        />
    )
}