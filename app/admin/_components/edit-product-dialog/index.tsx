"use client"

import { Button } from "../../../_components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../../../_components/ui/dialog"
import { Input } from "../../../_components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../_components/ui/select"
import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../../_components/ui/form"
import { toast } from "sonner"
import { updateProduct } from "../../../_actions/product"
import { SerializedProduct } from "../../../_helper"
import { ProductCategory } from "@prisma/client"
import { formatters } from "@/app/_utils/utils"
import Image from "next/image"
import { UploadDropzone } from "@/app/_utils/uploadthing"
import { ScrollArea } from "@/app/_components/ui/scroll-area"
import { LoaderCircleIcon } from "lucide-react"

const formSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatória"),
    category: z.enum(["BAG_FEED", "KG_FEED", "SNACK", "ACCESSORY", "TOY", "MEDICINE", "HYGIENE", "PLAGUE_CONTROL"], {
        required_error: "Categoria é obrigatória",
    }),
    value: z.string().min(1, "Valor é obrigatório"),
    quantity: z.string().min(1, "Quantidade é obrigatória"),
    image: z.string().min(1, "Imagem é obrigatória"),
})

interface EditProductDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    product: SerializedProduct
}

export default function EditProductDialog({
    open,
    onOpenChange,
    product
}: EditProductDialogProps) {
    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState<string | null>(null)
    const [imageName, setImageName] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: product.name,
            description: product.description,
            category: product.category,
            value: product.value.toString(),
            quantity: product.quantity.toString(),
            image: product.image,
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)

            await updateProduct({
                id: product.id,
                name: values.name,
                description: values.description,
                category: values.category,
                value: parseFloat(values.value),
                quantity: parseFloat(values.quantity),
                image: values.image || "",
            })

            toast.success("Produto atualizado com sucesso!", {
                className: "bg-blue-500 text-white",
                duration: 3000,
            })
            onOpenChange(false)
        } catch (error) {
            toast.error(`Erro ao atualizar produto: ${error}`, {
                className: "bg-red-500 text-white",
                duration: 3000,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar produto</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <ScrollArea className="flex flex-col h-[600px] gap-4">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Categoria</FormLabel>
                                        <Select
                                            disabled={loading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione uma categoria" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.values(ProductCategory).map((category) => (
                                                    <SelectItem key={category} value={category}>
                                                        {formatters.category(category)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descrição</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="value"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Valor</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                type="number"
                                                step="0.01"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantidade</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                type="number"
                                                step="0.001"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Imagem Atual:</FormLabel>
                                        <Image
                                            src={field.value}
                                            alt="Preview"
                                            width={200}
                                            height={200}
                                        />
                                        <p>Alterar imagem:</p>
                                        {preview ? (
                                            <Image
                                                src={preview}
                                                alt="Preview"
                                                width={200}
                                                height={200}
                                            />
                                        ) : (
                                            <UploadDropzone
                                                endpoint="imageUploader"
                                                onChange={(res) => {
                                                    setImageName(res[0].name)
                                                }}
                                                onClientUploadComplete={(res) => {
                                                    if (res?.[0]) {
                                                        field.onChange(res[0].url)
                                                        setPreview(res[0].url)
                                                    }
                                                }}
                                                onUploadError={(error: Error) => {
                                                    toast.error(`Erro ao importar imagem: ${error.message}`, {
                                                        className: "bg-red-500 text-white",
                                                        duration: 3000,
                                                    })
                                                }}
                                                content={{
                                                    allowedContent: "Imagens até 4MB",
                                                    button({ ready }) {
                                                        if (ready) return <div>Importar {imageName}</div>;
                                                        return "Carregando...";
                                                    },
                                                    uploadIcon: () => null,
                                                }}
                                            />
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </ScrollArea>


                        <div className="flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setPreview(null)
                                    onOpenChange(false)
                                    form.reset()
                                }}
                                disabled={loading}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? (
                                    <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
                                ) : null}
                                Salvar alterações
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}