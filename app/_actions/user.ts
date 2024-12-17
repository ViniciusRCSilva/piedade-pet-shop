"use server"

import { db } from "@/app/_lib/prisma"
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
    phone: string
    address: string
}

interface FavoriteParams {
    userId: string
    productId: string
}

// Cache the user's favorites in memory
const userFavoritesCache = new Map<string, Set<string>>();

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
        const { id, name, phone, address } = params
        const user = await db.user.update({
            where: {
                id
            },
            data: {
                name,
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

export async function addFavoriteProduct({ userId, productId }: FavoriteParams) {
    try {
        const favorite = await db.userFavoritesProducts.create({
            data: {
                userId,
                productId
            }
        })

        // Update cache
        const userFavorites = userFavoritesCache.get(userId) || new Set();
        userFavorites.add(productId);
        userFavoritesCache.set(userId, userFavorites);

        revalidatePath("/produtos")
        revalidatePath("/produtos-favoritos")
        return favorite
    } catch (error) {
        console.error("[ADD_FAVORITE_PRODUCT]", error)
        return null
    }
}

export async function removeFavoriteProduct({ userId, productId }: FavoriteParams) {
    try {
        const favorite = await db.userFavoritesProducts.delete({
            where: {
                userId_productId: {
                    userId,
                    productId
                }
            }
        })

        // Update cache
        const userFavorites = userFavoritesCache.get(userId);
        if (userFavorites) {
            userFavorites.delete(productId);
        }

        revalidatePath("/produtos")
        revalidatePath("/produtos-favoritos")
        return favorite
    } catch (error) {
        console.error("[REMOVE_FAVORITE_PRODUCT]", error)
        return null
    }
}

export async function checkFavoriteStatus({ userId, productId }: FavoriteParams) {
    try {
        // Check cache first
        const cachedFavorites = userFavoritesCache.get(userId);
        if (cachedFavorites) {
            return cachedFavorites.has(productId);
        }

        // If not in cache, fetch from DB and update cache
        const favorite = await db.userFavoritesProducts.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId
                }
            }
        })

        // Initialize cache for this user if needed
        if (!userFavoritesCache.has(userId)) {
            const favorites = await getUserFavorites(userId);
            userFavoritesCache.set(userId, new Set(favorites));
        }

        return !!favorite
    } catch (error) {
        console.error("[CHECK_FAVORITE_STATUS]", error)
        return false
    }
}

export async function getUserByClerkId(clerkId: string) {
    try {
        const user = await db.user.findUnique({
            where: {
                clerkId
            }
        })

        return user
    } catch (error) {
        console.error("[GET_USER_BY_CLERK_ID]", error)
        return null
    }
}

export async function getUserFavorites(userId: string) {
    try {
        // Check cache first
        const cachedFavorites = userFavoritesCache.get(userId);
        if (cachedFavorites) {
            return Array.from(cachedFavorites);
        }

        // If not in cache, fetch from DB
        const favorites = await db.userFavoritesProducts.findMany({
            where: {
                userId
            },
            select: {
                productId: true
            }
        });

        // Update cache
        const favoriteIds = favorites.map(f => f.productId);
        userFavoritesCache.set(userId, new Set(favoriteIds));

        return favoriteIds;
    } catch (error) {
        console.error("[GET_USER_FAVORITES]", error);
        return [];
    }
}

// Optional: Add a function to clear cache for testing or when needed
export async function clearFavoritesCache(userId?: string) {
    if (userId) {
        userFavoritesCache.delete(userId);
    } else {
        userFavoritesCache.clear();
    }
}