"use client"

import { useCart } from "@/app/_components/cart/context/cartContext";
import MoneyFormat from "@/app/_components/money-format";
import { Button } from "@/app/_components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/select";
import ZoomImage from "@/app/_components/zoom-image";
import { SerializedProduct } from "@/app/_helper";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { Minus, Plus, SignIn } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import FavoriteButton from "@/app/_components/favorite-button";

interface ProductDetailsProps {
    product: SerializedProduct;
}

export function ProductDetails({ product }: ProductDetailsProps) {
    const { addToCart } = useCart();
    const [productQuantity, setProductQuantity] = useState(1);
    const [kgQuantity, setKgQuantity] = useState(1);
    const { isSignedIn } = useAuth();

    const handleAddToCart = () => {
        if (!isSignedIn) {
            toast.error("Você precisa estar logado para adicionar produtos ao carrinho!", {
                style: {
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none'
                },
            });
            return;
        }

        const finalQuantity = product.category !== "KG_FEED" ? productQuantity : kgQuantity;

        const addToCardSuccess = addToCart({
            id: product.id,
            name: product.name,
            description: product.description,
            value: product.value,
            category: product.category,
            isKgProduct: product.category === "KG_FEED",
            availableQuantity: product.quantity,
            image: product.image,
        }, finalQuantity);

        if (addToCardSuccess) {
            toast.success("Produto adicionado ao carrinho!", {
                style: {
                    backgroundColor: '#65a30d',
                    color: 'white',
                    border: 'none'
                },
            });
        }
    };

    const handleKgIncrement = () => {
        setKgQuantity(Math.min(kgQuantity + 0.250, 5));
    };

    const handleKgDecrement = () => {
        setKgQuantity(Math.max(kgQuantity - 0.250, 0.250));
    };

    return (
        <div className="container px-4 lg:px-6">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-8">
                <div className="flex flex-col gap-4 items-center">
                    <div className="hidden lg:flex w-full max-w-[600px] h-[600px] items-center justify-center rounded-lg border bg-white p-6">
                        <ZoomImage
                            src={product.image}
                            alt={product.name}
                            width={600}
                            height={600}
                            className="object-contain"
                        />
                    </div>
                    <div className="flex lg:hidden w-full max-w-[300px] h-[300px] items-center justify-center rounded-lg border bg-white p-4">
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="object-contain"
                        />
                    </div>
                    <p className="text-sm text-purple">*Imagem meramente ilustrativa</p>
                </div>

                <div className="w-full flex flex-col items-center px-0 lg:px-0">
                    <div className="flex flex-col w-full h-full justify-between gap-6 lg:gap-8">
                        <div className="flex flex-col gap-4">
                            {isSignedIn ? (
                                <FavoriteButton productId={product.id} className="self-end" />
                            ) : null}
                            <h1 className="text-2xl lg:text-4xl text-muted-foreground">{product.name}</h1>

                            <div className="flex items-center gap-2">
                                <span className="text-xs lg:text-sm text-muted-foreground">Código: {product.id}</span>
                                <span className="text-xs lg:text-sm text-muted-foreground">|</span>
                                {product.quantity === 0 ? (
                                    <span className="text-xs lg:text-sm text-red-500">Esgotado</span>
                                ) : (
                                    <span className="text-xs lg:text-sm text-emerald-500">Em estoque</span>
                                )}
                            </div>

                            <div className="w-full h-[1px] bg-purple/20" />

                            <div className="flex flex-col gap-2">
                                <p className="text-muted-foreground font-semibold">Informações:</p>
                                <p className="text-xs lg:text-sm text-muted-foreground">{product.description}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="w-full h-[1px] bg-purple/20" />
                            <div className="text-2xl lg:text-3xl font-bold text-primary">
                                <MoneyFormat value={product.value} />
                            </div>
                            <div className="flex flex-col lg:flex-row items-stretch lg:items-end gap-4">
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm text-muted-foreground">Quantidade:</p>
                                    {product.category === "KG_FEED" ? (
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={handleKgDecrement}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span className="w-16 text-center">{kgQuantity}kg</span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={handleKgIncrement}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <Select
                                            value={productQuantity.toString()}
                                            onValueChange={(value: string) => setProductQuantity(Number(value))}
                                            disabled={product.quantity === 0}
                                        >
                                            <SelectTrigger className="w-[100px]">
                                                <SelectValue placeholder="Qtd" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Array.from({ length: product.quantity }, (_, i) => i + 1).map((num) => (
                                                    <SelectItem key={num} value={num.toString()}>
                                                        {num}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                </div>

                                {isSignedIn ? (
                                    <Button
                                        className="flex-1"
                                        onClick={handleAddToCart}
                                        disabled={product.quantity === 0}
                                    >
                                        Adicionar ao carrinho
                                    </Button>
                                ) : (
                                    <SignInButton signUpFallbackRedirectUrl={"/"} mode="modal">
                                        <Button className="flex w-full items-center gap-2" variant="outline">
                                            <SignIn className="w-4 h-4" />
                                            Entre para adicionar ao carrinho
                                        </Button>
                                    </SignInButton>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
