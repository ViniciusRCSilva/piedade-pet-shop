"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../../../_components/ui/alert-dialog"
import { useState } from "react"
import { toast } from "sonner"
import { deleteProduct } from "@/app/_actions/product"

interface DeleteProductDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    productId: string
    productName: string
}

export default function DeleteProductDialog({
    open,
    onOpenChange,
    productId,
    productName,
}: DeleteProductDialogProps) {
    const [loading, setLoading] = useState(false)

    const onDelete = async () => {
        try {
            setLoading(true)
            await deleteProduct(productId)
            toast.success("Produto excluído com sucesso!", {
                className: "bg-orange-500 text-white",
                duration: 3000,
            })
            onOpenChange(false)
        } catch (error) {
            toast.error(`Erro ao excluir produto: ${error}`, {
                className: "bg-red-500 text-white",
                duration: 3000,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso <span className="font-semibold text-destructive">excluirá permanentemente</span> o produto{" "}
                        <span className="font-semibold">{productName}</span>.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={loading}
                        onClick={onDelete}
                        className="bg-destructive hover:bg-destructive/90"
                    >
                        {loading ? "Excluindo..." : "Excluir"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}