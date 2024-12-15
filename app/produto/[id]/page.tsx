import { db } from "@/app/_lib/prisma";
import { ProductDetails } from "./_components/product-details";
import Cart from "@/app/_components/cart";
import ProductCard from "@/app/_components/product-card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/app/_components/ui/carousel";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/app/_components/ui/breadcrumb";
import Footer from "@/app/_components/footer";

interface ProductPageProps {
    params: {
        id: string;
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const products = await db.product.findMany();

    const product = await db.product.findUnique({
        where: {
            id: params.id,
        },
    });

    if (!product) {
        return (
            <>
                <main className="container pt-[72px]">Produto não encontrado</main>
            </>
        );
    }

    const serializedProducts = products.map((product) => ({
        ...product,
        value: Number(product.value),
        quantity: Number(product.quantity),
    }));

    const serializedProduct = {
        ...product,
        value: Number(product.value),
        quantity: Number(product.quantity),
    };

    return (
        <>
            <main className="flex flex-col min-h-screen pt-[100px]">
                <div className="fixed bottom-0 right-0 m-5 z-40 lg:m-10">
                    <Cart />
                </div>

                <section className="flex-1">
                    <div className="flex flex-col sticky top-20 px-6 pt-10 mb-10 gap-8 bg-white lg:px-20 z-10">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Início</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/produtos">Produtos</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{serializedProduct.name}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        <div className="w-full h-[1px] bg-purple/20" />
                    </div>

                    <section className="flex w-full h-full justify-center mb-10">
                        <ProductDetails product={serializedProduct} />
                    </section>

                    <section className="flex flex-col w-full h-full gap-8 px-20 mb-10">
                        <div className="w-full h-[1px] bg-purple/20" />
                        <div className="flex flex-col">
                            <h1 className="text-lg text-muted-foreground mb-6">Veja também:</h1>
                            <Carousel className="w-full lg:px-20">
                                <CarouselContent className="-ml-1 select-none">
                                    {serializedProducts
                                        .filter((p) => p.id !== params.id)
                                        .filter((p) => p.quantity > 0)
                                        .map((product) => (
                                            <CarouselItem key={product.id} className="pl-1 basis-full sm:basis-1/2 xl:basis-1/4">
                                                <div className="p-1 h-full flex justify-center items-center">
                                                    <ProductCard {...product} />
                                                </div>
                                            </CarouselItem>
                                        ))}
                                </CarouselContent>
                                <CarouselPrevious className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 md:w-12 md:h-12" />
                                <CarouselNext className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 md:w-12 md:h-12" />
                            </Carousel>
                        </div>
                    </section>
                </section>

                <Footer />
            </main>
        </>
    );
}