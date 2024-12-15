import Cart from "../_components/cart";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "../_lib/prisma";
import OrderCard from "./_components/order-card";
import Link from "next/link";
import { Button } from "../_components/ui/button";
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

const OrdersPage = async () => {
    const user = await currentUser();

    if (!user) {
        redirect("/");
    }

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
        }
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
                <div className="h-full mx-auto">
                    <div className="h-full p-6">
                        <div className="flex flex-col gap-2 mb-8">
                            <div className="flex items-center gap-3">
                                <Scroll size={28} className="text-primary" />
                                <h1 className="font-bold text-2xl text-muted-foreground">Meus Pedidos</h1>
                            </div>
                            <p className="text-muted-foreground text-sm pl-10">Acompanhe seus pedidos e histórico de compras</p>
                        </div>

                        {serializedOrders.length === 0 ? (
                            <div className="flex w-full h-full items-center justify-center text-muted-foreground">
                                <div className="flex flex-col items-center justify-center border p-6 rounded-md">
                                    <Scroll size={40} className="mb-4 opacity-50" />
                                    <p className="text-center">Você ainda não fez nenhum pedido.</p>
                                    <Button asChild variant="link" className="text-primary">
                                        <Link href="/produtos">
                                            <p className="text-center text-sm">Que tal começar a comprar agora?</p>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-muted h-fit rounded-md z-0">
                                <OrderCard orders={serializedOrders || []} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
};

export default OrdersPage;