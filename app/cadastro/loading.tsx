import { Skeleton } from "@/app/_components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card"

export default function Loading() {
    return (
        <main className="w-full min-h-screen flex flex-col items-center justify-center p-10 text-muted-foreground lg:grid lg:grid-cols-2 gap-8">
            {/* Presentation skeleton */}
            <div className="flex flex-col gap-4 w-full h-full items-center lg:items-start justify-center">
                <Skeleton className="w-[300px] h-[300px] rounded-full -mb-16" />
                <div className="text-center lg:text-left space-y-4">
                    <Skeleton className="h-10 w-48" />
                    <div className="flex items-center gap-2 justify-center lg:justify-start">
                        <Skeleton className="h-6 w-72" />
                        <Skeleton className="h-8 w-8" />
                    </div>
                </div>
                <div className="text-center lg:text-left">
                    <Skeleton className="h-5 w-96" />
                </div>
            </div>

            {/* Form skeleton */}
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-full max-w-md space-y-6">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-8 w-40" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </CardContent>
                    </Card>

                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
        </main>
    )
}
