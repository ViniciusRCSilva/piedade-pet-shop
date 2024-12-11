import { Skeleton } from "@/app/_components/ui/skeleton";
import { Button } from "@/app/_components/ui/button";
import Cart from "@/app/_components/cart";

export default function ProductLoading() {
    return (
        <>
            <main className="pt-[100px]">
                <div className="fixed bottom-0 right-0 m-5 z-40 lg:m-10">
                    <Cart />
                </div>

                <Button variant="link" className="inline-flex items-center gap-2 mb-6 opacity-50">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-4 w-24" />
                </Button>

                <section className="flex w-full h-full justify-center mb-10">
                    <div className="container">
                        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-4 items-center">
                                <Skeleton className="hidden lg:flex w-full max-w-[600px] h-[600px] rounded-lg" />
                                <Skeleton className="flex lg:hidden w-full max-w-[300px] h-[300px] rounded-lg" />
                            </div>

                            <div className="flex flex-col gap-6">
                                <div className="space-y-4">
                                    <Skeleton className="h-8 w-3/4" />
                                    <Skeleton className="h-6 w-1/2" />
                                </div>

                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3" />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-10 w-32" />
                                    <Skeleton className="h-10 w-32" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="flex w-full justify-center mb-10">
                    <div className="w-[90%] h-[1px] bg-purple/20" />
                </div>

                <section className="flex flex-col w-full h-full px-10 mb-10">
                    <Skeleton className="h-6 w-32 mb-6" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="h-[400px] rounded-lg" />
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}
