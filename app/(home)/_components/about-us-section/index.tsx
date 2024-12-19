import Content from "./content";
import { Accordion } from "@/app/_components/ui/accordion";
import Image from "next/image";

const AboutUsSection = () => {
    return (
        <div className="w-[80%] flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-2 mb-4">
                <Image
                    src="/logo_draw.svg"
                    alt="Piedade PetShop"
                    width={50}
                    height={50}
                    draggable={false}
                />
                <h1 className="text-2xl font-bold text-purple">Piedade PetShop</h1>
            </div>
            <p className="mb-2 text-muted-foreground text-center text-sm lg:text-base lg:text-left">
                A relação entre tutores e seus animais de estimação é verdadeiramente transformadora,
                repleta de conexão emocional. Para tornar esse vínculo ainda mais especial,
                o Piedade PetShop oferece produtos dos principais fabricantes do mercado.
                Com uma vasta variedade de opções, os tutores podem encontrar tudo o que precisam para o
                dia a dia dos seus pets, sem sair de casa. Nossa loja possui diversas categorias de produtos,
                todas organizadas para facilitar sua busca!
            </p>
            <Accordion type="single" collapsible className="w-full flex flex-col gap-4">
                <Content
                    value="pets-24h"
                    title="Tudo que os pets precisam a qualquer hora do dia"
                    description="A conveniência é um dos principais lemas do Piedade PetShop. 
                    Nossa loja online está disponível 24 horas por dia, permitindo que os tutores 
                    cuidem da saúde e do conforto dos seus amigos de quatro patas a qualquer 
                    momento. Os produtos e serviços do Piedade PetShop refletem nossa paixão 
                    pelos animais de estimação, oferecendo carinho e respeito. 
                    Nosso catálogo inclui itens de alta qualidade, à altura do amor que os 
                    pets merecem, tudo de maneira organizada e acessível para facilitar a vida 
                    dos tutores."
                />
                <Content
                    value="dogs"
                    title="Cachorros: alimentos, medicamentos e outros itens"
                    description="Os cães são verdadeiros companheiros e merecem cuidados especiais. 
                    Pensando nisso, o Piedade PetShop oferece uma grande variedade de rações e 
                    petiscos para atender às necessidades específicas de cada raça e condição de 
                    saúde. Além de uma nutrição adequada, é essencial que os cachorros recebam 
                    medicamentos para tratar e prevenir doenças, sempre com a prescrição de um 
                    médico-veterinário. Isso é fundamental para garantir a qualidade de vida dos 
                    nossos amados pets."
                />
                <Content
                    value="cats"
                    title="Gatos: areias, brinquedos e outros produtos"
                    description="Além de uma ampla variedade de comidinhas e remédios para felinos,
                    o Piedade PetShop oferece diversos outros produtos para gatos! Entre eles, 
                    você encontrará opções de areias e caixinhas higiênicas, proporcionando
                    mais conforto para o seu pet fazer suas necessidades básicas. 
                    Também temos brinquedos e acessórios, como arranhadores, que deixam o 
                    dia a dia dos gatinhos mais feliz e estimulam a mente dos mascotes, 
                    promovendo a qualidade de vida e a longevidade dos pets."
                />
            </Accordion>
        </div>
    );
};

export default AboutUsSection;