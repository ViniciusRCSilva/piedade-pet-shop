import React from "react";
import { db } from "../_lib/prisma"
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminTablesView from "./_components/admin-tables-view";

const AdminPage = async () => {
    const user = await currentUser();

    if (!user) {
        redirect("/");
    }

    const isAdmin = user.publicMetadata.role === "admin"

    if (!isAdmin) {
        redirect("/")
    }

    const products = await db.product.findMany({
        orderBy: {
            updatedAt: "desc"
        }
    });

    const orders = await db.order.findMany({
        include: {
            items: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const serializedProducts = products.map(product => ({
        ...product,
        value: product.value.toNumber(),
        quantity: product.quantity.toNumber()
    }));

    const serializedOrders = orders.map(order => ({
        ...order,
        totalAmount: order.totalAmount.toNumber(),
        items: order.items.map(item => ({
            ...item,
            value: item.value.toNumber(),
            quantity: item.quantity.toNumber(),
            product: {
                ...item.product,
                value: item.product.value.toNumber(),
                quantity: item.product.quantity.toNumber()
            }
        }))
    }));

    return <AdminTablesView products={serializedProducts || []} orders={serializedOrders || []} />
};

export default AdminPage;