import { db } from "@/app/_lib/prisma";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/app/_components/ui/carousel";
import ProductCard from "@/app/_components/product-card";

const ProductsSection = async () => {
    const products = await db.product.findMany({
        orderBy: {
            createdAt: "desc"
        },
        take: 6
    });

    const serializedProducts = products.map(product => ({
        ...product,
        value: product.value.toNumber(),
        quantity: product.quantity.toNumber()
    }));

    return (
        <div className="w-full max-w-7xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="mb-2 text-2xl lg:text-4xl font-bold text-purple">Produtos que seu pet vai amar!</h1>
                <div className="h-1 w-20 bg-purple rounded-full mx-auto mb-6" />
                <p className="text-muted-foreground">
                    Confira abaixo uma seleção de alguns de nossos produtos:
                </p>
            </div>

            <Carousel
                className="w-full px-4 lg:px-20"
                opts={{
                    align: "start",
                    loop: true,
                }}
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {serializedProducts.map((product) => (
                        <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                            <div className="p-1 h-full">
                                <ProductCard {...product} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 md:w-12 md:h-12" />
                <CarouselNext className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 md:w-12 md:h-12" />
            </Carousel>
        </div>
    );
};

export default ProductsSection;