import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "../_lib/prisma";
import { Heart } from "@phosphor-icons/react/dist/ssr";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/app/_components/ui/breadcrumb";
import Footer from "../_components/footer";
import ProductsList from "../produtos/_components/products-list";
import Cart from "../_components/cart";

export default async function FavoriteProductsPage() {
    const user = await currentUser();

    if (!user) {
        redirect("/");
    }

    const dbUser = await db.user.findUnique({
        where: {
            clerkId: user.id
        }
    });

    if (!dbUser) {
        redirect("/");
    }

    const favorites = await db.userFavoritesProducts.findMany({
        where: {
            userId: dbUser.id
        },
        include: {
            product: true
        },
    });

    const products = favorites.map(favorite => ({
        ...favorite.product,
        value: favorite.product.value.toNumber(),
        quantity: favorite.product.quantity.toNumber()
    }));

    return (
        <div className="flex flex-col min-h-screen pt-[100px]">
            <div className="fixed bottom-0 right-0 m-5 z-40 lg:m-10">
                <Cart />
            </div>

            <div className="flex flex-col sticky top-20 px-6 pt-10 gap-8 bg-white lg:px-20 z-10">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Início</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Produtos Favoritos</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="w-full h-[1px] bg-purple/20" />
            </div>

            <div className="flex-1 w-full h-full pt-10 px-6 lg:px-20">
                <div className="flex items-center gap-3">
                    <Heart size={28} className="text-primary" />
                    <h1 className="font-bold text-2xl text-muted-foreground">Produtos Favoritos</h1>
                </div>

                {products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
                        <Heart size={60} />
                        <p className="text-sm lg:text-xl text-center mt-4">Você ainda não tem produtos favoritos</p>
                    </div>
                ) : (
                    <div className="flex-1 w-full h-full pt-10 mb-10">
                        <ProductsList initialProducts={products} />
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}