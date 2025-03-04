"use client"

import { ProductAnimalCategory, ProductCategory } from "@prisma/client";
import { useState, useEffect } from "react";
import { Input } from "@/app/_components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/select";
import { formatters, priceRanges } from "@/app/_utils/utils";
import ProductCard from "@/app/_components/product-card";
import { SerializedProduct } from "@/app/_helper";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import { Button } from "@/app/_components/ui/button";
import { MagnifyingGlass, Sliders, Trash } from "@phosphor-icons/react/dist/ssr";
import { useAuth } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { ScrollArea } from "@/app/_components/ui/scroll-area";

interface ProductListProps {
    initialProducts: SerializedProduct[];
}

export default function ProductList({ initialProducts }: ProductListProps) {
    const searchParams = useSearchParams();
    const [filteredProducts, setFilteredProducts] = useState(initialProducts);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<'all' | ProductCategory>(
        (searchParams.get("category") as ProductCategory) || "all"
    );
    const [selectedAnimal, setSelectedAnimal] = useState<'all' | ProductAnimalCategory>(
        (searchParams.get("animal") as ProductAnimalCategory) || "all"
    );
    const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
    const [displayCount, setDisplayCount] = useState(10);
    const { isSignedIn } = useAuth();

    const resetFilters = () => {
        setSearchTerm("");
        setSelectedCategory("all");
        setSelectedAnimal("all");
        setSelectedPriceRange("all");
    };

    const hasActiveFilters = searchTerm !== "" || selectedCategory !== "all" || selectedAnimal !== "all" || selectedPriceRange !== "all";

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

        // Apply animal filter
        if (selectedAnimal !== "all") {
            filtered = filtered.filter(product => product.animal === selectedAnimal);
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
    }, [searchTerm, selectedCategory, selectedAnimal, selectedPriceRange, initialProducts, isSignedIn]);

    return (
        <div className="w-full">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                {/* Mobile Filter Button */}
                <div className="flex w-full justify-end sticky top-28 z-20 lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline">
                                <Sliders className="mr-2 h-4 w-4" />
                                Filtros
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <ScrollArea className="h-[calc(100vh-4rem)]">
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
                                        <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ProductCategory | "all")}>
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

                                    {/* Animal Filter */}
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-muted-foreground">Animais</h3>
                                        <Select value={selectedAnimal} onValueChange={(value) => setSelectedAnimal(value as ProductAnimalCategory | "all")}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Filtrar por animal" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Todas os animais</SelectItem>
                                                {Object.values(ProductAnimalCategory).map((animal) => (
                                                    <SelectItem key={animal} value={animal}>
                                                        {formatters.getAnimalCategory(animal)}
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
                            </ScrollArea>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Desktop Filters */}
                <div className="hidden lg:flex lg:flex-col lg:w-[300px] lg:gap-6 lg:sticky lg:top-48">
                    {/* Reset Filters Button - Desktop */}
                    {hasActiveFilters && (
                        <Button
                            variant="link"
                            onClick={resetFilters}
                            className="w-fit text-red-500 p-0 items-center justify-start"
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
                        <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ProductCategory | "all")}>
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

                    {/* Animal Filter */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-muted-foreground">Animais</h3>
                        <Select value={selectedAnimal} onValueChange={(value) => setSelectedAnimal(value as ProductAnimalCategory | "all")}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filtrar por animal" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas os animais</SelectItem>
                                {Object.values(ProductAnimalCategory).map((animal) => (
                                    <SelectItem key={animal} value={animal}>
                                        {formatters.getAnimalCategory(animal)}
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
                    <h1 className="mb-6 pb-2 text-2xl font-bold text-muted-foreground border-b">
                        {selectedCategory === "all"
                            ? "Todos os produtos"
                            : formatters.category(selectedCategory)
                        }
                        {selectedAnimal === "all" || selectedAnimal === "OTHER"
                            ? ""
                            : ` para ${formatters.getAnimalCategory(selectedAnimal)}`
                        }
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        {filteredProducts.slice(0, displayCount).map((product) => (
                            <ProductCard
                                key={product.id}
                                {...product}
                            />
                        ))}
                    </div>
                    {displayCount < filteredProducts.length && (
                        <div className="mt-8 flex justify-center">
                            <Button
                                variant="outline"
                                onClick={() => setDisplayCount(prev => prev + 10)}
                                className="w-full max-w-xs"
                            >
                                Carregar mais produtos
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}