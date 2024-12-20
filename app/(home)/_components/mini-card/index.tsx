"use client";

import { Card } from "@/app/_components/ui/card";
import { ReactNode } from "react";
import { ProductCategory } from "@prisma/client";
import Link from "next/link";

interface MiniCardProps {
    icon: ReactNode;
    content: string;
    category: ProductCategory;
}

const MiniCard = ({ icon, content, category }: MiniCardProps) => {
    return (
        <Link href={`/produtos?category=${category}`}>
            <Card
                className="group relative bg-white overflow-hidden w-36 h-36 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-purple"
            >
                {/* Gradient overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300" />

                {/* Content container */}
                <div className="relative z-10 flex flex-col items-center gap-4 p-4">
                    {/* Icon with hover effect */}
                    <div className="w-12 h-12 flex items-center justify-center">
                        {icon}
                    </div>

                    {/* Text with hover effect */}
                    <p className="text-center font-medium text-muted-foreground duration-300">
                        {content}
                    </p>
                </div>
            </Card>
        </Link>
    );
};

export default MiniCard;