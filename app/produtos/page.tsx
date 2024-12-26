import Cart from "../_components/cart";
import Footer from "../_components/footer";
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
            name: "asc"
        }
    });

    const serializedProducts = products.map(product => ({
        ...product,
        value: product.value.toNumber(),
        quantity: product.quantity.toNumber()
    }));

    return (
        <>
            <main className="flex flex-col min-h-screen pt-[100px]">
                <div className="fixed bottom-0 right-0 m-5 z-40 lg:m-10">
                    <Cart />
                </div>

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

                <section className="flex-1 h-fit flex items-center px-6 mb-10 lg:px-20 lg:pt-10">
                    <ProductList initialProducts={serializedProducts} />
                </section>

                <Footer />
            </main>
        </>
    );
}

export default Products;