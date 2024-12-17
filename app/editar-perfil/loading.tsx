import { Card, CardContent, CardHeader, CardTitle } from "../_components/ui/card";
import { Skeleton } from "../_components/ui/skeleton";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../_components/ui/breadcrumb";

const Loading = () => {
    return (
        <div className="flex flex-col min-h-screen pt-[100px]">
            <div className="flex flex-col sticky top-20 px-6 pt-10 gap-8 bg-white lg:px-20 z-10">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/perfil">Perfil</BreadcrumbLink>
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
                    {/* User Card Loading */}
                    <div className="flex flex-col gap-6">
                        <Card className="border-none shadow-none bg-transparent">
                            <CardContent className="p-0">
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    <Skeleton className="w-32 h-32 rounded-full" />
                                    <div className="flex flex-col items-center sm:items-start gap-2">
                                        <Skeleton className="h-8 w-48" />
                                        <Skeleton className="h-4 w-36" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex w-full items-center justify-between text-muted-foreground">
                                    <Skeleton className="h-7 w-48" />
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-20" />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-12" />
                                            <Skeleton className="h-5 w-40" />
                                        </div>
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-20" />
                                            <Skeleton className="h-5 w-32" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-36" />
                                    <Skeleton className="h-5 w-full max-w-md" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Edit Form Loading */}
                    <div className="w-full">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">
                                    <Skeleton className="h-8 w-48" />
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Name Field */}
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-10 w-full" />
                                </div>

                                {/* Phone Field */}
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-10 w-full" />
                                </div>

                                {/* Address Fields */}
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-12" />
                                    <Skeleton className="h-10 w-full" />
                                </div>

                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-10 w-full" />
                                </div>

                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-10 w-full" />
                                </div>

                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-10 w-full" />
                                </div>

                                {/* Submit Button */}
                                <Skeleton className="h-10 w-full" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
