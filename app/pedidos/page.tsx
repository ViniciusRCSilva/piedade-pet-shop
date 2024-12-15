import Cart from "../_components/cart";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "../_lib/prisma";
import OrdersContent from "./_components/orders-content";
import { Scroll } from "@phosphor-icons/react/dist/ssr";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/app/_components/ui/breadcrumb";
import Footer from "../_components/footer";

const ITEMS_PER_PAGE = 5;

interface SearchParams {
    page?: string;
}

export default async function OrdersPage({
    searchParams,
}: {
    searchParams: SearchParams
}) {
    const user = await currentUser();
    const page = Number(searchParams?.page) || 1;

    if (!user) {
        redirect("/");
    }

    const totalOrders = await db.order.count({
        where: {
            userId: user.id
        }
    });

    const totalPages = Math.ceil(totalOrders / ITEMS_PER_PAGE);

    const orders = await db.order.findMany({
        where: {
            userId: user.id
        },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (page - 1) * ITEMS_PER_PAGE,
        take: ITEMS_PER_PAGE
    });

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

    return (
        <div className="flex flex-col min-h-screen pt-[100px]">
            <div className="fixed bottom-0 right-0 m-5 z-40 lg:m-10">
                <Cart />
            </div>

            <div className="flex flex-col sticky top-20 px-6 pt-10 gap-8 bg-white lg:px-20 z-10">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Início</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Meus Pedidos</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="w-full h-[1px] bg-purple/20" />
            </div>

            <div className="flex-1 w-full h-full pt-10 px-6 lg:px-20">
                <div className="flex flex-col gap-2 mb-2">
                    <div className="flex items-center gap-3">
                        <Scroll size={28} className="text-primary" />
                        <h1 className="font-bold text-2xl text-muted-foreground">Meus Pedidos</h1>
                    </div>
                    <p className="text-muted-foreground text-sm pl-10">Acompanhe seus pedidos e histórico de compras</p>
                </div>

                <OrdersContent orders={serializedOrders} totalPages={totalPages} />
            </div>

            <Footer />
        </div>
    )
};