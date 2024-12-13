import { Skeleton } from "@/app/_components/ui/skeleton";
import Cart from "@/app/_components/cart";

export default function ProductLoading() {
    return (
        <>
            <main className="pt-[100px]">
                <div className="fixed bottom-0 right-0 m-5 z-40 lg:m-10">
                    <Cart />
                </div>

                <div className="flex flex-col px-6 my-10 gap-8 lg:px-20">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-6 w-32" />
                    </div>

                    <div className="w-full h-[1px] bg-purple/20" />
                </div>

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

                <section className="flex flex-col w-full h-full gap-8 px-20 mb-10">
                    <div className="w-full h-[1px] bg-purple/20" />
                    <div className="flex flex-col">
                        <Skeleton className="h-6 w-32 mb-6" />
                        <div className="w-full px-20">
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={item} className="p-1">
                                        <Skeleton className="w-full h-[280px] rounded-lg" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="flex h-[4vh] items-center justify-center bg-purple-foreground text-sm text-white lg:text-base">
                    <p> 2024 Piedade PetShop. Todos os direitos reservados.</p>
                </footer>
            </main>
        </>
    );
}
