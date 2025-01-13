"use client"

import { ChangeEvent } from "react"
import styles from "./styles.module.scss"
import { UploadCloud } from "lucide-react" 
import { useState } from "react"
import Image from "next/image"
import {Button} from "@/app/dashboard/components/button"
import { api } from "@/services/app"
import { getCookieClient } from "@/lib/cookieClient"

interface CategoryProp{
    id: string, 
    name: string
}

interface Props {
    categories: CategoryProp[] 
}

export function Form({categories}: Props) {

    const [image, setImage] = useState<File>() // to store and upload no backend after
    const [previewImage, setPreviewImage] = useState("") // to show in the preview

    async function handleRegisterProcuct(formData: FormData) {

        const categoryIndex = formData.get("category")
        const name = formData.get("name")
        const price = formData.get("price")
        const description = formData.get("description")

        if (!name || !price || !categoryIndex || !description || !image ) {
            return
        }

        const category_id = categories[Number(categoryIndex)].id

        const data = new FormData()

        data.append("name", name)
        data.append("price", price)
        data.append("description", description)
        data.append("category_id", category_id)
        data.append("file", image)

        console.log("DATA:")
        console.log(data.values)

        const token = await getCookieClient()

        await api.post("/product", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })


        console.log("cadastrado com sucesso")
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

                <select name="category">
                    {categories.map((category, index) => (
                        <option key={category.id} value={index}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    name="name"
                    placeholder="Digite o nome do produto"
                    required
                    className={styles.input}
                />
                
                <input
                    type="text"
                    name="price"
                    placeholder="Digite o preço do produto"
                    required
                    className={styles.input}
                />

                <textarea 
                    name="description" 
                    placeholder="Digite a descrição do produto"
                    required
                    className={styles.input}
                />
                
                <Button
                    text="Cadastrar"
                />

            </form>
        </main>
    )
}