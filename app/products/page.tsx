import Cart from "../_components/cart";
import { db } from "../_lib/prisma";
import HeroSectionCarouselProducts from "./_components/hero-section";
import ProductList from "./_components/products-list";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/app/_components/ui/breadcrumb";

const Products = async () => {
    const products = await db.product.findMany({
        orderBy: {
            quantity: "desc"
        }
    });

    const serializedProducts = products.map(product => ({
        ...product,
        value: product.value.toNumber(),
        quantity: product.quantity.toNumber()
    }));

    return (
        <>
            <main className="pt-[72px]">
                <div className="fixed bottom-0 right-0 m-5 lg:m-10">
                    <Cart />
                </div>

                {/* Hero Section */}
                <section className="w-full h-fit">
                    <HeroSectionCarouselProducts />
                </section>

                <div className="flex flex-col sticky top-20 px-6 pt-10 sm:-mt-16 mb-10 gap-8 bg-white lg:px-20 z-10">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Início</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Produtos</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="w-full h-[1px] bg-purple/20" />
                </div>

                <section className="h-fit flex items-center px-6 mb-10 lg:px-20">
                    <ProductList initialProducts={serializedProducts} />
                </section>

                {/* Footer Section */}
                <footer className="flex h-[4vh] items-center justify-center bg-purple-foreground text-sm text-white lg:text-base">
                    <p>&copy; 2024 Piedade Pet Shop. Todos os direitos reservados.</p>
                </footer>
            </main>
        </>
    );
}

export default Products;