"use client"

import { ProductCategory } from "@prisma/client";
import { useState, useEffect } from "react";
import { Input } from "@/app/_components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/select";
import { formatters, priceRanges } from "@/app/_utils/utils";
import ProductCard from "@/app/_components/product-card";
import { SerializedProduct } from "@/app/_helper";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import { Button } from "@/app/_components/ui/button";
import { MagnifyingGlass, Sliders, Trash } from "@phosphor-icons/react/dist/ssr";

interface ProductListProps {
    initialProducts: SerializedProduct[];
}

export default function ProductList({ initialProducts }: ProductListProps) {
    const [filteredProducts, setFilteredProducts] = useState(initialProducts);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");

    const resetFilters = () => {
        setSearchTerm("");
        setSelectedCategory("all");
        setSelectedPriceRange("all");
    };

    const hasActiveFilters = searchTerm !== "" || selectedCategory !== "all" || selectedPriceRange !== "all";

    const getProductCountInPriceRange = (min: number, max: number) => {
        return initialProducts.filter(product => {
            const price = product.value;
            return price >= min && price < max;
        }).length;
    };

    useEffect(() => {
        let filtered = [...initialProducts];

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply category filter
        if (selectedCategory !== "all") {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        // Apply price range filter
        if (selectedPriceRange !== "all") {
            const range = priceRanges.find(r => r.id === selectedPriceRange);
            if (range) {
                filtered = filtered.filter(product => {
                    const price = product.value;
                    return price >= range.min && price < range.max;
                });
            }
        }

        setFilteredProducts(filtered);
    }, [searchTerm, selectedCategory, selectedPriceRange, initialProducts]);

    return (
        <div className="w-full">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                {/* Mobile Filter Button */}
                <div className="lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="w-full">
                                <Sliders className="mr-2 h-4 w-4" />
                                Filtros
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader>
                                <SheetTitle>Filtros</SheetTitle>
                                <SheetDescription>
                                    Ajuste os filtros para encontrar o produto ideal
                                </SheetDescription>
                            </SheetHeader>
                            <div className="flex flex-col gap-6 mt-6">
                                {/* Reset Filters Button - Mobile */}
                                {hasActiveFilters && (
                                    <Button
                                        variant="outline"
                                        onClick={resetFilters}
                                        className="w-full"
                                    >
                                        <Trash className="mr-2 h-4 w-4" />
                                        Remover Filtros
                                    </Button>
                                )}
                                {/* Search Input */}
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-muted-foreground">Buscar</h3>
                                    <div className="relative">
                                        <MagnifyingGlass className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Buscar produtos..."
                                            className="pl-8"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Category Filter */}
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-muted-foreground">Categorias</h3>
                                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Filtrar por categoria" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Todas as categorias</SelectItem>
                                            {Object.values(ProductCategory).map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {formatters.category(category)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Price Range Radio Group */}
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-muted-foreground">Faixa de Preço</h3>
                                    <div className="space-y-2">
                                        {priceRanges.map((range) => (
                                            <label
                                                key={range.id}
                                                className="flex items-center space-x-2"
                                            >
                                                <input
                                                    type="radio"
                                                    name="price-range"
                                                    value={range.id}
                                                    checked={selectedPriceRange === range.id}
                                                    onChange={(e) => setSelectedPriceRange(e.target.value)}
                                                    className="h-4 w-4"
                                                />
                                                <span>{range.label}</span>
                                                <span className="text-muted-foreground">
                                                    ({getProductCountInPriceRange(range.min, range.max)})
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Desktop Filters */}
                <div className="hidden lg:flex lg:flex-col lg:w-[300px] lg:gap-6 lg:sticky lg:top-48">
                    {/* Reset Filters Button - Desktop */}
                    {hasActiveFilters && (
                        <Button
                            variant="destructive"
                            onClick={resetFilters}
                            className="w-full"
                        >
                            <Trash className="mr-2 h-4 w-4" />
                            Remover Filtros
                        </Button>
                    )}
                    {/* Search Input */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-muted-foreground">Buscar</h3>
                        <div className="relative">
                            <MagnifyingGlass className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar produtos..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-muted-foreground">Categorias</h3>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filtrar por categoria" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas as categorias</SelectItem>
                                {Object.values(ProductCategory).map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {formatters.category(category)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Price Range Radio Group */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-muted-foreground">Faixa de Preço</h3>
                        <div className="space-y-2">
                            {priceRanges.map((range) => (
                                <label
                                    key={range.id}
                                    className="flex items-center space-x-2"
                                >
                                    <input
                                        type="radio"
                                        name="price-range"
                                        value={range.id}
                                        checked={selectedPriceRange === range.id}
                                        onChange={(e) => setSelectedPriceRange(e.target.value)}
                                        className="h-4 w-4"
                                    />
                                    <span>{range.label}</span>
                                    <span className="text-muted-foreground">
                                        ({getProductCountInPriceRange(range.min, range.max)})
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                {...product}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}