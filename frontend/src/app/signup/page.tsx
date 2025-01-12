import styles from './page.module.scss'
import logo from '/public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '@/services/app'
import { redirect } from 'next/navigation'

export default function SignUp() {

    async function handleRegister(formaData: FormData){
        "use server"

        const name = formaData.get("name")
        const email = formaData.get("email")
        const password = formaData.get("password")
        
        console.log(name)
        console.log(email)
        console.log(password)
        
        if (name == "" || email === "" || password === "") {
            return
        }

        else {
            try {
                await api.post("/users", {
                    name, 
                    email,
                    password
                })

            } catch (error) {
                console.log("error:" )
                console.log(error)
                
            }

            redirect("/")
        }
    }

    return(
        <>
        <main>
            <h1>Pagina cadastro</h1>
        </main>
        </>
    )
}