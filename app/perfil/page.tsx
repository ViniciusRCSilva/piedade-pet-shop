import UserDetails from "./user-details";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";
import UserOrders from "./user-orders";
import Cart from "../_components/cart";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../_components/ui/breadcrumb";
import Footer from "../_components/footer";

const Perfil = async () => {
    const user = await currentUser();

    if (!user) {
        revalidatePath("/");
    }

    const userdb = await db.user.findUnique({
        where: {
            clerkId: user?.id
        }
    })

    if (!userdb) {
        revalidatePath("/");
    }

    const orders = await db.order.findMany({
        where: {
            userId: user?.id
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
        take: 1
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
                            <BreadcrumbPage>Minha conta</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="w-full h-[1px] bg-purple/20" />
            </div>

            <div className="flex-1 container mx-auto px-6 py-10">
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.5fr] gap-10">
                    <UserDetails userInfo={userdb} />
                    <UserOrders orders={serializedOrders} />
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Perfil;