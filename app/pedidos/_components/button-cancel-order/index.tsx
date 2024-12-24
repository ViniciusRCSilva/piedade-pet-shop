"use client";

import { Button } from "@/app/_components/ui/button";
import { SerializedOrder } from "@/app/_helper";
import { toast } from "sonner";
import { updateOrderStatus } from "@/app/_actions/order";
import { X } from "@phosphor-icons/react/dist/ssr";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/app/_components/ui/dialog";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface CancelOrderProps {
    order: SerializedOrder;
}

const CancelOrder = ({ order }: CancelOrderProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdateOrderStatus = async () => {
        try {
            setIsLoading(true);
            await updateOrderStatus(order.id, "CANCELLED");

            toast.success("Pedido cancelado com sucesso!", {
                style: {
                    backgroundColor: '#65a30d',
                    color: 'white',
                    border: 'none'
                },
            });
        } catch (error) {
            toast.error("Erro ao adicionar produtos ao carrinho", {
                style: {
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none'
                },
            });
            console.error("[UPDATE_ORDER_STATUS]", error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="destructive"
                    className="text-xs font-medium hover:bg-red-600 transition-colors flex items-center gap-2 px-3 py-2"
                >
                    <X className="h-4 w-4" />
                    Cancelar pedido
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <X className="h-5 w-5 text-red-500" />
                        Cancelar Pedido
                    </DialogTitle>
                    <DialogDescription className="pt-2 text-muted-foreground">
                        Tem certeza que deseja cancelar este pedido?<br />
                        <span className="font-semibold">Esta ação não pode ser desfeita.</span>
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="outline"
                            className="mt-2 sm:mt-0"
                        >
                            Voltar
                        </Button>
                    </DialogClose>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleUpdateOrderStatus}
                        className="hover:bg-red-600 transition-colors"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Cancelando...
                            </>
                        ) : "Confirmar Cancelamento"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CancelOrder;