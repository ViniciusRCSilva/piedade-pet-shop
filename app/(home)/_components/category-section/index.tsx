import { Button } from "@/app/_components/ui/button";
import { Storefront } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { ProductCategory } from "@prisma/client";
import MiniCard from "../mini-card";

const CategorySection = () => {
    return (
        <>
            <h1 className="mb-2 text-2xl lg:text-4xl font-bold text-purple">Categorias</h1>
            <div className="h-1 w-20 bg-purple rounded-full mb-6" />

            <p className="mb-10 text-center text-muted-foreground">
                Encontre tudo que seu pet precisa em nossas categorias:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10 w-full max-w-4xl mx-auto">
                <div className="flex w-full items-center justify-center">
                    <MiniCard
                        icon={<Image src="/icons/bag-feed.png" alt="Rações" width={38} height={38} draggable={false} quality={100} className="w-full h-full object-contain" />}
                        content="Rações"
                        category={ProductCategory.KG_FEED}
                    />
                </div>
                <div className="flex w-full items-center justify-center">
                    <MiniCard
                        icon={<Image src="/icons/snacks.png" alt="Petiscos" width={42} height={42} draggable={false} quality={100} className="w-full h-full object-contain" />}
                        content="Petiscos"
                        category={ProductCategory.SNACK}
                    />
                </div>
                <div className="flex w-full items-center justify-center">
                    <MiniCard
                        icon={<Image src="/icons/accessories.png" alt="Acessórios" width={42} height={42} draggable={false} quality={100} className="w-full h-full object-contain" />}
                        content="Acessórios"
                        category={ProductCategory.ACCESSORY}
                    />
                </div>
                <div className="flex w-full items-center justify-center">
                    <MiniCard
                        icon={<Image src="/icons/toys.png" alt="Brinquedos" width={42} height={42} draggable={false} quality={100} className="w-full h-full object-contain" />}
                        content="Brinquedos"
                        category={ProductCategory.TOY}
                    />
                </div>
                <div className="flex w-full items-center justify-center">
                    <MiniCard
                        icon={<Image src="/icons/hygiene.png" alt="Higiene" width={42} height={42} draggable={false} quality={100} className="w-full h-full object-contain" />}
                        content="Higiene"
                        category={ProductCategory.HYGIENE}
                    />
                </div>
                <div className="flex w-full items-center justify-center">
                    <MiniCard
                        icon={<Image src="/icons/medicine.png" alt="Medicamentos" width={42} height={42} draggable={false} quality={100} className="w-full h-full object-contain" />}
                        content="Medicamentos"
                        category={ProductCategory.MEDICINE}
                    />
                </div>
            </div>

            <Button variant="link" asChild>
                <Link href="/produtos" className="flex items-center gap-2 text-xl text-primary hover:scale-105 transition-transform">
                    <Storefront size={32} />
                    Ver todos os produtos
                </Link>
            </Button>
        </>
    );
};

export default CategorySection;