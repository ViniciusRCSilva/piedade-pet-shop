"use client"

import { useCart } from "@/app/_components/cart/context/cartContext";
import MoneyFormat from "@/app/_components/money-format";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/select";
import { formatters } from "@/app/_utils/utils";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { Minus, Plus, SignIn } from "@phosphor-icons/react/dist/ssr";
import { ProductCategory } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import Link from "next/link";
import FavoriteButton from "@/app/_components/favorite-button";

interface ProductCardProps {
    id: string;
    category: ProductCategory
    name: string
    description: string
    quantity: number
    value: number
    valueByKg?: number
    image: string
}

const ProductCard = ({ id, category, name, description, quantity: availableQuantity, value, valueByKg, image }: ProductCardProps) => {
    const { addToCart } = useCart();
    const [productQuantity, setProductQuantity] = useState(1);
    const [kgQuantity, setKgQuantity] = useState(1);
    const { isSignedIn } = useAuth();
    const [disabled, setDisabled] = useState(false);

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

        const finalQuantity = category !== "KG_FEED" ? productQuantity : kgQuantity;

        const addToCardSuccess = addToCart({
            id,
            name,
            description,
            value: value,
            category,
            isKgProduct: category === "KG_FEED",
            valueByKg: valueByKg,
            availableQuantity,
            image,
        }, finalQuantity);

        if (addToCardSuccess) {
            toast.success("Produto adicionado ao carrinho!", {
                style: {
                    backgroundColor: '#65a30d',
                    color: 'white',
                    border: 'none'
                },
                duration: 5000
            });
        }

        setProductQuantity(1);
        setKgQuantity(1);
    };

    const handleKgIncrement = () => {
        setKgQuantity(Math.min(kgQuantity + 0.250, 5));
    };

    const handleKgDecrement = () => {
        setKgQuantity(Math.max(kgQuantity - 0.250, 0.250));
    };

    useEffect(() => {
        if (availableQuantity === 0) {
            setDisabled(true);
        }
    }, [availableQuantity]);

    return (
        <Card className={`relative flex flex-col h-full w-full bg-white ${disabled ? "opacity-50" : ""}`}>
            {isSignedIn ? (
                <FavoriteButton productId={id} className="absolute top-5 right-6" />
            ) : null}
            <CardHeader className="flex-grow group">
                <div className="flex justify-between items-start">
                    <Link href={`/produto/${id}`} className="flex-1 group">
                        <div className="flex w-full items-center justify-center mb-2">
                            <div className="flex w-[250px] h-[250px] items-center justify-center rounded-lg border">
                                <Image
                                    src={image}
                                    alt={name}
                                    className="object-cover"
                                    width={150}
                                    height={150}
                                />
                            </div>
                        </div>
                        <CardTitle className="text-lg text-muted-foreground font-normal group-hover:underline">{name}</CardTitle>
                        <CardDescription className="text-2xl font-bold text-primary">
                            <MoneyFormat value={value} />
                            {category === "KG_FEED" && "/KG"}
                            <p className="font-normal text-sm text-muted-foreground">{formatters.category(category)}</p>
                        </CardDescription>
                    </Link>
                </div>
            </CardHeader>

            <CardContent className="mt-auto">
                {availableQuantity === 1 ? (
                    <p className="text-sm font-semibold text-red-500">* Aproveite! Resta somente {availableQuantity} unidade!</p>
                ) : null}
                <span className="text-sm text-muted-foreground">Quantidade</span>
                <div className="flex justify-between gap-4 items-center">
                    {category === "KG_FEED" ? (
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
                            disabled={disabled}
                        >
                            <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="Qtd" />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from({ length: availableQuantity }, (_, i) => i + 1).map((num) => (
                                    <SelectItem key={num} value={num.toString()}>
                                        {num}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    {isSignedIn ? (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        onClick={handleAddToCart}
                                        size="icon"
                                        className="rounded-full"
                                        disabled={disabled}
                                    >
                                        <Plus />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Adicionar ao carrinho</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ) : (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <SignInButton signUpFallbackRedirectUrl={"/"} mode="modal">
                                        <Button variant="outline" size="icon">
                                            <SignIn className="mr-2 h-4 w-4" />
                                        </Button>
                                    </SignInButton>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Entrar na conta</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default ProductCard;