"use client"

import styles  from "./styles.module.scss"
import { useFormStatus } from "react-dom"

interface Props {
    text: string
}

export function Button( {text}: Props) {

    const {pending} = useFormStatus()

    return(
        <button type="submit" disabled={pending} className={styles.button}>
            
            {pending ? "Loading..." : text}
            
        </button>
    )
}
