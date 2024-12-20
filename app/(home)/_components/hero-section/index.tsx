"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/app/_components/ui/carousel";
import Image from "next/image";
import React from "react";

const Images = [
    "/banner/1.png",
    "/banner/5.png",
    "/banner/2.png",
    "/banner/3.png",
    "/banner/6.png",
    "/banner/4.png",
];

const HeroSectionCarousel = () => {
    return (
        <Carousel
            className="relative"
            opts={{
                loop: true
            }}
        >
            <CarouselContent className="-ml-2 md:-ml-4">
                {Images.map((image, index) => (
                    <CarouselItem
                        key={index}
                        className="lg:basis-1/2 pl-2 md:pl-4"
                    >
                        <div className="relative w-full h-auto flex justify-center items-center">
                            <Image
                                src={image}
                                alt={`Banner ${index + 1}`}
                                width={960}
                                height={360}
                                className="w-auto h-auto object-contain rounded-lg"
                                priority
                                quality={100}
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 lg:left-[22rem] top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 md:w-12 md:h-12" />
            <CarouselNext className="absolute right-2 lg:right-[22rem] top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 md:w-12 md:h-12" />
        </Carousel>
    );
};

export default HeroSectionCarousel;