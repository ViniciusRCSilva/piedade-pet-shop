import { Badge } from "@/app/_components/ui/badge";
import { Card } from "@/app/_components/ui/card";
import { formatters } from "@/app/_utils/utils";
import { SerializedOrder } from "@/app/_helper";
import AddToCart from "../button-add-to-cart";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";

const OrderCard = ({ orders }: { orders: SerializedOrder[] }) => {
    return (
        <div className="flex flex-col gap-3 p-6">
            {orders.map((order) => (
                <Card key={order.id} className="flex flex-col bg-white px-5 py-4 gap-4">
                    <p className="block font-bold text-muted-foreground lg:hidden">Pedido #{order.id}</p>
                    <div className="flex items-start justify-between md:items-center">
                        <div className="flex flex-col gap-1">
                            <p className="hidden font-bold text-muted-foreground lg:block">Pedido #{order.id}</p>
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
                            <div key={item.id} className="flex flex-col bg-muted text-muted-foreground items-center gap-4 p-4 rounded-md lg:flex-row">
                                <Image
                                    src={item.product.image}
                                    alt={item.product.name}
                                    width={50}
                                    height={50}
                                    className="self-start rounded-md lg:self-center"
                                />
                                <div className="flex items-center justify-between w-full flex-1">
                                    <div className="flex flex-col flex-1">
                                        <Button asChild variant="link" className="w-fit p-0 text-sm font-bold">
                                            <Link
                                                href={`/produto/${item.product.id}`}
                                            >
                                                <span className="truncate w-44 md:w-full">
                                                    {item.product.name}
                                                </span>
                                            </Link>
                                        </Button>
                                        <p className="text-xs">
                                            Quantidade: {item.product.category === "KG_FEED" ? `${item.quantity}kg` : item.quantity}
                                        </p>
                                    </div>
                                    <p className="text-sm font-semibold">
                                        {formatters.currency(item.value * item.quantity)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between border-t pt-4">
                        <div className="flex items-center gap-2">
                            {order.status === "CONCLUDED" && (
                                <AddToCart order={order} />
                            )}
                        </div>
                        <p className="text-muted-foreground">
                            Valor total:<span className="text-lg ml-2 font-bold text-primary">{formatters.currency(order.totalAmount)}</span>
                        </p>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default OrderCard;