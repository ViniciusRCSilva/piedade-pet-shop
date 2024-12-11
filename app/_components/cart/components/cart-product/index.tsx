import MoneyFormat from "@/app/_components/money-format";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react";
import { useCart } from "../../context/cartContext";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

interface CartProductProps {
    id: string;
    name: string;
    value: number;
    quantity: number;
    isKgProduct?: boolean;
    availableQuantity: number;
    image: string;
}

const CartProduct = ({ id, name, value, quantity, isKgProduct, availableQuantity, image }: CartProductProps) => {
    const { removeFromCart, updateQuantity } = useCart();

    const handleRemove = () => {
        removeFromCart(id);
        toast.error("Produto removido do carrinho!", {
            style: {
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none'
            },
        });
    };

    const handleKgIncrement = () => {
        const newQuantity = Math.min(quantity + 0.250, 5);
        updateQuantity(id, newQuantity);
    };

    const handleKgDecrement = () => {
        const newQuantity = Math.max(quantity - 0.250, 0.250);
        updateQuantity(id, newQuantity);
    };

    const totalValue = value * quantity;

    return (
        <Card className="bg-white">
            <CardHeader>
                <div className="flex w-[150px] h-[150px] p-4 items-center justify-center rounded-lg border border-muted">
                    <Image
                        src={image}
                        alt={name}
                        className="object-cover"
                        width={100}
                        height={100}
                    />
                </div>
                <div className="flex flex-col">
                    <div>
                        <CardTitle className="text-lg text-muted-foreground">
                            <Link href={`/product/${id}`} className="hover:underline">
                                {name}
                            </Link>
                            <span className="ml-2 text-sm font-normal">
                                {isKgProduct ? `(${quantity}kg)` : `(Qtd: ${quantity})`}
                            </span>
                        </CardTitle>
                    </div>
                    <CardDescription className="whitespace-nowrap text-2xl font-bold text-primary">
                        <MoneyFormat value={totalValue} />
                        {isKgProduct && "/kg"}
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent>
                <span className="text-sm text-muted-foreground">Quantidade</span>
                <div className="flex items-center justify-between gap-4">
                    {isKgProduct ? (
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleKgDecrement}
                                disabled={quantity <= 0.250}
                            >
                                <MinusIcon className="h-4 w-4" />
                            </Button>
                            <span className="min-w-[60px] text-center font-medium">
                                {quantity}kg
                            </span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleKgIncrement}
                                disabled={quantity >= 5}
                            >
                                <PlusIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(id, quantity - 1)}
                                disabled={quantity <= 1}
                            >
                                <MinusIcon className="h-4 w-4" />
                            </Button>
                            <span className="min-w-[40px] text-center font-medium">
                                {quantity}
                            </span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(id, quantity + 1)}
                                disabled={quantity >= availableQuantity}
                            >
                                <PlusIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                    <Button
                        onClick={handleRemove}
                        variant="destructive"
                        size="sm"
                        className="gap-2"
                    >
                        <XIcon className="h-4 w-4" />
                        Remover
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default CartProduct;