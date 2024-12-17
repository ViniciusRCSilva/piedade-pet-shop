import { Skeleton } from "@/app/_components/ui/skeleton";
import Cart from "@/app/_components/cart";

export default function ProductsLoading() {
    return (
        <>
            <main className="container pt-[72px]">
                <div className="fixed bottom-0 right-0 m-5 z-40 lg:m-10">
                    <Cart />
                </div>

                <div className="flex flex-col gap-6 py-6">
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-96" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex flex-col gap-4 p-4 rounded-lg border">
                                <Skeleton className="aspect-square w-full rounded-lg" />
                                <div className="space-y-3">
                                    <Skeleton className="h-5 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                    <div className="flex justify-between items-center pt-2">
                                        <Skeleton className="h-6 w-24" />
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
