import { Button } from "@/app/_components/ui/button";
import { Bone, Pill, Storefront } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import MiniCard from "../mini-card";
import { ProductCategory } from "@prisma/client";

const ProductsSection = () => {
    return (
        <>
            <h1 className="mb-2 text-2xl lg:text-4xl font-bold text-muted-foreground">Nossos Produtos</h1>
            <div className="h-1 w-20 bg-muted-foreground rounded-full mb-6" />

            <p className="mb-10 text-center text-muted-foreground">
                Possuímos uma vasta variedade de produtos para atender a todas as necessidades dos nossos clientes.<br />
                Confira abaixo uma seleção de alguns de nossos produtos:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:flex items-center gap-6 mb-10 select-none">
                <MiniCard
                    icon={<Image src="/icons/racao.png" alt="Rações" width={32} height={32} draggable={false} />}
                    content="Rações"
                    category={ProductCategory.KG_FEED}
                />
                <MiniCard
                    icon={<Bone size={32} />}
                    content="Petiscos"
                    category={ProductCategory.SNACK}
                />
                <MiniCard
                    icon={<Image src="/icons/acessorios.png" alt="Acessórios" width={32} height={32} draggable={false} />}
                    content="Acessórios"
                    category={ProductCategory.ACCESSORY}
                />
                <MiniCard
                    icon={<Image src="/icons/brinquedos.png" alt="Brinquedos" width={32} height={32} draggable={false} />}
                    content="Brinquedos"
                    category={ProductCategory.TOY}
                />
                <MiniCard
                    icon={<Image src="/icons/higiene.png" alt="Higiene" width={32} height={32} draggable={false} />}
                    content="Higiene"
                    category={ProductCategory.HYGIENE}
                />
                <MiniCard
                    icon={<Pill size={32} />}
                    content="Medicamentos"
                    category={ProductCategory.MEDICINE}
                />
            </div>

            <Button variant="link" asChild>
                <Link href="/produtos" className="flex items-center gap-2 text-xl text-primary">
                    <Storefront size={32} />
                    Ver todos os produtos
                </Link>
            </Button>
        </>
    );
};

export default ProductsSection;