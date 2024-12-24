"use client";

import { Button } from "../../_components/ui/button";
import { EditIcon, TrashIcon, ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import EditProductDialog from "../_components/edit-product-dialog";
import { formatters } from "@/app/_utils/utils";
import DeleteProductDialog from "../_components/delete-product-dialog";
import Image from "next/image";
import { SerializedProduct } from "../../_helper";

export const columns: ColumnDef<SerializedProduct>[] = [
    {
        accessorKey: "image",
        header: "",
        cell: ({ row: { original: product } }) => (
            <Image src={product.image} alt={product.name} width={50} height={50} />
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="pl-0 hover:bg-transparent"
                >
                    Nome
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row: { original: product } }) => (
            <div className="w-80 truncate">{product.name}</div>
        ),
    },
    {
        accessorKey: "animal",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="pl-0 hover:bg-transparent"
                >
                    Animal
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row: { original: product } }) => (
            <div className="w-24 truncate">{formatters.getAnimalCategory(product.animal)}</div>
        ),
    },
    {
        accessorKey: "description",
        header: "Descrição",
        cell: ({ row: { original: product } }) => (
            <div className="w-80 truncate">{product.description}</div>
        ),
    },
    {
        accessorKey: "value",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="pl-0 hover:bg-transparent"
                >
                    Valor
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => formatters.currency(Number(row.original.value)),
        sortingFn: (rowA, rowB) => {
            const valueA = Number(rowA.original.value)
            const valueB = Number(rowB.original.value)
            return valueA - valueB
        }
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="pl-0 hover:bg-transparent"
                >
                    Categoria
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => formatters.category(row.original.category),
        sortingFn: (rowA, rowB) => {
            const labelA = formatters.category(rowA.original.category)
            const labelB = formatters.category(rowB.original.category)

            return labelA.localeCompare(labelB, 'pt-BR')
        }
    },
    {
        accessorKey: "quantity",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="pl-0 hover:bg-transparent"
                >
                    Quantidade
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row: { original: product } }) => {
            if (product.category === "KG_FEED") {
                return `${Number(product.quantity)} unidades por Kg`;
            }
            return Number(product.quantity) === 1 ? `${Number(product.quantity)} unidade` : `${Number(product.quantity)} unidades`;
        }
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="pl-0 hover:bg-transparent"
                >
                    Atualizado em
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => formatters.date(row.original.updatedAt),
        sortingFn: (rowA, rowB) => {
            const dateA = new Date(rowA.original.updatedAt).getTime()
            const dateB = new Date(rowB.original.updatedAt).getTime()
            return dateA - dateB
        }
    },
    {
        id: "actions",
        cell: function ActionCell({ row: { original: product } }) {
            const [isEditing, setIsEditing] = useState(false);
            const [isDeleting, setIsDeleting] = useState(false);

            return (
                <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => setIsEditing(true)}>
                        <EditIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => setIsDeleting(true)}>
                        <TrashIcon className="h-4 w-4" />
                    </Button>

                    <EditProductDialog
                        open={isEditing}
                        onOpenChange={setIsEditing}
                        product={product}
                    />

                    <DeleteProductDialog
                        open={isDeleting}
                        onOpenChange={setIsDeleting}
                        productId={product.id}
                        productName={product.name}
                    />
                </div>
            );
        },
    },
];