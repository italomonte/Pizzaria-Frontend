"use client"

import { ChangeEvent } from "react"
import styles from "./styles.module.scss"
import { UploadCloud } from "lucide-react" 
import { useState } from "react"
import Image from "next/image"

export function Form() {

    const [image, setImage] = useState<File>()
    const [previewImage, setPreviewImage] = useState("")

    async function handleRegisterProcuct() {
        
    }

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0]
            if (image.type !== "image/jpeg" && image.type !== "image/png") {
                console.log("formato proibido") 
                return
            }

            setImage(image)
            setPreviewImage(URL.createObjectURL(image))
        }
    }

    return(
        <main className={styles.container}>
            <h1>Novo Produto</h1>
            <form 
            action={handleRegisterProcuct}
            className={styles.form}>

                <label className={styles.labelImage}>
                    <span>
                        <UploadCloud size={30} color="#FFF"/>
                    </span>

                    <input 
                    type="file"
                    name=""
                    required
                    accept="image/png, image/jpeg"
                    onChange = {handleFile}
                    />

                    {previewImage && (
                        <Image
                            alt="Imagem do produto"
                            src={previewImage}
                            className={styles.preview}
                            priority={true}
                            fill={true}
                            quality={100}
                        />
                    )}
                </label>

            </form>
        </main>
    )
}