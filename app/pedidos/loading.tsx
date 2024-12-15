import { Skeleton } from "@/app/_components/ui/skeleton";
import Cart from "../_components/cart";
import { Scroll } from "@phosphor-icons/react/dist/ssr";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/app/_components/ui/breadcrumb";

export default function OrdersLoading() {
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

                <div className="flex flex-col gap-3 mt-4">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="flex flex-col bg-muted text-muted-foreground items-center gap-4 p-4 rounded-md lg:flex-row">
                            <Skeleton className="self-start rounded-md h-[50px] w-[50px] lg:self-center" />

                            <div className="flex items-center justify-between w-full flex-1">
                                <div className="flex flex-col flex-1 gap-2">
                                    <Skeleton className="h-4 w-44 md:w-[300px]" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                                <Skeleton className="h-4 w-20" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
