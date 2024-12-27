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
            <CardHeader className="flex-grow group">
                <div className="flex justify-between items-start">
                    <Link href={`/produto/${id}`} className="flex-1 group">
                        <div className="flex w-full items-center justify-center mb-2">
                            <div className="flex w-[200px] h-[200px] items-center justify-center">
                                <Image
                                    src={image}
                                    alt={name}
                                    className="object-cover"
                                    width={150}
                                    height={150}
                                />
                            </div>
                        </div>
                        <CardTitle className="text-base text-muted-foreground font-normal group-hover:underline">{name}</CardTitle>
                        <CardDescription className="text-2xl font-bold text-primary">
                            <MoneyFormat value={totalValue} />
                            {isKgProduct ? "/KG" : ""}
                        </CardDescription>
                    </Link>
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
                        <span>Remover</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default CartProduct;