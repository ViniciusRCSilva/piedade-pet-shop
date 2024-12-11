import { AVAILABLE_IMAGES } from "@/app/_utils/utils";
import { Medal } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

const BrandsSection = () => {
    return (
        /* TODO */
        <>
            <div className="flex items-center mb-10">
                <Medal size={24} className="text-purple mr-2" />
                <h1 className="text-2xl text-purple font-semibold">Marcas de qualidade</h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 items-center">
                {AVAILABLE_IMAGES.map((image, index) => (
                    <div key={index} className="flex items-center justify-center border w-36 h-36 group">
                        <Image
                            src={`/racoes/${image[0]}`}
                            alt={image[1]}
                            width={100}
                            height={100}
                            draggable={false}
                            className="object-contain group-hover:scale-110 transition-transform"
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default BrandsSection;