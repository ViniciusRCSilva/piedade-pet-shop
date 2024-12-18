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
import { createProduct } from "../../../_actions/product"
import { ProductCategory } from "@prisma/client"
import { formatters } from "@/app/_utils/utils"
import { LoaderCircleIcon } from "lucide-react"
import { UploadDropzone } from "@/app/_utils/uploadthing"
import Image from "next/image"

const formSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatória"),
    category: z.enum(["BAG_FEED", "KG_FEED", "SNACK", "ACCESSORY", "TOY", "MEDICINE", "HYGIENE"], {
        required_error: "Categoria é obrigatória",
    }),
    value: z.string().min(1, "Valor é obrigatório"),
    quantity: z.string().min(1, "Quantidade é obrigatória"),
    image: z.string().min(1, "Imagem é obrigatória"),
})

interface CreateProductDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CreateProductDialog({
    open,
    onOpenChange
}: CreateProductDialogProps) {
    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState<string | null>(null)
    const [imageName, setImageName] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            category: undefined,
            value: "",
            quantity: "",
            image: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)

            await createProduct({
                name: values.name,
                description: values.description,
                category: values.category,
                value: Number(values.value),
                quantity: Number(values.quantity),
                image: values.image || "",
            })

            toast.success("Produto criado com sucesso!", {
                className: "bg-emerald-500 text-white",
                duration: 3000,
            })
            form.reset()
            setPreview(null)
            setImageName(null)
            onOpenChange(false)
        } catch (error) {
            toast.error(`Erro ao criar produto: ${error}`, {
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
                    <DialogTitle>Criar novo produto</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                        <Input disabled={loading} placeholder="Nome do produto" {...field} />
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
                                        <Input
                                            disabled={loading}
                                            placeholder="Descrição do produto"
                                            {...field}
                                        />
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
                                            placeholder="29.90"
                                            type="number"
                                            step="1"
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
                                            placeholder="10"
                                            type="number"
                                            step="1"
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
                                    <FormLabel>Imagem</FormLabel>
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

                        <div className="flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setPreview(null)
                                    setImageName(null)
                                    onOpenChange(false)
                                    form.reset()
                                }}
                                disabled={loading}
                            >
                                Cancelar
                            </Button>

                            <Button disabled={loading} type="submit">
                                {loading ? (
                                    <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <></>
                                )}
                                Criar
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
