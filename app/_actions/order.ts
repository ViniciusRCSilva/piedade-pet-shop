"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { OrderStatus, ProductCategory } from "@prisma/client"

interface OrderItem {
    productId: string
    quantity: number
    value: number
    category: ProductCategory
}

interface CreateOrderData {
    userId: string
    userName: string
    userPhone: string
    totalAmount: number
    items: OrderItem[]
}

export const createOrder = async (data: CreateOrderData) => {
    console.log("Received order data:", JSON.stringify(data, null, 2))

    if (!data || !data.userId || !data.items.length) {
        throw new Error("Invalid order data")
    }

    try {
        // Convert totalAmount to a valid decimal
        const totalAmount = Number(data.totalAmount).toFixed(2)

        // Prepare items with proper number formatting
        const items = data.items.map(item => ({
            productId: item.productId,
            quantity: Number(item.quantity),
            value: Number(item.value).toFixed(2),
            category: item.category
        }))

        console.log("Formatted data:", {
            userId: data.userId,
            userName: data.userName,
            userPhone: data.userPhone,
            totalAmount,
            items
        })

        const order = await db.order.create({
            data: {
                userId: data.userId,
                userName: data.userName,
                userPhone: data.userPhone,
                totalAmount: parseFloat(totalAmount),
                items: {
                    create: items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        value: parseFloat(item.value),
                        category: item.category
                    }))
                }
            }
        })

        console.log("Created order:", order)
        revalidatePath("/orders")
        return order
    } catch (error) {
        console.error("[ORDER_CREATE]", error)
        throw new Error(`Failed to create order: ${error}`)
    }
}

export const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
        const order = await db.order.update({
            where: {
                id: orderId,
            },
            data: {
                status,
            },
        });

        revalidatePath("/admin");
        revalidatePath("/orders");

        return order;
    } catch (error) {
        console.error("[UPDATE_ORDER_STATUS]", error);
        throw new Error("Failed to update order status");
    }
};