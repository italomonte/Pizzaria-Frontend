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
        <div className={styles.containerCenter}>
        <Image
          src={logo}
          alt="Logo Pizzaria"
        />

        <section className={styles.login}>

            <h1>Criando sua conta</h1>

          <form action={handleRegister}>

          <input 
            type="text"
            required
            name="name"
            placeholder='Digite seu nome...'
            className={styles.input}
            />

            <input 
            type="email"
            required
            name="email"
            placeholder='Digite seu email...'
            className={styles.input}
            />

            <input 
            type="password"
            required
            name="password"
            placeholder='********'
            className={styles.input}
            />

            <button type="submit">
              Cadastrar
            </button>
          </form>

          <Link href="/" className={styles.text}>
            Já possui uma conta? Faça login
          </Link>

        </section>
      </div>
        </>
    )
}