import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { SerializedOrder } from "../../../_helper";
import { formatters } from "@/app/_utils/utils";
import { Badge } from "@/app/_components/ui/badge";
import { useEffect, useState } from "react";
import { OrderStatus } from "@prisma/client";
import { updateOrderStatus } from "@/app/_actions/order";
import { toast } from "sonner";
import { LoaderCircleIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/select";
import { Button } from "@/app/_components/ui/button";

interface ViewOrderDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    order: SerializedOrder;
}

const ViewOrderDialog = ({ open, onOpenChange, order }: ViewOrderDialogProps) => {
    const [status, setStatus] = useState<OrderStatus>(order.status);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('')

    const handleStatusChange = async (newStatus: OrderStatus) => {
        try {
            setLoading(true);
            await updateOrderStatus(order.id, newStatus);
            setStatus(newStatus);
            toast.success("Status do pedido atualizado com sucesso!", {
                className: "bg-emerald-500 text-white",
                duration: 3000,
            });
        } catch (error) {
            toast.error("Erro ao atualizar status do pedido", {
                className: "bg-red-500 text-white",
                duration: 3000,
            });
            console.error("[UPDATE_ORDER_STATUS]", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setMessage(`Olá, ${order.userName}!%0aVocê fez um pedido no valor de *${formatters.currency(order.totalAmount)}*.%0aOs itens do pedido são: %0a• ${order.items.map(item => `${item.quantity} ${item.category === 'KG_FEED' ? 'kg' : item.quantity === 1 ? 'unidade' : 'unidades'} de ${item.product.name}`).join('%0a• ')}.%0aPodemos *confirmar* o seu pedido? 💜`)
    }, [order])

    const handleSubmitMessage = () => {
        window.open(`https://api.whatsapp.com/send/?phone=55${order.userPhone}&text=${message}`, '_blank')
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="mx-auto max-w-2xl p-6 text-muted-foreground">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold">
                        Visualizar Pedido
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    {/* Informações do cliente */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1">
                            <p className="font-semibold">Cliente:</p>
                            <p>{order.userName}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <p className="font-semibold">Telefone:</p>
                                <p>{formatters.formatPhoneNumber(order.userPhone)}</p>
                            </div>
                            <Button variant="outline" onClick={handleSubmitMessage}>
                                Mandar mensagem para o cliente
                            </Button>
                        </div>
                        <div className="flex items-center gap-1">
                            <p className="font-semibold">Endereço:</p>
                            <p>{order.userAddress}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <p className="font-semibold">Data do pedido:</p>
                            <p>{formatters.date(order.createdAt)}</p>
                        </div>
                    </div>

                    {/* Lista de itens */}
                    <div className="border-t border-gray-300 pt-4">
                        <h3 className="mb-2 text-lg font-semibold">Itens do Pedido</h3>
                        <ul className="space-y-2">
                            {order.items.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex items-center justify-between rounded-md border bg-gray-50 px-4 py-2"
                                >
                                    <span className="font-medium">{item.product.name}</span>
                                    <span>
                                        {item.quantity.toString()}{" "}
                                        {item.category === "KG_FEED" ? "kg" : item.quantity === 1 ? "unidade" : "unidades"}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Valor total e status */}
                    <div className="flex flex-col gap-2 border-t border-gray-300 pt-4">
                        <div className="flex items-center gap-1">
                            <p className="font-semibold">Valor total:</p>
                            {formatters.currency(order.totalAmount)}
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="font-semibold">Status do pedido:</p>
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <LoaderCircleIcon className="h-4 w-4 animate-spin" />
                                    <span className="text-sm text-muted-foreground">Atualizando...</span>
                                </div>
                            ) : (
                                <Select
                                    value={status}
                                    onValueChange={(value: OrderStatus) => handleStatusChange(value)}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue>
                                            <Badge
                                                variant={formatters.statusBadgeVariant(status)}
                                                className="text-sm"
                                            >
                                                {formatters.status(status)}
                                            </Badge>
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(OrderStatus).map((status: OrderStatus) => (
                                            <SelectItem key={status} value={status}>
                                                <Badge
                                                    variant={formatters.statusBadgeVariant(status)}
                                                    className="text-sm"
                                                >
                                                    {formatters.status(status)}
                                                </Badge>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ViewOrderDialog;
