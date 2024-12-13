import Cart from "../_components/cart";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "../_lib/prisma";
import OrderCard from "./_components/order-card";
import { ScrollArea } from "../_components/ui/scroll-area";
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
                value: item.product.value.toNumber()
            }
        }))
    }));

    return (
        <div className="w-full flex flex-col">
            <div className="fixed bottom-0 right-0 m-5 z-40 lg:m-10">
                <Cart />
            </div>

            <div className="flex flex-col sticky top-20 px-6 pt-10 mb-10 gap-8 bg-white lg:px-20 z-10">
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

            <div className="w-full h-full pt-20 px-6 lg:px-20">
                <div className="h-fullmx-auto">
                    <div className="h-full p-6">
                        <div className="flex flex-col gap-2 mb-8">
                            <div className="flex items-center gap-3">
                                <Scroll size={28} className="text-primary" />
                                <h1 className="font-bold text-2xl text-muted-foreground">Meus Pedidos</h1>
                            </div>
                            <p className="text-muted-foreground text-sm pl-10">Acompanhe seus pedidos e histórico de compras</p>
                        </div>

                        {serializedOrders.length === 0 ? (
                            <div className="flex w-full h-fit items-center justify-center text-muted-foreground">
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
                            <ScrollArea className="bg-muted h-[85%] rounded-md z-0">
                                <OrderCard orders={serializedOrders || []} />
                            </ScrollArea>
                        )}
                    </div>
                </div>
            </div>

            <footer className="flex h-[4vh] items-center justify-center bg-purple-foreground text-sm text-white lg:text-base">
                <p>&copy; 2024 Piedade Pet Shop. Todos os direitos reservados.</p>
            </footer>
        </div>
    )
};

export default OrdersPage;