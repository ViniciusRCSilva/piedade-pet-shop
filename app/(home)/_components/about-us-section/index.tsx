import Content from "./content";
import { Accordion } from "@/app/_components/ui/accordion";

const AboutUsSection = () => {
    return (
        <div className="w-[80%] flex flex-col items-center lg:items-start">
            <h1 className="text-2xl font-bold text-purple mb-4">Piedade PetShop</h1>
            <p className="mb-2 text-muted-foreground text-center text-sm lg:text-base lg:text-left">
                A relação entre um tutor e um animal de estimação é transformadora, cheia de conexão emocional. Para tornar esse laço ainda mais especial, o Piedade PetShop oferece produtos dos principais fabricantes do mercado.
                Com toda essa variedade, os tutores podem encontrar o que precisam no dia a dia sem sair de casa. A loja do Piedade PetShop tem várias opções de produtos, todos organizados por categorias!
            </p>
            <Accordion type="single" collapsible className="w-full flex flex-col gap-4">
                <Content
                    value="pets-24h"
                    title="Tudo que os pets precisam a qualquer hora do dia"
                    description="Um dos principais lemas do Piedade PetShop é a conveniência. Por isso, nossa loja online está disponível 24h por dia. Sempre que precisarem, os tutores podem contar com esse auxílio para cuidar da saúde e do conforto dos amigos com patas. 
                    Os produtos e serviços do Piedade PetShop refletem nossa paixão pelos animais de estimação. Aqui, eles recebem carinho e respeito. O catálogo tem itens de alta qualidade, à altura do amor que os pets merecem! Tudo isso de maneira organizada e acessível, facilitando a vida dos tutores."
                />
                <Content
                    value="dogs"
                    title="Cachorros: alimentos, medicamentos e outros itens"
                    description="Os cães são verdadeiros companheiros! Eles precisam de alguns cuidados básicos, como a alimentação. Pensando nisso, há uma grande variedade de rações e petiscos para a dieta, incluindo opções de cuidado específico para determinadas raças e condições de saúde. 
                    Além de uma nutrição adequada, os cachorros precisam de medicamentos para tratar e prevenir doenças. Vale lembrar que todo remédio deve ser prescrito por um médico-veterinário. Isso é importante para preservar a qualidade de vida dos animais de estimação."
                />
                <Content
                    value="cats"
                    title="Gatos: areias, brinquedos e outros produtos"
                    description="Além de muitas comidinhas e remédios para felinos, o Piedade PetShop oferece diversos outros produtos para gatos! Entre eles, há opções de areias e caixinhas higiênicas, que proporcionam mais conforto para o animal fazer as necessidades básicas. 
                    Você também pode deixar o dia a dia dos gatinhos mais feliz com brinquedos e outros acessórios, como os arranhadores. Esses itens estimulam a mente dos mascotes, promovendo a qualidade de vida e a longevidade dos pets."
                />
            </Accordion>
        </div>
    );
};

export default AboutUsSection;