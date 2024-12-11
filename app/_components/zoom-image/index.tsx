"use client"

import Image from "next/image";
import { useState, useRef, MouseEvent } from "react";

interface ZoomImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
}

const ZoomImage = ({ src, alt, width, height, className }: ZoomImageProps) => {
    const [isZoomed, setIsZoomed] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const imageRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return;

        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setPosition({ x, y });
    };

    const handleMouseEnter = () => setIsZoomed(true);
    const handleMouseLeave = () => setIsZoomed(false);

    return (
        <div
            ref={imageRef}
            className="relative overflow-hidden rounded-lg cursor-zoom-in"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={`transition-transform duration-200 ${className}`}
                style={{
                    transform: isZoomed ? `scale(2)` : 'scale(1)',
                    transformOrigin: `${position.x}% ${position.y}%`
                }}
            />
        </div>
    );
}

export default ZoomImage;