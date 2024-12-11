import { Badge } from "@/app/_components/ui/badge";
import { Card } from "@/app/_components/ui/card";
import { formatters } from "@/app/_utils/utils";
import { SerializedOrder } from "@/app/admin-page/_helper";
import AddToCart from "../button-add-to-cart";

const OrderCard = ({ orders }: { orders: SerializedOrder[] }) => {
    return (
        <div className="flex flex-col gap-3 p-6">
            {orders.map((order) => (
                <Card key={order.id} className="flex flex-col bg-white px-5 py-4 gap-4">
                    <p className="block font-bold text-muted-foreground lg:hidden">Pedido #{order.id}</p>
                    <div className="flex items-start justify-between md:items-center">
                        <div className="flex flex-col gap-1">
                            <p className="hidden font-bold text-muted-foreground md:block">Pedido #{order.id}</p>
                            <p className="text-sm text-muted-foreground">Pedido realizado em <span className="font-semibold">{formatters.date(order.createdAt)}</span></p>
                            {order.status === "CONCLUDED" && (
                                <p className="text-sm text-muted-foreground">
                                    Pedido concluído em <span className="font-semibold">{formatters.date(order.updatedAt)}</span>
                                </p>
                            )}
                            {order.status === "CANCELLED" && (
                                <p className="text-sm text-muted-foreground">
                                    Pedido cancelado em <span className="font-semibold">{formatters.date(order.updatedAt)}</span>
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <p className="text-sm text-muted-foreground text-end">Status do pedido</p>
                            <Badge variant={formatters.statusBadgeVariant(order.status)}>
                                {formatters.status(order.status)}
                            </Badge>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex bg-muted text-muted-foreground items-center gap-4 p-4 rounded-md">
                                <div className="flex flex-col gap-1 flex-1">
                                    <p className="text-sm font-bold">{item.product.name}</p>
                                    <p className="text-xs">
                                        Quantidade: {item.product.category === "KG_FEED" ? `${item.quantity}kg` : item.quantity}
                                    </p>
                                </div>
                                <p className="text-sm font-semibold">
                                    {formatters.currency(item.value * item.quantity)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-muted pt-4">
                        <p className="text-muted-foreground">
                            Valor total: <span className="text-lg font-bold text-primary">{formatters.currency(order.totalAmount)}</span>
                        </p>
                        <div className="flex items-center gap-2">
                            {order.status === "CONCLUDED" && (
                                <AddToCart order={order} />
                            )}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default OrderCard;