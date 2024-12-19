import { InstagramLogo, WhatsappLogo, MapPin, Clock } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Image from "next/image";

const ContactsSection = () => {
    return (
        <>
            <div className="flex flex-col lg:flex-row justify-between gap-10 w-full mx-auto">
                {/* Left Column - Contact Info */}
                <div className="flex flex-col w-full lg:w-1/2">
                    {/* ADD BORDER ON THE TEXT */}
                    <h1 className="mb-4 text-center text-3xl md:text-4xl font-bold text-white lg:text-left">Entre em contato!</h1>

                    <div className="w-full h-[1px] bg-white/50 mb-6" />

                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                            <Clock size={24} className="text-white shrink-0" />
                            <p className="text-xl text-white font-bold">
                                Horários de funcionamento:
                            </p>
                        </div>

                        <p className="text-lg text-white font-semibold mb-10">Segunda à Sábado - 08:30 a 18:30</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* WhatsApp Card */}
                            <div className="flex flex-col w-full lg:w-fit bg-white rounded-lg p-6 pr-12">
                                <span className="flex items-center text-lg mb-4">
                                    <WhatsappLogo className="text-lime-500 mr-2 text-2xl" />
                                    WHATSAPP
                                </span>

                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <div className="w-20 h-20 shrink-0">
                                        <Image
                                            src="/logo_draw.svg"
                                            alt="Piedade PetShop"
                                            width={80}
                                            height={80}
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="flex flex-col items-center sm:items-start w-full">
                                        <span className="text-lg font-bold text-muted-foreground mb-3">(81) 99191-9853</span>
                                        <Link
                                            href="http://api.whatsapp.com/send?1=pt_BR&phone=5581991919853"
                                            target="_blank"
                                            className="font-raleway text-center w-full sm:w-48 text-white bg-gradient-to-r from-lime-500 to-lime-600 hover:opacity-90 transition-all rounded-md p-2"
                                        >
                                            ENTRAR EM CONTATO
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Instagram Card */}
                            <div className="flex flex-col w-full lg:w-fit bg-white rounded-lg p-6 pr-12">
                                <span className="flex items-center text-lg mb-4">
                                    <InstagramLogo className="text-[#E4405F] mr-2 text-2xl" />
                                    INSTAGRAM
                                </span>

                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <div className="w-20 h-20 shrink-0">
                                        <Image
                                            src="/logo_draw.svg"
                                            alt="Piedade PetShop"
                                            width={80}
                                            height={80}
                                            className="object-contain"
                                        />
                                    </div>

                                    <div className="flex flex-col items-center sm:items-start w-full">
                                        <span className="text-lg font-bold text-muted-foreground mb-3">piedadepetshop</span>
                                        <Link
                                            href="https://www.instagram.com/piedadepetshop/"
                                            target="_blank"
                                            className="font-raleway text-center w-full sm:w-48 text-white bg-gradient-to-r from-[#fd5949] to-[#d6249f] hover:opacity-90 transition-all rounded-md p-2"
                                        >
                                            SEGUIR
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Right Column - Map */}
                <div className="flex flex-col w-full lg:w-1/2">
                    {/* Address */}
                    <Link
                        href="https://www.google.com/maps?ll=-8.173873,-34.920393&z=16&t=m&hl=pt-BR&gl=BR&mapclient=embed&q=R.+Rossini+Roosevelt+de+Albuquerque,+68+-+Piedade+Jaboat%C3%A3o+dos+Guararapes+-+PE+54410-310"
                        target="_blank"
                        className="flex items-center justify-center gap-2 text-muted-foreground bg-white rounded-lg p-2 mb-2"
                    >
                        <MapPin size={24} className="shrink-0 text-primary" />
                        <p className="text-sm">
                            Rua Rossini Roosevelt de Albuquerque, 68 - Piedade,
                            Jaboatão dos Guararapes - PE, 54410-310
                        </p>
                    </Link>
                    <div className="w-full h-[300px] md:h-[400px] lg:h-full relative rounded-lg overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.286418957261!2d-34.92039292401107!3d-8.173873381928534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7aae1a556e60ec7%3A0x6ef9c00b03a4586e!2sR.%20Rossini%20Roosevelt%E2%80%8B%20de%20Albuquerque%2C%2068%20-%20Piedade%2C%20Jaboat%C3%A3o%20dos%20Guararapes%20-%20PE%2C%2054410-310!5e0!3m2!1spt-BR!2sbr!4v1731469553348!5m2!1spt-BR!2sbr"
                            className="absolute inset-0 w-full h-full border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactsSection;