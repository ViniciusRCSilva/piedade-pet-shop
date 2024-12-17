"use client"

import { Heart } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/app/_components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { addFavoriteProduct, removeFavoriteProduct, checkFavoriteStatus, getUserByClerkId } from "@/app/_actions/user";
import { toast } from "sonner";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/app/_components/ui/tooltip";

interface FavoriteButtonProps {
    productId: string;
    className?: string;
}

export default function FavoriteButton({ productId, className }: FavoriteButtonProps) {
    const { userId: clerkId, isLoaded } = useAuth();
    const [isFavorited, setIsFavorited] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        async function initialize() {
            if (!clerkId || isInitialized) return;

            try {
                const user = await getUserByClerkId(clerkId);
                if (user) {
                    setUserId(user.id);
                    const isFavorite = await checkFavoriteStatus({ userId: user.id, productId });
                    setIsFavorited(isFavorite);
                }
            } catch (error) {
                console.error("Error initializing:", error);
            } finally {
                setIsInitialized(true);
            }
        }

        initialize();
    }, [clerkId, productId, isInitialized]);

    if (!isLoaded || !userId) {
        return null;
    }

    const toggleFavorite = async () => {
        if (!userId || !productId) return;

        setIsLoading(true);
        try {
            if (isFavorited) {
                await removeFavoriteProduct({ userId, productId });
                setIsFavorited(false);
                toast.success("Produto removido dos favoritos!", {
                    style: {
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none'
                    },
                });
            } else {
                await addFavoriteProduct({ userId, productId });
                setIsFavorited(true);
                toast.success("Produto adicionado aos favoritos!", {
                    style: {
                        backgroundColor: '#65a30d',
                        color: 'white',
                        border: 'none'
                    },
                });
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
            toast.error("Erro ao atualizar favoritos!", {
                style: {
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none'
                },
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleFavorite}
                        disabled={isLoading}
                        className={`${className} p-2 rounded-full ${isFavorited ? 'bg-primary hover:bg-primary/90' : 'bg-muted-foreground hover:bg-muted-foreground/90'}`}
                    >
                        <Heart
                            weight="fill"
                            className="h-5 w-5 text-white"
                        />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    {isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}