"use client"

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { formatPhoneNumber } from "@/app/_utils/utils";
import { useUser } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { PenBoxIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface UserDetailsProps {
    userInfo: User | null;
}

const UserDetails = ({
    userInfo
}: UserDetailsProps) => {
    const { user } = useUser();

    return (
        <div className="flex flex-col gap-6 xl:justify-between">
            <Card className="border-none shadow-none bg-transparent">
                <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        {user?.hasImage && (
                            <div className="relative w-32 h-32 rounded-full overflow-hidden ring-2 ring-purple ring-offset-2">
                                <Image
                                    src={user?.imageUrl}
                                    alt={`${userInfo?.name} Foto`}
                                    fill
                                    className="object-cover"
                                    draggable={false}
                                />
                            </div>
                        )}

                        <div className="flex flex-col items-center sm:items-start gap-1">
                            <p className="text-2xl font-bold text-muted-foreground">{userInfo?.name}</p>
                            <p className="text-sm text-muted-foreground">{userInfo?.email}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex w-full items-center justify-between text-muted-foreground">
                        Informações Pessoais
                        <Button asChild variant="link">
                            <Link href="/perfil" className="flex items-center text-purple">
                                <PenBoxIcon className="w-4 h-4" />
                                <p className="text-sm font-semibold">Editar perfil</p>
                            </Link>
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Contato</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <p className="font-medium text-muted-foreground">{userInfo?.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Telefone</p>
                                <p className="font-medium text-muted-foreground">{formatPhoneNumber(userInfo!.phone)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Endereço de Entrega</h3>
                        <p className="font-medium text-muted-foreground">{userInfo?.address}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default UserDetails;