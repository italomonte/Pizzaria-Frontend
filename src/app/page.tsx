import styles from './page.module.scss'
import logo from '/public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '@/services/app'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers' 

export default function Login() {

  async function handleLogin(formData: FormData) {
    "use server" 
    
    const email = formData.get("email")?.toString().trim()
    const password = formData.get("password")?.toString().trim()

    if (!email || !password) {
      return
    }

    try {
      const response = await api.post("/session", {
        email,
        password
      })

      if (!response.data.token) {
        return
      }

      const expressTime = 60 * 60 * 24 * 1000 // 24hrs
      const cookieStore = await cookies()

      cookieStore.set("session", response.data.token, {
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production" 
      })


    } catch (error) {
      console.error("Login error:", error)
      return
    }
    
    redirect("/dashboard")
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Image
          src={logo}
          alt="Pizzeria Logo"
          width={500}
        />
        <br />

        <section className={styles.login}>
          <form action={handleLogin}>
            <input 
              type="email"
              required
              name="email"
              placeholder='Enter your email'
              className={styles.input}
            />

            <input 
              type="password"
              required
              name="password"
              placeholder='Enter your password'
              className={styles.input}
            />

            <button type="submit">
              Access
            </button>
          </form>

          <Link href="/signup" className={styles.text}>
            Don't have an account? Sign up
          </Link>
        </section>
      </div>
    </>
  );
}
