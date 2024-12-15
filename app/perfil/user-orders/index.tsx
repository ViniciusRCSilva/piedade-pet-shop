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
                <div className="flex h-full items-center justify-center text-muted-foreground">
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
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <div>
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