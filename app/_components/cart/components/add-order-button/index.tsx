import { Button } from "@/app/_components/ui/button"
import { CheckIcon, LoaderCircleIcon } from "lucide-react"
import { createOrder } from "@/app/_actions/order"
import { useUser } from "@clerk/nextjs"
import { toast } from "sonner"
import { useCart } from "../../context/cartContext"
import { ProductCategory } from "@prisma/client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog"
import { useEffect, useState } from "react"

interface AddOrderButtonProps {
    cartItems: {
        id: string;
        name: string;
        value: number;
        valueByKg?: number;
        quantity: number;
        category: ProductCategory;
        isKgProduct: boolean;
    }[];
    cartValue: number;
}

const AddOrderButton = ({ cartItems, cartValue }: AddOrderButtonProps) => {
    const { user, isLoaded } = useUser()
    const { removeAllFromCart } = useCart()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (dialogOpen) {
            timeoutId = setTimeout(() => {
                setDialogOpen(false)
            }, 10000)
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
        }
    }, [dialogOpen])

    const onSubmit = async () => {
        try {
            if (!isLoaded || !user) {
                toast.error("Você precisa estar logado para fazer um pedido")
                return
            }

            if (!cartItems || cartItems.length === 0) {
                toast.error("Seu carrinho está vazio")
                return
            }

            setLoading(true)

            // Format and validate items
            const formattedItems = cartItems.map(item => {
                const value = item.isKgProduct && item.valueByKg
                    ? Number(item.valueByKg)
                    : Number(item.value)

                if (isNaN(value)) {
                    throw new Error(`Invalid value for product ${item.name}`)
                }

                return {
                    productId: item.id,
                    quantity: Number(item.quantity),
                    value: value,
                    category: item.category
                }
            })

            const orderData = {
                userId: user.id,
                userName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
                userPhone: user.phoneNumbers?.[0]?.phoneNumber || "Não informado",
                totalAmount: Number(cartValue),
                items: formattedItems
            }

            console.log("Sending order data:", orderData)

            // Validate order data
            if (!orderData.userId || !orderData.userName || orderData.items.length === 0) {
                toast.error("Dados incompletos para criar o pedido")
                return
            }

            const result = await createOrder(orderData)

            if (!result) {
                throw new Error("Falha ao criar pedido")
            }

            setDialogOpen(true)
            removeAllFromCart()

        } catch (error) {
            console.error("Error creating order:", error)
            toast.error("Erro ao criar pedido")
        }
    }

    return (
        <>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex flex-col items-center justify-center gap-10">
                            <div className="flex w-20 h-20 items-center justify-center border-2 border-emerald-500 rounded-full">
                                <CheckIcon className="h-10 w-10 text-emerald-500" />
                            </div>
                            Pedido enviado com sucesso!
                        </DialogTitle>
                    </DialogHeader>
                    <p className="text-lg text-center text-muted-foreground">
                        Aguarde que a loja vai entrar em contato para confirmar o pedido.
                    </p>
                    <p className="text-center text-sm text-muted-foreground">
                        Fechando a janela em 10 segundos...
                    </p>
                </DialogContent>
            </Dialog>

            <Button
                onClick={onSubmit}
                disabled={!isLoaded || !user || cartItems.length === 0 || loading}
                className="w-full bg-lime-600 hover:bg-lime-600/90"
            >
                {loading ? (
                    <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <CheckIcon className="mr-2 h-4 w-4" />
                )}
                Finalizar Pedido
            </Button>
        </>
    )
}

export default AddOrderButton