"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { ProductCategory } from "@prisma/client"

interface CreateProductParams {
    name: string
    description: string
    category: ProductCategory
    value: number
    quantity: number
    image: string
}

interface UpdateProductParams {
    id: string
    name: string
    description: string
    category: ProductCategory
    value: number
    quantity: number
    image: string
}


export async function createProduct(params: CreateProductParams) {
    try {
        const product = await db.product.create({
            data: {
                name: params.name,
                description: params.description,
                category: params.category,
                value: params.value,
                quantity: params.quantity,
                image: params.image || "",
            },
        })

        revalidatePath("/admin")
        return product
    } catch (error) {
        console.error("[PRODUCT_CREATE]", error)
        throw new Error("Failed to create product")
    }
}

export async function updateProduct(params: UpdateProductParams) {
    try {
        const product = await db.product.update({
            where: {
                id: params.id
            },
            data: {
                name: params.name,
                description: params.description,
                category: params.category,
                value: params.value,
                quantity: params.quantity,
                image: params.image || "",
            },
        })

        revalidatePath("/admin")
        return product
    } catch (error) {
        console.error("[PRODUCT_UPDATE]", error)
        throw new Error("Failed to update product")
    }
}

export async function deleteProduct(productId: string) {
    try {
        await db.product.delete({
            where: {
                id: productId
            }
        })

        revalidatePath("/admin")
        return { success: true }
    } catch (error) {
        console.error("[PRODUCT_DELETE]", error)
        throw new Error("Failed to delete product")
    }
}