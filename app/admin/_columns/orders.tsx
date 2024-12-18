"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/app/_components/ui/button"
import { EyeIcon } from "lucide-react"
import { formatters } from "@/app/_utils/utils"
import { SerializedOrder } from "../../_helper"
import { Badge } from "@/app/_components/ui/badge"
import ViewOrderDialog from "../_components/view-order"
import { useState } from "react"

export const columns: ColumnDef<SerializedOrder>[] = [
    {
        accessorKey: "id",
        header: "ID do Pedido",
        cell: ({ row }) => row.original.id,
    },
    {
        accessorKey: "userName",
        header: "Cliente",
        cell: ({ row }) => row.original.userName,
    },
    {
        accessorKey: "phone",
        header: "Telefone",
        cell: ({ row }) => formatters.formatPhoneNumber(row.original.userPhone),
    },
    {
        accessorKey: "address",
        header: "Endereço",
        cell: ({ row }) => row.original.userAddress,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <Badge variant={formatters.statusBadgeVariant(row.original.status)}>
                {formatters.status(row.original.status)}
            </Badge>
        ),
    },
    {
        accessorKey: "products",
        header: "Produtos",
        cell: ({ row }) => (
            <div className="max-w-[500px] space-y-1">
                {row.original.items.map((item, index) => (
                    <div key={item.id} className="text-sm">
                        {`${item.product.name} (${item.quantity} ${item.category === "KG_FEED" ? "kg" : "un"})`}
                        {index < row.original.items.length - 1 && ", "}
                    </div>
                ))}
            </div>
        ),
    },
    {
        accessorKey: "totalAmount",
        header: "Valor Total",
        cell: ({ row }) => formatters.currency(Number(row.original.totalAmount)),
    },
    {
        accessorKey: "createdAt",
        header: "Data do Pedido",
        cell: ({ row }) => formatters.date(row.original.createdAt),
    },
    {
        accessorKey: "updatedAt",
        header: "Data de Conclusão",
        cell: ({ row }) => (
            row.original.status === "CONCLUDED" || row.original.status === "CANCELLED" ? formatters.date(row.original.updatedAt) : "-"
        ),
    },
    {
        id: "actions",
        cell: function ActionCell({ row: { original: order } }) {
            const [open, setOpen] = useState(false);

            return (
                <>
                    <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
                        <EyeIcon className="h-4 w-4" />
                        Visualizar pedido
                    </Button>
                    <ViewOrderDialog
                        open={open}
                        onOpenChange={setOpen}
                        order={order}
                    />
                </>
            )
        },
    },
]