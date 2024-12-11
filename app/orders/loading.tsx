import { Skeleton } from "@/app/_components/ui/skeleton";
import Cart from "../_components/cart";
import { ScrollText } from "lucide-react";
import { ScrollArea } from "../_components/ui/scroll-area";

export default function OrdersLoading() {
    return (
        <>
            <div className="fixed bottom-0 right-0 m-5 z-40 lg:m-10">
                <Cart />
            </div>

            <div className="w-full h-full pt-20">
                <div className="h-full mx-auto px-4">
                    <div className="h-full bg-white p-6">
                        <div className="flex flex-col gap-2 mb-8">
                            <div className="flex items-center gap-3">
                                <ScrollText size={28} className="text-primary" />
                                <h1 className="font-bold text-2xl text-muted-foreground">Meus Pedidos</h1>
                            </div>
                            <p className="text-muted-foreground text-sm pl-10">Acompanhe seus pedidos e histórico de compras</p>
                        </div>

                        <ScrollArea className="bg-muted h-[85%] rounded-md z-0">
                            <div className="p-4 space-y-4">
                                {[...Array(3)].map((_, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-32" />
                                                <Skeleton className="h-4 w-24" />
                                            </div>
                                            <Skeleton className="h-6 w-24" />
                                        </div>

                                        <div className="space-y-4">
                                            {[...Array(2)].map((_, itemIndex) => (
                                                <div key={itemIndex} className="flex gap-4">
                                                    <Skeleton className="h-20 w-20 rounded-md" />
                                                    <div className="flex-1 space-y-2">
                                                        <Skeleton className="h-4 w-3/4" />
                                                        <Skeleton className="h-4 w-1/4" />
                                                        <Skeleton className="h-4 w-1/2" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex justify-between items-center pt-4 border-t">
                                            <Skeleton className="h-4 w-32" />
                                            <Skeleton className="h-6 w-24" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </>
    );
}
