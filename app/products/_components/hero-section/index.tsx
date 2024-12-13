"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/app/_components/ui/carousel";
import Image from "next/image";
import React from "react";

const HeroSectionCarouselProducts = () => {
    return (
        <Carousel
            className="relative"
            opts={{
                loop: true
            }}
        >
            <CarouselContent className="-ml-2 md:-ml-4">
                <CarouselItem className="pl-2 md:pl-4">
                    <div className="relative w-full h-auto flex justify-center items-center">
                        <Image
                            src="/products-banner/1.png"
                            alt="Products Banner"
                            width={1920}
                            height={720}
                            className="w-auto h-auto object-contain"
                            priority
                            quality={100}
                        />
                    </div>
                </CarouselItem>
                <CarouselItem className="pl-2 md:pl-4">
                    <div className="relative w-full h-auto flex justify-center items-center">
                        <Image
                            src="/products-banner/2.png"
                            alt="Products Banner 2"
                            width={1920}
                            height={720}
                            className="w-auto h-auto object-contain"
                            priority
                            quality={100}
                        />
                    </div>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 md:w-12 md:h-12" />
            <CarouselNext className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 md:w-12 md:h-12" />
        </Carousel>
    );
};

export default HeroSectionCarouselProducts;