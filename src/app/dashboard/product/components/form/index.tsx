"use client"

import { ChangeEvent } from "react"
import styles from "./styles.module.scss"
import { UploadCloud } from "lucide-react" 
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/app/dashboard/components/button"
import { api } from "@/services/app"
import { getCookieClient } from "@/lib/cookieClient"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface CategoryProp {
    id: string, 
    name: string
}

interface Props {
    categories: CategoryProp[] 
}

export function Form({ categories }: Props) {
    const router = useRouter()
    const [image, setImage] = useState<File>() // to store and upload to backend
    const [previewImage, setPreviewImage] = useState("") // to show in the preview

    async function handleRegisterProduct(formData: FormData) {

        const categoryIndex = formData.get("category")
        const name = formData.get("name")
        const price = formData.get("price")
        const description = formData.get("description")

        if (!name || !price || !categoryIndex || !description || !image) {
            toast.warning("Please fill in all fields")
            return
        }

        const category_id = categories[Number(categoryIndex)].id

        const data = new FormData()
        data.append("name", name)
        data.append("price", price)
        data.append("description", description)
        data.append("category_id", category_id)
        data.append("file", image)

        const token = await getCookieClient()

        await api.post("/product", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .catch((err) => {
            console.log(err)
            toast.warning("Failed to register product.")
            return
        })

        toast.success("Product successfully registered!")
        router.push("/dashboard")
    }

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0]
            if (image.type !== "image/jpeg" && image.type !== "image/png") {
                toast.warning("Unsupported file format")
                return
            }

            setImage(image)
            setPreviewImage(URL.createObjectURL(image))
        }
    }

    return (
        <main className={styles.container}>
            <h1>New Product</h1>
            <form 
                action={handleRegisterProduct}
                className={styles.form}
            >
                <label className={styles.labelImage}>
                    <span>
                        <UploadCloud size={30} color="#FFF"/>
                    </span>

                    <input 
                        type="file"
                        required
                        accept="image/png, image/jpeg"
                        onChange={handleFile}
                    />

                    {previewImage && (
                        <Image
                            alt="Product image"
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
                    placeholder="Enter product name"
                    required
                    className={styles.input}
                />
                
                <input
                    type="text"
                    name="price"
                    placeholder="Enter product price"
                    required
                    className={styles.input}
                />

                <textarea 
                    name="description" 
                    placeholder="Enter product description"
                    required
                    className={styles.input}
                />
                
                <Button text="Register" />
            </form>
        </main>
    )
}
