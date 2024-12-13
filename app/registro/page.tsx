"use client";

import { Heart } from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent, CardHeader, CardTitle } from "../_components/ui/card";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { createUser } from "../_actions/user";
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
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../_components/ui/carousel";
import Image from "next/image";
import { Loader2 } from "lucide-react";

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
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");

    // Format the number as (XX) XXXXX-XXXX
    if (digits.length <= 11) {
        return digits.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }

    // If more than 11 digits, truncate
    return digits.slice(0, 11).replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};

const formatAddress = (rua: string, numeroRua: string, complemento: string, bairro: string) => {
    if (complemento) {
        return `${rua}, ${numeroRua}, ${complemento} - ${bairro}`;
    }

    return `${rua}, ${numeroRua} - ${bairro}`;
};

const Register = () => {
    const { user } = useUser();
    const [username, setUsername] = useState(user?.fullName);
    const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress);
    const [rua, setRua] = useState("");
    const [numeroRua, setNumeroRua] = useState("");
    const [complemento, setComplemento] = useState("");
    const [bairro, setBairro] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    if (!user) {
        router.push("/");
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: username || "",
            phone: "",
            rua: "",
            numeroRua: "",
            complemento: "",
            bairro: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!user) {
            toast.error("Usuário não encontrado");
            return;
        }

        try {
            setIsLoading(true);

            // Format the address before submission
            const formattedAddress = formatAddress(values.rua, values.numeroRua, values.complemento || "", values.bairro);

            await createUser({
                clerkId: user.id,
                name: values.name,
                email: user.primaryEmailAddress!.emailAddress,
                phone: values.phone,
                address: formattedAddress,
            });

            toast.success("Cadastro realizado com sucesso!", {
                className: "bg-emerald-500 text-white",
                duration: 3000,
            });

            router.push("/");
        } catch (error) {
            console.error("Error creating user:", error);
            toast.error("Erro ao criar o usuário. Por favor, tente novamente.", {
                className: "bg-red-500 text-white",
                duration: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            setUsername(user.fullName);
            setEmail(user.primaryEmailAddress?.emailAddress);
        }
    }, [user])

    return (
        <main className="w-full min-h-screen flex flex-col items-center justify-center p-10 text-muted-foreground lg:grid lg:grid-cols-2 gap-8">
            {/* Presentation */}
            <div className="flex flex-col gap-4 w-full h-full items-center lg:items-start justify-center">
                <Image
                    src="/dog_register.png"
                    alt="Olá!"
                    width={300}
                    height={300}
                    draggable={false}
                    priority
                    className="-mb-16"
                />
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl font-bold mb-4">Olá, {username}!</h1>
                    <div className="flex items-center gap-2 justify-center lg:justify-start">
                        <h3 className="text-xl">Que bom ter você aqui no Piedade PetShop!</h3>
                        <Heart size={32} className="text-primary" fill="currentColor" />
                    </div>
                </div>

                <div className="text-center lg:text-left">
                    <p>Preencha todos os campos para criar sua conta e aproveite nossos produtos!</p>
                </div>
            </div>

            {/* Form */}
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-full max-w-md">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <Carousel className="w-full">
                                <CarouselContent>
                                    <CarouselItem>
                                        <Card className="w-full">
                                            <CardHeader>
                                                <CardTitle className="text-2xl">Dados Pessoais</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Nome</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Seu nome completo"
                                                                    {...field}
                                                                    onChange={(e) => {
                                                                        setUsername(e.target.value);
                                                                        field.onChange(e.target.value);
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <div className="flex flex-col gap-2">
                                                    <p className="text-sm font-medium leading-none">Email</p>
                                                    <div className="opacity-50 px-3 py-2 border rounded-md cursor-not-allowed select-none">
                                                        <p>{email}</p>
                                                    </div>
                                                </div>
                                                <FormField
                                                    control={form.control}
                                                    name="phone"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Telefone</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="(81) 99999-9999"
                                                                    {...field}
                                                                    onChange={(e) => {
                                                                        const formatted = formatPhoneNumber(e.target.value);
                                                                        field.onChange(formatted);
                                                                    }}
                                                                    maxLength={15}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                    <CarouselItem>
                                        <Card className="w-full">
                                            <CardHeader>
                                                <CardTitle className="text-2xl">Endereço de Entrega</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="space-y-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="rua"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Rua</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder="Rua do seu endereço"
                                                                        {...field}
                                                                        value={rua}
                                                                        onChange={(e) => {
                                                                            setRua(e.target.value);
                                                                            field.onChange(e.target.value);
                                                                        }}
                                                                    />
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
                                                                <FormLabel>Nº da Rua</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder="Número da sua rua"
                                                                        {...field}
                                                                        value={numeroRua}
                                                                        onChange={(e) => {
                                                                            setNumeroRua(e.target.value);
                                                                            field.onChange(e.target.value);
                                                                        }}
                                                                    />
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
                                                                <FormLabel>Complemento</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder="Edf., Bloco, Apartamento..."
                                                                        {...field}
                                                                        value={complemento}
                                                                        onChange={(e) => {
                                                                            setComplemento(e.target.value);
                                                                            field.onChange(e.target.value);
                                                                        }}
                                                                    />
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
                                                                    <Input
                                                                        placeholder="Bairro do seu endereço"
                                                                        {...field}
                                                                        value={bairro}
                                                                        onChange={(e) => {
                                                                            setBairro(e.target.value);
                                                                            field.onChange(e.target.value);
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                </CarouselContent>
                                <div className="hidden sm:block">
                                    <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2" />
                                    <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2" />
                                </div>
                            </Carousel>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Processando...
                                    </>
                                ) : (
                                    "Completar cadastro"
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </main>
    );
};

export default Register;