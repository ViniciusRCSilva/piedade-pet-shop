"use client";

import { useCart } from "@/app/_components/cart/context/cartContext";
import { Button } from "@/app/_components/ui/button";
import { SerializedOrder } from "@/app/_helper";
import { RefreshCwIcon } from "lucide-react";
import { toast } from "sonner";

interface AddToCartProps {
    order: SerializedOrder;
}

const AddToCart = ({ order }: AddToCartProps) => {
    const { addToCart } = useCart();

    const handleOrderAgain = async () => {
        try {
            for (const item of order.items) {
                const addToCardSuccess = addToCart({
                    id: item.product.id,
                    name: item.product.name,
                    description: item.product.description,
                    value: item.product.value,
                    category: item.product.category,
                    isKgProduct: item.product.category === "KG_FEED",
                    availableQuantity: Number(item.product.quantity),
                    image: item.product.image
                }, item.quantity);

                if (!addToCardSuccess) {
                    throw new Error(`Failed to add item to cart: ${item.product.name}`);
                }
            }

            toast.success("Produtos adicionados ao carrinho!", {
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
            console.error("[ADD_TO_CART]", error);
        }
    };

    return (
        <Button
            onClick={handleOrderAgain}
            variant="outline"
            className="text-xs gap-2"
        >
            <RefreshCwIcon className="h-3 w-3" />
            Pedir novamente
        </Button>
    );
};

export default AddToCart;