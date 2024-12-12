import Cart from "../_components/cart";
import { db } from "../_lib/prisma";
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
            <main className="pt-[20px] md:pt-[72px]">
                <div className="fixed bottom-0 right-0 m-5 lg:m-10">
                    <Cart />
                </div>

                {/* Hero Section */}
                <section className="w-full">
                    <div className="relative aspect-[4/3] md:aspect-[24/9] w-full overflow-hidden">
                        <div className="absolute inset-0 bg-racao_banner bg-contain lg:bg-cover bg-no-repeat bg-center" />
                    </div>
                </section>

                <Breadcrumb className="py-8 px-6 lg:px-20">
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

                <section className="h-fit flex flex-col items-center px-6 lg:px-20">
                    <div className="w-full h-[1px] bg-purple mb-10" />
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