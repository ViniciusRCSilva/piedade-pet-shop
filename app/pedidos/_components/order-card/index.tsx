import { Badge } from "@/app/_components/ui/badge";
import { Card } from "@/app/_components/ui/card";
import { formatters } from "@/app/_utils/utils";
import { SerializedOrder } from "@/app/_helper";
import AddToCart from "../button-add-to-cart";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import CancelOrder from "../button-cancel-order";

const OrderCard = ({ orders }: { orders: SerializedOrder[] }) => {
    // Ensure all Decimal values are converted to numbers
    const serializedOrders = orders.map(order => ({
        ...order,
        totalAmount: Number(order.totalAmount),
        items: order.items.map(item => ({
            ...item,
            value: Number(item.value),
            quantity: Number(item.quantity),
            product: {
                ...item.product,
                value: Number(item.product.value),
                quantity: Number(item.product.quantity)
            }
        }))
    }));

    return (
        <div className="flex flex-col gap-3 p-4 lg:p-6">
            {serializedOrders.map((order) => (
                <Card key={order.id} className="flex flex-col bg-white px-4 py-3 lg:px-5 lg:py-4 gap-3 lg:gap-4">
                    <p className="block text-sm lg:text-base font-bold text-muted-foreground lg:hidden">Pedido #{order.id}</p>
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-0 lg:justify-between">
                        <div className="flex flex-col gap-1">
                            <p className="hidden font-bold text-muted-foreground lg:block">Pedido #{order.id}</p>
                            <p className="text-xs lg:text-sm text-muted-foreground">Pedido realizado em <span className="font-semibold">{formatters.date(order.createdAt)}</span></p>
                            {order.status === "CONCLUDED" && (
                                <p className="text-xs lg:text-sm text-muted-foreground">
                                    Pedido concluído em <span className="font-semibold">{formatters.date(order.updatedAt)}</span>
                                </p>
                            )}
                            {order.status === "CANCELLED" && (
                                <p className="text-xs lg:text-sm text-muted-foreground">
                                    Pedido cancelado em <span className="font-semibold">{formatters.date(order.updatedAt)}</span>
                                </p>
                            )}
                        </div>

                        <div className="flex flex-row lg:flex-col items-center lg:items-end gap-2">
                            <p className="text-xs lg:text-sm text-muted-foreground">Status do pedido:</p>
                            <Badge variant={formatters.statusBadgeVariant(order.status)} className="text-xs lg:text-sm">
                                {formatters.status(order.status)}
                            </Badge>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 lg:gap-3 mt-2 lg:mt-4">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex flex-row bg-muted text-muted-foreground items-start gap-3 p-3 lg:p-4 rounded-md lg:items-center">
                                <Image
                                    src={item.product.image}
                                    alt={item.product.name}
                                    width={40}
                                    height={40}
                                    className="rounded-md lg:w-[50px] lg:h-[50px]"
                                />
                                <div className="flex items-start lg:items-center justify-between w-full flex-1">
                                    <div className="flex flex-col flex-1">
                                        <Button asChild variant="link" className="w-fit p-0 text-xs lg:text-sm font-bold h-auto">
                                            <Link
                                                href={`/produto/${item.product.id}`}
                                            >
                                                <span className="truncate w-32 sm:w-44 md:w-full text-left">
                                                    {item.product.name}
                                                </span>
                                            </Link>
                                        </Button>
                                        <p className="text-[10px] lg:text-xs">
                                            Quantidade: {item.product.category === "KG_FEED" ? `${item.quantity}kg` : item.quantity}
                                        </p>
                                    </div>
                                    <p className="text-xs lg:text-sm font-semibold">
                                        {formatters.currency(item.value * item.quantity)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col-reverse lg:flex-row items-start lg:items-center justify-between gap-3 lg:gap-0 border-t pt-3 lg:pt-4">
                        <div className="flex items-center gap-2 w-full lg:w-auto">
                            {order.status === "PENDING" && (
                                <CancelOrder order={order} />
                            )}
                            {order.status === "CONCLUDED" && (
                                <AddToCart order={order} />
                            )}
                        </div>
                        <p className="text-sm lg:text-base text-muted-foreground w-full lg:w-auto text-right">
                            Valor total:<span className="text-base lg:text-lg ml-2 font-bold text-primary">{formatters.currency(Number(order.totalAmount))}</span>
                        </p>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default OrderCard;