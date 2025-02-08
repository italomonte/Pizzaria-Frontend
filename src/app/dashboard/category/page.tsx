import styles from "./styles.module.scss"
import { Button } from "../components/button"
import { api } from "@/services/app"
import {getCookiesServer} from "@/lib/cookieServer"
import { redirect } from "next/navigation"


export default async function Category(){

    async function handleRegisterCategory(formData: FormData) {
        "use server" // quero que essa função seja executada no servidor

        const name = formData.get("name") // propriedade name do input

        if (name == "" ) return;

        const data = {
            name
        }

        const token = await getCookiesServer()

        await api.post("/category", data, {  // fazendo requisição de post na rota /category
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .catch((err) => {
            console.log(err)
        })

        redirect("/dashboard")
        
    }

    return(
        <main className={styles.container}>
            <h1>New Category</h1>

            <form 
            action= {handleRegisterCategory}
            className={styles.form}>
                <input 
                type="text" 
                name="name"
                placeholder="Category Name, ex: Pizzas"
                className={styles.input}
                />

                <Button
                    text="Register"
                />
            </form>
        </main>
    )
}