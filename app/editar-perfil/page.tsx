"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../_components/ui/card";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { getUserByClerkId, updateUser } from "../_actions/user";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../_components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../_components/ui/form"
import { Input } from "../_components/ui/input"
import { Loader2, User } from "lucide-react";
import Image from "next/image";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../_components/ui/breadcrumb";
import Link from "next/link";
import Footer from "../_components/footer";

interface User {
    id: string;
    clerkId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}

const formSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(20, "Nome deve ter no máximo 20 caracteres"),
    phone: z.string()
        .min(11, "Telefone deve ter 11 dígitos")
        .transform(value => value.replace(/\D/g, "")),
    rua: z.string().min(3, "Rua deve ter pelo menos 3 caracteres"),
    numeroRua: z.string().min(1, "Número da rua é obrigatório"),
    complemento: z.string().optional(),
    bairro: z.string().min(2, "Bairro deve ter pelo menos 2 caracteres")
})

const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 11) {
        return digits.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return digits.slice(0, 11).replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};

const formatAddress = (rua: string, numeroRua: string, complemento: string, bairro: string) => {
    if (!rua || !numeroRua || !bairro) return "";

    const formattedComplemento = complemento.trim();
    if (formattedComplemento) {
        return `${rua}, ${numeroRua}, ${formattedComplemento} - ${bairro}`;
    }
    return `${rua}, ${numeroRua} - ${bairro}`;
};

const parseAddress = (address: string) => {
    if (!address) return { rua: '', numeroRua: '', complemento: '', bairro: '' };

    // Split by hyphen first to separate the bairro
    const [mainPart, bairroPart] = address.split('-').map(part => part.trim());

    // Split the main part by commas
    const parts = mainPart.split(',').map(part => part.trim());

    const rua = parts[0] || '';
    const numeroRua = parts[1] || '';
    const complemento = parts[2] || '';
    const bairro = bairroPart || '';

    return { rua, numeroRua, complemento, bairro };
};

const EditProfile = () => {
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState<User | null>(null);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            rua: "",
            numeroRua: "",
            complemento: "",
            bairro: ""
        },
    });

    // Watch form values for real-time updates
    const watchedValues = form.watch();
    const currentAddress = formatAddress(
        watchedValues.rua,
        watchedValues.numeroRua,
        watchedValues.complemento || "",
        watchedValues.bairro
    );

    useEffect(() => {
        const loadUserData = async () => {
            if (user?.id) {
                const data = await getUserByClerkId(user.id);
                if (data) {
                    setUserData(data);
                    const address = parseAddress(data.address);
                    form.reset({
                        name: data.name,
                        phone: data.phone,
                        rua: address.rua,
                        numeroRua: address.numeroRua,
                        complemento: address.complemento,
                        bairro: address.bairro
                    });
                }
            }
        };
        loadUserData();
    }, [user, form]);

    if (!user) {
        router.push("/");
        return null;
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!userData) {
            toast.error("Usuário não encontrado");
            return;
        }

        try {
            setIsLoading(true);
            const formattedAddress = formatAddress(values.rua, values.numeroRua, values.complemento || "", values.bairro);

            await updateUser({
                id: userData.id,
                name: values.name,
                phone: values.phone,
                address: formattedAddress
            });

            toast.success("Perfil atualizado com sucesso!");
            router.push("/perfil");
        } catch (error) {
            toast.error("Erro ao atualizar perfil");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen pt-[100px]">
            <div className="flex flex-col sticky top-20 px-6 pt-10 gap-8 bg-white lg:px-20 z-10">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Início</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/perfil">Minha conta</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Editar perfil</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="w-full h-[1px] bg-purple/20" />
            </div>

            <div className="flex-1 container mx-auto px-6 py-10">
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.5fr] gap-10">
                    {/* User Card */}
                    <div className="flex flex-col gap-6">
                        <Card className="border-none shadow-none bg-transparent">
                            <CardContent className="p-0">
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    {user?.hasImage && (
                                        <div className="relative w-32 h-32 rounded-full overflow-hidden ring-2 ring-purple ring-offset-2">
                                            <Image
                                                src={user?.imageUrl}
                                                alt={`${userData?.name} Foto`}
                                                fill
                                                className="object-cover"
                                                draggable={false}
                                            />
                                        </div>
                                    )}

                                    <div className="flex flex-col items-center sm:items-start gap-1">
                                        <p className="text-2xl font-bold text-muted-foreground">
                                            {watchedValues.name || userData?.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">{userData?.email}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex w-full items-center justify-between text-muted-foreground">
                                    Informações Pessoais
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <h3 className="text-sm font-medium text-muted-foreground">Contato</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Email</p>
                                            <p className="font-medium text-muted-foreground">{userData?.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Telefone</p>
                                            <p className="font-medium text-muted-foreground">
                                                {watchedValues.phone ? formatPhoneNumber(watchedValues.phone) : formatPhoneNumber(userData?.phone || "")}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-sm font-medium text-muted-foreground">Endereço de Entrega</h3>
                                    <p className="font-medium text-muted-foreground">
                                        {currentAddress || userData?.address}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Edit Form */}
                    <div className="w-full">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-muted-foreground">Editar Informações</CardTitle>
                            </CardHeader>
                            <CardContent className="text-muted-foreground">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nome</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Telefone</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            onChange={(e) => {
                                                                const formatted = formatPhoneNumber(e.target.value);
                                                                e.target.value = formatted;
                                                                field.onChange(formatted);
                                                            }}
                                                            placeholder="(XX) XXXXX-XXXX"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="rua"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Rua</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="numeroRua"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Número</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="complemento"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Complemento (opcional)</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="bairro"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Bairro</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="flex items-center gap-4">
                                            <Button asChild variant="outline">
                                                <Link href="/perfil">
                                                    Cancelar
                                                </Link>
                                            </Button>
                                            <Button type="submit" className="w-full" disabled={isLoading}>
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Atualizando...
                                                    </>
                                                ) : (
                                                    'Salvar Alterações'
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditProfile;