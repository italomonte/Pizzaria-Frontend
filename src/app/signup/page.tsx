import styles from '../page.module.scss'
import logo from '/public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '@/services/app'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'

export default function SignUp() {

    async function handleRegister(formaData: FormData){
        "use server"

        const name = formaData.get("name")
        const email = formaData.get("email")
        const password = formaData.get("password")

        
        if (name == "" || email === "" || password === "") {
            return
        }
        
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

    return(
        <>
        <div className={styles.containerCenter}>
        <Image
          src={logo}
          alt="Pizzeria Logo"
        />

        <section className={styles.login}>

            <h1>Creating your account</h1>

          <form action={handleRegister}>

            <input 
            type="text"
            required
            name="name"
            placeholder='Enter your name...'
            className={styles.input}
            />

            <input 
            type="email"
            required
            name="email"
            placeholder='Enter your email...'
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
              Sign Up
            </button>
          </form>

          <Link href="/" className={styles.text}>
            Already have an account? Log in
          </Link>

        </section>
      </div>
        </>
    )
}
