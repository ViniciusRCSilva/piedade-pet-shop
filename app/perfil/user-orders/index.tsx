import { Button } from "@/app/_components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/_components/ui/card";
import { SerializedOrder } from "@/app/_helper";
import OrderCard from "@/app/pedidos/_components/order-card";
import { Scroll } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

interface UserOrdersProps {
    orders: SerializedOrder[]
}

const UserOrders = ({ orders }: UserOrdersProps) => {
    return (
        <div className="h-full">
            {orders.length === 0 ? (
                <Card className="h-fit xl:h-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <div className="text-muted-foreground">
                            <CardTitle>Último Pedido</CardTitle>
                            <CardDescription>Acompanhe o status do seu pedido mais recente</CardDescription>
                        </div>
                        <Button asChild variant="outline" size="sm">
                            <Link href="/pedidos">
                                Ver histórico completo
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent className="h-full pt-4 border-t">
                        <div className="flex flex-col h-[70%] items-center justify-center border p-6 rounded-md xl:h-[75%]">
                            <Scroll size={40} className="mb-4 opacity-50" />
                            <p className="text-center text-muted-foreground">Você ainda não fez nenhum pedido.</p>
                            <Button asChild variant="link" className="text-primary">
                                <Link href="/produtos">
                                    <p className="text-center text-sm">Que tal começar a comprar agora?</p>
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <div className="text-muted-foreground">
                            <CardTitle>Último Pedido</CardTitle>
                            <CardDescription>Acompanhe o status do seu pedido mais recente</CardDescription>
                        </div>
                        <Button asChild variant="outline" size="sm">
                            <Link href="/pedidos">
                                Ver histórico completo
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent className="pt-4 border-t">
                        <OrderCard orders={orders || []} />
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default UserOrders;