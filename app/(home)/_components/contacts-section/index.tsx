import { InstagramLogo, WhatsappLogo, MapPin } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import SubmitMessage from "@/app/_components/submit-message";
import { Button } from "@/app/_components/ui/button";

const ContactsSection = () => {
    return (
        <>
            <h1 className="mb-10 text-center text-4xl font-bold text-white lg:mb-0 lg:text-left">Entre em contato com a gente!</h1>

            <div className="flex flex-col lg:grid lg:grid-cols-2">
                {/* Contacts */}
                <div className="mb-10 flex flex-col items-center lg:mb-0 lg:items-start">
                    <div className="mb-10 flex h-full flex-col justify-center gap-6 lg:mb-0">
                        <div className="flex flex-col items-center text-white lg:items-start">
                            <p className="text-lg">Nosso número para contato:</p>
                            <Button asChild variant="outline" className="text-xl text-muted-foreground">
                                <Link href="http://api.whatsapp.com/send?1=pt_BR&phone=5581991919853" target="_blank">
                                    <WhatsappLogo className="text-lime-500" />
                                    (81) 9 9191-9853
                                </Link>
                            </Button>
                        </div>

                        <div className="flex flex-col items-center text-white lg:items-start">
                            <p className="text-center text-lg lg:text-left">Siga-nos no Instagram e não perca nenhuma novidade:</p>
                            <Button asChild variant="outline" className="text-xl text-muted-foreground">
                                <Link href="https://www.instagram.com/piedadepetshop/" target="_blank">
                                    <InstagramLogo className="text-pink-500" />
                                    @piedadepetshop
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="flex h-full w-full flex-col items-center lg:items-start lg:justify-end">
                        <p className="pb-2 text-lg text-white">Deixe uma mensagem para gente:</p>
                        <SubmitMessage />
                    </div>
                </div>

                {/* Map */}
                <div className="flex flex-col items-center gap-6 lg:items-end">
                    <div className="text-center lg:text-end">
                        <h1 className="mb-2 text-xl text-white lg:text-3xl">Estamos localizados na</h1>
                        <Link
                            href="https://maps.app.goo.gl/Rxy2tTCsjkcAnRSB9"
                            target="_blank"
                            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xl lg:text-2xl"
                        >
                            <MapPin className="text-primary" />
                            <p className="font-bold text-muted-foreground">
                                Rua Rossini Roosevelt de Albuquerque, nº 68, Piedade
                            </p>
                        </Link>
                    </div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.286418957261!2d-34.92039292401107!3d-8.173873381928534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7aae1a556e60ec7%3A0x6ef9c00b03a4586e!2sR.%20Rossini%20Roosevelt%E2%80%8B%20de%20Albuquerque%2C%2068%20-%20Piedade%2C%20Jaboat%C3%A3o%20dos%20Guararapes%20-%20PE%2C%2054410-310!5e0!3m2!1spt-BR!2sbr!4v1731469553348!5m2!1spt-BR!2sbr"
                        width="600"
                        height="450"
                        loading="lazy"
                        className="hidden rounded-lg border-2 border-primary lg:block"
                    ></iframe>

                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.286418957261!2d-34.92039292401107!3d-8.173873381928534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7aae1a556e60ec7%3A0x6ef9c00b03a4586e!2sR.%20Rossini%20Roosevelt%E2%80%8B%20de%20Albuquerque%2C%2068%20-%20Piedade%2C%20Jaboat%C3%A3o%20dos%20Guararapes%20-%20PE%2C%2054410-310!5e0!3m2!1spt-BR!2sbr!4v1731469553348!5m2!1spt-BR!2sbr"
                        width="300"
                        height="300"
                        loading="lazy"
                        className="block rounded-lg border-2 border-primary lg:hidden"
                    ></iframe>
                </div>
            </div>
        </>
    );
};

export default ContactsSection;