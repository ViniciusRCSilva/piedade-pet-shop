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
import { formatters } from "@/app/_utils/utils";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage(props: ProductPageProps) {
  const params = await props.params;
  const products = await db.product.findMany();

  const product = await db.product.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!product) {
    return (
      <>
        <main className="container pt-[72px]">Produto não encontrado</main>
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
      <main className="flex flex-col min-h-screen pt-[72px] lg:pt-[100px]">
        <div className="fixed bottom-0 right-0 m-3 z-40 lg:m-10">
          <Cart />
        </div>

        <section className="flex-1">
          <div className="flex flex-col sticky top-20 px-4 pt-6 mb-6 gap-4 bg-white lg:px-20 lg:pt-10 lg:mb-10 lg:gap-8 z-10">
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
                  <BreadcrumbLink href={`/produtos?category=${serializedProduct.category}`}>{formatters.category(serializedProduct.category)}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/produtos?category=${serializedProduct.category}&animal=${serializedProduct.animal}`}>{formatters.getAnimalCategory(serializedProduct.animal)}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{serializedProduct.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="w-full h-[1px] bg-purple/20" />
          </div>

          <section className="flex w-full h-full justify-center mb-6 lg:mb-10">
            <ProductDetails product={serializedProduct} />
          </section>

          <section className="flex flex-col w-full h-full gap-6 px-4 mb-6 lg:gap-8 lg:px-20 lg:mb-10">
            <div className="w-full h-[1px] bg-purple/20" />
            <div className="flex flex-col">
              <h1 className="text-lg text-muted-foreground mb-4 lg:mb-6">Veja também:</h1>
              <Carousel className="w-full">
                <CarouselContent className="-ml-1 select-none">
                  {(() => {
                    const baseFiltered = serializedProducts
                      .filter((p) => p.id !== params.id)
                      .filter((p) => p.quantity > 0)
                      .filter((p) => p.category === serializedProduct.category);

                    const withAnimalFilter = baseFiltered
                      .filter((p) => p.animal === serializedProduct.animal);

                    const finalProducts = withAnimalFilter.length > 5
                      ? withAnimalFilter
                      : baseFiltered;

                    return finalProducts
                      .slice(0, 10)
                      .map((product) => (
                        <CarouselItem key={product.id} className="pl-1 basis-full sm:basis-1/2 xl:basis-1/4">
                          <div className="p-1 h-full flex justify-center items-center">
                            <ProductCard {...product} />
                          </div>
                        </CarouselItem>
                      ));
                  })()}
                </CarouselContent>
                <CarouselPrevious className="absolute -left-1 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 md:w-12 md:h-12 lg:left-1" />
                <CarouselNext className="absolute -right-1 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 md:w-12 md:h-12 lg:right-1" />
              </Carousel>
            </div>
          </section>
        </section>

        <Footer />
      </main>
    </>
  );
}