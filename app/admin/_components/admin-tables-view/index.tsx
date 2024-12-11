"use client"

import React, { useState } from "react";
import { columns as productColumns } from "../../_columns/products";
import { columns as orderColumns } from "../../_columns/orders";
import ButtonAddProduct from "../button-add-product";
import { DataTable as DataTableProducts } from "@/app/_components/ui/data-table-products";
import { DataTable as DataTableOrders } from "@/app/_components/ui/data-table-orders";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import AdminNav from "../switch-datatable-buttons";
import { SerializedProduct, SerializedOrder } from "../../../_helper";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr";

const AdminTablesView = ({ products, orders }: { products: SerializedProduct[]; orders: SerializedOrder[] }) => {
    const [activeView, setActiveView] = useState<"products" | "orders">("products");

    return (
        <div className="h-full bg-muted">
            {/* Body */}
            <ScrollArea className="h-[calc(100%-1rem)] pt-16 lg:pt-20">
                <div className="min-w-full p-6">
                    <div className="mb-4 flex flex-col gap-4 items-center lg:justify-between lg:flex-row lg:gap-0">
                        <div className="flex flex-col items-center gap-4 my-6 lg:flex-row">
                            <Button asChild variant="link">
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-2"
                                >
                                    <CaretLeft size={20} />
                                    <span>Voltar para o site</span>
                                </Link>
                            </Button>
                            <AdminNav activeView={activeView} onViewChange={setActiveView} />
                        </div>
                        {activeView === "products" && (
                            <ButtonAddProduct />
                        )}
                    </div>

                    <div className="w-[calc(100vw-3rem)] lg:w-full">
                        {activeView === "products" ? (
                            <DataTableProducts columns={productColumns} data={products || []} />
                        ) : (
                            <DataTableOrders columns={orderColumns} data={orders || []} />
                        )}
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
};

export default AdminTablesView;