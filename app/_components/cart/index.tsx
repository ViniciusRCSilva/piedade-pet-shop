"use client"

import { ShoppingCart, X } from "@phosphor-icons/react/dist/ssr";
import { Button } from "../ui/button";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet"
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import MoneyFormat from "../money-format";
import CartProduct from "./components/cart-product";
import { useEffect, useState } from "react";
import { useCart } from "./context/cartContext";
import { useAuth } from "@clerk/nextjs";
import AddOrderButton from "./components/add-order-button";

const Cart = () => {
    const { cartItems, removeAll } = useCart();
    const [cartValue, setCartValue] = useState(0)
    const [cartItemsCount, setCartItemsCount] = useState(0)
    const { isSignedIn } = useAuth();

    useEffect(() => {
        const calculateTotal = () => {
            const total = cartItems.reduce((acc, item) => {
                if (item.isKgProduct && item.valueByKg) {
                    return acc + (item.valueByKg * item.quantity);
                }
                return acc + (item.value * item.quantity);
            }, 0);
            setCartValue(total);
        };
        const calculateItemsCount = () => {
            const count = cartItems.reduce((acc, item) => acc + (item.isKgProduct ? 1 : item.quantity), 0);
            setCartItemsCount(count);
        };
        calculateTotal();
        calculateItemsCount();
    }, [cartItems]);

    if (!isSignedIn) {
        return null;
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="w-16 h-16 rounded-full shadow-md">
                    <Badge
                        className="absolute right-0 top-0 h-8 w-8 -translate-y-1/4 translate-x-1/4 transform border-2 border-primary bg-white text-lg text-muted-foreground hover:bg-white"
                    >
                        <div className="flex h-full w-full items-center justify-center">
                            {cartItemsCount}
                        </div>
                    </Badge>
                    <ShoppingCart width={64} height={64} />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[540px]">
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-4">
                        <SheetHeader className="flex items-center">
                            <SheetTitle className="flex items-center gap-2 text-xl font-semibold text-muted-foreground">
                                <ShoppingCart />
                                Carrinho
                            </SheetTitle>
                        </SheetHeader>
                        {cartItems.length > 0 && (
                            <Button
                                onClick={removeAll}
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive/90"
                            >
                                <X className="mr-2 h-4 w-4" />
                                Limpar
                            </Button>
                        )}
                    </div>

                    <div className="h-[1px] w-full bg-muted" />

                    {/* Cart Items */}
                    <ScrollArea className="flex-1 py-4">
                        {cartItems.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
                                <ShoppingCart width={48} height={48} className="mb-2 opacity-20" />
                                <p>Seu carrinho está vazio</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <CartProduct
                                        key={item.id}
                                        {...item}
                                    />
                                ))}
                            </div>
                        )}
                    </ScrollArea>

                    {/* Footer with total and checkout button */}
                    {cartItems.length > 0 && (
                        <div className="border-t pt-4">
                            <div className="mb-4 flex items-center justify-between">
                                <span className="text-muted-foreground">Total</span>
                                <span className="text-lg font-semibold text-primary">
                                    <MoneyFormat value={cartValue} />
                                </span>
                            </div>
                            <AddOrderButton
                                cartItems={cartItems.map(item => ({
                                    ...item,
                                    isKgProduct: item.isKgProduct || false
                                }))}
                                cartValue={cartValue}
                            />
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default Cart;