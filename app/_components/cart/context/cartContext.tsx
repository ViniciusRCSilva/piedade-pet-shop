"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { ProductCategory } from '@prisma/client';
interface CartProduct {
    id: string;
    isKgProduct?: boolean;
    category: ProductCategory;
    name: string;
    description: string;
    value: number;
    quantity: number;
    valueByKg?: number;
    availableQuantity: number;
    image: string;
}

interface CartContextType {
    cartItems: CartProduct[];
    addToCart: (product: Omit<CartProduct, 'quantity'>, quantity: number) => boolean;
    removeFromCart: (productId: string) => void;
    removeAll: () => void;
    updateQuantity: (productId: string, newQuantity: number) => void;
    removeAllFromCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_COOKIE_KEY = 'pet-shop-cart';

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartProduct[]>([]);

    useEffect(() => {
        const savedCart = Cookies.get(CART_COOKIE_KEY);
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                setCartItems(parsedCart);
            } catch (error) {
                console.error('Error parsing cart from cookie:', error);
            }
        }
    }, []);

    useEffect(() => {
        Cookies.set(CART_COOKIE_KEY, JSON.stringify(cartItems), { expires: 7 }); // Expires in 7 days
    }, [cartItems]);

    const addToCart = (product: Omit<CartProduct, 'quantity'>, quantity: number): boolean => {
        if (quantity <= 0) {
            toast.error("Quantidade inválida!", {
                style: {
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none'
                },
            });
            return false;
        }

        if (quantity > product.availableQuantity) {
            toast.error("Quantidade solicitada excede o estoque disponível!", {
                style: {
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none'
                },
            });
            return false;
        }

        setCartItems((prev) => {
            const existingProduct = prev.find(item => item.id === product.id);

            if (existingProduct) {
                const newQuantity = existingProduct.quantity + quantity;

                if (newQuantity > product.availableQuantity) {
                    toast.error("Quantidade total excede o estoque disponível!", {
                        style: {
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none'
                        },
                    });
                    return prev;
                }

                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: newQuantity }
                        : item
                );
            }

            return [...prev, { ...product, quantity }];
        });

        return true;
    };

    const removeFromCart = (productId: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== productId));
    };

    const removeAll = () => {
        setCartItems([]);
        toast.error("Todos os itens foram removidos do carrinho!", {
            style: {
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none'
            },
        });
    };

    const removeAllFromCart = () => {
        setCartItems([]);
    }

    const updateQuantity = (productId: string, newQuantity: number) => {
        setCartItems((prev) => {
            const product = prev.find(item => item.id === productId);

            if (!product) return prev;

            if (newQuantity <= 0) {
                removeFromCart(productId);
                toast.error("Produto removido do carrinho!", {
                    style: {
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none'
                    },
                });
                return prev.filter(item => item.id !== productId);
            }

            if (newQuantity > product.availableQuantity) {
                toast.error("Quantidade solicitada excede o estoque disponível!", {
                    style: {
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none'
                    },
                });
                return prev;
            }

            return prev.map(item =>
                item.id === productId
                    ? {
                        ...item,
                        category: product.category,
                        quantity: newQuantity,
                        value: item.isKgProduct && item.valueByKg
                            ? item.valueByKg * newQuantity
                            : item.value
                    }
                    : item
            );
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, removeAll, updateQuantity, removeAllFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}