import { Order, OrderItem, Product } from "@prisma/client";

export type SerializedProduct = Omit<Product, 'value' | 'quantity'> & {
    quantity: number;
    value: number;
};

export type SerializedOrderItem = Omit<OrderItem, 'value' | 'quantity'> & {
    value: number;
    quantity: number;
    product: SerializedProduct;
};

export type SerializedOrder = Omit<Order, 'totalAmount'> & {
    totalAmount: number;
    items: SerializedOrderItem[];
};