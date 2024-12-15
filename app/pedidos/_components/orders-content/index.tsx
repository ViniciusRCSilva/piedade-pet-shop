"use client"

import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { Scroll } from "@phosphor-icons/react/dist/ssr";
import { useSearchParams } from "next/navigation";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/app/_components/ui/pagination";
import OrderCard from "../order-card";
import { SerializedOrder } from "@/app/_helper";

interface OrdersContentProps {
    orders: SerializedOrder[];
    totalPages: number;
}

const OrdersContent = ({ orders, totalPages }: OrdersContentProps) => {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;

    return (
        <>
            {orders.length === 0 ? (
                <div className="flex w-full h-full items-center justify-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center border p-6 rounded-md">
                        <Scroll size={40} className="mb-4 opacity-50" />
                        <p className="text-center">Você ainda não fez nenhum pedido.</p>
                        <Button asChild variant="link" className="text-primary">
                            <Link href="/produtos">
                                <p className="text-center text-sm">Que tal começar a comprar agora?</p>
                            </Link>
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    <div className="h-fit rounded-md z-0">
                        <OrderCard orders={orders || []} />
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center mt-4 mb-10">
                            <Pagination>
                                <PaginationContent>
                                    {page > 1 && (
                                        <PaginationItem>
                                            <PaginationPrevious href={`/pedidos?page=${page - 1}`} />
                                        </PaginationItem>
                                    )}

                                    {[...Array(totalPages)].map((_, index) => {
                                        const pageNumber = index + 1;
                                        const isCurrentPage = pageNumber === page;

                                        // Show first page, current page, last page, and pages around current page
                                        if (
                                            pageNumber === 1 ||
                                            pageNumber === totalPages ||
                                            (pageNumber >= page - 1 && pageNumber <= page + 1)
                                        ) {
                                            return (
                                                <PaginationItem key={pageNumber}>
                                                    <PaginationLink
                                                        href={`/pedidos?page=${pageNumber}`}
                                                        isActive={isCurrentPage}
                                                    >
                                                        {pageNumber}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            );
                                        }

                                        // Show ellipsis for gaps
                                        if (
                                            pageNumber === page - 2 ||
                                            pageNumber === page + 2
                                        ) {
                                            return (
                                                <PaginationItem key={pageNumber}>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            );
                                        }

                                        return null;
                                    })}

                                    {page < totalPages && (
                                        <PaginationItem>
                                            <PaginationNext href={`/pedidos?page=${page + 1}`} />
                                        </PaginationItem>
                                    )}
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default OrdersContent;