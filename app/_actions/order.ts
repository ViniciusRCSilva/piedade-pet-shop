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
    userAddress: string
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

        const order = await db.order.create({
            data: {
                userId: data.userId,
                userName: data.userName,
                userPhone: data.userPhone,
                userAddress: data.userAddress,
                totalAmount: Number(totalAmount),
                items: {
                    create: items.map(item => ({
                        productId: item.productId,
                        quantity: Number(item.quantity),
                        value: Number(item.value),
                        category: item.category
                    }))
                }
            },
            include: {
                items: true
            }
        })

        // Convert Decimal values to plain numbers before returning
        const serializedOrder = {
            ...order,
            totalAmount: Number(order.totalAmount),
            items: order.items.map(item => ({
                ...item,
                value: Number(item.value),
                quantity: Number(item.quantity)
            }))
        }

        await handleProductQuantities(order.id, "PENDING")
        revalidatePath("/produtos")
        revalidatePath("/pedidos")
        return serializedOrder
    } catch (error) {
        console.error("[ORDER_CREATE]", error)
        throw new Error(`Failed to create order: ${error}`)
    }
}

async function handleProductQuantities(orderId: string, status: OrderStatus) {
    try {
        // Get the order with its items
        const order = await db.order.findUnique({
            where: { id: orderId },
            include: { items: true }
        });

        if (!order || !order.items) {
            throw new Error("Order not found or has no items");
        }

        // For each item in the order
        for (const item of order.items) {
            const product = await db.product.findUnique({
                where: { id: item.productId }
            });

            if (!product) {
                console.error(`Product ${item.productId} not found`);
                continue;
            }

            let newQuantity = Number(product.quantity);

            // If status is PENDING, subtract the quantity
            if (status === "PENDING") {
                newQuantity = Number(product.quantity) - Number(item.quantity);
            }
            // If status is CANCELLED, add the quantity back
            else if (status === "CANCELLED") {
                newQuantity = Number(product.quantity) + Number(item.quantity);
            }

            // Update the product quantity
            await db.product.update({
                where: { id: item.productId },
                data: { quantity: Math.max(0, newQuantity) } // Ensure quantity doesn't go below 0
            });
        }
    } catch (error) {
        console.error("[HANDLE_PRODUCT_QUANTITIES]", error);
        throw new Error("Failed to handle product quantities");
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

        // Handle product quantities when status changes
        await handleProductQuantities(orderId, status);

        revalidatePath("/admin");
        revalidatePath("/pedidos");

        return order;
    } catch (error) {
        console.error("[UPDATE_ORDER_STATUS]", error);
        throw new Error("Failed to update order status");
    }
};