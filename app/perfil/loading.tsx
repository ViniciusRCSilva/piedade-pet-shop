import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/app/_components/ui/breadcrumb";

const Loading = () => {
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
                            <BreadcrumbPage>Minha conta</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="w-full h-[1px] bg-purple/20" />
            </div>

            <div className="flex-1 container mx-auto px-6 py-10">
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.5fr] gap-10">
                    {/* User Details Loading */}
                    <div className="flex flex-col gap-6 xl:justify-between">
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
                                <Skeleton className="h-7 w-48" />
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

                    {/* Orders Loading */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                            <div className="space-y-2">
                                <Skeleton className="h-7 w-32" />
                                <Skeleton className="h-4 w-64" />
                            </div>
                            <Skeleton className="h-9 w-36" />
                        </CardHeader>
                        <CardContent className="pt-4 border-t space-y-4">
                            {[1, 2].map((_, index) => (
                                <div key={index} className="flex flex-col gap-4 p-4 border rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <Skeleton className="h-6 w-32" />
                                        <Skeleton className="h-6 w-24" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="h-20 w-20 rounded-lg" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-full max-w-[200px]" />
                                            <Skeleton className="h-4 w-24" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Loading;
