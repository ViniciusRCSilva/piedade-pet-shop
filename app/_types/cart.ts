import { ProductCategory } from "@prisma/client"

export interface CartItem {
    id: string
    name: string
    description: string
    value: number
    valueByKg?: number
    category: ProductCategory
    quantity: number
    image: string
    isKgProduct: boolean
}

export interface Cart {
    items: CartItem[]
}