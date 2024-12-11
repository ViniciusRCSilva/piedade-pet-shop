"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/app/_components/ui/carousel";
import React from "react";

const HeroSectionCarousel = () => {
    return (
        <Carousel
            className="relative"
            opts={{
                loop: true
            }}
        >
            <CarouselContent className="-ml-2 md:-ml-4">
                <CarouselItem className="pl-2 md:pl-4">
                    <div className="relative aspect-[4/3] md:aspect-[24/9] w-full overflow-hidden">
                        <div className="absolute inset-0 bg-banner bg-contain lg:bg-cover bg-no-repeat bg-center" />
                    </div>
                </CarouselItem>
                <CarouselItem className="pl-2 md:pl-4">
                    <div className="relative aspect-[4/3] md:aspect-[24/9] w-full overflow-hidden">
                        <div className="absolute inset-0 bg-banner2 bg-contain lg:bg-cover bg-no-repeat bg-center" />
                    </div>
                </CarouselItem>
                <CarouselItem className="pl-2 md:pl-4">
                    <div className="relative aspect-[4/3] md:aspect-[24/9] w-full overflow-hidden">
                        <div className="absolute inset-0 bg-banner3 bg-contain lg:bg-cover bg-no-repeat bg-center" />
                    </div>
                </CarouselItem>
                <CarouselItem className="pl-2 md:pl-4">
                    <div className="relative aspect-[4/3] md:aspect-[24/9] w-full overflow-hidden">
                        <div className="absolute inset-0 bg-banner4 bg-contain lg:bg-cover bg-no-repeat bg-center" />
                    </div>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 md:w-12 md:h-12" />
            <CarouselNext className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 md:w-12 md:h-12" />
        </Carousel>
    );
};

export default HeroSectionCarousel;