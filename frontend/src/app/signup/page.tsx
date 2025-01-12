import styles from '../page.module.scss'
import logo from '/public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function SignUp() {
    return(
        <>
        <div className={styles.containerCenter}>
        <Image
          src={logo}
          alt="Logo Pizzaria"
        />

        <section className={styles.login}>

            <h1>Criando sua conta</h1>

          <form>

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