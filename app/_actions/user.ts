"use server"

import { db } from "../_lib/prisma"
import { revalidatePath } from "next/cache"

interface CreateUserParams {
    clerkId: string
    name: string
    email: string
    phone: string
    address: string
}

interface UpdateUserParams {
    id: string
    name: string
    email: string
    phone: string
    address: string
}

export async function createUser(params: CreateUserParams) {
    try {
        const { clerkId, name, email, phone, address } = params
        const user = await db.user.create({
            data: {
                clerkId,
                name,
                email,
                phone,
                address
            }
        })
        revalidatePath("/")
        return user
    } catch (error) {
        console.error("[CREATE_USER]", error)
        throw new Error("Failed to create user")
    }
}

export async function updateUser(params: UpdateUserParams) {
    try {
        const { id, name, email, phone, address } = params
        const user = await db.user.update({
            where: {
                id
            },
            data: {
                name,
                email,
                phone,
                address
            }
        })
        return user
    } catch (error) {
        console.error("[UPDATE_USER]", error)
        throw new Error("Failed to update user")
    }
}