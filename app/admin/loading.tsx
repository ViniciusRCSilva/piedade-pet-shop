import { Skeleton } from "@/app/_components/ui/skeleton";

export default function AdminLoading() {
    return (
        <main className="h-screen">
            <div className="flex h-full">
                {/* Content */}
                <div className="flex-1 h-full">
                    {/* Header */}
                    <header className="fixed w-full h-16 lg:h-20 bg-white border-b z-50">
                        <div className="flex items-center justify-between h-full px-6">
                            <Skeleton className="h-8 w-32" />
                            <Skeleton className="h-10 w-10 rounded-full" />
                        </div>
                    </header>

                    {/* Body */}
                    <div className="h-[calc(100%-1rem)] pt-16 lg:pt-20">
                        <div className="min-w-full p-6">
                            <div className="mb-4 flex flex-col gap-4 items-center lg:justify-between lg:flex-row lg:gap-0">
                                <div className="flex flex-col items-center gap-4 my-6 lg:flex-row">
                                    <Skeleton className="h-10 w-32" />
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-10 w-32" />
                                        <Skeleton className="h-10 w-32" />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-md border">
                                <div className="p-4">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="flex items-center gap-4 py-4">
                                            <Skeleton className="h-12 w-12 rounded-lg" />
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-48" />
                                                <Skeleton className="h-4 w-24" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
