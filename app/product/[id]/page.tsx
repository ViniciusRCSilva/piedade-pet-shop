import { db } from "@/app/_lib/prisma";
import { ProductDetails } from "./_components/product-details";
import Cart from "@/app/_components/cart";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import ProductCard from "@/app/_components/product-card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/app/_components/ui/carousel";

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
            <main className="pt-[100px]">
                <div className="fixed bottom-0 right-0 m-5 z-40 lg:m-10">
                    <Cart />
                </div>

                <Button asChild variant="link">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 mb-6"
                    >
                        <CaretLeft size={20} />
                        <span>Voltar aos produtos</span>
                    </Link>
                </Button>

                <section className="flex w-full h-full justify-center mb-10">
                    <ProductDetails product={serializedProduct} />
                </section>

                <div className="flex w-full justify-center mb-10">
                    <div className="w-[90%] h-[1px] bg-purple" />
                </div>

                <section className="flex flex-col w-full h-full px-10 mb-10">
                    <h1 className="text-lg text-muted-foreground mb-6">Veja também:</h1>
                    <Carousel className="w-full px-20">
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
                </section>

                <footer className="flex h-[4vh] items-center justify-center bg-purple-foreground text-sm text-white lg:text-base">
                    <p>&copy; 2024 Piedade Pet Shop. Todos os direitos reservados.</p>
                </footer>
            </main>
        </>
    );
}