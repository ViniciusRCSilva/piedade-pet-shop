"use server"

import { db } from "@/app/_lib/prisma"

export async function checkRegistration(userId: string) {
    try {
        const user = await db.user.findUnique({
            where: {
                clerkId: userId
            },
            select: {
                id: true,
                phone: true,
                address: true
            }
        })

        return user
    } catch (error) {
        console.error("[CHECK_REGISTRATION]", error)
        return null
    }
}
